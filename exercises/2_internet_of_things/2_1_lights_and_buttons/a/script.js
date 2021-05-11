/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.1 a) Light up the LED");

// Create a global variable to store the found devices
var devices;
var led;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        writeLog("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the LED light
    led = devices.getDeviceByIdentifier(271);
}

function green() {
    // Set the LED to green
    led.setColor(0, 255, 0);
    writeLog("LED should now be green!")
}

function setColor() {
    // Get the value from the color's input field
    var hex = getInput("hexColor");

    // Remove the hashtag if present
    hex = hex.replace("#", "");
    var rgb = [(x = parseInt(hex, 16)) >> 16 & 255, x >> 8 & 255, x & 255];

    // Set the color of the LED
    led.setColor(rgb[0], rgb[1], rgb[2]);

    writeLog("I set the color to R = " + rgb[0] + ", G = " + rgb[1] + ", B = " + rgb[2]);
}