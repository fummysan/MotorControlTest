var five = require("johnny-five");
var board = new five.Board({port:'COM5'});			// Windowsの場合、必ずポートを指定する

board.on("ready", function() {
  console.log("Ready!");
  var led = new five.Led(13);

  led.blink(500);

});
