// Скрипт для добавления back-fix.js во все игры
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

// Содержимое скрипта для вставки
const scriptContent = `
<script>
// Скрипт для исправления кнопок "назад"
document.addEventListener('DOMContentLoaded', function() {
    // Функция для перехвата клика и перенаправления на главное меню
    function redirectToMainMenu(e) {
        if (e) e.preventDefault();
        window.location.href = '../index.html';
        return false;
    }

    // Находим все кнопки/ссылки, которые могут вести на GitHub Pages или назад
    const backButtons = document.querySelectorAll(
        'a[href*="github.io"], a[href*="back"], a[href="/"], a[href="./"], a[href="../"], ' +
        'button.back, .back-button, .btn-back, .back, .home-button, .menu-button, ' +
        'a.back, a.home, a.menu, button[data-action="back"], [aria-label="Back"], ' +
        '[aria-label="Home"], [aria-label="Menu"], .header__back, .header-back'
    );
    
    // Изменяем их URL на наше меню
    backButtons.forEach(function(button) {
        button.addEventListener('click', redirectToMainMenu);
        // Также заменяем href атрибут, если это ссылка
        if (button.tagName.toLowerCase() === 'a') {
            button.href = '../index.html';
        }
    });
    
    // Добавляем обработчик для кнопок с обработчиками onclick
    const allButtons = document.querySelectorAll('button, a, div, span');
    allButtons.forEach(function(button) {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr && (
            onclickAttr.includes('back') || 
            onclickAttr.includes('home') || 
            onclickAttr.includes('menu') || 
            onclickAttr.includes('return') || 
            onclickAttr.includes('exit')
        )) {
            button.onclick = redirectToMainMenu;
        }
    });

    // Обработка клавиш навигации
    window.addEventListener('keydown', function(e) {
        // Обработка клавиши Escape (Esc)
        if (e.key === 'Escape') {
            redirectToMainMenu();
        }
    });

    // Перехватываем нажатие на кнопку назад в браузере
    window.addEventListener('popstate', function() {
        redirectToMainMenu();
        // Предотвращаем дальнейшую навигацию назад
        history.pushState(null, document.title, window.location.href);
    });

    // Добавляем запись в историю, чтобы можно было перехватить нажатие кнопки назад
    history.pushState(null, document.title, window.location.href);
});

// Запускаем скрипт сразу и повторно через небольшую задержку, чтобы перехватить динамически добавленные элементы
setTimeout(function() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}, 1000);
</script>
`;

// Функция для обработки HTML файла
function processHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Проверяем, есть ли уже наш скрипт в файле
        if (content.includes('// Скрипт для исправления кнопок "назад"')) {
            console.log(`Скрипт уже добавлен в ${filePath}`);
            return;
        }
        
        // Вставляем скрипт перед закрывающим тегом </body>
        if (content.includes('</body>')) {
            content = content.replace('</body>', scriptContent + '</body>');
        } 
        // Если нет тега </body>, вставляем перед </html>
        else if (content.includes('</html>')) {
            content = content.replace('</html>', scriptContent + '</html>');
        } 
        // Если нет ни того, ни другого, добавляем в конец файла
        else {
            content += scriptContent;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Скрипт добавлен в ${filePath}`);
    } catch (err) {
        console.error(`Ошибка при обработке файла ${filePath}:`, err);
    }
}

// Функция для рекурсивного поиска HTML файлов в директории
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
