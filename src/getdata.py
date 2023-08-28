import serial
import time
import sys

s = serial.Serial(port="/dev/ttyACM0", parity=serial.PARITY_EVEN, stopbits=serial.STOPBITS_ONE, timeout=1)
s.flush()

arg = sys.argv[1]

if arg == "temp":
    s.write("read-temp\r".encode())

mes = s.readline().strip()
print(mes.decode("utf-8"))

s.close()