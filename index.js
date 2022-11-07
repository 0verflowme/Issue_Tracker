const express = require("express");
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");
var session = require("express-session");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

const db = require("./config/mongoose");
const Projects = require("./models/project");
const Issues = require("./models/issue");

const app = express();
const PORT = 8000;

app.use(ejsLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assets"));
app.use(
	session({
		cookie: { maxAge: 60000 },
		secret: "kekburger",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(flash());
app.use(customMiddleware.setFlash);

const routes = require("./routes");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", routes);

app.listen(PORT, () => {
	console.log("Server is running on Port:", PORT);
});
