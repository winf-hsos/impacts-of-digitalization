// We define global variables at the top of the program
var devices;
var led;

// All lines of code are executed once when the website is loaded
log("Welcome to Lesson 1.1: Connect to Devices. Follow the instructions below.");
showInstructions();

// This function is called when then button "Show Instructions" is pressed
function showInstructions() {
    log("Please connect your IoT development kit to your computer via USB and hit 'Establish Connection'!");
}

// This function is called when the button "Establish Connection" is pressed
function connect() {
    log("I am now trying to connect to your devices...");
    tf.initDevices(initDone);
}

// This function is called when the devices are initialized
function initDone(newDevices) {
    devices = newDevices;
    var numberDevices = devices.length;

    if (numberDevices > 0) {
        log("Great work! I found >" + newDevices.length + "< devices!")
    }
    else {
        log("Uggh, something went wrong. I didn't detect any devices!");
    }

    // Get the RGB LED (device identifier = 271)
    led = devices.getDeviceByIdentifier(271);

    // Set the color of the LED to green
    led.setColor(0, 255, 0);

    // Store the devices on a global variable, so that we can access them from anywhere
    devices = newDevices;
}