#!/usr/bin/python
#!/usr/bin/env python

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from urlparse import urlparse
import os
from threading import Timer
import Servo_Control

def enum(**enums):
    return type('Enum', (), enums)

Directions = enum(Forward='forward', Backward='backward', Left='left', Right='right')
Actions = enum(Move='move', Turn='turn')


def stopContServo():
    Servo_Control.setContServo(1, 0, 0)


#Create custom HTTPRequestHandler class
class RobotHTTPRequestHandler(BaseHTTPRequestHandler):
#test GET action=move&direction=forward
    #handle GET command
    def do_GET(self):
        try:
            params = self.path.split('&')
            if params.__len__() <=1:
              return
            actionname = ''
            directionname = ''
            angle = 0
            speed = 50
            for i in range(0, params.__len__()):
                key = params[i].split('=')[0].lower()
                value = params[i].split('=')[1].lower()
                if key == 'action':
                    actionname = value
                if key == 'direction':
                    directionname = value
                if key == 'angle':
                    angle = int(value)
                if key == 'speed':
                    speed = int(value)

            if actionname == '' or directionname == '':
                self.send_response(400)
            else:
                if actionname == Actions.Move:
                    if directionname == Directions.Forward:
                        Servo_Control.setContServo(1, 0, speed)
                        r = Timer(1.0, stopContServo, ())
                        r.start()
                        print("Moving forward with speed %s" % str(speed))
                    else:
                        #setContServo(1,0,speed)
                        print("Moving backward with speed %s" % str(speed))
                if actionname == Actions.Turn:
                    if directionname == Directions.Left:
                        #setRotServo(0, 90-angle)
                        print("Turning left with angle %s" % str(angle))
                    else:
                        #setRotServo(0, 90+angle)
                        print("Turning right with angle %s" % str(angle))
                #send code 200 response
                self.send_response(200)

            #send header first
            self.send_header('Content-type', 'text-html')
            self.end_headers()
            return

        except IOError:
            self.send_error(404, 'file not found')

def run():
    print('http server is starting...')

    #ip and port of servr
    #by default http server port is 80
    server_address = ('10.14.139.201', 80)
    httpd = HTTPServer(server_address, RobotHTTPRequestHandler)
    print('http server is running...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
