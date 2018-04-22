'use strict';
(function() {
  var COAT_COLORS = ["rgb(101,137,164)", "rgb(241, 43, 107)", "rgb(146,100,161)", "rgb(56, 159, 117)", "rgb(215,210,55)", "rgb(0,0,0)"];
  var EYES_COLORS = ["black", "red", "blue", "yellow", "green"];
  var FIREBALL_COLORS = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];
  var WIZARDS_LIST_SIZE = 4;
  var wizards = [];

  //Функция для добавления и клонирования всех свойств магам и магов !! копирования мага (true - означает с содержимым элемента)
  var renderWizard = function(wizards) {
    var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");  //Определяем div который будем копировать
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(".setup-similar-label").textContent = wizards.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizards.colorCoat;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizards.colorEyes;
    return wizardElement;
  };

  var successHandler = function (data) {
    window.wizards = data;
    updateWizards();
    (function() {
      var setupWizard = document.querySelector(".setup-wizard");
      var similarListElement = document.querySelector(".setup-similar-list"); //Определяем div куда будем вставлять элементы
      var fragment = document.createDocumentFragment();
      var prevTimer;
      var similarWizardsBLockRender = function () {
        while(similarListElement.firstElementChild) {
          similarListElement.removeChild(similarListElement.firstElementChild);
        };
        for (var i = 0; i < 4; i++) {
          fragment.appendChild(renderWizard(window.wizards[i]));
        };
        similarListElement.appendChild(fragment);
      };
      similarWizardsBLockRender();
      setupWizard.addEventListener("click", function () {
        window.clearTimeout(window.prevTimer);
        window.prevTimer = window.setTimeout(function () {
          similarWizardsBLockRender();
        }, 600);
      });
    })();
  };

  var errorHandler = function(errorMessage) {
    var errorBlock = document.createElement("div");
    errorBlock.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red; position:absolute; left: 0; right: 0; fontSize: 30px";
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", errorBlock);
  };

  var initWizards = function() {
    window.load(successHandler, errorHandler);
  };
  initWizards();

  //При клике на волшебника - меняются его параметры (цвет глаз, куртки и файрбола)
  (function() {
    //Рейтинг волшебников
    var ourWizardFireballColor = "#ee4830";
    var ourWizardEyesColor = "black";
    var ourWizardCoatColor = "rgb(101, 137, 164)";
    var getRank = function (wizard) {
      var rank = 0;
      if (wizard.colorCoat === ourWizardCoatColor) {
        rank += 2;
      };
      if (wizard.colorEyes === ourWizardEyesColor) {
        rank += 1;
      };
      return rank;
    };

    window.updateWizards = function () {
      renderWizard(window.wizards.sort(function(left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = window.wizards.indexOf(left) - window.wizards.indexOf(right);
        }
        return rankDiff;
      }));
    };
    var ourWizardEyes = document.querySelector(".setup-wizard .wizard-eyes");
    var ourWizardCoat = document.querySelector(".setup-wizard .wizard-coat");
    var ourWizardFireball= document.querySelector(".setup-fireball-wrap");

    ourWizardEyes.addEventListener("click", function() {
      ourWizardEyesColor = EYES_COLORS[generateRandom(EYES_COLORS)]
      ourWizardEyes.style.fill = ourWizardEyesColor;
      updateWizards()//Пересчитывание рейтинга после каждого нажатия
    });
    ourWizardCoat.addEventListener("click", function() {
      ourWizardCoatColor = COAT_COLORS[generateRandom(COAT_COLORS)];
      ourWizardCoat.style.fill = ourWizardCoatColor;
      updateWizards()//Пересчитывание рейтинга после каждого нажатия
    });
    ourWizardFireball.addEventListener("click", function() {
      ourWizardFireballColor = FIREBALL_COLORS[generateRandom(FIREBALL_COLORS)];
      ourWizardFireball.style = "background-color: " + ourWizardFireballColor;
      updateWizards()//Пересчитывание рейтинга после каждого нажатия
    });
  })();

  //Drag-and-drop
  (function() {
    var setupArtifactsCell = document.querySelectorAll(".setup-artifacts-cell");
    for (var j = 0; j < setupArtifactsCell.length; j++) {
      setupArtifactsCell[j].setAttribute("draggable", "true");
    }
    var dropZones = document.querySelectorAll('.setup-artifacts .setup-artifacts-cell');
    var shopElement = document.querySelector(".setup-artifacts-shop");
    var draggedItem = null;

    shopElement.addEventListener("dragstart", function() {
      if (event.target.tagName.toLowerCase() === "img") {
        draggedItem = event.target;
        event.dataTransfer.setData("text/plain", event.target.alt);
        for (var p = 0; p < dropZones.length; p++) {
            dropZones[p].style.outline = "2px dashed red";
        }
      }
    });

    var artifactsElement = document.querySelector(".setup-artifacts");
    artifactsElement.addEventListener("dragover", function() {
      event.preventDefault();
      return false
    });

    artifactsElement.addEventListener("drop", function(){
      event.target.style.backgroundColor = "";
      event.target.appendChild(draggedItem.cloneNode(true));
      for (var p = 0; p < dropZones.length; p++) {
          dropZones[p].style.outline = "";
      }
      event.preventDefault()
    });
    artifactsElement.addEventListener("dragenter", function() {
      event.target.style.backgroundColor = "yellow";
      event.preventDefault();
    });
    artifactsElement.addEventListener("dragleave", function() {
      event.target.style.backgroundColor = "";
      event.preventDefault();
    });
  })();
})();
