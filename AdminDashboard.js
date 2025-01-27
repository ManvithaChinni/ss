import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });

  // Fetch events from the database
  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  // Create a new event
  const createEvent = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/events",
        newEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents();
      setNewEvent({ name: "", date: "", location: "" });
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div style={styles.card}>
        <h2 style={styles.subheading}>Create New Event</h2>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            style={styles.input}
          />
          <input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            style={styles.input}
          />
          <button onClick={createEvent} style={styles.button}>
            Create Event
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Event List</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.name} - {new Date(event.date).toLocaleString()} - {event.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default AdminDashboard;
