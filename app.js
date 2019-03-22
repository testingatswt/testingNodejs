
// HTTP Request
const got = require('got');
// HTML Parser
const cheerio = require('cheerio');
// Persistent Storage
const fs = require('fs');
const express = require('express');
const app = express();

// //FIRST Delete the "whereamii.html" file
// if (fs.exists( __dirname + '/whereamii.html')) {
// 	fs.unlink( __dirname + '/whereamii.html', (err) => {
// 	  if (err) throw err;
// 	  console.log('successfully deleted  '+__dirname+'/whereamii.html');
// 	});
// }
// URL to get
const NOMAD_URL = 'https://nomadlist.com/petracca';
// Location to write
const save = __dirname + '/whereamii.html';
// Selector to find
const selector = '.location';
app.get('/run', (req, res)=>{


  got(NOMAD_URL).then((response) => {
    if(response.statusCode !== 200)
    return {
      msg: 'An errror occured',
      status: response.statusCode
    };
    const bod = response.body;
    const $ = cheerio.load(bod);
    // You can only get the children of the element - so mock the parent
    const prefix = `<div class="${selector.replace(/\./g,'')}">`;
    const suffix = '</div>';

    const $a = $(selector).find('a');
    return {
      text: $a.text(),
      url: $a.attr('href')
    };
  }).then((data)=>{
    res.status(200).send(data);
  });
});

var port = process.env.PORT || 8080,
ip   = process.env.IP   || '0.0.0.0';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
