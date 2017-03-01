var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var UserComments = new Schema ({
	text: {
		type: String
	}
})

var Comments = mongoose.model('Comment', UserComments);

module.exports = Comments;