import socket

HOST = '127.0.0.1'  # localhost
PORT = 12345        # any free port

# Create socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen(1)
print(f"Server listening on {HOST}:{PORT}")

conn, addr = server.accept()
print(f"Connected by {addr}")

while True:
    data = conn.recv(1024)  # receive data from client
    if not data:
        break
    print("Received from client:", data.decode())
    conn.sendall(data.upper())  # send back in uppercase

conn.close()