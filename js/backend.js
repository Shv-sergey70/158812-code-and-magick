(function () {
  var URL = "https://js.dump.academy/code-and-magick/data";
  window.load = function (onLoad, onError) {
    //Создаем объект из конструктора
    var xhr = new XMLHttpRequest();
    //Возвращает тип ответа. По умолчанию text. Если этого не сделать нужно парсить вручную через JSON.parse(...)
    xhr.responseType = "json";
    //Обработчик события на окончание загрузки
    xhr.addEventListener("load", function () {
      if (xhr.status == 200) {
        onLoad(xhr.response); //Возвращает в стороковом виде запрошенный контент?
      } else {
        onError("Неизвестный статус: " + xhr.status + " " + xhr.statusText);
      };
    });
    xhr.addEventListener("error", function() {
      onError("Произошла ошибка соединения");
    });
    xhr.timeout = 10000; //10c
    xhr.addEventListener("timeout", function() {
      onError("Запрос не успел выполниться за " + xhr.timeout + "мс")
    });
    //Инициализация запроса
    /*Варианты вызова: open( method, URL, async, userName, password ).Первый параметр method - HTTP-метод. URL - адрес запроса. async = true задает асинхронные запросы. userName, password - данные для HTTP-авторизации.*/
    xhr.open("GET", URL);
    //Отсылает запрос. Аргумент - тело запроса. Например, GET-запроса тела нет, поэтому используется send(null), а для POST-запросов тело содержит параметры запроса.
    xhr.send();
  };
})();
//Через JSONP
// (function () {
//  window.loader = document.createElement("script");
//  loader.src = "https://js.dump.academy/code-and-magick/data?callback=ebt"
//  document.body.appendChild(loader);
// })();
// (function () {
//   window.load = function (onLoad, onError) {
//     window.ebt = function(dannie){
//       onLoad(dannie)
//     };
//   };
// })();
(function () {
  var URL = "https://js.dump.academy/code-and-magick";
  window.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function () {
      if (xhr.status == 200) {
        onLoad(xhr.response); //Возвращает в стороковом виде запрошенный контент?
      } else {
        onError("Неизвестный статус: " + xhr.status + " " + xhr.statusText);
      };
    });
    xhr.addEventListener("error", function() {
      onError("Произошла ошибка соединения");
    });
    xhr.timeout = 10000; //10c
    xhr.addEventListener("timeout", function() {
      onError("Запрос не успел выполниться за " + xhr.timeout + "мс")
    });
    xhr.open("POST", URL);
    xhr.send(data);
  };
})()
