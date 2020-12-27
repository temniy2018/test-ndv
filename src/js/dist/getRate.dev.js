"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setRate = void 0;
var newRate = {};
var liked = JSON.parse(localStorage.getItem('liked')) || [];

var setLiked = function setLiked(name) {
  liked.push(name);
  localStorage.removeItem('liked');
  localStorage.setItem('liked', JSON.stringify(liked));
  liked = JSON.parse(localStorage.getItem('liked')) || [];
  getRate();
};

var deleteLiked = function deleteLiked(name) {
  liked.splice(liked.indexOf(name), 1);
  localStorage.removeItem('liked');
  localStorage.setItem('liked', JSON.stringify(liked));
  liked = JSON.parse(localStorage.getItem('liked')) || [];
  getRate();
};

window.setLiked = setLiked;
window.deleteLiked = deleteLiked;

var setRate = function setRate(rate) {
  newRate = rate;
};

exports.setRate = setRate;

var getRate = function getRate() {
  if ('content' in document.createElement('template')) {
    var root = document.querySelector('#root');
    root.innerHTML = null;
    var tempExc = document.querySelector('#getRate');
    var exc = tempExc.content.querySelector('.exchange');
    exc.innerHTML = null;

    var _loop = function _loop(key) {
      var p = document.createElement('p');
      p.textContent = newRate[key].Name + ': ';
      var span = document.createElement('span');
      span.textContent = newRate[key].Value;
      p.appendChild(span);

      if (liked.find(function (el) {
        return el === key;
      })) {
        var like = document.createElement('span');
        like.innerHTML = "<span class='liked' onclick={deleteLiked('".concat(key, "')}>\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</span>");
        p.appendChild(like);
        exc.prepend(p);
      } else {
        var _like = document.createElement('span');

        _like.innerHTML = "<span class='like' onclick={setLiked('".concat(key, "')}>\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</span>");
        p.appendChild(_like);
        exc.append(p);
      }
    };

    for (var key in newRate) {
      _loop(key);
    }

    var clone = document.importNode(tempExc.content, true);
    root.appendChild(clone);
  }
};

var _default = getRate;
exports["default"] = _default;