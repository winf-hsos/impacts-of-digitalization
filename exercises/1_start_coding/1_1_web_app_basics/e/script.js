/* global log, getInput */
log("Solution for exercise 1.1 e)");

function calculate() {

    // A for-loop to repeat the same code n times
    for (var i = 1; i <= 100; i++) {
        var area = calculateArea(i);
        var circumference = calculateCircumference(i);
        log("Radius: " + i + ", area: " + area.toFixed(2) + ", circumference: " + circumference.toFixed(2));
    }
}

// A function to calculate the area
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

// A function to calculate the circumference
function calculateCircumference(radius) {
    return 2 * Math.PI * radius;
}