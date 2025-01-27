import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerDashboard = () => {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored here
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch all events
      const allEventsResponse = await axios.get("http://localhost:5000/api/events", {
        headers,
      });

      // Fetch joined events
      const joinedEventsResponse = await axios.get(
        "http://localhost:5000/api/events/joined",
        { headers }
      );

      const allEvents = allEventsResponse.data;
      const joinedEventsData = joinedEventsResponse.data;

      // Filter available events (not joined)
      const available = allEvents.filter(
        (event) => !joinedEventsData.some((joined) => joined.id === event.id)
      );

      setAvailableEvents(available);
      setJoinedEvents(joinedEventsData);
    } catch (err) {
      setError("Failed to fetch events. Please try again later.");
      console.error(err.message);
    }
  };

  const joinEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(`http://localhost:5000/api/events/${eventId}/join`, {}, { headers });
      alert("Successfully joined the event!");
      fetchEvents(); // Refresh event lists
    } catch (err) {
      alert("Failed to join the event. Please try again.");
      console.error(err.message);
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "20px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    },
    title: {
      textAlign: "center",
      color: "#333",
    },
    error: {
      textAlign: "center",
      color: "red",
      marginBottom: "10px",
    },
    eventsContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    section: {
      flex: 1,
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
      textAlign: "center",
      color: "#555",
    },
    eventsList: {
      listStyle: "none",
      padding: 0,
    },
    eventCard: {
      margin: "10px 0",
      padding: "15px",
      backgroundColor: "#f1f1f1",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    eventTitle: {
      margin: "0 0 10px",
      color: "#222",
    },
    eventDetail: {
      margin: "5px 0",
      color: "#555",
    },
    button: {
      display: "inline-block",
      marginTop: "10px",
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Player Dashboard</h1>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.eventsContainer}>
        {/* Available Events Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Available Events</h2>
          {availableEvents.length > 0 ? (
            <ul style={styles.eventsList}>
              {availableEvents.map((event) => (
                <li key={event.id} style={styles.eventCard}>
                  <h3 style={styles.eventTitle}>{event.name}</h3>
                  <p style={styles.eventDetail}>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p style={styles.eventDetail}>Location: {event.location}</p>
                  <button
                    style={styles.button}
                    onClick={() => joinEvent(event.id)}
                  >
                    Join Event
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No available events at the moment.</p>
          )}
        </div>

        {/* Joined Events Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Joined Events</h2>
          {joinedEvents.length > 0 ? (
            <ul style={styles.eventsList}>
              {joinedEvents.map((event) => (
                <li key={event.id} style={styles.eventCard}>
                  <h3 style={styles.eventTitle}>{event.name}</h3>
                  <p style={styles.eventDetail}>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p style={styles.eventDetail}>Location: {event.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't joined any events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
