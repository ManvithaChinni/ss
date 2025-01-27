import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [teams, setTeams] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name,
      date,
      location,
      teams: teams.split(',').map((team) => team.trim()),
    };

    try {
      await axios.post('http://localhost:5000/api/events', eventData);
      alert('Event created successfully!');
      setName('');
      setDate('');
      setLocation('');
      setTeams('');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create the event.');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teams">Teams (comma-separated):</label>
          <input
            type="text"
            id="teams"
            value={teams}
            onChange={(e) => setTeams(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
