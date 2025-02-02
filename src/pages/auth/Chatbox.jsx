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
    <div className="flex md:mx-auto lg:w-[1300px] md:w-[750px] px-4 md:px-0 min-h-screen">
      <div className="w-1/3 p-4">
    {/* Chat Header */}
    <div className="bg-[#21bcbe] text-white rounded-t-xl h-18 flex items-center px-4 font-bold text-2xl">
      <h2>Chat with Velzy</h2>
    </div>

    {/* Messages Container */}
    <div className="bg-linear-to-t from-sky-500 to-indigo-500 h-[500px] overflow-y-auto p-4">
    {chatMessages.map((msg, index) => (
    <div key={index} className={`flex ${msg.sender==='User' ? 'justify-end' : 'justify-start' } w-full mb-4`}>
        <div className={`rounded-lg p-2 ${msg.sender==='User' ? 'bg-blue-700 text-white' : 'bg-gray-200' } w-fit
            max-w-[300px]`}>
            <p className={`${msg.sender==='User' ? 'text-right' : 'text-left' }`}>{msg.message}</p>
        </div>
    </div> ))}
    <div ref={messagesEndRef} />
</div>

    {/* Message Input */}
    <div className="p-4 bg-white rounded-b-xl flex items-center w-full border-gray-300 shadow-md">
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="w-full p-2 border rounded-full border-gray-300 focus:outline-none focus:ring focus:border-blue-500 resize-none px-3" 
        rows="1"
      />
      <button onClick={handleSendMessage} className="rounded-full bg-[#21bcbe] p-2 ml-2">
      <IoIosSend className="text-2xl text-white" />
      </button>
    </div>
    </div>
    <div className="w-2/3 p-4">
      <h2 className="text-2xl font-bold mb-10 text-center text-slate-700">
        Destination 
      </h2>
      <div className="grid grid-cols-3 gap-5 justify-center">
        <div className="col-span-1" >
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
        <div className="col-span-1">
            <TwoTopPlaceCards />    
        </div>
      </div>
    </div>
  </div>
  );
}

