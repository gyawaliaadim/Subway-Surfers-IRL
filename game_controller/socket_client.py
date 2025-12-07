userChoice = input("Enter 's' to use server mode, 'c' for client mode: ")

from config import COMPUTER_B_IP, CAMERA_INDEX, PORT, HEIGHT, WIDTH
import time
import cv2
import mediapipe as mp
import json
import socket
import pyautogui
import threading

def connect_to_server():
    global sock
    while True:
        try:
            print("Trying to connect...")
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.connect((HOST, PORT))
            print("Connected!")
            return
        except:
            print("Connection failed. Retrying in 2 sec...")
            time.sleep(2)


def send_action(action):
    if userChoice == 's':
        try:
            message = json.dumps({"action": action}) + "\n"
            sock.sendall(message.encode())
        except:
            print("Lost connection. Reconnecting...")
            connect_to_server()
            try:
                sock.sendall(message.encode())
            except:
                pass
    else:
        key_map = {"LEFT": "left", "RIGHT": "right", "UP": "up", "DOWN": "down"}
        pyautogui.press(key_map.get(action, "none"))

# call like this


# ---------------------------
# Config
# ---------------------------
HOST = COMPUTER_B_IP
PROCESS_WIDTH, PROCESS_HEIGHT = 640, 360  # smaller frame for fast detection

# ---------------------------
# User choice: server/client
# ---------------------------
if userChoice == 's':
    connect_to_server()

# ---------------------------
# MediaPipe Pose
# ---------------------------
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=0,  # lightweight
    enable_segmentation=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# ---------------------------
# Video capture
# ---------------------------
# cap = cv2.VideoCapture(1)
cap = cv2.VideoCapture(CAMERA_INDEX)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)  # display resolution
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)

cv2.namedWindow("Pose Tracker", cv2.WINDOW_NORMAL)

if userChoice == 's':
    cv2.setWindowProperty("Pose Tracker", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

if not cap.isOpened():
    raise RuntimeError("Cannot open webcam!")

# ---------------------------
# Colors & fonts
# ---------------------------
COLOR_NOSE = (255, 165, 0)      # orange nose
COLOR_LANE = (0, 255, 0)        # green lane boundaries
COLOR_ZONE = (0, 180, 255)      # cyan zone lines
COLOR_TEXT = (255, 255, 255)    # white text
COLOR_TEXT_SHADOW = (0, 0, 0)   # black shadow
FONT = cv2.FONT_HERSHEY_SIMPLEX

# ---------------------------
# State
# ---------------------------
last_action_time = 0
feedback_text = ""
feedback_pos = (0, 0)
current_lane = "MIDDLE"
current_zone = "NEUTRAL"
action_to_send = "NONE"
paused = False

# ---------------------------
# Helper functions
# ---------------------------
def draw_landmark_with_stroke(frame, position, color, radius=10):
    cv2.circle(frame, position, radius + 2, (0, 0, 0), 2, cv2.LINE_AA)  # stroke
    cv2.circle(frame, position, radius, color, -1, cv2.LINE_AA)

def draw_text_with_shadow(frame, text, pos, font, scale, color, thickness):
    x, y = pos
    cv2.putText(frame, text, (x+2, y+2), font, scale, COLOR_TEXT_SHADOW, thickness+2, cv2.LINE_AA)
    cv2.putText(frame, text, (x, y), font, scale, color, thickness, cv2.LINE_AA)

# ---------------------------
# Main loop
# ---------------------------
try:
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)  # mirror
        img_h, img_w = frame.shape[:2]

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        if key == ord('p'):
            paused = not paused

        if paused:
            draw_text_with_shadow(frame, "PAUSED", (img_w//2 - 100, img_h//2), FONT, 2, (0,0,255), 4)
            cv2.imshow("Pose Tracker", frame)
            continue

        # ---------------------------
        # Draw lanes (2:1:2)
        # ---------------------------
        ratio_total = 2 + 1 + 2
        unit = img_w / ratio_total
        left_end = int(2 * unit)
        middle_end = int(3 * unit)
        right_end = img_w

        lanes = {
            "LEFT": (0, left_end),
            "MIDDLE": (left_end, middle_end),
            "RIGHT": (middle_end, right_end)
        }

        cv2.line(frame, (left_end, 0), (left_end, img_h), COLOR_LANE, 3)
        cv2.line(frame, (middle_end, 0), (middle_end, img_h), COLOR_LANE, 3)

        # ---------------------------
        # Draw vertical zones
        # ---------------------------
        upper_limit = int(img_h * 0.25)
        lower_limit = int(img_h * 0.55)
        cv2.line(frame, (0, upper_limit), (img_w, upper_limit), COLOR_ZONE, 2)
        cv2.line(frame, (0, lower_limit), (img_w, lower_limit), COLOR_ZONE, 2)

        # ---------------------------
        # Pose detection on small frame
        # ---------------------------
        small_frame = cv2.resize(frame, (PROCESS_WIDTH, PROCESS_HEIGHT))
        rgb_small = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_small)

        action_to_send = "NONE"

        if results.pose_landmarks:
            # Scale back to full resolution
            nose = results.pose_landmarks.landmark[0]
            nose_px = (int(nose.x * img_w), int(nose.y * img_h))

            draw_landmark_with_stroke(frame, nose_px, COLOR_NOSE, 12)

            # --- Horizontal lanes ---
            if nose_px[0] < lanes["LEFT"][1]:
                new_lane = "LEFT"
            elif nose_px[0] < lanes["MIDDLE"][1]:
                new_lane = "MIDDLE"
            else:
                new_lane = "RIGHT"

            # Lane transitions
            if (current_lane == "LEFT" and new_lane == "MIDDLE") or \
               (current_lane == "MIDDLE" and new_lane == "RIGHT"):
                action_to_send = "RIGHT"
            elif (current_lane == "RIGHT" and new_lane == "MIDDLE") or \
                 (current_lane == "MIDDLE" and new_lane == "LEFT"):
                action_to_send = "LEFT"
            current_lane = new_lane

            # --- Vertical zones ---
            if nose_px[1] < upper_limit:
                new_zone = "UP"
            elif nose_px[1] > lower_limit:
                new_zone = "DOWN"
            else:
                new_zone = "NEUTRAL"

            if new_zone != current_zone:
                action_to_send = new_zone if new_zone != "NEUTRAL" else "NONE"
                current_zone = new_zone

            # Send / press action
            if action_to_send != "NONE":
                feedback_text = action_to_send + "!"
                feedback_pos = (nose_px[0] - 40, nose_px[1] - 50)
                last_action_time = time.time()
                print(f"Action detected: {action_to_send}")

                message = json.dumps({"action": action_to_send}) + "\n"
                
                threading.Thread(target=send_action, args=(action_to_send,), daemon=True).start()
                # if userChoice == 's':
                #     sock.sendall(message.encode())
                # else:
                #     key_map = {"LEFT":"left", "RIGHT":"right", "UP":"up", "DOWN":"down"}
                #     pyautogui.press(key_map.get(action_to_send, "none"))

        # ---------------------------
        # Feedback
        # ---------------------------
        if time.time() - last_action_time < 0.7:
            draw_text_with_shadow(frame, feedback_text, feedback_pos, FONT, 1.6, (255, 220, 0), 4)

        # ---------------------------
        # HUD
        # ---------------------------
        draw_text_with_shadow(frame, f"Lane: {current_lane}", (50, 50), FONT, 1, (180, 255, 180), 2)
        draw_text_with_shadow(frame, f"Zone: {current_zone}", (50, 100), FONT, 1, (180, 255, 180), 2)
        draw_text_with_shadow(frame, f"Action: {action_to_send}", (50, 150), FONT, 1, (180, 255, 180), 2)

        cv2.imshow("Pose Tracker", frame)

finally:
    cap.release()
    cv2.destroyAllWindows()
    pose.close()
