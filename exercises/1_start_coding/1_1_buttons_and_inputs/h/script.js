/* global writeLog, getInput */
writeLog("Solution for exercise 1.1 h)");

function setHeader() {
    // Get the text for the header from the input field
    var text = getInput("headerText");

    // Set the h1's text
    document.querySelector("h1").textContent = text;
       
    // Clear the input field
    document.getElementById("headerText").value = "";
}