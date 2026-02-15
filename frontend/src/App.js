import React, { useState, useEffect } from 'react';
import './App.css';
import profilePic from './my-photo-guestbook.jpg';

// Example: https://react-nest-js-supabase-app-api.vercel.app
const BACKEND_URL = 'https://react-nest-js-supabase-app.vercel.app';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [msgInput, setMsgInput] = useState('');

  // Fetch messages from backend
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/guestbook`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !msgInput) return;

    const res = await fetch(`${BACKEND_URL}/api/guestbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message: msgInput }),
    });

    if (res.ok) {
      const newMsg = await res.json();
      // NestJS/Supabase usually returns an array for inserts
      setMessages([Array.isArray(newMsg) ? newMsg[0] : newMsg, ...messages]);
      setMsgInput('');
    }
  };

  return (
    <div className="app-container">
      <div className="profile-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h1 className="title">Welcome to my Guestbook</h1>
        <p className="subtitle">Leave a message below!</p>
      </div>

      <div className="card-container">
        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <input 
            type="text" 
            className="custom-input" 
            placeholder="Name" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea 
            className="custom-textarea" 
            placeholder="Message" 
            value={msgInput}
            onChange={e => setMsgInput(e.target.value)}
          />
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <strong>{msg.name}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;