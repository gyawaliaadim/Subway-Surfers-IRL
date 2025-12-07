import socket
import pyautogui
import json

HOST = '0.0.0.0'
PORT = 9999

try:
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, PORT))
    server.listen(1)
    actual_port = server.getsockname()[1]
    print(f"Server listening on {HOST}:{actual_port}")
except Exception as e:
    print(f"Failed to start server: {e}")
    exit(1)

try:
    conn, addr = server.accept()
    print(f"Connected by {addr}")
except Exception as e:
    print(f"Error accepting connection: {e}")
    server.close()
    exit(1)

try:
    while True:
        try:
            data = conn.recv(1024)
            if not data:
                print("Connection closed by client.")
                break

            decoded = data.decode()
            print("Raw data:", decoded)

            try:
                payload = json.loads(decoded)
                action = payload.get("action", "").lower()
                
                if action:
                    print("Action:", action)
                    pyautogui.press(action)
                else:
                    print("Invalid payload, ignoring.")

            except json.JSONDecodeError:
                print("Bad JSON received:", decoded)

        except Exception as e:
            print(f"Error during data reception or processing: {e}")

except KeyboardInterrupt:
    print("\nServer shutting down...")

finally:
    try:
        conn.close()
    except:
        pass
    server.close()
    print("Server closed.")
