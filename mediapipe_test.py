import time
import cv2
import mediapipe as mp
import pyautogui
import numpy as np

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
if not cap.isOpened():
    raise RuntimeError("Could not open webcam. Check camera permissions and device index.")

# ---------------------------
# Colors & UI
# ---------------------------
COLOR_CENTER = (150, 255, 150)
COLOR_LEFT_EAR = (255, 120, 120)
COLOR_RIGHT_EAR = (120, 160, 255)
COLOR_WRIST = (0, 255, 255)
COLOR_INDEX = (255, 255, 100)
COLOR_TEXT_DIR = (255, 90, 90)
COLOR_TEXT_ACT = (90, 180, 255)
STROKE_COLOR = (0, 0, 0)
FEEDBACK_COLOR = (0, 255, 255)
FONT = cv2.FONT_HERSHEY_SIMPLEX

# ---------------------------
# State
# ---------------------------
last_action_time = 0.0
feedback_text = ""
feedback_pos = (0, 0)
direction = "CENTER"
action = "NONE"
paused = False

# ---------------------------
# Helpers
# ---------------------------
def draw_landmark_with_stroke(frame, position, fill_color, radius=8, thickness=2):
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
        # Grab frame first
        ret, frame = cap.read()
        if not ret:
            print("Warning: failed to read frame. Exiting.")
            break

        frame = cv2.flip(frame, 1)
        img_h, img_w = frame.shape[:2]
        center_x, center_y = img_w // 2, img_h // 2

        # Key handling
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('p'):
            paused = not paused

        if paused:
            draw_text_with_shadow(frame, "PAUSED", (50, 50), FONT, 2, (0, 0, 255), 3)
            cv2.imshow("Pose & Hand Tracker", frame)
            continue

        # Draw center lines
        overlay = frame.copy()
        cv2.line(overlay, (center_x, 0), (center_x, img_h), COLOR_CENTER, 2)
        cv2.line(overlay, (0, center_y), (img_w, center_y), COLOR_CENTER, 2)
        frame = cv2.addWeighted(overlay, 0.5, frame, 0.5, 0)

        # Pose detection
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        if results.pose_landmarks:
            lm = results.pose_landmarks.landmark

            if len(lm) > 19:
                # Ears
                left_ear_px = (int(lm[7].x * img_w), int(lm[7].y * img_h))
                right_ear_px = (int(lm[8].x * img_w), int(lm[8].y * img_h))
                draw_landmark_with_stroke(frame, left_ear_px, COLOR_LEFT_EAR, 7)
                draw_landmark_with_stroke(frame, right_ear_px, COLOR_RIGHT_EAR, 7)

                # Direction logic
                if left_ear_px[0] < center_x and right_ear_px[0] < center_x:
                    if direction == "CENTER":
                        pyautogui.press("left")
                        feedback_text = "LEFT!"
                        feedback_pos = (center_x - 50, 50)
                        last_action_time = time.time()
                    direction = "LEFT"

                elif left_ear_px[0] > center_x and right_ear_px[0] > center_x:
                    if direction == "CENTER":
                        pyautogui.press("right")
                        feedback_text = "RIGHT!"
                        feedback_pos = (center_x - 50, 50)
                        last_action_time = time.time()
                    direction = "RIGHT"

                else:
                    direction = "CENTER"

                # Wrist & index
                wrist_px = (int(lm[15].x * img_w), int(lm[15].y * img_h))
                index_px = (int(lm[19].x * img_w), int(lm[19].y * img_h))

                draw_landmark_with_stroke(frame, wrist_px, COLOR_WRIST, 9)
                draw_landmark_with_stroke(frame, index_px, COLOR_INDEX, 9)

                # Actions
                if wrist_px[1] < center_y:
                    if action == "NONE":
                        pyautogui.press("up")
                        feedback_text = "UP!"
                        feedback_pos = (center_x - 40, 100)
                        last_action_time = time.time()
                    action = "JUMP"

                elif index_px[1] > center_y:
                    if action == "NONE":
                        pyautogui.press("down")
                        feedback_text = "DOWN!"
                        feedback_pos = (center_x - 50, 100)
                        last_action_time = time.time()
                    action = "ROLL"

                else:
                    action = "NONE"

        # HUD
        hud = frame.copy()
        cv2.rectangle(hud, (20, 40), (320, 170), (0, 0, 0), -1)
        frame = cv2.addWeighted(hud, 0.4, frame, 0.6, 0)
        draw_text_with_shadow(frame, f"Direction: {direction}", (40, 90), FONT, 1, COLOR_TEXT_DIR, 3)
        draw_text_with_shadow(frame, f"Action: {action}", (40, 150), FONT, 1, COLOR_TEXT_ACT, 3)

        # Feedback popup
        if time.time() - last_action_time < 0.6:
            draw_text_with_shadow(frame, feedback_text, feedback_pos, FONT, 1.6, FEEDBACK_COLOR, 4)

        cv2.imshow("Pose & Hand Tracker", frame)

finally:
    cap.release()
    cv2.destroyAllWindows()
    pose.close()
