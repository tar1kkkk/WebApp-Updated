// Чистый скрипт игры Ba Ballon

// Элементы игры
const balloon = document.querySelector('.balloon');
const valueDisplay = document.querySelector('.balloon .value');
const predictButton = document.getElementById('predictButton');
const gameContainer = document.querySelector('.game-container');
const stars = document.querySelector('.stars');
const meteors = document.querySelectorAll('.meteor');
const saturn = document.querySelector('.saturn');

// Массив возможных значений множителя
const multipliers = [
    1.00, 1.15, 1.30, 1.45, 1.60, 1.75, 1.90, 2.05, 2.20, 2.35,
    2.50, 2.65, 2.80, 2.95, 3.10, 3.25, 3.40, 3.55, 3.70, 3.85, 
    4.00, 4.50, 5.00, 5.50, 6.00, 7.00, 8.00, 9.00, 10.00
];

// Звуки
const riseSound = new Audio();
riseSound.volume = 0.5;

// Переменные игры
let isAnimating = false;
let currentSize = 1;
let currentMultiplier = 1.00;
let targetMultiplier = 1.00;
let interval;
let saturnInterval;

// Функция запуска анимации случайных метеоров
function createRandomMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    const randomTop = 15 + (Math.random() * 70);
    const randomLeft = 5 + (Math.random() * 90);
    
    meteor.style.top = randomTop + '%';
    meteor.style.left = randomLeft + '%';
    meteor.style.opacity = '1';
    
    document.querySelector('.space-elements').appendChild(meteor);
    
    setTimeout(() => {
        meteor.remove();
        createRandomMeteor();
    }, 4000);
}

// Функция движения Сатурна
function moveSaturn() {
    saturn.style.opacity = '0';
    
    setTimeout(() => {
        const randomTop = 15 + (Math.random() * 70);
        const randomLeft = 10 + (Math.random() * 80);
        
        saturn.style.left = randomTop + '%';
        saturn.style.top = randomLeft + '%';
        saturn.style.opacity = '1';
    }, 2000);
}

// Запуск движения Сатурна
function startSaturnMovement() {
    if (saturnInterval) {
        clearInterval(saturnInterval);
    }
    
    const randomDelay = 8000 + (Math.random() * 10000);
    saturnInterval = setInterval(moveSaturn, randomDelay);
}

// Получение случайного множителя
function getRandomMultiplier() {
    return (0.19 + (Math.random() * 0.8)).toFixed(2);
}

// Функция обновления состояния шара
function updateBalloon(multiplier) {
    valueDisplay.textContent = parseFloat(multiplier).toFixed(2) + 'x';
    
    const minScale = 1;
    const maxScale = 1.8;
    const progress = (multiplier - 1) / 9;
    
    const scale = minScale + ((maxScale - minScale) * progress);
    const minRotation = 0;
    const rotation = -(15 * progress);
    
    balloon.style.setProperty('--scale', scale);
    balloon.style.transform = `scale(${scale}) rotate(${rotation}%)`;
    balloon.style.filter = `brightness(${scale.toFixed(2)})`;
    
    balloon.classList.remove('danger');
    gameContainer.classList.remove('danger');
    
    if (multiplier > 3) {
        balloon.classList.add('danger');
        gameContainer.classList.add('danger');
    }
    
    if (multiplier > 4) {
        const brightness = 1 + ((multiplier - 4) / 10);
        saturn.style.filter = `brightness(${brightness}))`;
    }
}

// Сброс состояния шара
function resetBalloon() {
    updateBalloon(1.00);
    isAnimating = false;
}

// Обработчик клика на кнопку предсказания
predictButton.addEventListener('click', function() {
    if (isAnimating) return;
    
    isAnimating = true;
    predictButton.disabled = true;
    targetMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    
    // Можно добавить эффекты и анимации начала игры
    startSaturnMovement();
    createRandomMeteor();
    
    // Анимируем увеличение множителя
    let startValue = 1.00;
    let animationDuration = 3000; // 3 секунды анимации
    let startTime = Date.now();
    
    function animate() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        
        // Используем кубическую функцию для эффекта замедления
        const easedProgress = progress < 0.5 ?
            4 * progress * progress * progress :
            1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentValue = startValue + (targetMultiplier - startValue) * easedProgress;
        updateBalloon(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Анимация завершена
            setTimeout(() => {
                isAnimating = false;
                predictButton.disabled = false;
            }, 1000);
        }
    }
    
    animate();
});

// Инициализация
resetBalloon();
createRandomMeteor();
startSaturnMovement();
