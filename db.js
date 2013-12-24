var mongoose = require('mongoose');
var schemas = require('./schemas.js');

var daily = require('./daily.js').Daily;
var Daily = new daily();


var DB_URI = process.env.MONGOHQ_URI || 'mongodb://localhost/test';

mongoose.connect(DB_URI);


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log(' - mongoose connected');
});


var Author = schemas.Author;
var Paper = schemas.Paper;
var Journal = schemas.Journal;


Daily.dailyEach(function (reader, journal) {
    var j = new Journal({paper: { name: reader.Paper.name, url: reader.Paper.url },
			 author: { name: journal.author },
			 title: journal.title ,
			 body: journal.body
			});

    j.save();
});
