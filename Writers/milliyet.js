var cheerio = require('cheerio');

var generic = require('./generic.js');

var Generic = generic.Generic;

options = {
    url: "http://www.milliyet.com.tr/D/rss/rss/RssY.xml",
    OnBodyParse: function (html) {
	var $ = cheerio.load(html);
	return $('#divAdnetKeyword3').html();
    },
    OnAuthorParse: function (item) {
	var title = item['rss:description']['#'];
	return (title.slice(title.lastIndexOf('-') + 1, title.length));
    },
    paper: {
	name: "Milliyet",
	url: "http://www.milliyet.com.tr"
    }
};

var reader = new Generic(options);
exports.Milliyet = reader;
