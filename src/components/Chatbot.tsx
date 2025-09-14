import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { apiRequest } from '../services/api';

// Define the structure for a single chat message
interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    setUserInput('');

    try {
      // Use your apiRequest helper instead of axios
      const data = await apiRequest('/chatbot/query', {
        method: 'POST',
        body: JSON.stringify({
          message: userMessage.text,
          language: 'en',
        }),
      });

      const botResponse: ChatMessage = {
        sender: 'bot',
        text: data?.response || 'No response received from server.',
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorResponse: ChatMessage = {
        sender: 'bot',
        text: 'Sorry, I am having trouble connecting to the AI brain. Please try again later.',
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto my-4 flex flex-col"
      style={{ height: '600px' }}
    >
      {/* Header */}
      <div className="bg-green-700 text-white p-4 rounded-t-lg flex items-center">
        <h2 className="text-xl font-semibold">AyurBot Assistant</h2>
      </div>

      {/* Message Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-lg break-words ${
                msg.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
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

      {/* Input Form */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
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
