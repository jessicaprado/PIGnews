var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var PigNews = new Schema ({
	title: {
		type: String,
		sparse: true,
	},
	link: {
		type: String,
		sparse: true,
	},
	image: {
		type: String,
		sparse: true,
	},
	comment: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

var Articles = mongoose.model('PIG Articles', PigNews);

module.exports = Articles;