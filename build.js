const fs = require('fs');

// Read the input HTML template
const template = fs.readFileSync('assets/script.js', 'utf-8');

// Replace the placeholder with the environment variable
const outputHtml = template.replace('PLACEHOLDER_WORKER_URL', process.env.WORKER_URL);

// Write the processed HTML to the output file
fs.writeFileSync('website/script.js', outputHtml);

console.log('Build completed!');