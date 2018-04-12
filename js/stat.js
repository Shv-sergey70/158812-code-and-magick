window.renderStatistics = function(ctx, names, times) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(110, 20, 270, 420);
  ctx.fillStyle = "green";
  ctx.fillRect(100, 10, 270, 420);
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText('Ура Вы победили!', 150, 30);
  ctx.fillText('Список результатов:', 140, 60);

  //По возрастанию
  var getOrder = function(anyMassive) {
  	for (var i = 0; i < anyMassive.length-1; i++) {
  		for (var j = 0; j < anyMassive.length-1-i; j++) {
  			if (anyMassive[j] < anyMassive[j+1]) {
  				var t = anyMassive[j];
  				anyMassive[j] = anyMassive[j+1];
  				anyMassive[j+1] = t;
  			}
          }
      }
  	return anyMassive;
  }

  var times = getOrder(times);
  //Поиск максимального элемента в массиве
  var getMaximum = function(massive) {
    var maxElement = 0;
    for (var i = 0; i < massive.length; i ++) {
      if (maxElement < massive[i]) {
          maxElement = massive[i];
      }
    }
    return maxElement;
  };



  var maxTime = getMaximum(times);
  var histogramHeight = 150;
  var histogramWidth = 40;
  var histogramStep = 50;


  var step = histogramHeight / maxTime;
  var positionY = 100; //Позиция столбиков по Y
  var positionX = 140; //Позиция столбиков по X
  ctx.textBaseline="bottom";

  for (var i = 0; i < times.length; i ++) {
    if (names[i] === "Вы") {
      ctx.fillStyle = "rgba(255, 0, 0, Math.random())";
      ctx.fillRect(positionX + (histogramStep * i), positionY, histogramWidth, times[i] * step);
      ctx.fillStyle = "black";
      ctx.fillText(names[i], positionX + (histogramStep * i), positionY);
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toString() +')';
      ctx.fillRect(positionX + (histogramStep * i), positionY, histogramWidth, times[i] * step);
      ctx.fillStyle = "black";
      ctx.fillText(names[i], positionX + (histogramStep * i), positionY);
    }
  }
};
