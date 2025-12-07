# config.py
# Centralized configuration for the hand-tracking → Subway Surfers controller setup.

# IPv4 address of Computer B (the machine running the game)
COMPUTER_B_IP = "192.168.1.70"     # replace with the actual IPv4 of B

# Camera index to use (0 = default wsebcam, 1/2 = external cams)
CAMERA_INDEX = 1

# Port for socket communication
PORT = 9999

# Window height and width
HEIGHT = 1080
WIDTH = 1920

# Export for easy importing
__all__ = ["COMPUTER_B_IP", "CAMERA_INDEX", "PORT", "HEIGHT", "WIDTH"]
