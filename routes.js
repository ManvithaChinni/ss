const express = require("express");
const {
  createEvent,
  getAllEvents,
  joinEvent,
  fetchPlayers,
} = require("./controllers/eventController");
const { signup, login, validateToken } = require("./controllers/userController");

// Import models (adjust path as needed)
const { User, Event } = require("../models");

const router = express.Router();

// User Routes
router.post("/signup", signup);
router.post("/login", login);

// Event Routes (Protected by Token)
router.post("/events", validateToken, createEvent);
router.get("/events", validateToken, getAllEvents);
router.post("/events/:eventId/join", validateToken, joinEvent);
router.get("/events/:eventId/players", validateToken, fetchPlayers);

// New route for fetching joined events
router.get("/events/joined", validateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const joinedEvents = await UserEvent.findAll({
      where: { userId },
      include: [{ model: Event }],
    });

    const events = joinedEvents.map((entry) => entry.Event);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch joined events", details: error.message });
  }
});

module.exports = router;
