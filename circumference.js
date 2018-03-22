console.log("Welcome to the circumference calculator!");

function calculateCircumference(radius) {
    if (radius <= 0) {
        console.log("Please input a useful radius");
        return null;
    }

    return radius * 2 * Math.PI;
}

for (var radius = 1; radius <= 100; radius++) {
    var circumference = calculateCircumference(radius);
    console.log("Circumference for radius " + radius + " is: " + circumference);
}