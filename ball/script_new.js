// u0427u0438u0441u0442u044bu0439 u0441u043au0440u0438u043fu0442 u0438u0433u0440u044b Balloon Predictor

// u041eu0441u043du043eu0432u043du044bu0435 u044du043bu0435u043cu0435u043du0442u044b u0438u0433u0440u044b
const ballImage = document.getElementById('ball');
const betDisplay = document.getElementById('betDisplay');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const bettingPanel = document.getElementById('bettingPanel');
const currencyRub = document.getElementById('currencyRub');
const currencyUsd = document.getElementById('currencyUsd');
const currencyInr = document.getElementById('currencyInr');
const betAmount = document.getElementById('betAmount');
const confirmButton = document.getElementById('confirmButton');

// u0421u043eu0437u0434u0430u043du0438u0435 u0437u0432u0435u0437u0434 u0434u043bu044f u0444u043eu043du0430
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // u0421u043bu0443u0447u0430u0439u043du044bu0435 u043fu043eu0437u0438u0446u0438u0438 u0438 u0440u0430u0437u043cu0435u0440u044b
        const size = Math.random() * 3 + 1; // 1-4px
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5; // 0-5s u0437u0430u0434u0435u0440u0436u043au0430 u0430u043du0438u043cu0430u0446u0438u0438
        const duration = Math.random() * 3 + 2; // 2-5s u043fu0440u043eu0434u043eu043bu0436u0438u0442u0435u043bu044cu043du043eu0441u0442u044c u0430u043du0438u043cu0430u0446u0438u0438
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// u041fu0435u0440u0435u043cu0435u043du043du044bu0435 u0434u043bu044f u0438u0433u0440u044b
let currency = '\u20BD'; // u041fu043e u0443u043cu043eu043bu0447u0430u043du0438u044e u0440u0443u0431u043bu044c
let bet = 0;
let currentMultiplier = 1.00;
let animationInterval;
let isGameRunning = false;
let maxMultiplier = 1.00;

// u0418u043du0438u0446u0438u0430u043bu0438u0437u0430u0446u0438u044f u0438u0433u0440u044b
function initGame() {
    createStars();
    setupEventListeners();
    currencyRub.checked = true; // u0420u0443u0431u043bu044c u043fu043e u0443u043cu043eu043bu0447u0430u043du0438u044e
}

// u041du0430u0441u0442u0440u043eu0439u043au0430 u043eu0431u0440u0430u0431u043eu0442u0447u0438u043au043eu0432 u0441u043eu0431u044bu0442u0438u0439
function setupEventListeners() {
    // u041au043du043eu043fu043au0430 u0421u0442u0430u0440u0442
    startButton.addEventListener('click', function() {
        if (!isGameRunning) {
            bettingPanel.style.display = 'block';
            startButton.style.display = 'none';
        }
    });
    
    // u0412u044bu0431u043eu0440 u0432u0430u043bu044eu0442u044b
    currencyRub.addEventListener('change', updateCurrency);
    currencyUsd.addEventListener('change', updateCurrency);
    currencyInr.addEventListener('change', updateCurrency);
    
    // u0412u0432u043eu0434 u0441u0443u043cu043cu044b u0441u0442u0430u0432u043au0438
    betAmount.addEventListener('input', function() {
        confirmButton.disabled = betAmount.value.trim() === '' || parseFloat(betAmount.value) <= 0;
    });
    
    // u041au043du043eu043fu043au0430 u041fu043eu0434u0442u0432u0435u0440u0434u0438u0442u044c
    confirmButton.addEventListener('click', function() {
        bet = parseFloat(betAmount.value);
        startGame();
    });
    
    // u041au043du043eu043fu043au0430 u0420u0435u0441u0442u0430u0440u0442
    restartButton.addEventListener('click', resetGame);
}

// u041eu0431u043du043eu0432u043bu0435u043du0438u0435 u0432u044bu0431u0440u0430u043du043du043eu0439 u0432u0430u043bu044eu0442u044b
function updateCurrency() {
    if (currencyRub.checked) currency = '\u20BD';
    else if (currencyUsd.checked) currency = '$';
    else if (currencyInr.checked) currency = '\u20B9';
    
    updateBetDisplay();
}

// u041eu0431u043du043eu0432u043bu0435u043du0438u0435 u043eu0442u043eu0431u0440u0430u0436u0435u043du0438u044f u0441u0442u0430u0432u043au0438
function updateBetDisplay() {
    betDisplay.textContent = `${currency}${(bet * currentMultiplier).toFixed(2)}`;
}

// u0417u0430u043fu0443u0441u043a u0438u0433u0440u044b
function startGame() {
    isGameRunning = true;
    bettingPanel.style.display = 'none';
    betDisplay.style.opacity = '1';
    
    // u0413u0435u043du0435u0440u0430u0446u0438u044f u0441u043bu0443u0447u0430u0439u043du043eu0433u043e u043cu0430u043au0441u0438u043cu0430u043bu044cu043du043eu0433u043e u043cu043du043eu0436u0438u0442u0435u043bu044f
    maxMultiplier = (Math.random() * 9 + 1).toFixed(2); // 1.00-10.00
    
    // u0410u043du0438u043cu0430u0446u0438u044f u0440u043eu0441u0442u0430 u043cu043du043eu0436u0438u0442u0435u043bu044f
    let startTime = Date.now();
    let initialScale = 1.0;
    let maxScale = 1.8; // u041cu0430u043au0441u0438u043cu0430u043bu044cu043du044bu0439 u0440u0430u0437u043cu0435u0440 u0448u0430u0440u0430
    
    // u0421u043bu0443u0447u0430u0439u043du0430u044f u0434u043bu0438u0442u0435u043bu044cu043du043eu0441u0442u044c u0430u043du0438u043cu0430u0446u0438u0438
    let animationDuration = Math.random() * 2000 + 2000; // 2-4 u0441u0435u043au0443u043du0434u044b
    
    animationInterval = setInterval(function() {
        let elapsed = Date.now() - startTime;
        let progress = elapsed / animationDuration;
        
        if (progress >= 1) {
            clearInterval(animationInterval);
            endGame();
            return;
        }
        
        // u0420u0430u0441u0447u0435u0442 u0442u0435u043au0443u0449u0435u0433u043e u043cu043du043eu0436u0438u0442u0435u043bu044f u0438 u0440u0430u0437u043cu0435u0440u0430
        currentMultiplier = 1 + (maxMultiplier - 1) * progress;
        let scale = initialScale + (maxScale - initialScale) * progress;
        
        // u041eu0431u043du043eu0432u043bu0435u043du0438u0435 u0440u0430u0437u043cu0435u0440u0430 u0448u0430u0440u0430 u0438 u0441u0443u043cu043cu044b
        ballImage.style.transform = `scale(${scale})`;
        updateBetDisplay();
        
        // u0414u0440u043eu0436u0430u043du0438u0435 u0448u0430u0440u0430 u043fu0440u0438 u0432u044bu0441u043eu043au0438u0445 u043cu043du043eu0436u0438u0442u0435u043bu044fu0445
        if (currentMultiplier > 5) {
            let shake = (Math.random() - 0.5) * 10 * (currentMultiplier / 10);
            ballImage.style.transform = `scale(${scale}) translateX(${shake}px)`;
        }
    }, 50);
}

// u0417u0430u0432u0435u0440u0448u0435u043du0438u0435 u0438u0433u0440u044b
function endGame() {
    // u041eu043au0440u0443u0433u043bu0435u043du0438u0435 u0438u0442u043eu0433u043eu0432u043eu0433u043e u043cu043du043eu0436u0438u0442u0435u043bu044f
    currentMultiplier = parseFloat(maxMultiplier);
    updateBetDisplay();
    
    // u041eu0442u043eu0431u0440u0430u0436u0435u043du0438u0435 u043au043du043eu043fu043au0438 u0440u0435u0441u0442u0430u0440u0442u0430
    restartButton.style.display = 'block';
    
    // u0414u043eu0431u0430u0432u043bu0435u043du0438u0435 u044du0444u0444u0435u043au0442u0430 u0438u0442u043eu0433u043eu0432u043eu0433u043e u0440u0435u0437u0443u043bu044cu0442u0430u0442u0430
    betDisplay.classList.add('pulse');
    
    // u0418u043cu0438u0442u0430u0446u0438u044f u043bu043eu043fu043du0443u0432u0448u0435u0433u043e u0448u0430u0440u0430, u0435u0441u043bu0438 u043cu043du043eu0436u0438u0442u0435u043bu044c u0431u043eu043bu044cu0448u043eu0439
    if (currentMultiplier > 7) {
        ballImage.classList.add('burst');
    }
}

// u0421u0431u0440u043eu0441 u0438u0433u0440u044b
function resetGame() {
    isGameRunning = false;
    currentMultiplier = 1.00;
    betDisplay.style.opacity = '0';
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
    
    // u0421u0431u0440u043eu0441 u0441u0442u0438u043bu0435u0439 u0438 u043au043bu0430u0441u0441u043eu0432
    ballImage.style.transform = 'scale(1)';
    betDisplay.classList.remove('pulse');
    ballImage.classList.remove('burst');
}

// u0414u043eu0431u0430u0432u043bu0435u043du0438u0435 u0441u0442u0438u043bu0435u0439 u0430u043du0438u043cu0430u0446u0438u0439, u0435u0441u043bu0438 u0438u0445 u043du0435u0442 u0432 CSS
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

// u0421u043bu0443u0447u0430u0439u043du043eu0435 u0447u0438u0441u043bu043e u0432 u0437u0430u0434u0430u043du043du043eu043c u0434u0438u0430u043fu0430u0437u043eu043du0435
function getRandomNumber(min, max) {
    return min + Math.random() * (max - min);
}

// u0414u043eu0431u0430u0432u043bu0435u043du0438u0435 u0441u0442u0438u043bu0435u0439 u0438 u0437u0430u043fu0443u0441u043a u0438u0433u0440u044b
addAnimationStyles();
initGame();
