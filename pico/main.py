import select
import sys
import time
from machine import Pin, ADC
import utime

# Set up the poll object
poll_obj = select.poll()
poll_obj.register(sys.stdin, select.POLLIN)

sensor_temp = ADC(4)
conversion_factor = 3.3 / (65535)

led = Pin(25, Pin.OUT)

# Loop indefinitely
while True:
    
    # Wait for input on stdin
    poll_results = poll_obj.poll(1) # the '1' is how long it will wait for message before looping again (in microseconds)
    if poll_results:
        
        # Read the data from stdin (read data coming from PC)
        data = sys.stdin.readline().decode("utf-8")
        if data == "read":
            reading = sensor_temp.read_u16() * conversion_factor
            temperature = round(27 - (reading - 0.706)/0.001721)
            
            
            sys.stdout.write("received data: " + str(temperature) + "\r")
        else:
            sys.stdout.write("received data: " + data + "\r")
    else:
        led.toggle()
