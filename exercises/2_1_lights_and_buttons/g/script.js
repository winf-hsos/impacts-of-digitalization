/* global log, getInput, tf */
log("Solution for exercise 2.1 g) Sequence of colors");

// Create a global variable to store the found devices
var devices;
var led;
var button;

// A list with the color sequence
var colorSequence = [
    { "r": 255, "g": 255, "b": 255 },
    { "r": 255, "g": 255, "b": 0 },
    { "r": 0, "g": 255, "b": 0 },
    { "r": 0, "g": 0, "b": 255 },
    { "r": 255, "g": 0, "b": 0 }
]

var index = 0;

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
    if (buttonState.value === "RELEASED") {

        // Get the next color from the sequence
        var nextColor = colorSequence[index];
        log(nextColor);
        led.setColor(nextColor.r, nextColor.g, nextColor.b);

        // Increase the position in the sequence
        index++;

        // Check whether we are at the end of the sequence
        // Start over if yes
        if (index >= colorSequence.length)
            index = 0;
    }
}