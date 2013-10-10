#!/usr/bin/python

from __future__ import division
from Adafruit_PWM_Servo_Driver import PWM
import time
import re, sys
# ===========================================================================
# Example Code
# ===========================================================================
# Initialise the PWM device using the default address
# bmp = PWM(0x40, debug=True)
pwm = PWM(0x40, debug=True)

servoMin = 100 # Min pulse length out of 4096
servoMax = 700 # Max pulse length out of 4096

def setServoPulse(channel, low, high):
  print "High: %d" % high
  pulseLength = 1000000 # 1,000,000 us per second
  pulseLength /= 60
  pulseLength/= 4096
  high *= 1000 # 12 bits of resolution
  high /= pulseLength
  print "High pulse: %d" % high
  pwm.setPWM(channel, int(low), int(high))

pwm.setPWMFreq(60)  # Set frequency to 60 Hz

#channel is the channel number on control panel
#isCw is true if the direction is clockwise
#speed is a percentage value
def setContServo(channel, isCw, speed):
  minPulse = 1.5
  stopPulse = 1.6
  maxPulse = 1.75

  pulse=0
  if isCw==1:
    speedRange= stopPulse-minPulse
    pulse = stopPulse-(speedRange/100)*speed
  elif isCw==0:
    speedRange= maxPulse-stopPulse
    print "Speed: %d" % speedRange
    pulse= stopPulse+(speedRange/100)*speed
  setServoPulse(channel, 0, pulse)

def setRotServo(channel, angle):
  minPulse = 0.6
  maxPulse = 2.7

  pulse=0
  angleRange= maxPulse-minPulse
  print "Speed: %d" % angleRange
  pulse= minPulse + (angle / (180/angleRange))
  setServoPulse(channel, 0, pulse)