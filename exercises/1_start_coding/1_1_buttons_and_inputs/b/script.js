/* global writeLog, getInput */
writeLog("Solution for exercise 1.1 b)");

function checkOddOrEven() {
    // Get the value from the input field
    var number = getInput("theNumber");

    writeLog("You entered the following number: " + number);

    // Check if the number is odd or even
    if (number % 2 === 0) {
        writeLog("The number is even.");
    }
    else {
        writeLog("The number is odd.");
    }
}