export default function ReviewCard() {
  return (
    <div className="flex gap-4 bg-[#b0efef] justify-center items-center rounded-lg md:p-3 p-2 h-full">
      <img
        src="/img/review1.jpg"
        alt="review1"
        className="lg:w-10 lg:h-10 w-8 h-8 rounded-full"
      />
      <p className="font-semibold md:text-base text-xs text-black">
        &quot;Trizzy completely changed how I plan my trips! I found the perfect
        hotels and got a seamless itinerary in minutes.&quot;
      </p>
    </div>
  );
}
