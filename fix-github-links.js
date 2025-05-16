// Скрипт для замены всех ссылок на GitHub Pages на ссылки на локальное меню
const fs = require('fs');
const path = require('path');

// Список директорий с играми
const gameDirs = [
    'mines', 'nmines', 'royal', 'jet', 'penalty', 'mimines', 'brawl', 
    'avi', 'footx', 'coinios', 'coinother', 'queen', 'tro', 'cra', 
    'bomb', 'ball', 'met', 'goal', 'ast', 'COLOR', 'turboD', 'chi', 
    'BURJRX', 'speed', 'minesind', 'dice', 'penalty1w', 'ho', 
    'chicken', 'ba', 'towers'
];

// Путь к директории WebApp-Updated
const baseDir = __dirname;

// Шаблоны GitHub Pages URL, которые нужно заменить
const githubPatterns = [
    'github.io',
    'volneer.github.io',
    'alisamb.github.io',
    'owncoderchik.github.io',
    'ifckmyopps1.github.io',
    'sinyalmines.github.io'
];

// Функция для обработки JavaScript файлов
function processJsFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Заменяем все URL на GitHub Pages на локальное меню
        for (const pattern of githubPatterns) {
            if (content.includes(pattern)) {
                // Заменяем различные варианты URL на GitHub Pages
                content = content.replace(
                    new RegExp(`(["'\\(])https?:\\/\\/[^"'\\)]*${pattern}[^"'\\)]*["'\\)]`, 'g'), 
                    '$1../index.html$2'
                );
                content = content.replace(
                    new RegExp(`window\\.location(?:\\.href)?\\s*=\\s*["'][^"']*${pattern}[^"']*["']`, 'g'),
                    'window.location.href = "../index.html"'
                );
                content = content.replace(
                    new RegExp(`location(?:\\.href)?\\s*=\\s*["'][^"']*${pattern}[^"']*["']`, 'g'),
                    'location.href = "../index.html"'
                );
                content = content.replace(
                    new RegExp(`onclick\\s*=\\s*["'][^"']*${pattern}[^"']*["']`, 'g'),
                    'onclick="window.location.href=\'../index.html\'"'
                );
                modified = true;
            }
        }
        
        // Также заменяем любые другие возвраты на главную страницу
        if (content.includes('location.href = "/"') || content.includes('location.href="/"')) {
            content = content.replace(/location\.href\s*=\s*["']\/["']/g, 'location.href = "../index.html"');
            modified = true;
        }
        
        if (content.includes('location.href = "./"') || content.includes('location.href="./"')) {
            content = content.replace(/location\.href\s*=\s*["']\.\/(["'])/g, 'location.href = "../index.html$1');
            modified = true;
        }
        
        if (content.includes('location.href = "../"') || content.includes('location.href="../"')) {
            content = content.replace(/location\.href\s*=\s*["']\.\.\/(["'])/g, 'location.href = "../index.html$1');
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Исправлены ссылки в файле ${filePath}`);
        }
    } catch (err) {
        console.error(`Ошибка при обработке файла ${filePath}:`, err);
    }
}

// Функция для обработки HTML файлов
function processHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Заменяем все URL на GitHub Pages на локальное меню
        for (const pattern of githubPatterns) {
            if (content.includes(pattern)) {
                // Заменяем различные варианты URL на GitHub Pages в атрибутах href и onclick
                content = content.replace(
                    new RegExp(`href\\s*=\\s*["']https?:\\/\\/[^"']*${pattern}[^"']*["']`, 'g'), 
                    'href="../index.html"'
                );
                content = content.replace(
                    new RegExp(`onclick\\s*=\\s*["'][^"']*https?:\\/\\/[^"']*${pattern}[^"']*["']`, 'g'),
                    'onclick="window.location.href=\'../index.html\'"'
                );
                modified = true;
            }
        }
        
        // Также заменяем любые другие возвраты на главную страницу
        if (content.includes('href="/"') || content.includes('href = "/"')) {
            content = content.replace(/href\s*=\s*["']\/["']/g, 'href="../index.html"');
            modified = true;
        }
        
        if (content.includes('href="./"') || content.includes('href = "./"')) {
            content = content.replace(/href\s*=\s*["']\.\/(["'])/g, 'href="../index.html$1');
            modified = true;
        }
        
        if (content.includes('href="../"') || content.includes('href = "../"')) {
            content = content.replace(/href\s*=\s*["']\.\.\/(["'])/g, 'href="../index.html$1');
            modified = true;
        }
        
        // Заменяем скрипты, которые могут перенаправлять на GitHub Pages
        if (content.includes('window.location') || content.includes('location.href')) {
            // Заменяем перенаправления на корневой каталог
            content = content.replace(/window\.location(?:\.href)?\s*=\s*["']\/["']/g, 'window.location.href = "../index.html"');
            content = content.replace(/location(?:\.href)?\s*=\s*["']\/["']/g, 'location.href = "../index.html"');
            
            // Заменяем перенаправления на текущий каталог
            content = content.replace(/window\.location(?:\.href)?\s*=\s*["']\.\/(["'])/g, 'window.location.href = "../index.html$1');
            content = content.replace(/location(?:\.href)?\s*=\s*["']\.\/(["'])/g, 'location.href = "../index.html$1');
            
            // Заменяем перенаправления на родительский каталог
            content = content.replace(/window\.location(?:\.href)?\s*=\s*["']\.\.\/(["'])/g, 'window.location.href = "../index.html$1');
            content = content.replace(/location(?:\.href)?\s*=\s*["']\.\.\/(["'])/g, 'location.href = "../index.html$1');
            
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Исправлены ссылки в файле ${filePath}`);
        }
    } catch (err) {
        console.error(`Ошибка при обработке файла ${filePath}:`, err);
    }
}

// Функция для рекурсивного поиска файлов в директории
function processDirectory(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                processDirectory(filePath);
            } else if (file.endsWith('.html')) {
                processHtmlFile(filePath);
            } else if (file.endsWith('.js')) {
                processJsFile(filePath);
            }
        }
    } catch (err) {
        console.error(`Ошибка при обработке директории ${dirPath}:`, err);
    }
}

// Обрабатываем каждую директорию с играми
for (const gameDir of gameDirs) {
    const gamePath = path.join(baseDir, gameDir);
    if (fs.existsSync(gamePath)) {
        console.log(`Обработка директории ${gameDir}...`);
        processDirectory(gamePath);
    } else {
        console.log(`Директория ${gameDir} не найдена`);
    }
}

console.log('Обработка завершена');
