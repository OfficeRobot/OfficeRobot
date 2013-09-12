__author__ = 'gmeszaros'
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from threading import Timer
import Servo_Control


def enum(**enums):
    return type('Enum', (), enums)

Directions = enum(Forward='forward', Backward='backward', Left='left', Right='right')
Actions = enum(Move='move', Turn='turn')


#Called by a timer after a timeperiod stops the continous servo
def stopContServo():
    #print("Stop the continous servo")
    Servo_Control.setContServo(1, 0, 0)


def resetRotServo():
    #print("Stop the continous servo")
    Servo_Control.setRotServo(0, 90)


#Create custom HTTPRequestHandler class
class RobotHTTPRequestHandler(BaseHTTPRequestHandler):
    #handle GET command
    def do_GET(self):
        try:
            self.send_header('Content-type', 'application/x-javascript')
            path = self.path.replace("/", "").replace("?", "")
            params = path.split('&')
            if params.__len__() <= 1:
                self.send_error(400, 'Wrong or missing parameters')
            action = ''
            direction = ''
            angle = 0
            speed = 50
            channel = 0
            for i in range(0, params.__len__()):
                key = params[i].split('=')[0].lower()
                value = params[i].split('=')[1].lower()
                if key == 'check':
                    self.send_response(200, "true")
                    return
                if key == 'action':
                    action = value
                if key == 'direction':
                    direction = value
                if key == 'angle':
                    angle = int(value)
                if key == 'speed':
                    speed = int(value)
                if key == 'channel':
                    channel = int(value)
            if angle > 90:
                angle = 90
            if angle < 0:
                angle = 0
            if action == '' or direction == '':
                self.send_error(400, 'Wrong or missing parameters')
            else:
                if action == Actions.Move:
                    if direction == Directions.Forward:
                        Servo_Control.setContServo(15, 0, speed)
                        Servo_Control.setContServo(14, 1, speed)
                    else:
                        Servo_Control.setContServo(15, 1, speed)
                        Servo_Control.setContServo(14, 0, speed)
                if action == Actions.Turn:
                    if direction == Directions.Left:
                        Servo_Control.setContServo(15, 1, speed)
                        Servo_Control.setContServo(14, 1, speed)
                    else:
                        Servo_Control.setContServo(15, 0, speed)
                        Servo_Control.setContServo(14, 0, speed)
                #send code 200 response
                self.send_response(200)

            #send header first
            self.send_header('Content-type', 'application/x-javascript')
            self.end_headers()
            return
        except IOError:
            self.send_error(404, 'file not found')
