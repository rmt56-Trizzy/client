import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import TwoTopPlaceCards from "../../components/places/TopPlaceCards";

export default function Chatbox() {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Bot',
      message: 'Hi, I am Velzy. How can I assist you today?',
    },
    {
      sender: 'User',
      message: 'I want to travel to West Europe',
    },
    {
      sender: 'Bot',
      message: 'How many days are planning for your trip?',
    },
    {
      sender: 'User',
      message: '5 days is enough',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: 'User',
          message: newMessage.trim(),
        },
      ]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex md:mx-auto lg:w-[1300px] md:w-[750px] px-4 md:px-0 min-h-screen bg-gray-50">
      <div className="w-1/3 p-4 max-h-screen flex items-center">
        <div className="w-full shadow-2xl rounded-xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-t-xl py-6 flex items-center px-6 font-bold text-2xl shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              <h2>Chat with Velzy</h2>
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-white h-[500px] overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'} w-full`}>
                <div
                  className={`rounded-2xl p-4 ${
                    msg.sender === 'User'
                      ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 shadow'
                  } w-fit max-w-[300px] transform transition-all duration-200 hover:scale-102`}
                >
                  <p className={`${msg.sender === 'User' ? 'text-right' : 'text-left'} leading-relaxed`}>
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white rounded-b-xl flex items-center w-full border-t border-gray-100">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-3 border rounded-full border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none px-4 shadow-sm"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              className="rounded-full bg-gradient-to-r from-teal-400 to-teal-500 p-3 ml-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <IoIosSend className="text-2xl text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-2/3 p-4 max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 relative">
          Destination
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-3 gap-6 justify-center">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="col-span-1 transform transition-all duration-200 hover:scale-105">
              <TwoTopPlaceCards />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}