import { useNavigate } from "react-router";
import { useTypewriter } from "react-simple-typewriter";
import { IoIosSend } from "react-icons/io";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { toastError } from "../../utils/swallAlert";
import HashLoader from "react-spinners/HashLoader";

const CREATE_CHAT = gql`
  mutation Mutation($payload: CreateChatInput) {
    createChat(payload: $payload) {
      _id
      userId
      messages {
        sender
        message
      }
    }
  }
`;

export default function CardChatBox() {
  const [chat, setChat] = useState("");
  const navigate = useNavigate();

  const [createChat, { loading }] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      console.log(data);
      navigate(`/chat/${data.createChat._id}`);
    },
    onError: (error) => {
      toastError(error);
    },
  });
  const handleCreateMessage = (e) => {
    e.preventDefault();
    createChat({
      variables: {
        payload: {
          userMessage: chat,
        },
      },
    });
  };
  const [text] = useTypewriter({
    words: [
      "Luxury hotels in Bali for a honeymoon?",
      "Hotel recommendations near the beach in Phuket?",
      "I need a hotel in Jakarta with free breakfast...",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const textSuggestion = [
    "Inspire me where to go",
    "Create a new Trip",
    "Honeymoon",
    "Summer Trip",
  ];

  return (
    <div className="rounded-xl shadow-lg bg-white w-[305px] h-[100px] md:w-[618px] md:h-[154px] p-2.5">
      <div className="flex gap-3 items-center">
        <img
          src="/img/Velzy.png"
          alt="profile"
          className="md:h-5.5 md:w-5.5 w-5 h-5 object-cover"
        />
        <p className="me-auto md:text-sm text-xs text-gray-600 truncate">
          Hi, I am Velzy. How can I assist you today?
        </p>

        {loading ? (
          <button className="md:w-[105.59px] md:h-[32px] h-[28px] w-[32px] flex justify-center items-center cursor-pointer bg-teal-500 text-xs md:text-sm rounded-md text-white">
            <HashLoader size={14} color="white" />
          </button>
        ) : (
          <button
            className="md:px-2 md:py-1.5 p-1 cursor-pointer bg-teal-500 text-xs md:text-sm rounded-md text-white"
            onClick={handleCreateMessage}>
            <span className="md:block hidden">Ask Anything</span>
            <IoIosSend className="text-xl text-white md:hidden" />
          </button>
        )}
      </div>
      <div className="mt-2">
        <textarea
          placeholder={text}
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          className="w-full outline-none focus:outline-none md:border-b text-xs md:text-sm lg:text-base font-semibold border-gray-200 h-14 md:h-15 resize-none"
        />
      </div>
      <div className="hidden md:flex items-center h-8 text-sm justify-between">
        {textSuggestion.map((suggestion, index) => (
          <p
            key={index}
            className="rounded-md bg-gray-100 text-gray-400 px-1 py-0.5">
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
}
