// Чистый скрипт игры Balloon Predictor

// Объявление переменных для элементов игры
let ballImage;
let betDisplay;
let startButton;
let restartButton;
let bettingPanel;
let currencyRub;
let currencyUsd;
let currencyInr;
let betAmount;
let confirmButton;

// Переменные для игры
let currency = '₽'; // По умолчанию рубль
let bet = 100; // Стандартная ставка
let currentMultiplier = 1.00;
let animationInterval;
let isGameRunning = false;
let maxMultiplier = 1.00;

// Инициализация элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы после загрузки DOM
    ballImage = document.getElementById('ball');
    betDisplay = document.getElementById('betDisplay');
    startButton = document.getElementById('startButton');
    restartButton = document.getElementById('restartButton');
    bettingPanel = document.getElementById('bettingPanel');
    currencyRub = document.getElementById('currencyRub');
    currencyUsd = document.getElementById('currencyUsd');
    currencyInr = document.getElementById('currencyInr');
    betAmount = document.getElementById('betAmount');
    confirmButton = document.getElementById('confirmButton');
    
    createStars();
    setupEventListeners();
    addAnimationStyles();
    
    // Установка значений по умолчанию
    if (currencyRub) currencyRub.checked = true;
    if (betAmount) betAmount.value = '100';
    if (confirmButton) confirmButton.disabled = false;
});

// Создание звезд для фона
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайные позиции и размеры
        const size = Math.random() * 3 + 1; // 1-4px
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5; // 0-5s задержка анимации
        const duration = Math.random() * 3 + 2; // 2-5s продолжительность анимации
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Проверка, что элементы существуют, прежде чем назначать им обработчики
    
    // Кнопка Старт
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Сразу запускаем игру без панели ставок для демо
            bet = 100; // Фиксированная ставка
            startGame();
        });
    }
    
    // Выбор валюты
    if (currencyRub) currencyRub.addEventListener('change', updateCurrency);
    if (currencyUsd) currencyUsd.addEventListener('change', updateCurrency);
    if (currencyInr) currencyInr.addEventListener('change', updateCurrency);
    
    // Ввод суммы ставки
    if (betAmount) {
        betAmount.addEventListener('input', function() {
            if (confirmButton) {
                confirmButton.disabled = betAmount.value.trim() === '' || parseFloat(betAmount.value) <= 0;
            }
        });
    }
    
    // Кнопка Подтвердить
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            bet = parseFloat(betAmount.value);
            startGame();
        });
    }
    
    // Кнопка Рестарт
    if (restartButton) {
        restartButton.addEventListener('click', resetGame);
    }
}

// Обновление выбранной валюты
function updateCurrency() {
    if (currencyRub && currencyRub.checked) currency = '₽';
    else if (currencyUsd && currencyUsd.checked) currency = '$';
    else if (currencyInr && currencyInr.checked) currency = '₹';
    
    updateBetDisplay();
}

// Обновление отображения ставки
function updateBetDisplay() {
    if (betDisplay) {
        betDisplay.textContent = `${currency}${(bet * currentMultiplier).toFixed(2)}`;
    }
}

// Запуск игры
function startGame() {
    if (isGameRunning || !ballImage || !betDisplay) return;
    
    isGameRunning = true;
    
    // Скрыть панель ставок и показать дисплей ставки
    if (bettingPanel) bettingPanel.style.display = 'none';
    if (startButton) startButton.style.display = 'none';
    if (betDisplay) betDisplay.style.opacity = '1';
    
    // Генерация случайного максимального множителя
    maxMultiplier = (Math.random() * 9 + 1).toFixed(2); // 1.00-10.00
    
    // Анимация роста множителя
    let startTime = Date.now();
    let initialScale = 1.0;
    let maxScale = 1.8; // Максимальный размер шара
    
    // Случайная длительность анимации
    let animationDuration = Math.random() * 2000 + 2000; // 2-4 секунды
    
    animationInterval = setInterval(function() {
        let elapsed = Date.now() - startTime;
        let progress = elapsed / animationDuration;
        
        if (progress >= 1) {
            clearInterval(animationInterval);
            endGame();
            return;
        }
        
        // Расчет текущего множителя и размера
        currentMultiplier = 1 + (maxMultiplier - 1) * progress;
        let scale = initialScale + (maxScale - initialScale) * progress;
        
        // Обновление размера шара и суммы
        if (ballImage) ballImage.style.transform = `scale(${scale})`;
        updateBetDisplay();
        
        // Дрожание шара при высоких множителях
        if (currentMultiplier > 5 && ballImage) {
            let shake = (Math.random() - 0.5) * 10 * (currentMultiplier / 10);
            ballImage.style.transform = `scale(${scale}) translateX(${shake}px)`;
        }
    }, 50);
}

// Завершение игры
function endGame() {
    // Округление итогового множителя
    currentMultiplier = parseFloat(maxMultiplier);
    updateBetDisplay();
    
    // Отображение кнопки рестарта
    if (restartButton) restartButton.style.display = 'block';
    
    // Добавление эффекта итогового результата
    if (betDisplay) betDisplay.classList.add('pulse');
    
    // Имитация лопнувшего шара, если множитель большой
    if (currentMultiplier > 7 && ballImage) {
        ballImage.classList.add('burst');
    }
}

// Сброс игры
function resetGame() {
    isGameRunning = false;
    currentMultiplier = 1.00;
    
    if (betDisplay) betDisplay.style.opacity = '0';
    if (restartButton) restartButton.style.display = 'none';
    if (startButton) startButton.style.display = 'block';
    
    // Сброс стилей и классов
    if (ballImage) {
        ballImage.style.transform = 'scale(1)';
        ballImage.classList.remove('burst');
    }
    if (betDisplay) betDisplay.classList.remove('pulse');
}

// Добавление стилей анимаций, если их нет в CSS
function addAnimationStyles() {
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .pulse {
                animation: pulse 0.5s infinite alternate;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.2); }
            }
            
            .burst {
                animation: burst 0.5s forwards;
            }
            
            @keyframes burst {
                0% { transform: scale(1.8); }
                50% { transform: scale(2.2); opacity: 0.7; }
                100% { transform: scale(0.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Случайное число в заданном диапазоне
function getRandomNumber(min, max) {
    return min + Math.random() * (max - min);
}
