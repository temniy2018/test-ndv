"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.onExchange = exports.setRateExc = void 0;
var newRate = {};
var tempExc = document.querySelector('#curExchange');
var selEntry = tempExc.content.querySelector('#entrySelect');
var selRes = tempExc.content.querySelector('#resultSelect');
var root = document.querySelector('#root');

var setRateExc = function setRateExc(rate) {
  newRate = rate;
};

exports.setRateExc = setRateExc;

var exchange = function exchange() {
  var key, opt, clone;
  return regeneratorRuntime.async(function exchange$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if ('content' in document.createElement('template')) {
            for (key in newRate) {
              opt = document.createElement('option');
              opt.textContent = newRate[key].Name;
              opt.value = key;
              selEntry.appendChild(opt);
              selRes.appendChild(opt.cloneNode(true));
            }

            clone = document.importNode(tempExc.content, true);
            root.appendChild(clone);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var onExchange = function onExchange() {
  var entryValue = root.querySelector('#entrySelect').value;
  var resValue = root.querySelector('#resultSelect').value;
  var entryInputValue = root.querySelector('#entryInput').value;
  var result = root.querySelector('#result');

  if (entryValue === 'RU' && resValue === 'RU') {
    result.textContent = entryInputValue;
  } else if (entryValue === 'RU') {
    result.textContent = entryInputValue / newRate[resValue].Value;
  } else if (resValue === 'RU') {
    result.textContent = entryInputValue * newRate[entryValue].Value;
  } else {
    result.textContent = newRate[entryValue].Value * entryInputValue / newRate[resValue].Value;
  }

  if (entryInputValue === '') {
    result.textContent = 0;
  }
};

exports.onExchange = onExchange;
window.onExchange = onExchange;
var _default = exchange;
exports["default"] = _default;