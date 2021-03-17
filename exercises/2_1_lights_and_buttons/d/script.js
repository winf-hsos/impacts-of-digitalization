/* global log, getInput, tf */
log("Solution for exercise 2.1 d) Hardware button activates the LED");

// Create a global variable to store the found devices
var devices;
var led;
var button;

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

    // Get the LED button
    button = devices.getDeviceByIdentifier(282);

    // Turn both LEDs off initially
    led.off();
    button.off();

    // Get notified when the button is pressedn
    button.registerListener(buttonPressed);
}

function buttonPressed(buttonEvent) {
    var buttonState = buttonEvent.getValue("button_state");
    
    // See what this object looks like
    log(buttonState);

    // When the state is RELEASED, the button must have been pressed before
    if(buttonState === "RELEASED") {
        led.setColor(0, 0, 255);
    }
}