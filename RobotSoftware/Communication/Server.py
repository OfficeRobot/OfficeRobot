#!/usr/bin/python
#!/usr/bin/env python

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import socket
from RequestHandler import RobotHTTPRequestHandler
import Servo_Control


#Start the server on localhost
def run():
    print('http server is starting...')

    #ip and port of servr
    #by default http server port is 80
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("gmail.com", 80))
    ip = s.getsockname()[0]
    s.close()
    server_address = (ip, 80)
    httpd = HTTPServer(server_address, RobotHTTPRequestHandler)
    print('http server is running on %s ...' % ip)
    httpd.serve_forever()
    Servo_Control.setContServo(1, 0, 0)
    Servo_Control.setRotServo(0, 90)

if __name__ == '__main__':
    run()
