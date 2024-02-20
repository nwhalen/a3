const fs = require('fs');

// Function to generate random data
function generateRandomData(numDataPoints, maxValue) {
    const data = [];
    for (let i = 0; i < numDataPoints; i++) {
        data.push({
            name: String.fromCharCode(65 + i), // Convert ASCII code to alphabet characters (A, B, C, ...)
            value: Math.floor(Math.random() * (maxValue + 1)) // Generate a random integer between 0 and maxValue
        });
    }
    return data;
}

// Load the original config file
const originalConfig = require('./config-cleveland.json'); 
function generateRandomDataForObject(obj) {
    if (obj.parameters && obj.parameters.data) {
        obj.parameters.data = generateRandomData(5, 100); // Modify 'numDataPoints' and 'maxValue' as needed
    }
}

// Loop through baseComponents and generate random data
for (const key in originalConfig.baseComponents) {
    generateRandomDataForObject(originalConfig.baseComponents[key]);
}

// Loop through components and generate random data
for (const key in originalConfig.components) {
    generateRandomDataForObject(originalConfig.components[key]);
}

// Write modified config object to JSON file
fs.writeFile('generatedConfig.json', JSON.stringify(originalConfig, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Config file generated successfully.');
    }
});