var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var PigNews = new Schema ({
	title: {
		type: String,
	},
	link: {
		type: String,
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}
});

var Articles = mongoose.model('PIG Articles', PigNews);

module.exports = Articles;