const fs = require('fs');
const path = require('path');

// Директория с играми
const baseDir = __dirname;

// Функция для проверки HTML-файла на наличие корректных кнопок "назад"
function checkBackButtonsInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Проверяем наличие ссылок на GitHub Pages или другие внешние ресурсы
        const githubRegex = /href=['"]https?:\/\/(danilq1\.github\.io|owncoderchik\.github\.io|alisamb\.github\.io|github\.io)[^'"]*['"]/gi;
        const matches = content.match(githubRegex);
        
        // Проверяем наличие неправильных onclick с location.href
        const onclickRegex = /onclick=['"](?:window\.)?location\.href\s*=\s*["']https?:\/\/[^'"]*["']/gi;
        const onclickMatches = content.match(onclickRegex);
        
        if (matches || onclickMatches) {
            console.log(`\x1b[31mПроблема в файле ${filePath}:\x1b[0m`);
            
            if (matches) {
                console.log('  Найдены ссылки на GitHub Pages:');
                matches.forEach(match => console.log(`    ${match}`));
            }
            
            if (onclickMatches) {
                console.log('  Найдены неправильные onclick с внешними URL:');
                onclickMatches.forEach(match => console.log(`    ${match}`));
            }
            
            return false;
        }
        
        // Проверяем, что есть хотя бы одна ссылка на ../index.html
        const localMenuRegex = /href=['"]\.\.\/index\.html['"]|onclick=['"](?:window\.)?location\.href\s*=\s*['"]\.\.\/index\.html['"]/gi;
        const localMenuMatches = content.match(localMenuRegex);
        
        if (!localMenuMatches) {
            console.log(`\x1b[33mПредупреждение: в файле ${filePath} не найдено ссылок на локальное меню (../index.html)\x1b[0m`);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(`Ошибка при чтении файла ${filePath}:`, error.message);
        return false;
    }
}

// Функция для рекурсивного обхода директорий и проверки HTML-файлов
function checkDirectories(dir) {
    const items = fs.readdirSync(dir);
    let allCorrect = true;
    
    for (const item of items) {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory() && item !== '.git' && item !== 'images') {
            // Проверяем, есть ли в директории index.html
            const indexPath = path.join(itemPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                const isCorrect = checkBackButtonsInFile(indexPath);
                allCorrect = allCorrect && isCorrect;
            }
        }
    }
    
    return allCorrect;
}

console.log('Начинаем проверку кнопок "назад" в HTML-файлах игр...');
const result = checkDirectories(baseDir);

if (result) {
    console.log('\x1b[32mВсе кнопки "назад" настроены правильно!\x1b[0m');
} else {
    console.log('\x1b[31mНайдены проблемы с кнопками "назад". Исправьте указанные файлы.\x1b[0m');
}
