/* global log, getInput */
log("Solution for exercise 1.1 c)");

function add() {
    // Get the values from both input fields
    var numberA = getInput("theNumberA");
    var numberB = getInput("theNumberB");

    log("I will perform this calculation: " + numberA + " + " + numberB);

    var sum = numberA + numberB;
    log("The result is: " + sum);
}