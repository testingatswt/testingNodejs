// HTTP Request
const got = require('got');
// HTML Parser
const cheerio = require('cheerio');
// Persistent Storage
const fs = require('fs');

// URL to get
const NOMAD_URL = 'https://nomadlist.com/petracca';
// Location to write
const save = __dirname + '/whereamii.html';
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
}).then((data) => fs.writeFile(save, data));
