var cheerio = require('cheerio');

var generic = require('./generic.js');

var Generic = generic.Generic;

options = {
    url: "http://taraf.com.tr/rss/yazarlar/default.asp",
    OnBodyParse: function (html) {
	var $ = cheerio.load(html);
	return $('div[class=yazi]').html();
    },
    OnAuthorParse: function(item) {
	var title = item['rss:title']['#'];
	return (title.slice(0, title.indexOf('-')));
    },
    paper: {
	name: "Taraf",
	url: "www.taraf.com.tr"
    }
};

var reader = new Generic(options);

exports.Taraf = reader;
