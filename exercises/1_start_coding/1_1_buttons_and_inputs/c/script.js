/* global writeLog, getInput */
log("Solution for exercise 1.1 c)");

function add() {
    // Get the values from both input fields
    var numberA = getInput("theNumberA");
    var numberB = getInput("theNumberB");

    writeLog("I will perform this calculation: " + numberA + " + " + numberB);

    var sum = parseFloat(numberA) + parseFloat(numberB);
    writeLog("The result is: " + sum);
}