import CardChatBox from "../../components/AI/CardChatBox";
import ThreeTopPlace from "../../components/places/ThreeTopPlace";
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
      <div className="md:mt-24 mt-18 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0">
        <p className="lg:text-3xl md:text-2xl font-semibold">
          Top Places to Visit
        </p>
        <div className="grid grid-cols-2 md:gap-5 gap-2 mt-5">
          <div className="col-span-1">
            <TwoTopPlaceCards />
          </div>
          <div className="col-span-1">
            <TwoTopPlaceCards />
          </div>
        </div>
        <div className="grid grid-cols-3 md:gap-5 gap-2 md:mt-5 mt-2">
          <div className="col-span-1">
            <ThreeTopPlace />
          </div>
          <div className="col-span-1">
            <ThreeTopPlace />
          </div>
          <div className="col-span-1">
            <ThreeTopPlace />
          </div>
        </div>
      </div>
    </div>
  );
}
