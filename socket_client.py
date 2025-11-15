import socket

HOST = '127.0.0.1'  # server IP
PORT = 12345

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((HOST, PORT))

while True:
    msg = input("Enter message to send: ")
    if msg.lower() == "exit":
        break
    client.sendall(msg.encode())
    data = client.recv(1024)
    print("Received from server:", data.decode())

client.close()
