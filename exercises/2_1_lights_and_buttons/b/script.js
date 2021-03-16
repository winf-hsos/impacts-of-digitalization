/* global log, getInput, tf */
log("Solution for exercise 2.1 a) Light up the LED");

// Create a global variable to store the found devices
var devices;
var led;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        log("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the LED light
    led = devices.getDeviceByIdentifier(271);

    // Turn the LED off initially
    led.off();
}

function blinkRed() {
    // Make sure the LED is off
    led.off();

    // Get the frequency the user entered
    var frequency = getInput("frequency");

    // Make the LED blink red
    led.blink(255, 0, 0, frequency);
    log("LED should blink red at a frequency of >" + frequency + "<!");
}

function stopBlinking() {
    led.off();
}