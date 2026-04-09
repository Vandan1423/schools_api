const express = require("express");
const path = require("path");
const router = express.Router();
const schoolsController = require("../controllers/schoolsController");

// Home route
// GET / — Home Route
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// POST /addSchool
router.post("/addSchool", schoolsController.addSchool);

// GET /listSchools?latitude=x&longitude=y
router.get("/listSchools", schoolsController.listSchools);

module.exports = router;
