//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    childProcess = require('child_process');

Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));
app.use(express.static(__dirname + ''));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
//     ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';



app.get('/run-script', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if(req.url === "/index"){
    runScript('views/nomad.js', function (err) {
    if (err) throw err;
      console.log('finished running nomad.js');
    });

  }
    res.render('index.html');

});

app.get('/getnomad-data', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  res.render('whereamii.html');
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});



app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;


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
