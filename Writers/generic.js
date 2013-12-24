var FeedParser = require('feedparser')
, request = require('request');

var cheerio = require('cheerio');

var Q = require('q');
var _ = require('nimble');

function GenericReader(options) {
    var self = this;

    self.Paper = options.paper;

    self.Authors = function () {
	var deferred = Q.defer();
	var result = [];
	
	request(options.url)
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
	return options.OnBodyParse(html);
    }

    self.Author = function(item) {
	return options.OnAuthorParse(item);
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


var reader = GenericReader;


exports.Generic = reader;
