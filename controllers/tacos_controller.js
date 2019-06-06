var express = require("express");

var router = express.Router();

var taco = require("../models/taco.js");

router.get("/", function(req, res) {
    taco.all(function(data) {
        var hbsObject = {
            tacos: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/tacos/", function(req, res) {
    taco.create([
        "taco_name", "shell", "vegetarian", "picked_up"
    ], [
        req.body.taco_name, req.body.shell, req.body.vegetarian, req.body.picked_up
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/tacos/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    taco.update({
        picked_up: req.body.picked_up
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/tacos/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    taco.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;