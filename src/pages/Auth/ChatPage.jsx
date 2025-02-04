import TopPlaceCard from "../../components/places/TopPlaceCard";
import ChatBox from "../../components/AI/ChatBox";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { NavLink, useNavigate, useParams } from "react-router";
import { use } from "react";

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

  const params = useParams();
  const { id } = params;

  const { data: existingRecommendations } = useQuery(GET_RECOMMENDATION, {
    variables: {
      chatId: id,
    },
    onCompleted: (data) => {
      if (data?.getRecommendations?.length > 0) {
        setRecommendations(data?.getRecommendations);
      }
    },
  });

  const [generateRecommendation, { data, loading, error }] = useMutation(
    GENERATE_RECOMMENDATION,
    {
      variables: {
        chatId: id,
      },
    }
  );

  const navigate = useNavigate();

  const [generateRecommendationDetails] = useMutation(
    GENERATE_RECOMMENDATION_DETAILS,
    {
      onCompleted: (data) => {
        if (data?.generateRecommendationDetails) {
          navigate(
            `/recommendation/${data?.generateRecommendationDetails?._id}`
          );
        }
      },
    }
  );

  useEffect(() => {
    if (data) {
      setRecommendations(data?.generateRecommendations);
    }
  }, [data]);

  const handleGenerateRecommendationDetail = (recommendationId) => {
    generateRecommendationDetails({
      variables: {
        recommendationId: recommendationId,
      },
    });
  };

  return (
    <div className="flex lg:flex-row flex-col md:mx-auto lg:container px-4 lg:pb-20 py-5 md:pb-0 min-h-[95vh] lg:min-h-0 md:px-0 justify-center lg:my-0 md:mb-2">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="lg:w-1/3 md:w-[500px] px-4 lg:mx-0 justify-center flex items-center md:mx-auto">
        <ChatBox generateRecommendation={generateRecommendation} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="lg:w-2/3 mx-auto  px-4 w-[280px] md:w-[700px] justify-center lg:flex-col">
        <h2 className="md:text-3xl text-xl my-4 font-bold md:my-10 text-center text-slate-700">
          Destination
        </h2>

        <div className="grid grid-cols-1 md:pl-2 lg:pl-0 pl-0 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 md:gap-4 w-full mx-auto overflow-y-auto h-[360px] md:h-[390px] lg:h-[900px]">
          {recommendations.map((place) => (
            <div
              key={place._id}
              className="cursor-pointer h-[100px] md:h-[180px] lg:h-[270px] md:p-1">
              <span
                onClick={() => handleGenerateRecommendationDetail(place._id)}>
                <TopPlaceCard topPlaces={place} />
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
