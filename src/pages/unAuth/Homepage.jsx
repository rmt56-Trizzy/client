import CardChatBox from "../../components/AI/CardChatBox";
import TwoTopPlaceCards from "../../components/places/TwoTopPlaceCards";
import { MdOutlineFlightTakeoff } from "react-icons/md";

export default function Homepage() {
  return (
    <div className="max-w-screen">
      <div className="relative">
        <img src="/img/banner.jpg" alt="banner" className="w-full " />
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <CardChatBox />
        </div>
      </div>
      <div className="md:mt-24 mt-18 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0">
        <p className="lg:text-3xl md:text-2xl font-semibold">
          Top Places to Visit
        </p>
        <div className="grid grid-cols-2 md:gap-5 gap-2 mt-5">
          <div className="col-span-1 lg:h-[270px] md:h-[190px] h-[100px]">
            <TwoTopPlaceCards />
          </div>
          <div className="col-span-1 lg:h-[270px] md:h-[190px] h-[100px]">
            <TwoTopPlaceCards />
          </div>
        </div>
        <div className="grid grid-cols-3 md:gap-5 gap-2 md:mt-5 mt-2">
          <div className="col-span-1 lg:h-[270px] md:h-[190px] h-[90px]">
            <TwoTopPlaceCards />
          </div>
          <div className="col-span-1 lg:h-[270px] md:h-[190px] h-[90px]">
            <TwoTopPlaceCards />
          </div>
          <div className="col-span-1 lg:h-[270px] md:h-[190px] h-[90px]">
            <TwoTopPlaceCards />
          </div>
        </div>
        <div className="mt-10 md:mt-20 lg:mt-36 md:text-5xl lg:text-6xl text-2xl font-semibold text-center text-slate-700">
          <p className="font-bold">
            Simplify your travel using our trip planner AI
          </p>
          <p className="font-base md:text-base text-xs md:mt-10 mt-5 md:px-10">
            Meet Trizzy, your ultimate AI travel assistant. From finding the
            perfect hotel to crafting the ideal itinerary, Trizzy makes planning
            your trips seamless. No more juggling between hotel booking sites
            and itinerary planners – Trizzy is all you need. Chat with Trizzy to
            receive personalized hotel recommendations based on your
            preferences, and get inspired with unique itinerary suggestions.
            Then, create your custom travel plan and make the most of every
            moment at the best hotels with Trizzy. Planning your dream vacation
            has never been easier!
          </p>
          <div className="flex rounded-lg md:w-[330px] w-[180px] md:mt-10 mt-5 bg-slate-700 text-white mx-auto gap-3 justify-center items-center">
            <button className="md:py-3 py-2.5 md:text-2xl text-sm">
              Plan a new trip
            </button>
            <MdOutlineFlightTakeoff className="md:text-3xl text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
