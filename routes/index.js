const express = require("express");
const Router = express.Router();

const homeController = require("../controllers/homeController");

Router.get("/", homeController.home);
Router.post("/", homeController.createProj);
Router.get("/get/:id", homeController.getProj);
Router.post("/:id/newIssue", homeController.addIssue);
Router.post("/:id/search",homeController.search)

module.exports = Router;
