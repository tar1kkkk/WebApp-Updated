// Скрипт для отключения блокировщиков в играх

// Функция для инъекции CSS стилей для скрытия блокирующих элементов
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .troywell-avia, .troywell-caa, [class*="404"], [class*="bloca"], 
        [class*="block"], [class*="anti"], [class*="adblock"],
        [class*="detect"], [class*="check"], [id*="block"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            position: fixed !important;
            top: -9999px !important;
            pointer-events: none !important;
        }
        
        body, html {
            overflow: auto !important;
        }
    `;
    document.head.appendChild(style);
}

// Функция для перехвата запросов на доступ к камере или другим разрешениям
function overridePermissionAPIs() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia = function() {
            return new Promise(resolve => {
                // Эмулируем успешный запрос без реального доступа к камере
                const mockStream = {
                    getTracks: function() {
                        return [{
                            stop: function() {}
                        }];
                    }
                };
                resolve(mockStream);
            });
        };
    }
    
    if (navigator.getUserMedia) {
        navigator.getUserMedia = function(constraints, success) {
            // Эмулируем успешный запрос без реального доступа к камере
            const mockStream = {
                getTracks: function() {
                    return [{
                        stop: function() {}
                    }];
                }
            };
            setTimeout(() => success(mockStream), 100);
        };
    }
}

// Функция для перехвата проверок AdBlock и других блокировщиков
function overrideChecks() {
    // Подменяем объекты, которые часто используются для обнаружения блокировщиков
    window.canRunAds = true;
    window.canShowAds = true;
    window.isAdBlocked = false;
    window.isAdBlockActive = false;
    window.adBlockDetected = false;
    window.blockAdBlock = {
        check: function() { return false; },
        emitEvent: function() { return false; }
    };
    
    // Добавляем фейковые элементы рекламы, чтобы обмануть детекторы
    const fakeAd = document.createElement('div');
    fakeAd.id = 'fake-ad-container';
    fakeAd.style.position = 'absolute';
    fakeAd.style.opacity = '0';
    fakeAd.style.pointerEvents = 'none';
    fakeAd.innerHTML = '<div id="banner-ad"></div><div class="ad-placeholder"></div>';
    document.body.appendChild(fakeAd);
}

// Функция для разблокировки игры
function unblockGame() {
    // Удаляем элементы блокировки
    const errorElements = document.querySelectorAll('.error-container, .error-message, .error-404, .blocked-message');
    errorElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Если есть основные элементы игры, делаем их видимыми
    const gameElements = document.querySelectorAll('.game-container, .game-content, .game-area, canvas');
    gameElements.forEach(el => {
        el.style.display = 'block';
        el.style.visibility = 'visible';
    });
    
    // Удаляем оверлеи блокировки
    const overlays = document.querySelectorAll('[class*="overlay"], [id*="overlay"]');
    overlays.forEach(el => {
        el.style.display = 'none';
    });
}

// Мутируем объект window.history для исправления навигации
function fixNavigation() {
    const originalReplace = window.location.replace;
    window.location.replace = function(url) {
        if (url.includes('index.html')) {
            window.location.href = '../index.html';
        } else {
            originalReplace.apply(this, arguments);
        }
    };
}

// Выполняем всё после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    injectStyles();
    overridePermissionAPIs();
    overrideChecks();
    fixNavigation();
    
    // Задержка для того, чтобы успел отработать блокирующий скрипт
    setTimeout(unblockGame, 500);
});

// Выполняем часть функций немедленно
injectStyles();
overridePermissionAPIs();
overrideChecks();

// Повторно проверяем блокировку через регулярные интервалы
setInterval(unblockGame, 1000);
