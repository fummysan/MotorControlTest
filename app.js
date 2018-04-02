var webclient = require("request");

setInterval(function () {
  webclient.get({
    url: "（対象のURL）",
  }, function (error, response, body) {
    console.log(body);
  });
}, 3000);
