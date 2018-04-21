'use strict';

(function() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  //Генерация случаных значении массивов
  window.generateRandom = function(sourceMassive) {
    return Math.floor(Math.random() * sourceMassive.length)
  };

  window.util = {
    isEscEvent: function (event) {
      return event.keyCode === ESC_KEYCODE;
    },
    isEnterEvent: function (event) {
      return event.keyCode === ENTER_KEYCODE;
    }
  }
})();
