import React, { useState, FormEvent, useRef, useEffect } from 'react';
// CORRECTED: Use the default export from your api.ts file
import api from '../services/api'; 

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Function to automatically scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsLoading(true);
    setUserInput('');

    try {
      // CORRECTED: Use the api.request function as defined in your final api.ts
      const data = await api.request('/chatbot/query', {
        method: 'POST',
        body: JSON.stringify({
          message: userMessage.text,
          language: 'en', // For now, we are hardcoding English
        })
      });

      const botResponse: ChatMessage = { 
        sender: 'bot', 
        text: data.response 
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorResponse: ChatMessage = { 
        sender: 'bot', 
        text: 'Sorry, an error occurred while connecting to the AI. Please try again later.' 
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto my-4 flex flex-col" style={{ height: '600px' }}>
      <div className="bg-green-700 text-white p-4 rounded-t-lg flex items-center">
        <h2 className="text-xl font-semibold">AyurBot Assistant</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-lg break-words ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="my-2 flex justify-start">
                 <div className="rounded-lg px-4 py-2 max-w-xs bg-gray-200 text-gray-800">
                    <span className="flex items-center">
                        <span className="dot-flashing"></span>
                    </span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-white rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 disabled:bg-gray-400"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

