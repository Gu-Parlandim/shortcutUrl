import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema_url = new Schema({
	originURL: {
		type: String,
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	shortURL: {
		type: String,
		required: true
	}
	
})

export const URLModel = mongoose.model('URL', schema_url);

