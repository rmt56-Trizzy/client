import { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import TwoTopPlaceCards from "../../components/places/TopPlaceCards";

export default function Chatbox() {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "Bot",
      message: "Hi, I am Velzy. How can I assist you today?",
    },
    {
      sender: "User",
      message: "I want to travel to West Europe",
    },
    {
      sender: "Bot",
      message: "How many days are planning for your trip?",
    },
    {
      sender: "User",
      message: "5 days is enough",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: "User",
          message: newMessage.trim(),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex lg:flex-row flex-col md:mx-auto lg:container px-4 lg:pb-20 py-5 md:pb-0 min-h-[95vh] lg:min-h-0 md:px-0 justify-center lg:my-0 md:my-10">
      <div className="lg:w-1/3 md:w-[500px] px-4 lg:mx-0 justify-center flex items-center md:mx-auto">
        <div className="w-full shadow-2xl rounded-xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-t-xl md:py-6 py-4 flex items-center px-6 font-bold text-base md:text-2xl shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              <h2>Chat with Velzy</h2>
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-white h-[360px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "User" ? "justify-end" : "justify-start"
                } w-full`}
              >
                <div
                  className={`rounded-2xl py-2 px-3 md:p-3 lg:p-4 ${
                    msg.sender === "User"
                      ? "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-lg"
                      : "bg-gray-100 shadow"
                  } w-fit max-w-[300px] transform transition-all duration-200 hover:scale-102 text-xs md:text-base`}
                >
                  <p
                    className={`${
                      msg.sender === "User" ? "text-right" : "text-left"
                    } leading-relaxed`}
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white rounded-b-xl flex items-center w-full border-t border-gray-100">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-3 border md:text-sm text-xs rounded-full border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none px-4 shadow-sm"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              className="rounded-full bg-gradient-to-r from-teal-400 to-teal-500 md:p-3 p-2 ml-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <IoIosSend className="md:text-2xl text-xl text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:w-2/3 mx-auto px-4 w-[280px] md:w-[700px] justify-center lg:flex-col">
        <h2 className="md:text-3xl text-xl my-4 font-bold md:my-10 text-center text-slate-700">
          Destination
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 md:gap-4 w-full mx-auto overflow-y-auto h-[500px] md:h-[600px] lg:h-[800px]">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 hover:scale-102 cursor-pointer h-[100px] md:h-[190px] lg:h-[270px] md:p-1
            `}
            >
              <TwoTopPlaceCards />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
