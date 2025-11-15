import time
import cv2
import mediapipe as mp
import json
import socket

HOST = '192.168.1.92'  # replace with B's LAN IP
PORT = 9999

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

# ---------------------------
# Pose setup
# ---------------------------
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    enable_segmentation=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

cap = cv2.VideoCapture(0)
cv2.namedWindow("Pose Tracker", cv2.WINDOW_NORMAL)

if not cap.isOpened():
    raise RuntimeError("Could not open webcam. Check camera permissions and device index.")

# ---------------------------
# Colors & UI
# ---------------------------
COLOR_BODY = (255, 120, 120)
COLOR_TEXT = (90, 180, 255)
STROKE_COLOR = (0, 0, 0)
FONT = cv2.FONT_HERSHEY_SIMPLEX

# ---------------------------
# State
# ---------------------------
last_action_time = 0
feedback_text = ""
feedback_pos = (0, 0)
current_lane = "MIDDLE"
current_zone = "NEUTRAL"  # vertical zone
action_to_send = "NONE"

# ---------------------------
# Helpers
# ---------------------------
def draw_landmark_with_stroke(frame, position, fill_color, radius=10, thickness=2):
    cv2.circle(frame, position, radius + 2, STROKE_COLOR, thickness + 2, cv2.LINE_AA)
    cv2.circle(frame, position, radius, fill_color, -1, cv2.LINE_AA)

def draw_text_with_shadow(img, text, pos, font, scale, color, thickness):
    x, y = pos
    cv2.putText(img, text, (x + 3, y + 3), font, scale, (0, 0, 0), thickness + 2, cv2.LINE_AA)
    cv2.putText(img, text, (x, y), font, scale, color, thickness, cv2.LINE_AA)

# ---------------------------
# MAIN LOOP
# ---------------------------
try:
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        img_h, img_w = frame.shape[:2]

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break

        # Horizontal lanes
        lane_width = img_w // 3
        lanes = {"LEFT": (0, lane_width), "MIDDLE": (lane_width, 2 * lane_width), "RIGHT": (2 * lane_width, img_w)}

        # Vertical zones
        upper_limit = int(img_h * 0.25)  # top zone
        lower_limit = int(img_h * 0.55)  # bottom zone
        cv2.line(frame, (0, upper_limit), (img_w, upper_limit), (0, 255, 0), 2)
        cv2.line(frame, (0, lower_limit), (img_w, lower_limit), (0, 255, 0), 2)

        # Pose detection
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        action_to_send = "NONE"

        if results.pose_landmarks:
            nose = results.pose_landmarks.landmark[0]
            nose_px = (int(nose.x * img_w), int(nose.y * img_h))
            draw_landmark_with_stroke(frame, nose_px, COLOR_BODY, 12)

            # --- Horizontal lane detection ---
            if nose_px[0] < lanes["LEFT"][1]:
                new_lane = "LEFT"
            elif nose_px[0] < lanes["MIDDLE"][1]:
                new_lane = "MIDDLE"
            else:
                new_lane = "RIGHT"

            # Lane transitions
            if current_lane == "LEFT" and new_lane == "MIDDLE" or current_lane == "MIDDLE" and new_lane == "RIGHT":
                action_to_send = "RIGHT"
            elif current_lane == "RIGHT" and new_lane == "MIDDLE" or current_lane == "MIDDLE" and new_lane == "LEFT":
                action_to_send = "LEFT"
            current_lane = new_lane

            # --- Vertical zone detection ---
            if nose_px[1] < upper_limit:
                new_zone = "UP"
            elif nose_px[1] > lower_limit:
                new_zone = "DOWN"
            else:
                new_zone = "NEUTRAL"

            # Trigger vertical action only on zone change
            if new_zone != current_zone:
                action_to_send = new_zone if new_zone != "NEUTRAL" else "NONE"
                current_zone = new_zone

            if action_to_send != "NONE":
                feedback_text = action_to_send + "!"
                feedback_pos = (nose_px[0] - 40, nose_px[1] - 50)
                last_action_time = time.time()
                print(f"Action detected: {action_to_send}")
                sock.sendall(json.dumps({"action": action_to_send}).encode())

        # Feedback
        if time.time() - last_action_time < 0.5:
            draw_text_with_shadow(frame, feedback_text, feedback_pos, FONT, 1.6, COLOR_TEXT, 4)

        # HUD
        draw_text_with_shadow(frame, f"Lane: {current_lane}", (50, 50), FONT, 1, COLOR_TEXT, 2)
        draw_text_with_shadow(frame, f"Zone: {current_zone}", (50, 100), FONT, 1, COLOR_TEXT, 2)
        draw_text_with_shadow(frame, f"Action: {action_to_send}", (50, 150), FONT, 1, COLOR_TEXT, 2)

        cv2.imshow("Pose Tracker", frame)

finally:
    cap.release()
    cv2.destroyAllWindows()
    pose.close()
