import serial
import time


s = serial.Serial(port="/dev/ttyACM0", parity=serial.PARITY_EVEN, stopbits=serial.STOPBITS_ONE, timeout=1)
s.flush()

s.write("read-temp\r".encode())
mes = s.readline().strip()
print(mes)

s.close()