import { useNavigate } from "react-router";
import { useTypewriter } from "react-simple-typewriter";

export default function CardChatBox() {
  const [text] = useTypewriter({
    words: [
      "Luxury hotels in Bali for a honeymoon?",
      "Hotel recommendations near the beach in Phuket?",
      "I need a hotel in Jakarta with free breakfast...",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const navigate = useNavigate();

  const textSuggestion = [
    "Inspire me where to go",
    "Create a new Trip",
    "Find family hotels in Dubai",
    "Summer Trip",
  ];

  const handleAskAi = () => {
    navigate("/chat");
  };
  return (
    <div className="rounded-xl shadow-lg bg-white w-[305px] h-[100px] md:w-[618px] md:h-[154px] p-2.5">
      <div className="flex justify-between items-center">
        <img
          src="/img/Velzy.png"
          alt="profile"
          className="md:h-5.5 md:w-5.5 w-5 h-5 object-cover"
        />
        <button
          className="px-2 py-1.5 cursor-pointer bg-teal-500 text-xs md:text-sm rounded-md text-white"
          onClick={handleAskAi}
        >
          Ask Anything
        </button>
      </div>
      <div className="mt-2">
        <textarea
          placeholder={text}
          className="w-full outline-none focus:outline-none border-b text-xs md:text-sm lg:text-base font-semibold border-gray-200 h-14 md:h-15 resize-none"
        />
      </div>
      <div className="hidden md:flex items-center h-8 text-sm justify-between">
        {textSuggestion.map((suggestion, index) => (
          <p
            key={index}
            className="rounded-md bg-gray-100 text-gray-400 px-1 py-0.5"
          >
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
}
