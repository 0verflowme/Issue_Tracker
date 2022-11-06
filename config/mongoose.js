const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/IssueTracker");

const db = mongoose.connection;

db.on("err", console.error.bind(console, "Connection Error"));
db.once("open", () => {
	console.log("Connection to db Successful");
});
