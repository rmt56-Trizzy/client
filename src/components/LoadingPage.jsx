import loadingPageAnimation from "../animations/loadingPage.json";
import Lottie from "lottie-react";

export default function LoadingPage() {
  return (
    <div className="w-full h-[96vh] md:h-[95vh] flex justify-center items-center">
      <Lottie
        animationData={loadingPageAnimation}
        className="w-[200px] md:w-[300px]"
        loop={true}
      />
    </div>
  );
}
