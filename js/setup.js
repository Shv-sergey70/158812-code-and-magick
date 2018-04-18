'use strict';

(function() {
  var WIZARD_NAMES = ["Иван", "Хуан Себастьян", "Мария", "Кристоф", "Виктория", "Юлия", "Люпита", "Вашингтон"];
  var WIZARD_SURNAMES = ["да Марья", "Верон", "Мирабелла", "Вальц", "Онопко", "Топольницкая", "Нионго", "Ирвинг"];
  var COAT_COLORS = ["rgb(101,137,164)", "rgb(241, 43, 107)", "rgb(146,100,161)", "rgb(56, 159, 117)", "rgb(215,210,55)", "rgb(0,0,0)"];
  var EYES_COLORS = ["black", "red", "blue", "yellow", "green"];
  var FIREBALL_COLORS = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];
  var WIZARDS_LIST_SIZE = 4;
  var wizards = [];
  //Определяем div куда будем вставлять элементы
  var similarListElement = document.querySelector(".setup-similar-list");
  //Определяем div который будем копировать
  var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");

  //Открываем div с местом под похожих персонажей
  document.querySelector(".setup-similar").classList.remove("hidden");
  //Генерация случаных значении массивов
  var generateRandom = function(sourceMassive) {
    return Math.floor(Math.random() * sourceMassive.length)
  };

  //Заполнение параметров похожих волшебников
  var generateWizardsData = function (wizardsNumber) {
    for (var t = 0; t < wizardsNumber; t++) {
      wizards.push(
        {
          name: WIZARD_NAMES[generateRandom(WIZARD_NAMES)] + " " + WIZARD_SURNAMES[generateRandom(WIZARD_SURNAMES)],
          coatColor: COAT_COLORS[generateRandom(COAT_COLORS)],
          eyesColor: EYES_COLORS[generateRandom(EYES_COLORS)]
        }
      )
    }
    return wizards;
  }

  //Функция для добавления и клонирования всех свойств магам и магов !! копирования мага (true - означает с содержимым элемента)
  var renderWizard = function(wizards) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(".setup-similar-label").textContent = wizards.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizards.coatColor;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizards.eyesColor;

    return wizardElement;
  }

  //Создаем похожих волшебников
  var createWizardsFragment = function() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    };
    //Добавление одного фрагмента, вместо отдельных 4х магов
    similarListElement.appendChild(fragment);
  }

  var initWizards = function () {
    generateWizardsData(WIZARDS_LIST_SIZE);
    createWizardsFragment();
  };

  initWizards();

  var setupWizard = document.querySelector(".setup-wizard");
  var wizardCoat = document.querySelector(".setup-wizard .wizard-coat");
  var wizardEye = document.querySelector(".setup-wizard .wizard-eyes");
  var setupFireballWrap= document.querySelector(".setup-fireball-wrap");

  setupWizard.addEventListener("click", function() {
    wizardCoat.style.fill = COAT_COLORS[generateRandom(COAT_COLORS)];
    wizardEye.style.fill = EYES_COLORS[generateRandom(EYES_COLORS)];
    setupFireballWrap.style = "background-color: " + FIREBALL_COLORS[generateRandom(FIREBALL_COLORS)];
  });

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
