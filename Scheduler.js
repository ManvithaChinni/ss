import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scheduler = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1>Sports Scheduler</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.date} at {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scheduler;
