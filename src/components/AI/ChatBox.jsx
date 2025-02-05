import { useRef, useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import chatAnimation from "../../animations/chatAnimation.json";
import Lottie from "lottie-react";

const GET_CHAT_BY_ID = gql`
  query GetChatById($id: ID!) {
    getChatById(_id: $id) {
      _id
      userId
      messages {
        sender
        message
      }
    }
  }
`;

const SAVE_CHAT_FROM_USER = gql`
  mutation SaveReplyFromUser($payload: SaveChatInput) {
    saveReplyFromUser(payload: $payload) {
      _id
      userId
      messages {
        sender
        message
      }
    }
  }
`;

const GET_REPLY_FROM_BOT = gql`
  mutation GetReplyFromBot($chatId: ID!) {
    getReplyFromBot(chatId: $chatId) {
      _id
      userId
      messages {
        sender
        message
      }
    }
  }
`;

const GET_RECOMMENDATION = gql`
  query GetRecommendations($chatId: ID!) {
    getRecommendations(chatId: $chatId) {
      _id
    }
  }
`;

export default function ChatBox({ generateRecommendation }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [endChat, setEndChat] = useState(false);
  const chatContainerRef = useRef(null);

  const params = useParams();
  const { id } = params;

  const { data } = useQuery(GET_CHAT_BY_ID, {
    variables: {
      id: id,
    },
  });

  const { data: recommendations } = useQuery(GET_RECOMMENDATION, {
    variables: {
      chatId: id,
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data?.getRecommendations?.length > 0) {
        setEndChat(true);
      }
    },
  });

  const [saveReplyFromUser] = useMutation(SAVE_CHAT_FROM_USER);
  const [getReplyFromBot, { loading }] = useMutation(GET_REPLY_FROM_BOT, {
    onCompleted: (data) => {
      setChatMessages(data.getReplyFromBot.messages);
    },
  });

  useEffect(() => {
    if (data) {
      setChatMessages(data.getChatById.messages);
      if (data.getChatById.messages.length > 4) {
        setShowGenerateButton(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", message: newMessage.trim() },
      ]);
      setNewMessage("");
      await saveReplyFromUser({
        variables: {
          payload: {
            chatId: id,
            userMessage: newMessage.trim(),
          },
        },
      });
      await getReplyFromBot({
        variables: {
          chatId: id,
        },
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateResponse = () => {
    generateRecommendation();
    setEndChat(true);
  };

  return (
    <div
      className={`w-full shadow-2xl rounded-xl ${
        endChat ? "hidden md:block" : ""
      }`}>
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
        className="bg-white h-[360px] md:h-[500px] overflow-y-scroll pl-4 py-4 md:pl-6 md:pr-2 space-y-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            } w-full`}>
            <div
              className={`rounded-2xl py-1 px-3 md:py-1.5 ${
                msg.sender === "User"
                  ? "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-lg"
                  : "bg-gray-100 shadow"
              } w-fit max-w-[300px] transform transition-all duration-200 hover:scale-102 text-xs md:text-base`}>
              <p
                className={`${
                  msg.sender === "User" ? "text-right" : "text-left"
                } leading-relaxed`}>
                {msg.message}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <Lottie animationData={chatAnimation} loop={true} className="w-20" />
        )}
      </div>

      {/* Input & Send Button */}
      <div className="p-4 bg-white rounded-b-xl flex items-center w-full border-t border-gray-100">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={endChat ? "Chat has ended" : "Type your message..."}
          disabled={endChat}
          className={`w-full p-2 md:p-3 border md:text-sm text-xs rounded-full border-gray-200 ${
            !endChat
              ? "focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              : "bg-gray-100"
          } resize-none px-4 shadow-sm`}
          rows="1"
        />
        {endChat ? (
          <button
            className={`rounded-full flex justify-center items-center md:p-3 p-1.5 ml-2 shadow-lg transition-all duration-200 bg-gray-400`}>
            <IoIosSend className="md:text-2xl text-xl text-white" />
          </button>
        ) : (
          <button
            onClick={handleSendMessage}
            className={`rounded-full flex justify-center items-center md:p-3 p-1.5 ml-2 shadow-lg transition-all duration-200 bg-gradient-to-r from-teal-400 to-teal-500 hover:shadow-xl hover:scale-105 cursor-pointer`}>
            <IoIosSend className="md:text-2xl text-xl text-white" />
          </button>
        )}
      </div>
      {showGenerateButton && (
        <div className="p-4 bg-white rounded-b-xl flex items-center w-full">
          {endChat ? (
            <button
              className={`w-full rounded-full flex justify-center items-center md:p-3 p-1.5 ml-2 shadow-lg transition-all duration-200 bg-gray-400`}>
              Recommendation Generated
            </button>
          ) : (
            <button
              onClick={handleGenerateResponse}
              className={`w-full text-white rounded-full flex justify-center items-center md:p-3 p-1.5 ml-2 shadow-lg transition-all duration-200 bg-gradient-to-r from-teal-400 to-teal-500 hover:shadow-xl hover:scale-102 cursor-pointer
              `}>
              End Chat and Generate Recommendations
            </button>
          )}
        </div>
      )}
    </div>
  );
}

ChatBox.propTypes = {
  generateRecommendation: PropTypes.func.isRequired,
};
