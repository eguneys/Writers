var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
    name: String,
    photo: String,
    desc: String,
});

var paperSchema = mongoose.Schema({
    name: String,
    url: String,
});


var journalSchema = mongoose.Schema({
    paper: {name: String, url: String},
    author: {name: String, photo: String },
    title: String,
    body: String,
    date: { type: Date, default: Date.now},
    meta: {
	votes: Number,
	favs: Number,
	tags: { type: String, lowercase: true, trim: true }
    }
});


var Author = mongoose.model('Author', authorSchema);
var Paper = mongoose.model('Paper', paperSchema);
var Journal = mongoose.model('Journal', journalSchema);

exports.Author = Author;
exports.Paper = Paper;
exports.Journal = Journal;
