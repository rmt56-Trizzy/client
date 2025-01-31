import CardChatBox from "../../components/AI/CardChatBox";

export default function Homepage() {
  return (
    <div className="max-w-screen">
      <div className="relative">
        <img src="/img/banner.jpg" alt="banner" className="w-full " />
        <div className="mx-auto container">
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
            <CardChatBox />
          </div>
        </div>
      </div>
    </div>
  );
}
