const fs = require('fs');
const path = './dist/your-app-name/index.html'; // replace 'your-app-name' with your actual build folder name

let html = fs.readFileSync(path, 'utf8');
html = html.replace(/<meta name="angular-version" content=".*">/, '');
fs.writeFileSync(path, html);
console.log('Angular version meta tag removed!');
