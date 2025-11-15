# computer_a.py
import socket

HOST = '192.168.0.103'  # replace with B's LAN IP
PORT = 9999

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

# send hello world
sock.sendall(b"Hello World from Computer A!")

sock.close()
