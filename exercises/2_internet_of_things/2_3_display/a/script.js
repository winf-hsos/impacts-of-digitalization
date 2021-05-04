/* global log, getInput, tf */
log("Solution for exercise 2.3 a) Display a welcome message");

// Create a global variable to store the found devices
var devices;
var oled;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        log("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the OLED display
    oled = devices.getDeviceByIdentifier(263);
    
    var welcomeMessage = "Welcome to my application!"

    // Print the string to the display ...
    oled.write(0, 0, welcomeMessage);

    // ... and to the console
    log(welcomeMessage);
}