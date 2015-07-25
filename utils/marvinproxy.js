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
    str.push(encodeURIComponent(p) + "=" +
      encodeURIComponent(data[p]));
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
  var proxyRoute = backend + route;

  console.log("=== ROUTE ===");
  console.log(method + " " + proxyRoute);
  console.log("PARAM");
  console.log(originalRequest.params);
  console.log("ORIGINAL BODY");
  console.log(originalRequest.body);

  Object.keys(originalRequest.params).forEach(function (paramName) {
    proxyRoute = proxyRoute + '/' + originalRequest.params[paramName] + '/';
  });

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
  }

  console.log("HEADERS");
  console.dir(headers.data);

  headers.data.forEach( function (header) {
    proxy.set(header.name, header.value);
  });

  proxy.set('Content-Type', 'application/x-www-form-urlencoded');

  if (method == "get"){
    proxy.query(originalRequest.body);
  } else if (method == "post" || method == "put")
    proxy.send(transformRequestData(originalRequest.body));

  proxy.end(function(err, backendResponse){
      console.log("RESPONSE BODY");
      console.log(backendResponse.text);
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

var server = app.listen(4242, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Marvin "Life sucks" Proxy is listening at http://%s:%s', host, port);

});
