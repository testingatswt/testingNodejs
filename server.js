var express = require('express');
var app = express();
var http = require('http');
var fs = require("fs");
var childProcess = require('child_process');

var http = require('http');

var nStatic = require('node-static');

var fileServer = new nStatic.Server('./');

http.createServer(function (req, res) {
console.log(req.url);
  if(req.url === "/index.html"){
    runScript('assets/bin/nomad.js', function (err) {
    if (err) throw err;
      console.log('finished running some-script.js');
    });

  }
  fileServer.serve(req, res);




}).listen(5000);

// http.createServer(function(request, response) {
//
// 	if(request.url === "/index"){
//     runScript('assets/bin/nomad.js', function (err) {
//     if (err) throw err;
//       console.log('finished running some-script.js');
//     });
// 		sendFileContent(response, "index.html", "text/html");
// 	}
// 	else if(request.url === "/"){
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
// 	}
// 	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
// 		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
// 	}
// 	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
// 		sendFileContent(response, request.url.toString().substring(1), "text/css");
// 	}
// 	else{
// 		console.log("Requested URL is: " + request.url);
// 		response.end();
// 	}
// }).listen(3000);

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}
