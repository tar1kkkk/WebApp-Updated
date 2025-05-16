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
