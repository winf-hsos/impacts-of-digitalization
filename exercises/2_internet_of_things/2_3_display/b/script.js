/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.3 b) Display and update sensor values");

// Create a global variable to store the found devices
var devices;
var oled;
var sensor;

var currentTemperature = 20;
var currentHumidity = 50;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        writeLog("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the OLED display
    oled = devices.getDeviceByIdentifier(263);

    // Get the temperature/humidity sensor
    sensor = devices.getDeviceByIdentifier(283);

    // Print the welcome message
    printWelcome();

    // Wait 5 seconds before registering the listener
    // More info here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
    setTimeout(() => {
        oled.clearDisplay();
        sensor.registerListener(sensorChanged);
    }, 5000);
}

function sensorChanged(event) {
    var newTemperature = event.getValue("temperature");
    var newHumidity = event.getValue("humidity");

    // This is a shortcut for an if..else statement
    currentTemperature = newTemperature === null ? currentTemperature : newTemperature;
    currentHumidity = newHumidity === null ? currentHumidity : newHumidity;

    // Update the display

    oled.write(0, 0, "Temperature: " + (currentTemperature / 100).toFixed(2) + " C");
    oled.write(1, 0, "Humidity   : " + (currentHumidity / 100).toFixed(2) + " %");

}

// The welcome message is in it own function now
function printWelcome() {
    var welcomeMessage = "Welcome to my application!"
    oled.clearDisplay();
    oled.write(0, 0, welcomeMessage);
    writeLog(welcomeMessage);
}