import select
import sys
import utime
from machine import ADC

# Set up the poll object
poll_obj = select.poll()
poll_obj.register(sys.stdin, select.POLLIN)

sensor_temp = ADC(4)
conversion_factor = 3.3 / (65535)

# Loop indefinitely
while True:
    # Wait for input on stdin
    poll_results = poll_obj.poll(1) # the '1' is how long it will wait for message before looping again (in microseconds)
    if poll_results:
        # Read the data from stdin (read data coming from PC)
        data = sys.stdin.readline().strip()
        if data == "read-temp":
            reading = sensor_temp.read_u16() * conversion_factor
            temperature = str(round(27 - (reading - 0.706)/0.001721, 2))
        
        sys.stdout.write("%s" % temperature)
    else:
        # do something if no message received (like feed a watchdog timer)
        continue
