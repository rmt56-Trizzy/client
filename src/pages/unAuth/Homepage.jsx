import CardChatBox from "../../components/AI/CardChatBox";
import TwoTopPlaceCards from "../../components/places/TwoTopPlaceCards";

export default function Homepage() {
  return (
    <div className="max-w-screen">
      <div className="relative">
        <img src="/img/banner.jpg" alt="banner" className="w-full " />
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <CardChatBox />
        </div>
      </div>
      <div className="mt-24 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0">
        <p className="text-3xl font-semibold">Top Places to Visit</p>
        <div className="grid grid-cols-2 md:gap-5 gap-2 mt-5">
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
