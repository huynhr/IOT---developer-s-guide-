import time
import numpy as np
import ibmiotf.gateway
from sense_hat import SenseHat
import math


R = [255, 0, 0] # Red
W = [255, 255, 255]  # White
G = [0, 255, 0]  # Green
B = [0, 0, 0] # Black
    
maskLeft = [[],[10],[10,18],[10,18,26],[10,18,26,34],[10,18,26,34,42],[10,18,26,34,42,50],[10,18,26,34,42,50,9],[10,18,26,34,42,50,9,17],[10,18,26,34,42,50,9,17,25]]
maskRight = [[],[14],[14,22],[14,22,30],[14,22,30,38],[14,22,30,38,46],[14,22,30,38,46,54],[14,22,30,38,46,54,13],[14,22,30,38,46,54,13,21],[14,22,30,38,46,54,13,21,29]]


sense = SenseHat()
def getPixelMap(color, number): #not working for negative numbers
    redPlane = np.tile(R,64)
    redPlane.shape = (64,3)

    greenPlane = np.tile(G,64)
    greenPlane.shape = (64,3)

    blackPlane = np.tile(B, 64)
    blackPlane.shape = (64, 3)
    
    if color == "red":
        plane = redPlane
    elif color == "green":
        plane = greenPlane
    elif color == "black":
        plane = blackPlane

    number = math.floor(number)
    if number >= 10:
        leftDigit = int(str(number)[0])
        rightDigit = int(str(number)[1])
        
        plane[maskLeft[leftDigit]] = W
        plane[maskRight[rightDigit]] = W
    
    elif number <=9:
        plane[maskRight[int(number)]] = W

    plane.shape = (64,3)
    return plane.tolist()


client = None

def myCommandCallback(cmd):
    if cmd.command == "display":
        command = cmd.data['screen']
        temp = sense.get_temperature()
        if command == "on":
            # TODO insert your code here
            map = getPixelMap("red", temp)
            sense.set_pixels(map)
        elif command == "off":
            # TODO insert your code here
            map = getPixelMap("green", temp)
            sense.set_pixels(map)

try:
    gatewayOptions = {"org": "eu5rnm", "type": "raspberryGW", "id": "rhraspberrygw1", "auth-method": "token", "auth-token": "passw0rd"}
    gatewayCli = ibmiotf.gateway.Client(gatewayOptions)

    gatewayCli.connect()
    gatewayCli.deviceCommandCallback = myCommandCallback 
    gatewayCli.subscribeToDeviceCommands(deviceType='SenseHat', deviceId='rhsensehat1', command='display',format='json',qos=2)

    while True:
        temp = sense.get_temperature() # TODO insert your code here
        # get 
        myData = { "d" : {"temperature": temp }} # TODO insert your code here
        gatewayCli.publishDeviceEvent("SenseHat", "rhsensehat1", "display", "json", myData, qos=1 )
        time.sleep(5)

except ibmiotf.ConnectionException  as e:
    print(e)

