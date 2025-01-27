const express = require("express");
const { createEvent, getAllEvents } = require("./controllers/eventController");
const { signup, login, validateToken } = require("./controllers/userController");

const router = express.Router();

// User Routes
router.post("/signup", signup);
router.post("/login", login);

// Event Routes (Protected by Token)
router.post("/events", validateToken, createEvent);
router.get("/events", validateToken, getAllEvents);

module.exports = router;
