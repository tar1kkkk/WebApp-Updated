const _0x59d84d = {};
_0x59d84d.name = 'RED', _0x59d84d.image = 'red cell.png';
const _0x1695f9 = {};
_0x1695f9.name = 'BLACK', _0x1695f9.image = 'black cell.png';
const _0x9e12d8 = {};
_0x9e12d8.name = 'FIRE', _0x9e12d8.image = 'fire cell.png';
const items = [_0x59d84d, _0x1695f9, _0x9e12d8],
  rouletteItems = document.getElementById('rouletteItems'),
  spinButton = document.getElementById('spinButton'),
  resultElement = document.getElementById('result'),
  arrowTop = document.getElementById('arrowTop');
const arrowBottom = document.getElementById('arrowBottom'),
  resultFrame = document.getElementById('resultFrame'),
  glowEffect = document.getElementById('glowEffect'),
  particlesContainer = document.getElementById('particles');
const analysisOverlay = document.getElementById('analysisOverlay');
let isSpinning = false;
let isResetting = false;
function initBackgroundCells() {
  const _0x563379 = window.innerWidth < 768 ? 15 : 25;
  const _0x79d664 = document.getElementById('particles');
  _0x79d664.innerHTML = '';
  for (let _0x4a07b7 = 0; _0x4a07b7 < _0x563379; _0x4a07b7++) {
    createBackgroundCell();
  }
}
function createBackgroundCell() {
  const _0x4ba338 = document.getElementById('particles'),
    _0x1f24f9 = document.createElement('div');
  _0x1f24f9.classList.add('background-cell');
  const _0x5540c3 = ['red', 'black', 'fire'],
    _0x3be49e = _0x5540c3[Math.floor(Math.random() * _0x5540c3.length)];
  _0x1f24f9.classList.add(_0x3be49e);
  const _0x345a58 = Math.random() * 60 + 40;
  _0x1f24f9.style.width = _0x345a58 + 'px', _0x1f24f9.style.height = _0x345a58 + 'px';
  const _0x44a6d0 = Math.random() * window.innerWidth,
    _0x4711a3 = Math.random() * window.innerHeight;
  _0x1f24f9.style.left = _0x44a6d0 + 'px', _0x1f24f9.style.top = _0x4711a3 + 'px';
  const _0x25a03f = Math.random() * 0.15 + 0.05;
  _0x1f24f9.style.opacity = _0x25a03f;
  const _0x4999e5 = Math.random() * 200 - 100,
    _0x1aa3e0 = Math.random() * 200 - 100,
    _0x14e4c7 = Math.random() * 200 - 100,
    _0x5080bb = Math.random() * 200 - 100,
    _0x3bb3d0 = Math.random() * 200 - 100,
    _0x41b3e6 = Math.random() * 200 - 100;
  const _0x4fcfcc = Math.random() * 180;
  _0x1f24f9.style.setProperty('--move-x', _0x4999e5 + 'px'), _0x1f24f9.style.setProperty('--move-y', _0x1aa3e0 + 'px'), _0x1f24f9.style.setProperty('--move-x2', _0x14e4c7 + 'px'), _0x1f24f9.style.setProperty('--move-y2', _0x5080bb + 'px'), _0x1f24f9.style.setProperty('--move-x3', _0x3bb3d0 + 'px'), _0x1f24f9.style.setProperty('--move-y3', _0x41b3e6 + 'px'), _0x1f24f9.style.setProperty('--rotate-deg', _0x4fcfcc + 'deg');
  const _0x2aa548 = Math.random() * 60 + 30;
  _0x1f24f9.style.setProperty('--duration', _0x2aa548 + 's'), _0x1f24f9.style.animation = 'floatAnimation ' + _0x2aa548 + 's linear infinite', Math.random() < 0.3 && _0x1f24f9.classList.add('glow'), _0x4ba338.appendChild(_0x1f24f9);
}
function getItemWidth() {
  if (window.innerWidth <= 480) {
    return 80;
  } else {
    if (window.innerWidth <= 700) {
      return 90;
    } else {
      return 120;
    }
  }
}
function createRouletteItems() {
  const _0x4ae98c = items.length * 15;
  let _0x35d691 = '';
  const _0x1751bd = Math.ceil(items.length * 1.5);
  for (let _0x3f3431 = 0; _0x3f3431 < _0x4ae98c + _0x1751bd; _0x3f3431++) {
    const _0x4dbde4 = items[_0x3f3431 % items.length];
    _0x35d691 += '<div class="roulette-item" data-name="' + _0x4dbde4.name + '">\n            <img src="' + _0x4dbde4.image + '" alt="' + _0x4dbde4.name + '">\n        </div>';
  }
  rouletteItems.innerHTML = _0x35d691;
  const _0x8150f2 = document.querySelectorAll('.roulette-item');
  _0x8150f2.forEach(_0x8de172 => {
    _0x8de172.addEventListener('mouseenter', () => {
      if (!isSpinning) {
        _0x8de172.classList.add('highlight');
      }
    }), _0x8de172.addEventListener('mouseleave', () => {
      _0x8de172.classList.remove('highlight');
    });
  }), centerRoulettePosition();
}
function centerRoulettePosition() {
  const _0x2811d1 = getItemWidth(),
    _0x4f8595 = document.querySelector('.roulette-container').offsetWidth;
  const _0x158c28 = Math.floor(_0x4f8595 / _0x2811d1),
    _0x1243f4 = Math.ceil(items.length * 1.5),
    _0x28f6a4 = -_0x2811d1 * _0x1243f4 + (_0x4f8595 - _0x2811d1) / 2;
  rouletteItems.style.transition = 'none', rouletteItems.style.transform = 'translateX(' + _0x28f6a4 + 'px)', void rouletteItems.offsetWidth, rouletteItems.style.transition = 'transform 5s cubic-bezier(0.34, 1.56, 0.64, 1)';
}
function getElementUnderArrow() {
  const _0x18791a = document.querySelector('.roulette-container').getBoundingClientRect(),
    _0xcd5626 = _0x18791a.left + _0x18791a.width / 2;
  const _0x43bc7e = document.querySelectorAll('.roulette-item');
  for (let _0x39c5d3 of _0x43bc7e) {
    const _0x384543 = _0x39c5d3.getBoundingClientRect();
    if (_0xcd5626 >= _0x384543.left && _0xcd5626 <= _0x384543.right) {
      return _0x39c5d3;
    }
  }
  return null;
}
function spin() {
  if (isSpinning) return;
  isSpinning = true, spinButton.disabled = true;
  spinButton.classList.add('spinning');
  if (resultElement.textContent) {
    resultElement.classList.remove('active'), setTimeout(() => {
      resultElement.textContent = '';
    }, 300);
  }
  analysisOverlay.classList.add('active'), resultFrame.classList.remove('active');
  setTimeout(() => {
    analysisOverlay.classList.remove('active'), glowEffect.classList.add('active');
    centerRoulettePosition(), arrowTop.classList.add('spinning'), arrowBottom.classList.add('spinning');
    const _0x1b7322 = Math.floor(Math.random() * items.length),
      _0x469872 = items[_0x1b7322].name,
      _0x2c49e2 = getItemWidth();
    const _0x53e8ef = document.querySelector('.roulette-container').offsetWidth,
      _0x4e8092 = Math.ceil(items.length * 1.5),
      _0x2a5da3 = -_0x2c49e2 * _0x4e8092 + (_0x53e8ef - _0x2c49e2) / 2,
      _0xb10f83 = 10,
      _0x25d9dd = _0x2a5da3 - _0x2c49e2 * (items.length * _0xb10f83 + _0x1b7322);
    playSpinSound(), setTimeout(() => {
      rouletteItems.style.transform = 'translateX(' + _0x25d9dd + 'px)';
    }, 100);
    const _0x3ad048 = function () {
      const _0x32f7f4 = getElementUnderArrow();
      const _0xd9f49a = _0x32f7f4 ? _0x32f7f4.dataset.name : _0x469872;
      if (_0x32f7f4) {
        const _0x152308 = document.querySelector('.roulette-container').getBoundingClientRect(),
          _0x3f2d42 = _0x152308.left + _0x152308.width / 2,
          _0x193a7c = _0x32f7f4.getBoundingClientRect(),
          _0xabd8f5 = _0x193a7c.left + _0x193a7c.width / 2;
        if (Math.abs(_0x3f2d42 - _0xabd8f5) > 2) {
          const _0x4730a8 = getComputedStyle(rouletteItems).transform,
            _0x1f130b = new DOMMatrix(_0x4730a8),
            _0x41f1c4 = _0x1f130b.m41,
            _0x3128a3 = _0x3f2d42 - _0xabd8f5;
          rouletteItems.style.transition = 'transform 0.5s ease-out', rouletteItems.style.transform = 'translateX(' + (_0x41f1c4 + _0x3128a3) + 'px)', setTimeout(_0x4ebd53, 600);
          return;
        }
      }
      _0x4ebd53();
      function _0x4ebd53() {
        const _0x2dc78f = getElementUnderArrow(),
          _0x137978 = _0x2dc78f ? _0x2dc78f.dataset.name : _0x469872;
        if (_0x2dc78f) {
          _0x2dc78f.classList.add('selected-item');
        }
        playResultSound(_0x137978), resultElement.innerHTML = 'Bet on: <span>' + _0x137978 + '</span>', setTimeout(() => {
          resultElement.classList.add('active');
        }, 200), arrowTop.classList.remove('spinning'), arrowBottom.classList.remove('spinning'), setTimeout(() => {
          glowEffect.classList.remove('active');
        }, 3000), setTimeout(() => {
          isSpinning = false, spinButton.disabled = false, spinButton.classList.remove('spinning');
          if (_0x2dc78f) {
            setTimeout(() => {
              _0x2dc78f.classList.remove('selected-item');
            }, 3000);
          }
        }, 1000);
      }
      rouletteItems.removeEventListener('transitionend', _0x3ad048);
    };
    rouletteItems.addEventListener('transitionend', _0x3ad048);
  }, 2000);
}
function playSpinSound() {}
function playResultSound(_0x2c24cb) {}
document.addEventListener('DOMContentLoaded', () => {
  createRouletteItems();
  initBackgroundCells();
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
}), window.addEventListener('resize', () => {
  if (!isSpinning && !isResetting) {
    if (window.resizeTimer) {
      clearTimeout(window.resizeTimer);
    }
    window.resizeTimer = setTimeout(() => {
      centerRoulettePosition(), initBackgroundCells();
    }, 250);
  }
});