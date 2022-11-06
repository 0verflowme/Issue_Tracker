const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const issueScheme = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		projectId: {
			type: String,
			required: true,
		},
		done: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

const Issues = mongoose.model("Issues", issueScheme);
module.exports = Issues;
