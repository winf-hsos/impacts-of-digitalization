/* global log, getInput */
log("Solution for exercise 1.1 b)");

function checkOddOrEven() {
    // Get the value from the input field
    var number = getInput("theNumber");

    log("You entered the following number: " + number);

    // Check if the number is odd or even
    if (number % 2 === 0) {
        log("The number is even.");
    }
    else {
        log("The number is odd.");
    }
}