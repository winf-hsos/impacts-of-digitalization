/* global log, getInput, tf */
log("Solution for exercise 2.3 c) Control the heat with the hardware button");

// Create a global variable to store the found devices
var devices;
var oled;
var sensor;
var btn;

var currentTemperature = 20;
var currentHumidity = 50;

var timeButtonPressedStart;

// A variable to remember, which action is currently active (1 = Turn down heat)
var currentActionIndex = 1;

// A variable to store the current heat level
var heatLevel = 5;

// Initialite connected devices
tf.initDevices(initDone);

// Call this when all connections are established
function initDone(connectedDevices) {

    if (connectedDevices.length === 0) {
        log("Oops, didn't find any devices! Make sure they are connected and refresh this page!");
    }

    // Store the devices on the global variable
    devices = connectedDevices;

    // Get the OLED display
    oled = devices.getDeviceByIdentifier(263);

    // Get the temperature/humidity sensor
    sensor = devices.getDeviceByIdentifier(283);

    // Get the button
    btn = devices.getDeviceByIdentifier(282);

    // Print the welcome message
    printWelcome();

    // Wait 1 second before registering the listener
    // More info here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
    setTimeout(() => {
        oled.clearDisplay();
        sensor.registerListener(sensorChanged);
        btn.registerListener(buttonChanged);
        printActionMenu();
        printHeatLevel();
    }, 1000);
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

function buttonChanged(event) {
    var eventType = event.getValue();

    if (eventType === "PRESSED") {
        // Remeber the time
        timeButtonPressedStart = new Date();
    }

    if (eventType === "RELEASED") {

        // Check whether the user pressed for 1/2 second or longer
        var durationButtonPressed = new Date() - timeButtonPressedStart;

        // Perform the action
        if (durationButtonPressed >= 500) {
            log("Performing action!");

            // Turn down heat
            if (currentActionIndex === 1) {
                heatLevel = heatLevel - (heatLevel === 0 ? 0 : 1);
            }
            else if (currentActionIndex === 2) {
                heatLevel = heatLevel + (heatLevel === 10 ? 0 : 1);
            }
       
            printHeatLevel();
        }
        // Navigate through the actions
        else {
            currentActionIndex++;

            if (currentActionIndex > 2)
                currentActionIndex = 1;

            // Update the display
            printActionMenu();
        }
    }
}

// The welcome message is in it own function now
function printWelcome() {
    var welcomeMessage = "Welcome to my application!"
    oled.clearDisplay();
    oled.write(0, 0, welcomeMessage);
    log(welcomeMessage);
}

// This functions takes care of printing the actions
function printActionMenu() {

    oled.write(4, 0, "  Turn down heat");
    oled.write(5, 0, "  Turn up heat");

    // Print the ">" symbol in the right line
    oled.write(currentActionIndex + 3, 0, ">");
}

function printHeatLevel() {
    oled.clearLine(7);
    for (var i = 0; i < heatLevel; i++) {
        oled.write(7, i, "|");
    }
}