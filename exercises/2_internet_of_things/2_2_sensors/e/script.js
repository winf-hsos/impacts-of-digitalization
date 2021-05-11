/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.2 e) Human interaction");

// Create a global variable to store the found devices
var devices;
var temperatureSensor;
var led;
var btn;

// Global variable to remember whether action was taken
var temperatureExceeded = false;

// Create a global variable for the temperatur threshold
// Set initial threshold to 25° C
var temperatureThreshold = 25;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        writeLog("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the humidty sensor (includes temperature)
    temperatureSensor = devices.getDeviceByIdentifier(283);

    // Get notified about temperatures changes
    temperatureSensor.registerListener(temperatureOrHumidityChanged);

    // Get the RGB LED
    led = devices.getDeviceByIdentifier(271);

    // Set the LED off on startup
    led.off();

    // Get the RGB LED button and turn it off
    btn = devices.getDeviceByIdentifier(282);
    btn.off();

    // Get notified when button is pressed
    btn.registerListener(buttonChanged);
}

function setThreshold() {
    temperatureThreshold = getInput("temperatureThreshold");
    writeLog("New threshold: " + temperatureThreshold);
}

// This function is the callback for when the button is PRESSED or RELEASED
function buttonChanged(event) {
    var btnState = event.getValue();
    writeLog(btnState);

    if (btnState === "RELEASED") {
        writeLog("Turning it off")
        led.off();
        btn.off();
    }
}

function temperatureOrHumidityChanged(event) {

    var temperature = event.getValue("temperature");

    // Do nothing if this is not a temperature update (but rather humidity)
    if (temperature == null) {
        return;
    }

    // Format the temperature and add unit
    let temperatureFormatted = (temperature / 100).toFixed(2) + "° C";

    // Get the display element from the HTML via its ID
    var displayElement = document.getElementById("temperatureDisplay");

    // Update the temperature display
    displayElement.textContent = temperatureFormatted;

    // Check if the threshold is exceeded
    if (temperature >= temperatureThreshold * 100) {

        if (!temperatureExceeded) {
            writeLog("Warning: Temperature threshold exceeded: " + temperatureFormatted);

            // Set LED to red
            led.setColor(255, 0, 0);

            // Make the hardware button start blinking white
            btn.blink(255, 255, 255, 500);

            // Make the display's background red
            displayElement.parentElement.classList.remove("alert-success");
            displayElement.parentElement.classList.add("alert-danger");
        }

        // Remember that the temperature is exceeded
        temperatureExceeded = true;
    }
    else {
        led.off();

        // Make the display's background green again
        displayElement.parentElement.classList.remove("alert-danger");
        displayElement.parentElement.classList.add("alert-success");

        // Remember that the temperature is OK again
        temperatureExceeded = false;
    }
}