var five = require("johnny-five");
var board = new five.Board({port:'COM5'});			// Windows�̏ꍇ�A�K���|�[�g���w�肷��

board.on("ready", function() {
  console.log("Ready!");
  var led = new five.Led(13);

  led.blink(500);

});
