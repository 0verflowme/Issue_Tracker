const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: "String",
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		issues: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Issues",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
