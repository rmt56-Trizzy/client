import CardChatBox from "../../components/AI/CardChatBox";
import TopPlaceCard from "../../components/places/TopPlaceCard";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import ReviewCard from "../../components/ReviewCard";
import { motion } from "framer-motion";

const userReviews = [
  {
    id: 1,
    name: "Yudi",
    review: `"Trizzy completely changed how I plan my trips! I found the perfect hotels and got a seamless itinerary in minutes."`,
    img: "/img/review1.jpg",
  },
  {
    id: 2,
    name: "Josh",
    review: `"No more endless tabs and notes—Trizzy does it all! It found me a hidden gem of a hotel and crafted the perfect travel plan."`,
    img: "/img/review2.png",
  },
  {
    id: 3,
    name: "Jes",
    review: `"I love how Trizzy personalizes my itinerary! It feels like having a travel agent in my pocket."`,
    img: "/img/review3.jpg",
  },
  {
    id: 4,
    name: "Val",
    review: `"I used to spend hours researching hotels and places to visit. With Trizzy, it's all done in seconds!"`,
    img: "/img/review4.jpg",
  },
  {
    id: 5,
    name: "Bina",
    review: `"Trizzy took my travel stress away! It’s like having an AI concierge who just gets what I want."`,
    img: "/img/profile.png",
  },
];

const trustedBy = [
  {
    id: 1,
    name: "Booking.com",
    img: "https://layla.ai/logosArea/Booking.com%20hotel%20booking%20logo.svg",
  },
  {
    id: 2,
    name: "Get Your Guide",
    img: "https://layla.ai/logosArea/GetYourGuide.svg",
  },
  {
    id: 3,
    name: "Perplexity AI",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Perplexity_AI_logo.svg/2560px-Perplexity_AI_logo.svg.png",
  },

  {
    id: 4,
    name: "TripAdvisor",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/2560px-TripAdvisor_Logo.svg.png",
  },
  {
    id: 5,
    name: "Skyscanner",
    img: "https://layla.ai/logosArea/Skyscanner%20flight%20finder%20logo.svg",
  },
];

const topPlace = {
  data: {
    getGeneralRecommendations: [
      {
        _id: "679f8462d914738fbc1e1515",
        city: "Jakarta",
        country: "Indonesia",
        countryCode: "ID",
        cityImage:
          "https://www.agoda.com/wp-content/uploads/2024/02/Jakarta-Kota-Tua-Jakarta-old-town-1050x700.jpg",
        daysCount: 3,
      },
      {
        _id: "679f8462d914738fbc1e1516",
        city: "Seoul",
        country: "South Korea",
        countryCode: "KR",
        cityImage:
          "https://www.agoda.com/wp-content/uploads/2024/08/Namsan-Tower-during-autumn-in-Seoul-South-Korea.jpg",
        daysCount: 4,
      },
      {
        _id: "679f8462d914738fbc1e1517",
        city: "Tokyo",
        country: "Japan",
        countryCode: "JP",
        cityImage:
          "https://www.agoda.com/wp-content/uploads/2018/07/Experience-Tokyo_landmarks_Tokyo-Tower.jpg",
        daysCount: 5,
      },
      {
        _id: "679f8462d914738fbc1e1518",
        city: "London",
        country: "United Kingdom",
        countryCode: "GB",
        cityImage:
          "https://www.agoda.com/wp-content/uploads/2020/05/Featured-photo-aerial-of-River-Thames-Things-to-do-in-London-UK.jpg",
        daysCount: 4,
      },
      {
        _id: "679f8462d914738fbc1e1519",
        city: "Bangkok",
        country: "Thailand",
        countryCode: "TH",
        cityImage:
          "https://www.agoda.com/wp-content/uploads/2018/06/experiences_thailand_bangkok_wat-phra-kaew.jpg",
        daysCount: 3,
      },
    ],
  },
};

export default function Homepage() {
  return (
    <div className="max-w-screen">
      <div className="relative">
        <motion.img
          src="/img/banner.jpg"
          alt="banner"
          className="w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.span
          className="text-white font-bold lg:text-4xl text-xl md:text-2xl w-full absolute left-1/2 text-center -translate-x-1/2 top-8 md:top-18 lg:top-1/2 lg:-translate-y-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Hi, Welcome to Trizzy
          <p className="lg:p-2 md:p-1 hidden md:block">
            Velzy will help you to plan your next trip!
          </p>
        </motion.span>
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <CardChatBox />
        </div>
      </div>
      <motion.div
        className="md:mt-24 mt-19 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-700">
          Top Places to Visit
        </p>
        <div className="grid grid-cols-2 md:gap-5 gap-2 mt-5">
          {topPlace.data.getGeneralRecommendations.slice(0, 2).map((item) => (
            <motion.div
              key={item._id}
              className="col-span-1 lg:h-[270px] md:h-[190px] h-[100px]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TopPlaceCard topPlaces={item} />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-3 md:gap-5 gap-2 md:mt-5 mt-2">
          {topPlace.data.getGeneralRecommendations.slice(2, 5).map((item) => (
            <motion.div
              key={item._id}
              className="col-span-1 lg:h-[270px] md:h-[190px] h-[90px]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TopPlaceCard topPlaces={item} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 md:mt-15 lg:mt-18 md:text-5xl lg:text-6xl text-2xl font-semibold text-center text-slate-700">
          <motion.p
            className="font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Simplify your travel using our trip planner AI
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-base md:text-base text-xs md:mt-10 mt-5 md:px-10"
          >
            Meet Velzy from Trizzy, your ultimate AI travel assistant. From
            finding the perfect city to crafting the ideal itinerary, Trizzy
            makes planning your trips hassle-free. No more wasting your time
            planning your journey – Trizzy is all you need. Chat with Velzy to
            receive personalized recommendations based on your preferences, and
            get inspired with unique itinerary suggestions. Then, create your
            custom travel plan and make the most of every moment at the best
            hotels with Trizzy. Planning your dream vacation has never been
            easier!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex rounded-lg md:w-[330px] w-[180px] md:mt-10 mt-5 bg-slate-700 text-white mx-auto gap-3 justify-center items-center"
          >
            <button className="md:py-3 py-2.5 md:text-2xl text-sm">
              Plan a new trip
            </button>
            <MdOutlineFlightTakeoff className="md:text-3xl text-2xl" />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -400 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-[#21bcbe] text-white"
      >
        <div className="md:mt-16 mt-4 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0">
          <div className="lg:py-20 py-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:text-6xl md:text-4xl text-xl md:w-[450px] font-bold lg:w-[700px] text-center w-[250px] mx-auto"
            >
              Cool things people have said about Trizzy
            </motion.p>
            <div className="md:mt-10 lg:mt-18 mt-8">
              <div className="grid lg:grid-cols-2 grid-cols-1  md:gap-5 gap-2">
                {userReviews.slice(0, 2).map((review) => (
                  <motion.div
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    key={review.id}
                    className="col-span-1 lg:h-[170px] md:h-[140px] h-[100px]"
                  >
                    <ReviewCard
                      name={review.name}
                      review={review.review}
                      img={review.img}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-5 gap-2 md:mt-5 mt-2">
                {userReviews.slice(2, 5).map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="col-span-1 lg:h-[170px] md:h-[140px] h-[100px]"
                  >
                    <ReviewCard
                      name={review.name}
                      review={review.review}
                      img={review.img}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="lg:my-24 md:my-14 my-4 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0 text-slate-700">
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-bold text-center md:text-4xl lg:text-5xl text-xl "
        >
          Powerd by trusted names
        </motion.p>
        <div className="flex flex-col items-center md:mt-10 mt-3 gap-4 md:gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full my-4 lg:my-10 gap-8 lg:gap-5">
            {trustedBy.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-center items-center">
                <motion.img
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  src={item.img}
                  alt={item.name}
                  className="lg:max-w-[260px] lg:max-h-[60px] md:max-w-[180px] md:max-h-[50px] max-w-[90px] max-h-[25px]"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-2/3 mb-4 lg:mb-0 gap-8 lg:gap-5">
            {trustedBy.slice(3, 5).map((item) => (
              <div key={item.id} className="flex justify-center items-center">
                <motion.img
                  initial={{ opacity: 0, x: 200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  src={item.img}
                  alt={item.name}
                  className="lg:max-w-[260px] lg:max-h-[60px] md:max-w-[180px] md:max-h-[50px] max-w-[90px] max-h-[25px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
