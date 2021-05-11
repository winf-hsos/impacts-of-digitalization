/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.2 a) Read the temperature");

// Create a global variable to store the found devices
var devices;
var temperatureSensor;

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
}

function startReadingTemperature() {
    writeLog("Start to read the temperature.")
    temperatureSensor.listen(temperatureChanged);
    temperatureSensor.setCallbackInterval(5000);
}

function temperatureChanged(event) {
    var temperature = event.getValue("temperature");

    // If the value is a humidity value, then getValue() returns null
    if(temperature !== null) {
        writeLog(temperature);
    }
}