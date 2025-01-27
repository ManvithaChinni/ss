const { Event, UserEvent } = require("../../models");

// Fetch all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events", details: error.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const { name, date, location, teams } = req.body;

  try {
    if (!name || !date || !location) {
      return res.status(400).json({ error: "Name, date, and location are required" });
    }

    // Create a new event in the database
    const event = await Event.create({ name, date, location, teams: teams || [] });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event", details: error.message });
  }
};

// Join an event
const joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id; // Ensure `validateToken` attaches user info to `req`

  try {
    // Check if the event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user has already joined the event
    const existingEntry = await UserEvent.findOne({ where: { eventId, userId } });
    if (existingEntry) {
      return res.status(400).json({ message: "You have already joined this event." });
    }

    // Add the user to the event
    await UserEvent.create({ eventId, userId });

    res.status(200).json({ message: "Successfully joined the event", event });
  } catch (error) {
    console.error("Error joining event:", error);
    res.status(500).json({ error: "Failed to join the event", details: error.message });
  }
};

module.exports = { getAllEvents, createEvent, joinEvent };
