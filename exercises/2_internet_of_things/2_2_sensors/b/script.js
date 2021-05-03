/* global log, getInput, tf */
log("Solution for exercise 2.2 a) Read the temperature");

// Create a global variable to store the found devices
var devices;
var temperatureSensor;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        log("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the humidty sensor (includes temperature)
    temperatureSensor = devices.getDeviceByIdentifier(283);
}

function startReadingTemperatureAndHumidity() {
    log("Start to read the temperature and humidity.")
    temperatureSensor.listen(temperatureOrHumidityChanged);
    temperatureSensor.setCallbackInterval(5000);
}

function temperatureOrHumidityChanged(event) {

    // We know there is only one value per call
    var valueObject = event.values[0];

    // Convert the value into the right scale
    var value = valueObject.value / 100;

    if (valueObject.type === "temperature") {
        log("Temperature: " + value.toFixed(2) +  " °C");
    }
    else if (valueObject.type === "humidity") {
        log("Humidity: " + value.toFixed(2) +  " %");
    }
}