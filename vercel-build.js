const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Copy shared resources to each game directory
const sharedResources = [
  '1win.svg',
  'fon.png',
  'game.png',
  'images/'
];

// Function to copy files recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy shared resources to each game directory
gameDirs.forEach(dir => {
  sharedResources.forEach(resource => {
    const srcPath = path.join(process.cwd(), resource);
    const destPath = path.join(process.cwd(), dir, resource);
    
    try {
      if (fs.existsSync(srcPath)) {
        copyRecursiveSync(srcPath, destPath);
        console.log(`Copied ${resource} to ${dir}`);
      }
    } catch (error) {
      console.error(`Error copying ${resource} to ${dir}:`, error);
    }
  });
});

console.log('Build completed successfully!');

console.log('Build complete!');
