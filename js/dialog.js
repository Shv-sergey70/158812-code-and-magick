"use strict";

  var setup = document.querySelector(".setup");
  var setupOpen = document.querySelector(".setup-open");
  var setupClose = document.querySelector(".setup-close");
  var setupOpenIcon = document.querySelector(".setup-open-icon");
  var setupSubmit = document.querySelector(".setup-submit");
  var form = document.querySelector(".setup-wizard-form");
  var setupUserName = document.querySelector(".setup-user-name");
  var dialogHundle = document.querySelector('[name="avatar"]');
  //Обработчик событий на нажатие клавиши ESC
  var onPopupEscPress = function() {
    if ((window.util.isEscEvent(event)) && (document.activeElement.className !== "setup-user-name")) {
      closePopup();
    }
  };
  //Инициализация обработчика событий на нажатие клавиши и открытие окна
  var openPopup = function() {
    setup.classList.remove("hidden");
    document.addEventListener("keydown", onPopupEscPress)
  };
  //Инициализация обработчика событий на нажатие клавиши и закрытие окна
  var closePopup = function() {
    setup.classList.add("hidden");
    document.removeEventListener("keydown", onPopupEscPress)
  };
  //Открытие окна редактирования персонажа и добавление обработчика событий на нажатие клавиши
  setupOpen.addEventListener("click", function() {
    openPopup();
  });

  setupOpenIcon.addEventListener("keydown", function() {
    if (window.util.isEnterEvent(event)) {
    openPopup();
    }
    document.addEventListener("keydown", function(event) {
      onPopupEscPress();
    })
  });

  setupClose.addEventListener("click", function() {
    closePopup();
  });
  //Попап не закроется, если в фокусе поле ввода имени
  setupClose.addEventListener("keydown", function() {
    if (window.util.isEnterEvent(event) && !setup.classList.contains("hidden") && document.activeElement.className == "setup-close") {
      closePopup();
    }
  });

  setupSubmit.addEventListener("click", function() {
    if (!setup.classList.contains("hidden")) {
      form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        window.save(new FormData(form), function(response) {
          setup.classList.add("hidden");
        });
      });
    };
  });

  setupSubmit.addEventListener("keydown", function() {
    if (window.util.isEnterEvent(event) && !setup.classList.contains("hidden") && document.activeElement.classList.contains("setup-submit")) {
      form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        window.save(new FormData(form), function(response) {
          setup.classList.add("hidden");
        });
      });
    };
  });

  dialogHundle.addEventListener("mousedown", function(event) {
    event.preventDefault();
    dialogHundle.removeAttribute("type");//Временно, чтобы не грузились файлы
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + "px";
      setup.style.left = (setup.offsetLeft - shift.x) + "px";
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
