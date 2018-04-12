var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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

//Генерация случаных значении массивов
var generateRandom = function(sourceMassive) {
  return Math.floor(Math.random() * sourceMassive.length)
};

var setup = document.querySelector(".setup");
var setupOpen = document.querySelector(".setup-open");
var setupClose = document.querySelector(".setup-close");
var setupOpenIcon = document.querySelector(".setup-open-icon");
var setupSubmit = document.querySelector(".setup-submit");
var form = document.querySelector(".setup-wizard-form");
var setupUserName = document.querySelector(".setup-user-name");
//Обработчик событий на нажатие клавиши ESC
var onPopupEscPress = function() {
  if ((event.keyCode === ESC_KEYCODE) && (document.activeElement.className !== "setup-user-name")) {
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
  if (event.keyCode == ENTER_KEYCODE) {
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
  if (event.keyCode == ENTER_KEYCODE && !setup.classList.contains("hidden") && document.activeElement.className == "setup-close") {
    closePopup();
  }
});

setupSubmit.addEventListener("click", function() {
  if (!setup.classList.contains("hidden")) {
    form.submit();
  };
});

setupSubmit.addEventListener("keydown", function() {
  if (event.keyCode == ENTER_KEYCODE && !setup.classList.contains("hidden") && document.activeElement.classList.contains("setup-submit")) {
    form.submit();
  };
});

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

//Открываем div с местом под похожих персонажей
document.querySelector(".setup-similar").classList.remove("hidden");

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

  for (var k = 0; k < wizards.length; k++) {
    fragment.appendChild(renderWizard(wizards[k]));
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
