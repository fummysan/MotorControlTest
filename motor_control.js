var five = require("johnny-five"),
  board, motor, led;

var board = new five.Board({port:'COM5'});					// Windowsの場合、必ずポートを指定する

var webclient = require("request");



board.on("ready", function() {
  console.log("");												// コンソールログの見栄えを良くするためにあえて空の行を送る
  console.log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss') + "	Motor Cotroll Start!!");

  var motor = new five.Motor({
    pins: {
      pwm: 9,
      dir: 11
    }
  });

// コマンドラインからモーターへのアクセスができるようにする
  board.repl.inject({
    motor: motor
  });


// ↓↓↓↓↓ Motor Event API ↓↓↓↓↓
  motor.on("start", function() {
    console.log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss') + "	Motor Start!!");
  });

  motor.on("stop", function() {
    console.log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss') + "	Motor Stop!!");
  });

  motor.on("forward", function() {
    console.log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss') + "	Motor Forward!!");
  });

  motor.on("reverse", function() {
    console.log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss') + "	Motor Reverse!!");
  });
// ↑↑↑↑↑ Motor Event API ↑↑↑↑↑

// Motor Control

motor.reverse(0)
motor.stop()


setInterval(function () {
  webclient.get({
    url: "（対象のURL）",
  }, function (error, response, body) {
    console.log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss') + "Flag:" + body);

    if (body == "-1") {
      motor.reverse(100)
    } else if (body == "1") {
      motor.forward(100);
    } else {
      motor.reverse(0)

      board.wait(1000, function() {
        motor.stop()
      });
    }
  });
}, 3000);

});			// board.onの終わり



// ログ用タイムスタンプの整形
dateFormat = {
  _fmt : {
    "yyyy": function(date) { return date.getFullYear() + ''; },
    "MM": function(date) { return ('0' + (date.getMonth() + 1)).slice(-2); },
    "dd": function(date) { return ('0' + date.getDate()).slice(-2); },
    "hh": function(date) { return ('0' + date.getHours()).slice(-2); },
    "mm": function(date) { return ('0' + date.getMinutes()).slice(-2); },
    "ss": function(date) { return ('0' + date.getSeconds()).slice(-2); }
  },
  _priority : ["yyyy", "MM", "dd", "hh", "mm", "ss"],
  format: function(date, format){
    return this._priority.reduce((res, fmt) => res.replace(fmt, this._fmt[fmt](date)), format)
  }
};
