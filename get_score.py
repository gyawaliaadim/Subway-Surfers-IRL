import cv2
import numpy as np
import pyautogui
import pytesseract
import time

# --- CONFIG ---
px, py = 1892, 160                     # trigger pixel
target_color = (0, 203, 255)            # BGR

# OCR RECTANGLE
x1, y1 = 940, 268
x2, y2 = 1232, 322
w, h = x2 - x1, y2 - y1

while True:
    # take screenshot
    frame = np.array(pyautogui.screenshot())
    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

    # get pixel
    b, g, r = frame[py, px]

    # EXACT MATCH ONLY
    if (b, g, r) == target_color:
        # pixel matches → do nothing
        pass
    else:
        # pixel changed → perform OCR on rectangle
        roi = frame[y1:y1+h, x1:x1+w]
        text = pytesseract.image_to_string(roi)
        print("TEXT:", text.strip())

    time.sleep(0.05)  # 20 FPS loop
