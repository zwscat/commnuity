var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test',{ useMongoClient: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
	email : {
		type: String,
		require: true
	},
	nickname: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	created_time: {
		type: Date,
		default: Date.now
	},
	last_modified_time: {
		type: Date,
		default: Date.ow
	},
	avater: {
		type: String,
		default: '/public/img/avatar-default.png'
	},
	bio: {
		type: String,
		default: ''
	},
	gender: {
		type: Number,
		enum: [-1, 0, 1],
		default: -1
	},
	birthday: {
		type: Date,
		default: ''
	}
})

module.exports = mongoose.model('User', userSchema)