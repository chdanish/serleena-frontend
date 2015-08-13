/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


var express = require('express');
var bodyParser = require('body-parser');
var superagent = require('superagent');
var app = express();

var backend = 'http://api.hitchhikers.info';

app.use(bodyParser.json());

var transformRequestData = function(data){
  var str = [];
  for(var p in data) {
    var dataToSend = "";
    if (typeof data[p] == 'object'){
      dataToSend = encodeURIComponent(JSON.stringify(data[p]));
    } else {
      dataToSend = encodeURIComponent(data[p]);
    }
    str.push(encodeURIComponent(p) + "=" + dataToSend);
  }
  return str.join("&");
};

var checkForHeader = function(requestedHeadersArray, headersSent){
  var good = true;
  var headerContent = [];

  for (var i = 0; i < requestedHeadersArray.length; i++){
    if (headersSent[requestedHeadersArray[i].toLowerCase()] !== 'undefined') {
      headerContent.push({
        name: requestedHeadersArray[i],
        value: headersSent[requestedHeadersArray[i].toLowerCase()]
      });
    } else {
      good = false;
      break;
    }
  }

  return {
    check: good,
    data: headerContent
  };
};

var proxyRequest = function(  method,
                              route,
                              requestedHeadersArray,
                              originalRequest,
                              originalResponse){

  var headers = checkForHeader( requestedHeadersArray,
                                originalRequest.headers);

  if (!headers.check)
    return originalResponse.status(401);

  var proxy = {};
  var proxyRoute = backend; // + route;

  var routeParts = route.split("+");
  var paramNames = Object.keys(originalRequest.params);
  var endpoint = "";

  if (routeParts.length > 1) {
    for (var i = 0; i < paramNames.length; i++) {
      endpoint = endpoint + routeParts[i] + "/" +
        originalRequest.params[paramNames[i]];
    }
    if (endpoint.substr(endpoint.length - 1) !== "/")
      endpoint = endpoint + "/";
  } else {
    proxyRoute = proxyRoute + route;
    paramNames.forEach(function (paramName) {
      endpoint = endpoint + '/' + originalRequest.params[paramName] + '/';
    });
  }

  proxyRoute = proxyRoute + endpoint;

  console.log("=== ROUTE ===");
  console.log(method + " " + proxyRoute);
  console.log("PARAM");
  console.log(originalRequest.params);
  console.log("ORIGINAL BODY");
  console.log(originalRequest.body);


  switch(method){
    case "get":
      proxy = superagent.get(proxyRoute);
      break;
    case "post":
      proxy = superagent.post(proxyRoute);
      break;
    case "put":
      proxy = superagent.put(proxyRoute);
      break;
    case "delete":
      proxy = superagent.del(proxyRoute);
      break;
  }

  console.log("HEADERS");
  console.dir(headers.data);

  headers.data.forEach( function (header) {
    proxy.set(header.name, header.value);
  });

  proxy.set('Content-Type', 'application/x-www-form-urlencoded');

  if (method == "get"){
    console.log("ORIGINAL QUERY");
    console.log(originalRequest.body);
    proxy.query(originalRequest.body);
  } else if (method == "post" || method == "put") {
    var newBody = transformRequestData(originalRequest.body);
    console.log("NEW BODY");
    console.log(newBody);
    proxy.send(newBody);
  }

  proxy.end(function(err, backendResponse){
      console.log("RESPONSE BODY");
      console.log(backendResponse.text);
      console.log("RESPONSE STATUS");
      console.log(backendResponse.status);
      console.log("=== END ROUTE ===");
      originalResponse.status(backendResponse.status).send(backendResponse.text);
    });
};

// Serve a disabilitare il CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-AuthData, X-AuthToken");
  if ('OPTIONS' == req.method){
    return res.sendStatus(200);
  }

  next();
});

app.post('/users', function (req, res){
  proxyRequest('post', '/users', [], req, res);
});

app.get('/users/token', function (req, res){
  proxyRequest('get', '/users/token', ['X-AuthData'], req, res);
});

app.put('/users/pair', function (req, res){
  proxyRequest('put', '/users/pair', ['X-AuthToken'], req, res);
});

app.put('/users/recovery', function (req, res){
  proxyRequest('put', '/users/recovery', [], req, res);
});

app.get('/experiences', function (req,res) {
  proxyRequest('get', '/experiences', ['X-AuthToken'], req, res);
});

app.get('/paths/:from/:to', function (req, res) {
  proxyRequest('get', '/paths', [], req, res);
});

app.get('/poi/:from/:to', function (req, res) {
  proxyRequest('get', '/poi', [], req, res);
});

app.post('/experiences', function (req, res) {
  proxyRequest('post', '/experiences', ['X-AuthToken'], req, res);
});

app.delete('/experiences/:experienceId', function (req, res) {
  proxyRequest('delete', '/experiences', ['X-AuthToken'], req, res);
});

app.get('/experiences/:experienceId', function (req, res) {
  proxyRequest('get', '/experiences', ['X-AuthToken'], req, res);
});

app.get('/experiences/:experienceId/tracks/:trackId', function (req, res) {
  proxyRequest('get', '/experiences+/tracks', ['X-AuthToken'], req, res);
});

app.put('/experiences/:experienceId', function (req, res) {
  proxyRequest('put', '/experiences', ['X-AuthToken'], req, res);
});

app.get('/data/sync', function (req, res) {
  proxyRequest('get', '/data/sync', ['X-AuthToken'], req, res);
});

app.put('/data/sync', function (req, res) {
  proxyRequest('put', '/data/sync', ['X-AuthToken'], req, res);
});

var server = app.listen(4242, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Marvin "Life sucks" Proxy is listening at http://%s:%s', host, port);

});
