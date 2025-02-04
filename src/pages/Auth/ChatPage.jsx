import TopPlaceCard from "../../components/places/TopPlaceCard";
import ChatBox from "../../components/AI/ChatBox";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router";
import CardPlaceSkeleton from "../../components/places/CardPlaceSkeleton";
import LoadingPage from "../../components/LoadingPage";

const GENERATE_RECOMMENDATION = gql`
  mutation GenerateRecommendations($chatId: ID!) {
    generateRecommendations(chatId: $chatId) {
      _id
      city
      country
      countryCode
      cityImage
      daysCount
      chatId
      userId
    }
  }
`;

const GET_RECOMMENDATION = gql`
  query GetRecommendations($chatId: ID!) {
    getRecommendations(chatId: $chatId) {
      _id
      city
      country
      countryCode
      cityImage
      daysCount
      chatId
      userId
    }
  }
`;

const GENERATE_RECOMMENDATION_DETAILS = gql`
  mutation GenerateRecommendationDetails($recommendationId: ID!) {
    generateRecommendationDetails(recommendationId: $recommendationId) {
      _id
      city
      country
      countryCode
      cityImage
      daysCount
      itineraries {
        day
        locations {
          slug
          name
          image
          category
          coordinates
        }
      }
      chatId
      userId
      viewAccess
    }
  }
`;

export default function ChatPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [isRecommendationGenerated, setIsRecommendationGenerated] =
    useState(false);

  const params = useParams();
  const { id } = params;

  const { data: existingRecommendations } = useQuery(GET_RECOMMENDATION, {
    variables: {
      chatId: id,
    },
    onCompleted: (data) => {
      if (data?.getRecommendations?.length > 0) {
        setRecommendations(data?.getRecommendations);
        setIsRecommendationGenerated(true);
      }
    },
  });
  console.log(isRecommendationGenerated, "ini apa ataas ????");

  const [generateRecommendation, { data, loading }] = useMutation(
    GENERATE_RECOMMENDATION,
    {
      variables: {
        chatId: id,
      },
      onCompleted: () => {
        setIsRecommendationGenerated(true);
      },
    }
  );

  const navigate = useNavigate();

  const [
    generateRecommendationDetails,
    { loading: generateRecommendationDetailsLoading },
  ] = useMutation(GENERATE_RECOMMENDATION_DETAILS, {
    onCompleted: (data) => {
      if (data?.generateRecommendationDetails) {
        navigate(`/recommendation/${data?.generateRecommendationDetails?._id}`);
      }
    },
  });

  useEffect(() => {
    if (data) {
      if (!isRecommendationGenerated) {
        setIsRecommendationGenerated(true);
      }
      setRecommendations(data?.generateRecommendations);
    }
  }, [data, isRecommendationGenerated]);

  const handleGenerateRecommendationDetail = (recommendationId) => {
    generateRecommendationDetails({
      variables: {
        recommendationId: recommendationId,
      },
    });
  };

  console.log(isRecommendationGenerated, "ini apa bawahj ????");

  if (generateRecommendationDetailsLoading) return <LoadingPage />;
  return (
    <div className="flex lg:flex-row flex-col md:mx-auto lg:container px-4 lg:pb-20 py-5 md:pb-0 lg:min-h-0 md:px-0 justify-center lg:my-0 md:mb-2">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="lg:w-1/3 md:w-[500px] px-4 lg:mx-0 justify-center lg:mt-[55px] flex items-center md:mx-auto"
      >
        <ChatBox generateRecommendation={generateRecommendation} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="lg:w-2/3 mx-auto px-4 w-[350px] md:w-[700px] justify-center lg:flex-col"
      >
        {isRecommendationGenerated ? (
          <div className="my-4 font-bold md:my-1">
            <h2 className="md:text-3xl text-xl text-center text-slate-700">
              Destination
            </h2>

            <div className="grid grid-cols-1 mt-2 pr-1 md:pr-0 md:mt-4 md:pl-2 lg:pl-0 pl-0 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 md:gap-4 w-full mx-auto md:overflow-y-auto h-full md:h-[390px] lg:h-[750px]">
              {recommendations.map((place) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  key={place._id}
                  className="cursor-pointer h-[140px] md:h-[180px] lg:h-[270px] md:p-1"
                >
                  <span
                    onClick={() =>
                      handleGenerateRecommendationDetail(place._id)
                    }
                  >
                    <TopPlaceCard topPlaces={place} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {loading ? (
              <>
                <CardPlaceSkeleton />
              </>
            ) : (
              <div className="my-4 font-bold md:my-10 hidden md:block">
                <h2 className="md:text-3xl text-xl text-center flex justify-center text-slate-700">
                  <img
                    src="/img/poster.png"
                    alt="poster"
                    className="rounded-2xl h-[360px] md:h-[650px] lg:h-[1100px]"
                  />
                </h2>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
