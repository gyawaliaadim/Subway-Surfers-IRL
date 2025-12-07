
<img width="1917" height="1026" alt="image" src="https://github.com/user-attachments/assets/4f89cbc9-894d-4c5b-9f2c-2bf855e23c80" />

# Head-Controlled Subway Surfers

Control Subway Surfers with head movement — move your nose left/right to change lanes, look up to jump, and look down to slide. Designed for no-hands gaming, streaming, or accessibility demos.

## Contents
- Features
- Requirements
- Quick start
- Configuration
- How it works
- Controls / keys
- Troubleshooting & tuning
- Privacy & credits

## Features
- Real-time head tracking using MediaPipe Pose (fast and lightweight).
- Works locally or over the network (two computers).
- Fullscreen overlay with lanes, nose indicator and HUD.
- Auto-reconnect on Wi‑Fi drops.
- Pause with P, quit with Q.
- HUD shows current lane, zone and last action sent.

## Requirements
- Python 3.12 recommended.
- Libraries: opencv-python, mediapipe, pyautogui.
Install with:
```terminal
pip install opencv-python mediapipe pyautogui
```

## Quick start (3 steps)
1. Edit config.py (see example below).
2. On the webcam PC (Computer A) run:
```terminal
python client.py
```
When prompted choose:
- s → server mode (send commands to remote Computer B)
- c → local/client mode (control the same PC for testing)

3. On the Computer B run:
```terminal
python server.py
```
Start Subway Surfers and keep the game window focused.

## Configuration (config.py example)
- Open config.py and update these values:
```python
COMPUTER_B_IP = "192.168.1.XX"   # IPv4 of PC B
CAMERA_INDEX = 0                 # Usually 0 or 1
PORT = 9999                      # Same port on both PCs
HEIGHT = 1080
WIDTH = 1920
```

## How it works (brief)
- client.py reads webcam frames, uses MediaPipe Pose to get nose/face landmarks, maps nose X/Y to on-screen zones and lanes, and sends actions:
  - left/mid/right lane changes → simulated left/right arrow keys
  - nose up → jump (up arrow)
  - nose down → slide/roll (down arrow)
- server.py receives network commands (optional) and simulates keypresses on the computer PC (or local when in client test mode).

## Controls / Keys
- P → Pause / unpause tracking
- Q → Quit the program
- Actions sent: Left Arrow, Right Arrow, Up Arrow (jump), Down Arrow (slide)

## Tuning & tips
- If tracking is jittery:
  - Improve lighting and face visibility.
  - Sit ~50–80 cm from the camera.
  - Increase smoothing in code or set model_complexity=1 in client.py for more accurate pose detection (uses more CPU).
- If network lag:
  - Ensure both PCs are on the same Wi‑Fi or use Ethernet.
  - Check firewall/antivirus rules for the chosen port (default 9999).
- For local testing, run both client and server on the same machine and use mode 'c'.

## Troubleshooting
- “Connection refused”: verify COMPUTER_B_IP and that both devices are on the same network.
- No key presses on the computer B PC: ensure the server is allowed through Windows Firewall and the game window is focused (some games block simulated inputs).
- Laggy video/poor detection: lower camera resolution, use a better camera, or change model params.

## Privacy & safety
- The system processes webcam frames locally; frames are not uploaded by default.
- Only use in environments where webcam use is permitted and safe.

## Credits
Aadim Gyawali, Smile Kalu, Riwaj Karki




Built with MediaPipe, OpenCV and PyAutoGUI. Made for hands‑free endless surfing.

Enjoy surfing with your face!