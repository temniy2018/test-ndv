"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewRate = exports.onClickCurExchange = exports.onClickExchange = void 0;

var _exchange = _interopRequireWildcard(require("./exchange.js"));

var _getRate = _interopRequireWildcard(require("./getRate.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var root = document.querySelector('#root');
var rate = {};

var onClickExchange = function onClickExchange() {
  root.innerHTML = null;
  (0, _exchange["default"])();
};

exports.onClickExchange = onClickExchange;

var onClickCurExchange = function onClickCurExchange() {
  (0, _getRate["default"])();
};

exports.onClickCurExchange = onClickCurExchange;
window.onClickCurExchange = onClickCurExchange;
window.onClickExchange = onClickExchange;

var getNewRate = function getNewRate() {
  var responce, json;
  return regeneratorRuntime.async(function getNewRate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('https://www.cbr-xml-daily.ru/daily_json.js'));

        case 2:
          responce = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(responce.json());

        case 5:
          json = _context.sent;
          rate = json.Valute;
          (0, _exchange.setRateExc)(rate);
          (0, _getRate.setRate)(rate);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getNewRate = getNewRate;
getNewRate().then(function () {
  return onClickExchange();
});