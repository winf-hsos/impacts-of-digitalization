/* global writeLog, getInput */
writeLog("Solution for exercise 1.1 f)");

function power() {
    // Get the base from the input field
    var base = getInput("base");
    var exponent = getInput("exponent");
   
    // Make it numbers
    base = parseFloat(base);
    exponent = parseFloat(exponent);

    // If base or exponent is not a number, exit
    if(isNaN(base) || isNaN(exponent)) {
        writeLog("Ooop, one of the two isn't a number!")
        return;
    }

    var result = Math.pow(base, exponent);

    writeLog(base + " to the power of " + exponent + " is " + result.toFixed(2));
    
    // Clear the input fields
    document.getElementById("base").value = "";
    document.getElementById("exponent").value = "";
}