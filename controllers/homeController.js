const Projects = require("../models/project");
const Issues = require("../models/issue");

async function home(req, res) {
	let projects = await Projects.find();
	return res.render("home", {
		title: "Home",
		project: projects,
	});
}

async function createProj(req, res) {
	let existing = await Projects.findOne({
		name: req.query.name,
	});
	if (existing) {
		return res.status(401).json({
			message: "This Project name Already exists",
		});
	} else {
		let dbResp = await Projects.create({
			name: req.query.name,
			author: req.query.author,
			description: req.query.description,
		});
		return res.status(200).json({
			message: dbResp._id,
		});
	}
}

async function getProj(req, res) {
	let proj = await Projects.findById(req.params.id).populate("issues");
	// console.log(proj.issues.forEach(e => console.log(e.author)));
	return res.render("project", {
		project: proj,
		title: proj.name + " Issues",
		issues: proj.issues,
	});
}

async function addIssue(req, res) {
	try {
		let issue = await Issues.create({
			title: req.body.title,
			author: req.body.author,
			description: req.body.description,
			label: req.body.label,
			projectId: req.params.id,
			done: false,
		});
		let proj = await Projects.findById(req.params.id);
		proj.issues.push(issue._id);
		proj.save();
		// return res.status(200).json({
		// 	message: "Added to db Successfully",
		// });
		req.flash("success", "Added to db successfully");
		return res.redirect("back");
	} catch (err) {
		req.flash("error", "Internal Server Error");
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

async function search(req, res) {
	let proj = await Projects.findById(req.params.id);
	let data = [];
	let labels = Object.keys(req.body);
	if (labels.length > 0) {
		for (let x of labels) {
			var temp = await Issues.find({
				projectId: req.params.id,
				label: x,
			});
			if (temp.length > 0) {
				data.push(...temp);
			}
		}
	}
	return res.render("project", {
		title: proj.name + " Issues",
		project: proj,
		issues: data,
	});
}

module.exports = {
	home,
	createProj,
	getProj,
	addIssue,
	search,
};
