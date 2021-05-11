/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.1 c) Initialize LEDs on startup");

// Create a global variable to store the found devices
var devices;
var led;
var button;

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

    // Get the LED button
    button = devices.getDeviceByIdentifier(282);

    // Turn the LED off initially
    led.off();

    // Set the button's LED to white
    button.white();

    writeLog("LED is off and button is white!")
}