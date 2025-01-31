export default function TwoTopPlaceCards() {
  return (
    <div className="relative">
      <div className="absolute top-0 rounded-lg left-0 w-full h-full bg-gradient-to-b from-blue-500/45 to-transparent z-10"></div>
      <img
        src="https://cf.bstatic.com/xdata/images/city/600x600/688053.jpg?k=da426cecdc6492da255ca0612c4bb41bd785b2565c83405f7281f15c05b16376&o="
        alt="jakarta"
        className="rounded-xl lg:h-[270px] lg:w-[540px] md:h-[190px] md:w-[380px] w-[165px] h-[100px] object-cover"
      />
      <div className="absolute md:top-2 md:p-5 top-0 p-1 flex md:gap-2 gap-1 items-center z-20">
        <p className="font-bold text-white md:text-2xl text-sm">Jakarta</p>
        <img
          src="/img/Indonesia flag.png"
          alt="indonesia-flag"
          className="w-2.5 h-2 md:w-[24px] md:h-[16px] md:mt-2"
        />
      </div>
    </div>
  );
}
