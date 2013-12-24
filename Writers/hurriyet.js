var cheerio = require('cheerio');

var generic = require('./generic.js');

var Generic = generic.Generic;

options = {
    url: "http://rss.hurriyet.com.tr/rss.aspx?sectionId=9",
    OnBodyParse: function (html) {
	var $ = cheerio.load(html);
	return $('div[class=detailText]').html();
    },
    OnAuthorParse: function (item) {
	var title = item['rss:title']['#'];
	return (title.slice(title.lastIndexOf('-') + 1, title.length));
    },
    paper: {
	name: "Hurriyet",
	url: "http://www.hurriyet.com.tr"
    }
};

var reader = new Generic(options);
exports.Hurriyet = reader;
