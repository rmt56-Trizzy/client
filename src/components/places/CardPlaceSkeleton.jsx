import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import loading from "../../animations/loadingAnimation.json";
import Lottie from "lottie-react";

export default function CardPlaceSkeleton() {
  return (
    <div className="relative w-full mx-auto my-4 md:my-10">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 md:gap-4 
                      w-full mx-auto overflow-y-auto h-[360px] md:h-[390px] lg:h-[900px]"
      >
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} height={250} width={"100%"} borderRadius={10} />
        ))}
      </div>

      <div className="absolute inset-0 rounded-2xl flex justify-center items-center">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
}
