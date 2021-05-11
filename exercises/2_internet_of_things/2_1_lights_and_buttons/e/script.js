/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.1 e) Hardware button toggles the LED");

// Create a global variable to store the found devices
var devices;
var led;
var button;

// We'll use this variable to remember the LED state 
var ledIsOn;

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

    // Turn both LEDs off initially
    led.off();
    // Remember the LED's state
    ledIsOn = false;

    button.off();

    // Get notified when the button is pressedn
    button.registerListener(buttonPressed);
}

function buttonPressed(buttonEvent) {
    var buttonState = buttonEvent.getValue("button_state");

    // When the state is RELEASED, the button must have been pressed before
    if (buttonState === "RELEASED") {
        if (ledIsOn) {
            led.off();
            ledIsOn = false;
            writeLog("Turned LED off.");
        }
        else {
            led.setColor(0, 0, 255);
            ledIsOn = true;
            writeLog("Turned LED on.")
        }
    }
}