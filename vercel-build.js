const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build...');
console.log('Environment:', process.env.NODE_ENV);

// Ensure all game directories exist and have the necessary files
const gameDirs = [
  'mines', 'ball', 'bomb', 'chicken', 'coinios', 'coinother', 'dice', 'footx', 'goal', 'jet',
  'mimines', 'minesind', 'nmines', 'penalty', 'penalty1w', 'queen', 'royal', 'speed', 'towers', 'turboD',
  'avi', 'ast', 'ba', 'brawl', 'chi', 'cra', 'ho', 'met', 'tro', 'BURJRX', 'COLOR'
];

// Create directories if they don't exist
gameDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

console.log('Vercel build completed successfully!');
console.log('Build complete!');
