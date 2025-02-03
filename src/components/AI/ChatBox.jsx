import { useRef, useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";

export default function ChatBox() {
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
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", message: newMessage.trim() },
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
    <div className="w-full shadow-2xl rounded-xl">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-t-xl md:py-6 py-4 flex items-center px-6 font-bold text-base md:text-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
          <h2>Chat with Velzy</h2>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="bg-white h-[360px] md:h-[500px] overflow-y-scroll pl-4 py-4 md:pl-6 md:pr-2 space-y-4"
      >
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            } w-full`}
          >
            <div
              className={`rounded-2xl py-1 px-3 md:py-1.5 ${
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
      </div>

      {/* Input & Send Button */}
      <div className="p-4 bg-white rounded-b-xl flex items-center w-full border-t border-gray-100">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="w-full p-2 md:p-3 border md:text-sm text-xs rounded-full border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none px-4 shadow-sm"
          rows="1"
        />
        <button
          onClick={handleSendMessage}
          className="rounded-full bg-gradient-to-r felx justify-center items-center from-teal-400 to-teal-500 md:p-3 p-1.5 ml-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <IoIosSend className="md:text-2xl text-xl text-white" />
        </button>
      </div>
    </div>
  );
}
