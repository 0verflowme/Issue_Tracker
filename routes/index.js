const express = require("express");
const Router = express.Router();

const homeController = require("../controllers/homeController");

Router.get("/", homeController.home);
Router.post("/", homeController.createProj);
Router.get("/get/:id", homeController.getProj);
Router.post("/:id/newIssue", homeController.addIssue);
Router.post("/:id/search", homeController.search);
Router.get("/delete/:projId/:issueId", homeController.removeIssue);
Router.get("/search/proj", homeController.searchProj);

module.exports = Router;
