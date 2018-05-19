
// HTTP Request
const got = require('got');
// HTML Parser
const cheerio = require('cheerio');
// Persistent Storage
const fs = require('fs');
// require('colors');
var JsDiff = require('diff');

var org_fileStr = fs.readFileSync(__dirname + '/whereamii.html','utf8'),
		temp_fileStr = fs.readFileSync(__dirname + '/temp.html','utf8');

//
//
//
 //var diff =JsDiff.diffTrimmedLines(org_fileStr, temp_fileStr);
// // diff.forEach(function(part){
// //   // green for additions, red for deletions
// //   // grey for common parts
// //   var color = part.added ? 'green' :
// //     part.removed ? 'red' : 'pink';
// //   process.stderr.write(part.value[color]);
// // });
// console.log(diff);
// //FIRST Delete the "whereamii.html" file
// try {
// 	fs.unlink( __dirname + '/whereamii.html', (err) => {
// 	  if (err) throw err;
// 	  console.log('successfully deleted  '+__dirname+'/whereamii.html');
// 	});
// } catch (e) {
// 	console.log(e);
// }
// fs.stat( __dirname + '/whereamii.html', function(err, stat) {
//     if(err == null) {
//         console.log(stat);
// 				fs.unlink( __dirname + '/whereamii.html', (err) => {
// 				  if (err) throw err;
// 				  console.log('successfully deleted  '+__dirname+'/whereamii.html');
// 				});
//     } else if(err.code == 'ENOENT') {
//         // file does not exist
//         fs.writeFile('log.txt', 'Some log\n');
//     } else {
//         console.log('Some other error: ', err.code);
//     }
// });

// const buf_org = Buffer.from( __dirname + '/whereamii.html');
// const buf_temp = Buffer.from( __dirname + '/temp.html');
//
// var index = 0,
//     length = buf_temp.length,
//     match = true;
//
// while (index < length) {
//     if (buf_temp[index] === buf_temp[index]) {
//         index++;
// 				console.log(buf_temp[index] + '     '+buf_org[index]);
//     } else {
//         match = false;
//         break;
//     }
// }

//console.log(match);


// URL to get
const NOMAD_URL = 'https://nomadlist.com/petracca';
// Location to write
const save = __dirname + '/whereamii.html';

const save_tmp = __dirname + '/temp.html';
// Selector to find
const selector = '.location';

got(NOMAD_URL).then((response) => {
	if(response.statusCode !== 200)
		return;



	const bod = response.body;

	const $ = cheerio.load(bod);
	// You can only get the children of the element - so mock the parent
	const prefix = `<div class="${selector.replace(/\./g,'')}">`;
	const suffix = '</div>';

	return $(selector).html();
}).then((data) => {

 var diff =JsDiff.diffTrimmedLines(org_fileStr, temp_fileStr);
 if (diff.length > 1) {
 	// dont match
	fs.stat( __dirname + '/whereamii.html', function(err, stat) {
	    if(err == null) {
	        //console.log(stat);
					fs.unlink( __dirname + '/whereamii.html', (err) => {
					  if (err) throw err;
					  console.log('successfully deleted  '+__dirname+'/whereamii.html');
					});
	    }
			fs.writeFile(save, data);
			fs.writeFile(save_tmp, data)
	});
 }
 else {
	 //fs.writeFile(save, data);
 		fs.writeFile(save_tmp, data)
 }
 //console.log(diff);

});
