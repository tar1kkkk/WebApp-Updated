const fs = require('fs');
const path = require('path');

const gameFolders = [
    'mines', 'avi', 'footx', 'coinios', 'coinother', 'queen', 'tro', 'cra',
    'bomb', 'ball', 'met', 'goal', 'ast', 'COLOR', 'turboD', 'chi', 'BURJRX',
    'speed', 'jet', 'minesind', 'dice', 'penalty1w', 'ho', 'chicken', 'ba', 'brawl', 'towers'
];

function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Update paths in HTML files
        if (filePath.endsWith('.html')) {
            // Update CSS and JS paths
            content = content.replace(/href=["']\/([^/]+)\/([^"']+)["']/g, 'href="$2"');
            content = content.replace(/src=["']\/([^/]+)\/([^"']+)["']/g, 'src="$2"');
            // Update window.location paths
            content = content.replace(/window\.location\.href\s*=\s*['"]\//g, 'window.location.href="../');
        }
        
        // Update paths in JS files
        if (filePath.endsWith('.js')) {
            content = content.replace(/['"]\/([^/]+)\/([^'"\s]+)['"]/g, (match, p1, p2) => {
                if (p2.startsWith('http')) return match; // Skip external URLs
                return `"${p2}"`;
            });
        }
        
        // Update paths in CSS files
        if (filePath.endsWith('.css')) {
            content = content.replace(/url\(['"]?\/([^/]+)\/([^'"\s)]+)['"]?\)/g, 'url("$2")');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

function processFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.log(`Skipping non-existent folder: ${folderPath}`);
        return;
    }

    const files = fs.readdirSync(folderPath);
    
    files.forEach(file => {
        const fullPath = path.join(folderPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processFolder(fullPath);
        } else if (file.match(/\.(html|js|css)$/i)) {
            updateFile(fullPath);
        }
    });
}

// Process all game folders
gameFolders.forEach(folder => {
    console.log(`\nProcessing folder: ${folder}`);
    processFolder(path.join(__dirname, folder));
});

console.log('\nPath updates complete!');
