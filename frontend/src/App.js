import React, { useState, useEffect } from 'react';
import './App.css';
import profilePic from './my-photo-guestbook.jpg';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [msgInput, setMsgInput] = useState('');

  // Fetch messages from backend
  useEffect(() => {
    fetch('http://localhost:3000/api/guestbook')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !msgInput) return;

    const res = await fetch('http://localhost:3000/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message: msgInput }),
    });

    if (res.ok) {
      const newMsg = await res.json();
      setMessages([newMsg[0], ...messages]);
      setMsgInput('');
    }
  };

  return (
    <div className="app-container">
      
      {/* HEADER */}
      <div className="profile-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h1 className="title">Welcome to my Guestbook</h1>
        <p className="subtitle">Leave a message below!</p>
      </div>

      {/* CARD FORM */}
      <div className="card-container">
        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          
          {/* NAME INPUT */}
          <input 
            type="text" 
            className="custom-input" 
            placeholder="Name" 
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {/* MESSAGE INPUT (TEXTAREA) */}
          <textarea 
            className="custom-textarea" 
            placeholder="Message" 
            value={msgInput}
            onChange={e => setMsgInput(e.target.value)}
          />

          {/* BUTTON */}
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      {/* DISPLAY MESSAGES */}
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