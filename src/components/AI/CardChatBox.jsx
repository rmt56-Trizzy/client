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
  return (
    <div className="rounded-xl shadow-lg bg-white w-[343px] h-[100px] md:w-[618px] md:h-[154px] p-2.5">
      <div className="flex justify-between items-center">
        <img
          src="/img/profile.png"
          alt="profile"
          className="md:h-5.5 md:w-5.5 w-5 h-5"
        />
        <button className="px-2 py-1.5 cursor-pointer bg-slate-500 text-xs md:text-sm rounded-md text-white ">
          Ask Anything
        </button>
      </div>
      <div className="mt-2">
        <textarea
          placeholder={text}
          className="w-full outline-none focus:outline-none border-b border-gray-200 h-18 resize-none"
        />
      </div>
    </div>
  );
}
