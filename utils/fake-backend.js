var express = require('express');
var app = express();

// Serve a disabilitare il CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers",
  	"Origin, X-Requested-With, Content-Type, Accept, X-CustomToken, X-AuthToken");
  if ('OPTIONS' == req.method){
    return res.sendStatus(200);
  }
  next();
});

app.get('/user/token', function (req, res) {
  console.log(req);
  res.send("32fdb64818a41ec4aad07493090a9d047cab08d8");
});

app.post('/user', function (req, res) {
  console.log(req);
  res.send("ACK");
});

app.put('/user/recovery', function (req, res) {
  console.log(req);
  res.send("ACK");
});

app.get('/experiences', function (req, res) {
  console.log(req);
  //var exp = {experiences: []};
  var exp = {
    experiences: [
      {
        id: 1,
        name: "Esperienza 1"
      },
      {
        id: 2,
        name: "Esperienza 2"
      },
      {
        id: 3,
        name: "Esperienza 3"
      }
    ]
  };
  res.send(JSON.stringify(exp));
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fake serleena Backend listening at http://%s:%s', host, port);

});