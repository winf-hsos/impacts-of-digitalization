/* global writeLog, getInput, tf */
writeLog("Solution for exercise 2.3 d) Temperature visualized");

// Create a global variable to store the found devices
var devices;
var oled;
var sensor;

var currentTemperature;

// A list to hold the height of the bars for each tick on the x-axis
var visualizationCoordinates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// The min and max values for the visualization's y-axis
var yMin = 23
var yMax = 26;
var maxHeight = 8;

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
    sensor.registerListener(sensorChanged);
    sensor.setCallbackInterval(2000);
}

function sensorChanged(event) {
    var newTemperature = event.getValue("temperature");

    if (newTemperature !== null) {

        writeLog("New temperature: " + (newTemperature / 100).toFixed(2) + "° C");

        // Calcualte the height of the bar (max is 8)
        var barHeight = Math.min(Math.max(0, Math.round(((newTemperature / 100) - yMin) / (yMax - yMin) * maxHeight)), 8);

        // Update the list of bar lengths
        // shift() remove the first element from a list
        // See more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
        visualizationCoordinates.shift();

        // Append the latest value to the list of bar heights
        visualizationCoordinates[25] = barHeight;

        // Update the visualization on the display
        visualize();
    }
}

function visualize() {
    // Clear the display to start fresh
    oled.clearDisplay();

    // Go through all 26 ticks (bars) on the x-axis
    for (var i = 0; i < visualizationCoordinates.length; i++) {

        // Print a pipe in each column, depending on the height of the bar
        for (var j = 0; j < visualizationCoordinates[i]; j++) {
            oled.write(7 - j, i, "|");
        }
    }
}

function setMinMax() {
    yMin = getInput("minTemp");
    xMax = getInput("maxTemp");

    // Reset chart
    visualizationCoordinates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    writeLog("New min: " + yMin + ", new max: " + xMax);
}