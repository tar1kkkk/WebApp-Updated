// Чистый скрипт игры Chicken Road

// Получаем необходимые элементы
const chicken = document.getElementById('chicken');
const multipliers = document.querySelectorAll('.multiplier-circle');
const winPopup = document.getElementById('winPopup');
const multiplierValue = document.getElementById('multiplierValue');
const playButton = document.querySelector('.play-btn');
const jumpSound = document.getElementById('jumpSound');
const winSound = document.getElementById('winSound');
const gameArea = document.getElementById('gameArea');

// Значения мультипликаторов
const platformMultipliers = [1.03, 1.07, 1.12, 1.17, 1.23, 1.29, 1.36, 1.44, 1.53, 1.63, 1.75, 1.88, 2.04, 2.22, 2.45, 2.72, 3.06, 3.50, 4.08, 4.90, 6.13, 9.81, 19.44];

// Флаг, указывающий, идет ли игра в данный момент
let gameInProgress = false;

// Функция запуска игры
function startGame() {
    if (gameInProgress) return; // Предотвращаем запуск игры, если она уже идет
    
    gameInProgress = true;
    
    // Выбираем случайный индекс мультипликатора
    let randomIndex = Math.floor(Math.random() * multipliers.length);
    let targetMultiplier = multipliers[randomIndex];
    let multiplierValue = platformMultipliers[randomIndex];
    
    // Устанавливаем стиль для всех мультипликаторов, делая их невыделенными
    multipliers.forEach(multiplier => {
        multiplier.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    // Выделяем целевой мультипликатор
    targetMultiplier.style.backgroundColor = '#ffcc00';
    
    // Перемещаем цыпленка к выбранному мультипликатору
    chicken.style.bottom = targetMultiplier.offsetTop + 'px';
    chicken.style.transition = 'bottom 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Проигрываем звук прыжка
    jumpSound.play();
    
    // Показываем результат через 1 секунду
    setTimeout(() => {
        chicken.style.transition = 'none';
        showResult(multiplierValue);
    }, 1000);
    
    // Прокручиваем к целевому мультипликатору
    const container = document.querySelector('.scroll-container');
    container.scrollTo({
        left: targetMultiplier.offsetLeft - 100,
        behavior: 'smooth'
    });
}

// Функция отображения результата
function showResult(multiplier) {
    const winPopup = document.getElementById('winPopup');
    const multiplierValueElem = document.getElementById('multiplierValue');
    
    // Устанавливаем значение мультипликатора
    multiplierValueElem.textContent = multiplier;
    
    // Показываем всплывающее окно
    winPopup.classList.add('active');
    winPopup.style.display = 'block';
    
    // Проигрываем звук победы
    winSound.volume = 0.5;
    winSound.play();
    
    // Через 3 секунды скрываем всплывающее окно
    setTimeout(() => {
        winPopup.style.display = 'none';
        winPopup.classList.remove('active');
        gameInProgress = false;
    }, 3000);
}

// Функция закрытия всплывающего окна
function closePopup() {
    winPopup.style.display = 'none';
    gameInProgress = false;
}

// Назначаем обработчик события для кнопки
playButton.addEventListener('click', startGame);

// Назначаем обработчик для кнопки закрытия
document.querySelector('.close-btn').addEventListener('click', closePopup);

// Инициализация игры при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Убедимся, что все элементы загружены
    if (playButton) {
        playButton.disabled = false;
    }
    
    // Инициализация звуков
    if (jumpSound) {
        jumpSound.volume = 0.4;
        jumpSound.preload = 'auto';
    }
    
    if (winSound) {
        winSound.volume = 0.5;
        winSound.preload = 'auto';
    }
});
