var cheerio = require('cheerio');

var generic = require('./generic.js');

var Generic = generic.Generic;

options = {
    url: "http://sabah.com.tr.feedsportal.com/c/33784/f/606067/index.rss",
    OnBodyParse: function (html) {
	var $ = cheerio.load(html);
	return $('#contextual').html();
    },
    OnAuthorParse: function(item) {
	var title = item['rss:title']['#'];

	return (title.slice(0, title.indexOf('/')));
    },
    selectorLink: "rss:link",
    paper: {
	name: "sabah",
	url: "www.sabah.com.tr"
    }
};

var reader = new Generic(options);
exports.Sabah = reader;
