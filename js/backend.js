function () {
  var URL = "https://1510.dump.academy/code-and-magick/data";
  window.load = function (onLoad, onError) {
    //Создаем объект из конструктора
    var xhr = new XMLHttpRequest();
    //Возвращает тип ответа. По умолчанию text
    xhr.responseType = "json";
    //Инициализация запроса
    /*Варианты вызова: open( method, URL, async, userName, password ).Первый параметр method - HTTP-метод. URL - адрес запроса. async = true задает асинхронные запросы. userName, password - данные для HTTP-авторизации.*/
    xhr.open("GET", URL);
    //Обработчик события на окончание загрузки
    xhr.addEventListener("load", function () {
      onLoad(xhr.response); //Возвращает в стороковом виде запрошенный контент?
    });

    //Отсылает запрос. Аргумент - тело запроса. Например, GET-запроса тела нет, поэтому используется send(null), а для POST-запросов тело содержит параметры запроса.
    xht.send();
  };
  window.save = function (data, onLoad, onError) {

  };
  window.load(function(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    };
    similarListElement.appendChild(fragment);

  })
}
