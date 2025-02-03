import TopPlaceCard from "../../components/places/TopPlaceCard";
import ChatBox from "../../components/AI/ChatBox";

export default function ChatPage() {
  return (
    <div className="flex lg:flex-row flex-col md:mx-auto lg:container px-4 lg:pb-20 py-5 md:pb-0 min-h-[95vh] lg:min-h-0 md:px-0 justify-center lg:my-0 md:mb-2">
      <div className="lg:w-1/3 md:w-[500px] px-4 lg:mx-0 justify-center flex items-center md:mx-auto">
        <ChatBox />
      </div>

      <div className="lg:w-2/3 mx-auto  px-4 w-[280px] md:w-[700px] justify-center lg:flex-col">
        <h2 className="md:text-3xl text-xl my-4 font-bold md:my-10 text-center text-slate-700">
          Destination
        </h2>

        <div className="grid grid-cols-1 md:pl-2 lg:pl-0 pl-0 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 md:gap-4 w-full mx-auto overflow-y-auto h-[360px] md:h-[390px] lg:h-[900px]">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="cursor-pointer h-[100px] md:h-[180px] lg:h-[270px] md:p-1"
            >
              <TopPlaceCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
