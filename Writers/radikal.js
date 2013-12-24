var FeedParser = require('feedparser')
, request = require('request');

var cheerio = require('cheerio');

var Q = require('q');
var _ = require('nimble');

function RadikalReader() {
    var self = this;

    self.Paper = {
	name: "Radikal",
	url: "www.radikal.com.tr"
    }

    self.Authors = function () {
	var deferred = Q.defer();
	var result = [];
	
	request('http://www.radikal.com.tr/d/rss/RssYazarlar.xml')
	    .pipe(new FeedParser())
	.on('readable', function() {
	    var stream = this, item;

	    while (item = stream.read()) {
		result.push(item);
	    }
	    
	})
	    .on('end', function () {
		deferred.resolve(result);
	    });
	return deferred.promise;
     }

    self.Body = function(html) {
	var $ = cheerio.load(html);
	return $('.BlackContent').html();
    }

    self.Author = function(item) {
	var title = item['rss:title']['#'];

	return (title.slice(title.lastIndexOf('-', title.lastIndexOf('-') - 1) + 1, title.lastIndexOf('-')));
    }

    self.Read = function() {
	var deferred = Q.defer();
	
	 self.Authors().then(function (result) {
	     _.map(result, function(item, cb) {
		 
		 item.author = self.Author(item);
		 
		request(item.link, function(error, response, body) {
		    item.body = self.Body(body);
		    cb(null, item);
		});
	    }, function (err, result) {
		deferred.resolve(result);
	    });
	});

	return deferred.promise;
    }
}


var reader = new RadikalReader();

exports.Radikal = reader;
