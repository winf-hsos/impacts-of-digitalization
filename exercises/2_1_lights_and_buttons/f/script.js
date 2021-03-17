/* global log, getInput, tf */
log("Solution for exercise 2.1 f) Random colors");

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

    // When the state is RELEASED, the button must have been pressed before
    if (buttonState === "RELEASED") {

        // Generate an integer random number between 0 and 3
        var r = Math.floor(Math.random() * 4);
        log("The random number is " + r);

        switch (r) {
            case 0:
                led.setColor(0, 255, 0);
                break;
            case 1:
                led.setColor(255, 0, 0);
                break;
            case 2:
                led.setColor(0, 0, 255);
                break;
            case 3:
                led.setColor(255, 127, 0);
                break;
        }
    }
}