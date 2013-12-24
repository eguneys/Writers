var cheerio = require('cheerio');

var generic = require('./generic.js');

var Generic = generic.Generic;

options = {
    url: "http://www.zaman.com.tr/yazarlar.rss",
    OnBodyParse: function (html) {
	var $ = cheerio.load(html);
	return $('[itemprop=articleBody]').html();
    },
    OnAuthorParse: function (item) {
	return (item['dc:creator']['#']);
    },
    paper: {
	name: "Zaman",
	url: "www.zaman.com.tr"
    }
};

var reader = new Generic(options);

exports.Zaman = reader;
