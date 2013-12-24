var _ = require('nimble');

var zaman = require('./Writers/zaman.js').Zaman;
var taraf = require('./Writers/taraf.js').Taraf;
var sabah = require('./Writers/sabah.js').Sabah;
var radikal = require('./Writers/radikal.js').Radikal;
var milliyet = require('./Writers/milliyet.js').Milliyet;
var hurriyet = require('./Writers/hurriyet.js').Hurriyet;


function Daily() {
    var self = this;
    
    self.papers = [zaman, taraf, radikal, milliyet, hurriyet, sabah];

    self.dailyEach = function(callback) {
	_.each(self.papers, function(reader) {
	    reader.Read().then(function (result) {
		_.each(result, function(journal) {
		    callback(reader, journal);
		});
	    });
	});
    }
}

exports.Daily = Daily;
