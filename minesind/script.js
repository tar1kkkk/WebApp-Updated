document.addEventListener('DOMContentLoaded', () => {
  const _0x28c097 = document.getElementById('kangaroo'),
    _0x3a9e8d = document.getElementById('platform-container'),
    _0x1b1362 = document.getElementById('play-button'),
    _0xd40e68 = new Image();
  _0xd40e68.src = 'kengu.png';
  const _0x563a30 = new Image();
  _0x563a30.src = 'kenguzerk.png', console.log('Preloading images...'), _0x563a30.onload = () => console.log('✅ kenguzerk.png found and preloaded'), _0x563a30.onerror = () => console.error('❌ kenguzerk.png NOT FOUND - fix the file path!'), _0xd40e68.onload = () => console.log('✅ kengu.png found and preloaded'), _0xd40e68.onerror = () => console.error('❌ kengu.png NOT FOUND - fix the file path!');
  const _0x7811cb = document.createElement('div');
  _0x7811cb.className = 'modal', _0x7811cb.style.display = 'none', _0x7811cb.style.position = 'fixed', _0x7811cb.style.top = '0', _0x7811cb.style.left = '0', _0x7811cb.style.width = '100%', _0x7811cb.style.height = '100%', _0x7811cb.style.backgroundColor = 'rgba(0,0,0,0.7)', _0x7811cb.style.zIndex = '1000', _0x7811cb.style.display = 'flex', _0x7811cb.style.justifyContent = 'center', _0x7811cb.style.alignItems = 'center', _0x7811cb.style.opacity = '0', _0x7811cb.style.transition = 'opacity 0.3s ease', _0x7811cb.style.pointerEvents = 'none';
  const _0x3e2160 = document.createElement('div');
  _0x3e2160.className = 'modal-content', _0x3e2160.style.backgroundColor = '#fff', _0x3e2160.style.padding = '30px', _0x3e2160.style.borderRadius = '10px', _0x3e2160.style.textAlign = 'center', _0x3e2160.style.maxWidth = '80%', _0x3e2160.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)', _0x3e2160.style.transform = 'scale(0.8)', _0x3e2160.style.transition = 'transform 0.3s ease';
  const _0x161bfb = document.createElement('h2');
  _0x161bfb.style.marginBottom = '15px', _0x161bfb.style.fontSize = '28px', _0x161bfb.style.color = '#333';
  const _0x49eb19 = document.createElement('p');
  _0x49eb19.textContent = 'Cash Out!', _0x49eb19.style.fontSize = '22px', _0x49eb19.style.color = '#FF8000', _0x49eb19.style.fontWeight = 'bold';
  const _0x17aa36 = document.createElement('button');
  _0x17aa36.textContent = 'OK', _0x17aa36.style.marginTop = '20px', _0x17aa36.style.padding = '10px 30px', _0x17aa36.style.backgroundColor = '#FF8000', _0x17aa36.style.border = 'none', _0x17aa36.style.borderRadius = '5px', _0x17aa36.style.color = 'white', _0x17aa36.style.fontSize = '18px', _0x17aa36.style.fontWeight = 'bold', _0x17aa36.style.cursor = 'pointer', _0x17aa36.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)', _0x17aa36.addEventListener('mouseover', () => {
    _0x17aa36.style.backgroundColor = '#FF9933', _0x17aa36.style.transform = 'scale(1.05)';
  }), _0x17aa36.addEventListener('mouseout', () => {
    _0x17aa36.style.backgroundColor = '#FF8000', _0x17aa36.style.transform = 'scale(1)';
  }), _0x17aa36.addEventListener('click', () => {
    _0x34dd87(), _0x28e965(), _0x2a3abd();
  }), _0x3e2160.appendChild(_0x161bfb), _0x3e2160.appendChild(_0x49eb19), _0x3e2160.appendChild(_0x17aa36), _0x7811cb.appendChild(_0x3e2160), document.body.appendChild(_0x7811cb);
  function _0x29a990(_0x161cb3) {
    _0x161bfb.textContent = 'Multiplier: ' + _0x161cb3 + 'x', _0x7811cb.style.display = 'flex', setTimeout(() => {
      _0x7811cb.style.opacity = '1', _0x7811cb.style.pointerEvents = 'auto', _0x3e2160.style.transform = 'scale(1)';
    }, 10);
  }
  function _0x34dd87() {
    _0x7811cb.style.opacity = '0', _0x3e2160.style.transform = 'scale(0.8)', _0x7811cb.style.pointerEvents = 'none', setTimeout(() => {
      _0x7811cb.style.display = 'none';
    }, 300);
  }
  const _0x4f1d6d = window.innerWidth < 768;
  function _0x5319df() {
    const _0x564fd1 = window.innerWidth,
      _0xf3329b = window.innerHeight,
      _0x3ecf15 = _0x564fd1 * 0.2,
      _0x440b33 = 120,
      _0x3b5c6e = _0x4f1d6d ? 4 : 15,
      _0x32ca92 = _0x4f1d6d ? 80 : 10,
      _0x2e55be = _0x4f1d6d ? 1.1 : 1.3,
      _0x32220f = _0x4f1d6d ? 0.5 : 0.65,
      _0x1ad573 = [],
      _0x1a4b33 = [1.1, 1.2, 1.5, 2, 3, 5, 10, 20, 50, 100],
      _0x294842 = _0x168dba => {
        if (_0x168dba <= 2) return 'plitka1.png';
        if (_0x168dba <= 10) return 'plitka2.png';
        return 'plitka3.png';
      },
      _0x59fddd = _0x564fd1 * 0.05,
      _0xde22bb = 200,
      _0x3d4eb0 = _0x564fd1 - _0x59fddd - _0xde22bb,
      _0x584565 = Math.min(0.45, _0x3d4eb0 / _0x564fd1 * 0.6),
      _0x57fac1 = _0xf3329b * _0x584565,
      _0xc0a155 = Math.cos(-0.5 * Math.PI * 0.8),
      _0xc5b47 = Math.min(_0x564fd1 * 0.12, _0x3d4eb0 - _0x57fac1 * _0xc0a155),
      _0x3add59 = _0xf3329b * 0.5;
    for (let _0xc975f7 = 0; _0xc975f7 < _0x1a4b33.length; _0xc975f7++) {
      const _0x4aeb66 = _0xc975f7 / (_0x1a4b33.length - 1);
      let _0x116a53;
      if (_0xc975f7 === 0) _0x116a53 = 0.15;else {
        if (_0xc975f7 === 1) _0x116a53 = 0.32;else {
          const _0x4ab983 = (_0xc975f7 - 1) / (_0x1a4b33.length - 2);
          _0x116a53 = 0.32 + Math.pow(_0x4ab983, 0.9) * 0.65;
        }
      }
      const _0x772943 = (_0x116a53 - 0.5) * Math.PI * 0.8,
        _0x158e06 = _0xc5b47 + _0x57fac1 * Math.cos(_0x772943),
        _0x12f7d9 = _0x3add59 + _0x57fac1 * Math.sin(_0x772943),
        _0x14102a = _0x32220f + (1 - Math.abs(_0x116a53 - 0.5) * 1.8) * (_0x2e55be - _0x32220f),
        _0x442601 = {};
      _0x442601.bottom = _0x12f7d9, _0x442601.left = _0x158e06, _0x1ad573.push({
        'id': 'p-' + _0x1a4b33[_0xc975f7],
        'coefficient': _0x1a4b33[_0xc975f7],
        'plitka': _0x294842(_0x1a4b33[_0xc975f7]),
        'position': _0x442601,
        'scale': _0x14102a
      });
    }
    return _0x1ad573;
  }
  const _0x1f02a5 = _0x5319df(),
    _0x4e5117 = {};
  _0x4e5117.x = _0x4f1d6d ? 80 : 120, _0x4e5117.y = 0x50;
  let _0x204b3b = _0x4e5117,
    _0x4424bb = false;
  let _0x163576 = [],
    _0x56374c = [],
    _0x5358a3 = null,
    _0x2c6287 = -1,
    _0x2b909d = false;
  function _0x1f11bf() {
    _0x3a9e8d.innerHTML = '', _0x163576 = [], _0x56374c = [], _0x1f02a5.forEach((_0x47047f, _0x38fe50) => {
      const _0x7c616f = document.createElement('div');
      _0x7c616f.className = 'platform', _0x7c616f.id = _0x47047f.id, _0x7c616f.dataset.coefficient = _0x47047f.coefficient, _0x7c616f.dataset.index = _0x38fe50, _0x7c616f.style.bottom = _0x47047f.position.bottom + 'px', _0x7c616f.style.left = _0x47047f.position.left + 'px';
      const _0x5db6e3 = _0x47047f.scale || 1 - _0x38fe50 * 0.03;
      _0x7c616f.style.transform = 'scale(' + _0x5db6e3 + ')';
      const _0x114390 = document.createElement('img');
      _0x114390.src = _0x47047f.plitka, _0x114390.className = 'platform-image';
      const _0x32dad5 = document.createElement('div');
      _0x32dad5.className = 'coefficient';
      const _0x112406 = document.createElement('img');
      _0x112406.src = _0x47047f.coefficient + '.png', _0x112406.onerror = function () {
        this.remove(), _0x32dad5.textContent = _0x47047f.coefficient;
      }, _0x32dad5.appendChild(_0x112406), _0x7c616f.appendChild(_0x114390), _0x7c616f.appendChild(_0x32dad5), _0x3a9e8d.appendChild(_0x7c616f), _0x163576.push(_0x7c616f), _0x7c616f.addEventListener('click', () => _0x466e01(_0x7c616f));
    });
  }
  function _0x580e92() {
    if (_0x4424bb) return;
    const _0x486150 = [..._0x163576].sort((_0x35c4c2, _0x5917ab) => parseInt(_0x35c4c2.dataset.index) - parseInt(_0x5917ab.dataset.index)),
      _0x3bfa23 = _0x486150.filter(_0x3b8802 => !_0x56374c.includes(_0x3b8802));
    if (_0x3bfa23.length === 0) {
      _0x15ee95();
      return;
    }
    const _0x2d4b9e = _0x3bfa23[0],
      _0x32559d = parseInt(_0x2d4b9e.dataset.index);
    console.log('Jump to platform #' + _0x32559d + ' with multiplier ' + _0x2d4b9e.dataset.coefficient), _0x466e01(_0x2d4b9e), window.targetPlatformIndex === _0x32559d && setTimeout(() => {
      const _0xa35c09 = _0x2d4b9e.dataset.coefficient;
      _0x29a990(_0xa35c09), _0x28e965();
    }, 1000);
  }
  function _0x466e01(_0x56f99f) {
    if (_0x4424bb || _0x56374c.includes(_0x56f99f)) return;
    _0x4424bb = true;
    const _0x8ca96a = _0x56f99f.dataset.coefficient === '3';
    console.log('Jump to platform ' + _0x56f99f.id + ', multiplier: ' + _0x56f99f.dataset.coefficient + ', coefficient 3 check: ' + _0x8ca96a);
    if (_0x8ca96a) {
      _0x28c097.style.backgroundImage = 'url(\'kenguzerk.png\')', _0x28c097.style.transform = 'scaleX(1)', _0x2b909d = true, console.log('👁️ IMAGE CHANGED TO kenguzerk.png');
    }
    const _0x3142d5 = _0x56f99f.getBoundingClientRect(),
      _0x258b7f = _0x28c097.getBoundingClientRect(),
      _0x53957a = _0x258b7f.width,
      _0x3c9b44 = _0x258b7f.height;
    let _0x583aef = _0x3142d5.left + _0x3142d5.width / 2 - _0x53957a / 2;
    _0x583aef = Math.max(10, Math.min(_0x583aef, window.innerWidth - _0x53957a - 10));
    const _0x1f57f0 = _0x3142d5.top - _0x3c9b44 * 0.8;
    console.log('Jump to position: X=' + _0x583aef + ', Y=' + _0x1f57f0 + ', platform dimensions: ' + _0x3142d5.width + 'x' + _0x3142d5.height), _0x28c097.style.transition = 'all 0.5s ease-out', _0x28c097.style.left = _0x583aef + 'px', _0x28c097.style.bottom = window.innerHeight - _0x1f57f0 - _0x3c9b44 + 'px', _0x204b3b = {
      'x': _0x583aef,
      'y': window.innerHeight - _0x1f57f0 - _0x3c9b44
    }, _0x5358a3 = _0x56f99f, _0x2c6287 = parseInt(_0x56f99f.dataset.index), _0x56f99f.style.opacity = '0.5', _0x56374c.push(_0x56f99f), setTimeout(() => {
      _0x28c097.classList.add('jump-end'), setTimeout(() => {
        _0x56f99f.style.opacity = '0', setTimeout(() => {
          _0x56f99f.style.display = 'none';
        }, 500), _0x28c097.classList.remove('jump-end'), _0x4424bb = false;
        const _0x4c4e13 = _0x56f99f.dataset.coefficient;
        _0x29a990(_0x4c4e13), _0x28e965(), setTimeout(() => {
          _0x2a3abd();
        }, 1500);
      }, 300);
    }, 500);
  }
  let _0x11edbe = false;
  function _0x203b2f() {
    _0x11edbe = true, _0x5358a3 = null;
    const _0x142bd1 = [2, 3, 5, 10],
      _0x2fa1bb = Math.random();
    console.log('🎲 NEW GAME! Generated random number: ' + _0x2fa1bb.toFixed(4));
    let _0x2a1d67;
    if (_0x2fa1bb < 0.3) _0x2a1d67 = _0x142bd1[0];else {
      if (_0x2fa1bb < 0.6) _0x2a1d67 = _0x142bd1[1];else {
        if (_0x2fa1bb < 0.8) _0x2a1d67 = _0x142bd1[2];else {
          _0x2a1d67 = _0x142bd1[3];
        }
      }
    }
    console.log('🎯 SELECTED MULTIPLIER: ' + _0x2a1d67 + 'x (chances: 2x-30%, 3x-30%, 5x-20%, 10x-20%)');
    const _0x528665 = _0x163576.find(_0x141182 => parseFloat(_0x141182.dataset.coefficient) === _0x2a1d67);
    if (!_0x528665) {
      console.error('Platform with target coefficient not found!');
      const _0x4e6ced = _0x163576.find(_0x41f629 => {
        const _0xbeac51 = parseFloat(_0x41f629.dataset.coefficient);
        return _0x142bd1.includes(_0xbeac51);
      });
      if (_0x4e6ced) {
        window.targetPlatformIndex = parseInt(_0x4e6ced.dataset.index), console.log('Alternative target platform with index: ' + window.targetPlatformIndex + ' and multiplier: ' + _0x4e6ced.dataset.coefficient), _0x466e01(_0x4e6ced);
      } else {
        console.error('No platforms with suitable coefficients found!');
        return;
      }
    } else {
      window.targetPlatformIndex = parseInt(_0x528665.dataset.index), console.log('Target platform index: ' + window.targetPlatformIndex), _0x466e01(_0x528665);
    }
  }
  function _0x28e965() {
    _0x11edbe = false;
  }
  function _0x12d683(_0x321c40) {
    return 1 / (_0x321c40 * 0.5);
  }
  function _0x30b0a8() {
    if (_0x4424bb) return;
    const _0x1a6a54 = _0x163576.filter(_0x45326f => !_0x56374c.includes(_0x45326f));
    if (_0x1a6a54.length === 0) {
      _0x15ee95();
      return;
    }
    const _0x2d2ad3 = [2, 3, 5, 10],
      _0x53e417 = Math.random();
    let _0x57623a;
    if (_0x53e417 < 0.3) _0x57623a = 2;else {
      if (_0x53e417 < 0.6) {
        _0x57623a = 3;
      } else {
        if (_0x53e417 < 0.8) {
          _0x57623a = 5;
        } else {
          _0x57623a = 10;
        }
      }
    }
    console.log('🎲 Random jump! Number: ' + _0x53e417.toFixed(4) + ', selected multiplier: ' + _0x57623a + 'x');
    let _0x2a1579 = _0x1a6a54.find(_0x4e0b22 => parseFloat(_0x4e0b22.dataset.coefficient) === _0x57623a);
    if (!_0x2a1579) {
      let _0x252df7 = _0x1a6a54.filter(_0x115d5c => {
        const _0x4de0bb = parseFloat(_0x115d5c.dataset.coefficient);
        return _0x2d2ad3.includes(_0x4de0bb);
      });
      _0x252df7.length === 0 && (_0x252df7 = _0x1a6a54);
      const _0x149819 = Math.floor(Math.random() * _0x252df7.length);
      _0x2a1579 = _0x252df7[_0x149819];
    }
    const _0x4a80e7 = _0x2a1579.dataset.coefficient;
    _0x29a990(_0x4a80e7), _0x466e01(_0x2a1579);
  }
  function _0x368316() {
    _0x28c097.style.transition = 'none', _0x28c097.style.left = _0x204b3b.x + 'px', _0x28c097.style.bottom = _0x204b3b.y + 'px';
  }
  function _0x15ee95() {
    const _0x11b4a1 = {};
    _0x11b4a1.x = _0x4f1d6d ? 80 : 120, _0x11b4a1.y = 0x50, _0x204b3b = _0x11b4a1;
    _0x5358a3 = null;
    _0x2c6287 = -1;
    _0x2b909d = false;
    window.targetPlatformIndex = null;
    _0x28c097.style.backgroundImage = 'url(\'kengu.png\')';
    _0x28c097.style.transform = 'scaleX(1)';
    _0x1f11bf();
    _0x368316();
    console.log('Game reset!');
  }
  _0x1b1362.addEventListener('click', () => {
    _0x56374c.length === _0x163576.length ? (_0x15ee95(), setTimeout(_0x203b2f, 100)) : _0x203b2f();
  }), _0x7811cb.addEventListener('click', _0x5969fe => {
    _0x5969fe.target === _0x7811cb && (_0x28e965(), _0x34dd87(), _0x2a3abd());
  }), window.addEventListener('resize', () => {
    const _0x3028c7 = _0x5319df();
    _0x1f02a5.length = 0;
    _0x1f02a5.push(..._0x3028c7), _0x1f11bf();
    _0x368316();
  });
  function _0x2af519() {
    console.log('Checking image availability...');
    const _0x2f7b34 = new Image();
    _0x2f7b34.onload = () => console.log('kenguzerk.png available');
    _0x2f7b34.onerror = () => console.error('kenguzerk.png NOT FOUND!'), _0x2f7b34.src = 'kenguzerk.png';
    const _0x395a5d = new Image();
    _0x395a5d.onload = () => console.log('kengu.png available');
    _0x395a5d.onerror = () => console.error('kengu.png NOT FOUND!'), _0x395a5d.src = 'kengu.png';
  }
  _0x28c097.style.backgroundImage = 'url(\'kengu.png\')', _0x1f11bf(), _0x2af519(), console.log('ALL PLATFORMS:'), _0x163576.forEach((_0x2e909d, _0x1075d5) => {
    console.log('Platform #' + _0x1075d5 + ': id=' + _0x2e909d.id + ', multiplier=' + _0x2e909d.dataset.coefficient + ', index=' + _0x2e909d.dataset.index);
  });
  function _0x2a3abd() {
    _0x2b909d = false;
    _0x28c097.style.backgroundImage = 'url(\'kengu.png\')', _0x28c097.style.transform = 'scaleX(1)';
    const _0x56d7fb = {};
    _0x56d7fb.x = _0x4f1d6d ? 80 : 120, _0x56d7fb.y = 0x50;
    const _0x210b95 = _0x56d7fb;
    _0x28c097.style.transition = 'all 0.5s ease-out', _0x28c097.style.left = _0x210b95.x + 'px';
    _0x28c097.style.bottom = _0x210b95.y + 'px', _0x204b3b = _0x210b95;
    setTimeout(() => {
      _0x56374c = [], _0x163576.forEach(_0x3441d5 => {
        _0x3441d5.style.opacity = '1';
        _0x3441d5.style.display = 'block';
      });
    }, 500);
  }
});