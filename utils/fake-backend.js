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

app.get('/paths/:from/:to', function (req, res){
  var paths = {
    paths: [
      {
        name: "Sentiero del monte Cinto",
        points: [
          {
            lat: 45.276413,
            lng: 11.650587
          },
          {
            lat: 45.275977,
            lng: 11.652806
          },
          {
            lat: 45.276257,
            lng: 11.654908
          },
          {
            lat: 45.277573,
            lng: 11.654297
          },
          {
            lat: 45.278192,
            lng: 11.655213
          },
          {
            lat: 45.279032,
            lng: 11.655626
          },
          {
            lat: 45.280266,
            lng: 11.655875
          },
          {
            lat: 45.281726,
            lng: 11.655550
          }
        ]
      }
    ]
  };
  res.send(JSON.stringify(paths));
});

app.get('/poi/:from/:to', function (req, res){
  var poi = {
    poi: [
      {
        id: "sfklsdfjklsdf",
        name: "POI A",
        lat: 45.280063,
        lng: 11.654495
      },
      {
        id: "!vjkldfjghksdlfjvsdlk",
        name: "POI B",
        lat: 45.281597,
        lng: 11.653035
      }
    ]
  };
  res.send(JSON.stringify(poi));
});

app.post('/experiences', function(req, res){
  res.sendStatus(200);
});

app.delete('/experiences/:id', function(req, res){
  res.sendStatus(200);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fake serleena Backend listening at http://%s:%s', host, port);

});