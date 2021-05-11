/* global writeLog, getInput */
writeLog("Solution for exercise 1.1 f)");

function calculate() {
    // Get the radius from the user
    var radius = getInput("radius");

    // Make it a number
    radius = parseFloat(radius);

    // Check whether the parsing was successful
    if (isNaN(radius)) {
        writeLog("Ooops, the radius must be a number! This isn't a number: " + getInput("radius"));
    } else if (radius <= 0) {
        writeLog("Ooops, the radius must be a greater than 0!");
    } else {

        writeLog("You entered the following radius: " + radius);

        var area = calculateArea(radius);
        var circumference = calculateCircumference(radius);

        writeLog("The area is: " + area.toFixed(2));
        writeLog("The circumference is: " + circumference.toFixed(2));
    }

    // Clear the input field
    document.getElementById("radius").value = "";

}

// A function to calculate the area
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

// A function to calculate the circumference
function calculateCircumference(radius) {
    return 2 * Math.PI * radius;
}