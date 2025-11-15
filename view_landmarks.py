import random
import cv2
import mediapipe as mp



cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise RuntimeError("Could not open webcam. Check camera permissions and device index.")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    enable_segmentation=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# Pick which pose landmarks you want to visualize
WATCH_LANDMARKS = [7, 8, 15, 19, 12, 11, 24, 23, 0 , 10, 9]  # left_ear, right_ear, left_wrist, left_index

# Each landmark gets a persistent random color (changes every run)
LM_COLORS = {lm: (random.randint(80,255), random.randint(80,255), random.randint(80,255)) for lm in WATCH_LANDMARKS}

paused = False
while True:
    
    ret, frame = cap.read()
    if not ret:
        break
    frame = cv2.flip(frame, 1)
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord('p'):
        paused = not paused

    if paused:
        continue
    
    rgb= cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb)

    if results.pose_landmarks:
        h, w, _ = frame.shape
        for lm_id in WATCH_LANDMARKS:
            lm = results.pose_landmarks.landmark[lm_id]
            cx, cy = int(lm.x * w), int(lm.y * h)
            color = LM_COLORS[lm_id]
            cv2.circle(frame, (cx, cy), 8, color, -1, cv2.LINE_AA)
    cv2.imshow("Pose & Hand Tracker", frame)