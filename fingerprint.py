import micropython
import os, uos, machine, io, ujson, json, time, utime, network, gc, esp, sys, re, binascii
from micropython import const
from machine import Pin, PWM, reset, Timer

FINGERPRINT_OK 					= const(0x00)           #!< Command execution is complete
FINGERPRINT_PACKETRECIEVEERR 	= const(0x01) 			#!< Error when receiving data package
FINGERPRINT_NOFINGER 			= const(0x02)         	#!< No finger on the sensor
FINGERPRINT_IMAGEFAIL 			= const(0x03)       	#!< Failed to enroll the finger
FINGERPRINT_IMAGEMESS           = const(0x06) 			#!< Failed to generate character file due to overly disorderly fingerprint image

FINGERPRINT_FEATUREFAIL         = const(0x07) 			#!< Failed to generate character file due to the lack of character point or small fingerprint image
       											
FINGERPRINT_NOMATCH 			= const(0x08)  			#!< Finger doesn't match
FINGERPRINT_NOTFOUND 			= const(0x09) 			#!< Failed to find matching finger
FINGERPRINT_ENROLLMISMATCH      = const(0x0A) 			#!< Failed to combine the character files
FINGERPRINT_BADLOCATION         = const(0x0B) 			#!< Addressed PageID is beyond the finger library
FINGERPRINT_DBRANGEFAIL         = const(0x0C) 			#!< Error when reading template from library or invalid template

FINGERPRINT_UPLOADFEATUREFAIL 	= const(0x0D) 			#!< Error when uploading template
FINGERPRINT_PACKETRESPONSEFAIL  = const(0x0E) 			#!< Module failed to receive the following data packages
FINGERPRINT_UPLOADFAIL 			= const(0x0F)  			#!< Error when uploading image
FINGERPRINT_DELETEFAIL 			= const(0x10)  			#!< Failed to delete the template
FINGERPRINT_DBCLEARFAIL 		= const(0x11)	 		#!< Failed to clear finger library

FINGERPRINT_PASSFAIL            = const(0x13) 			#!< Find whether the fingerprint passed or failed
FINGERPRINT_INVALIDIMAGE        = const(0x15) 			#!< Failed to generate image because of lac of valid primary image
FINGERPRINT_FLASHERR 			= const(0x18)   		#!< Error when writing flash
FINGERPRINT_INVALIDREG 			= const(0x1A) 			#!< Invalid register number
FINGERPRINT_ADDRCODE 			= const(0x20)   		#!< Address code
FINGERPRINT_PASSVERIFY 			= const(0x21) 			#!< Verify the fingerprint passed

from AS608 import fig

p= -1
SaveResult = -1

def getFingerprintEnroll(id):
    p = 0
    global SaveResult
    #Begin get image
    while p != FINGERPRINT_NOFINGER:
        p = fig.getImage()
        time.sleep(0.5)

    while p != FINGERPRINT_OK:
        time.sleep(0.5)
        p = fig.getImage()
    
    #Image taken
    time.sleep(0.5)     
    p = fig.image2Tz()
    time.sleep(0.5)
    if p != FINGERPRINT_OK:
        SaveResult = 0
        return 0
    
    #Take off your finger
    p = 0
    time.sleep(2)

    while p != FINGERPRINT_NOFINGER:
        p = fig.getImage()
        time.sleep(0.5) 
    #Get image again
    time.sleep(2)

    while p != FINGERPRINT_OK:
        time.sleep(0.5)
        p = fig.getImage()
    #Image 2 taken
    time.sleep(0.5)
    p = fig.image2Tz(2)
    time.sleep(0.5)
    if p != FINGERPRINT_OK:
        SaveResult = 0
        return 0
    
    # Create model
    time.sleep(1)
    p = fig.createModel()
    time.sleep(1)
    if p != FINGERPRINT_OK:
        SaveResult = 0
        return 0

    # Store finger
    time.sleep(1)
    p = fig.storeModel(id)
    time.sleep(1)
    if p != FINGERPRINT_OK:
        SaveResult = 0      
        return 0
    SaveResult = 1
    return 1

def searchFinger():
    p = fig.getImage()
    if p != FINGERPRINT_OK:
        return -1
    
    p = fig.image2Tz(1)
    if p != FINGERPRINT_OK:
        return -1 

    p = fig.search() 
    if p == FINGERPRINT_OK:
        return fig.return_FingerID()
    else:
        return 0
    
def checkFinger():
    global SaveResult
    result = searchFinger()
    time.sleep(0.5)
    if result != -1:
        if result == 0:
            SaveResult = 0
            return 0
        else:
            SaveResult = 1
            return fig.return_FingerID()

def checkID(id):
    if checkFinger() == id:
        return True
    else:
        return False

def getLastSaveResult():
    if SaveResult == 0:
        return 0
    else:
        return 1