#!/usr/bin/python3

import time
import os
import serial

serial_connected = 0

if os.path.exists('/dev/ttyACM0') == True:
    ser = serial.Serial('/dev/ttyACM0', 115200)
    serial_connected = 1
    time.sleep(1)


time.sleep(1)
x = ser.readline().decode("utf-8")
print(x)

ser.close()