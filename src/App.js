// Import React and necessary hooks from the 'react' library
import React, { useState, useEffect } from 'react';
// Import the Socket.IO client library
import io from 'socket.io-client';

// Connect to the Socket.IO server running on http://localhost:4000
const socket = io('http://localhost:4000');

// Define the App component
function App() {
  // Define state variables for storing messages and input message
  const [messages, setMessages] = useState([]); // Array to store received messages
  const [inputMessage, setInputMessage] = useState(''); // Input field for sending messages

  // Effect hook to handle side effects
  useEffect(() => {
    // Event listener for receiving messages from the server
    socket.on('message', (message) => {
      // Update the messages array with the received message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup function to remove the 'message' event listener when the component unmounts
    return () => {
      socket.off('message'); // Remove the 'message' event listener
    };
  }, []); // The effect runs only once after the initial render

  // Function to send a message to the server
  const sendMessage = () => {
    // Check if the input message is not empty
    if (inputMessage.trim() !== '') {
      // Emit the 'sendMessage' event to the server with the input message
      socket.emit('sendMessage', inputMessage);
      // Clear the input message field
      setInputMessage('');
    }
  };

  // JSX structure representing the UI of the component
  return (
    <div>
      {/* Heading for the chat app */}
      <h1>Simple Chat App</h1>
      {/* Display area for messages */}
      <div>
        {/* Map through the messages array and display each message */}
        {/* The color property is dynamically set using HSL (Hue, Saturation, Lightness) color model for visual clarity */}
        {messages.map((message, index) => (
          <div key={index} style={{ color: `hsl(${(index * 30) % 360}, 70%, 50%)` }}>
            {message}
          </div>
        ))}
      </div>
      {/* Input field and button for sending messages */}
      <div>
        {/* Input field for typing messages */}
        <input
          type="text"
          value={inputMessage}
          // Event handler to update the input message state when typing
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        {/* Button to send the message */}
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;
