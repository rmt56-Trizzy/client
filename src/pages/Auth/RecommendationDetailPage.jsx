import "leaflet/dist/leaflet.css";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import FitBounds from "../../components/Fitbounds";
import { ReactSortable } from "react-sortablejs";
import { TbMapPinMinus, TbMapPinPlus } from "react-icons/tb";
import { TbCalendarPlus } from "react-icons/tb";
import { motion } from "framer-motion";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router";
import { convertArrayToObject } from "../../utils/convertObjItinery";
import LoadingPage from "../../components/LoadingPage";
import { toastError } from "../../utils/swallAlert";
import { VscSaveAs } from "react-icons/vsc";
import { MdOutlineEditCalendar } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";

export const GET_RECOMMEND_DETAIL = gql`
  query GetRecommendationDetails($id: ID!) {
    getRecommendationDetails(_id: $id) {
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
    }
  }
`;

export const ADD_RECOMMEND_TO_MY_TRIP = gql`
  mutation AddRecommendationToMyTrip($recommendationId: ID!) {
    addRecommendationToMyTrip(recommendationId: $recommendationId)
  }
`;

export const GENERATE_VIEW_ACCESS = gql`
  mutation GenerateViewAccess($recommendationId: ID!) {
    generateViewAccess(recommendationId: $recommendationId)
  }
`;

export const CHECK_VIEW_ACCESS = gql`
  query CheckViewAccess($payload: CheckViewAccessInput) {
    checkViewAccess(payload: $payload) {
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
      userId
      viewAccess
    }
  }
`;

export const EDIT_ITINERARY = gql`
  mutation EditItinerary($payload: EditInput) {
    editItinerary(payload: $payload)
  }
`;

export default function RecommendationDetailPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [lastZoomed, setLastZoomed] = useState(null);
  const [itinerary, setItinerary] = useState({});
  const [city, setCity] = useState({});
  const [days, setDays] = useState([]);
  const [collapse, setCollapse] = useState([]);
  const [cardRefs, setCardRefs] = useState([]);
  const [isAddToTrip, setIsAddToTrip] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;
  const { data, loading, error } = useQuery(GET_RECOMMEND_DETAIL, {
    variables: {
      id: id,
    },
  });

  const [addToMyTrip, { loading: loadingAddToTrip }] = useMutation(
    ADD_RECOMMEND_TO_MY_TRIP
  );

  if (loading) <LoadingPage />;

  useEffect(() => {
    if (error) {
      toastError(error);
      navigate("/");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const itinerary = convertArrayToObject(
        data.getRecommendationDetails.itineraries
      );
      setItinerary(itinerary);
      setCity(data.getRecommendationDetails);
      setDays(Object.keys(itinerary));
    }
  }, [data]);

  useEffect(() => {
    if (days) {
      setCollapse(Array.from({ length: days.length }, () => true));
      setCardRefs(Array.from({ length: days.length }, () => createRef()));
    }
  }, [days]);

  const handleAddToTrip = async () => {
    try {
      await addToMyTrip({
        variables: {
          recommendationId: id,
        },
      });
      setIsAddToTrip(true);
    } catch (error) {
      toastError(error);
    }
  };

  const mapRef = useRef(null);

  const toggleCollapse = (index) => {
    setCollapse((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const handleSelectDay = (index) => {
    const selectedItinerary = itinerary[days[index]];

    if (!selectedItinerary || selectedItinerary.length === 0) return;

    if (selectedDay === days[index]) {
      setSelectedDay(null);
      setLastZoomed(null);
    } else {
      setSelectedDay(days[index]);

      const latSum = selectedItinerary.reduce(
        (sum, place) => sum + place.coordinate[0],
        0
      );
      const lngSum = selectedItinerary.reduce(
        (sum, place) => sum + place.coordinate[1],
        0
      );
      const center = [
        latSum / selectedItinerary.length,
        lngSum / selectedItinerary.length,
      ];

      if (mapRef.current) {
        mapRef.current.flyTo(center, 14);
      }

      if (cardRefs[index].current) {
        cardRefs[index].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setTimeout(() => {
        if (!collapse[index]) {
          toggleCollapse(index);
        }
      }, 350);
    }
  };

  const zoomToLocation = (coordinates) => {
    if (
      lastZoomed &&
      lastZoomed[0] === coordinates[0] &&
      lastZoomed[1] === coordinates[1]
    ) {
      setLastZoomed(null);
      setSelectedDay(null);
    } else {
      setLastZoomed(coordinates);
      mapRef.current.flyTo(coordinates, 16);
    }
  };

  return (
    <div className="max-w-[63rem] mx-auto md:pt-8 pt-4 pb-12 px-4 overflow-hidden md:overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-8">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="left-column"
        >
          {/* Thumbnail */}
          <div className="thumbnail-section relative mb-4">
            <img
              src={city?.cityImage}
              alt={city?.city}
              className="w-full rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60 rounded-b-lg"></div>
            <div className="absolute bottom-[43px] left-4 bg-opacity-60 px-2 py-1 rounded">
              <h2 className="text-white text-2xl md:text-4xl font-medium truncate">
                {city?.city} for {city?.daysCount} days
              </h2>
            </div>
          </div>

          {/* Card Booking */}
          <div className="bg-slate-200 p-[14px] rounded-lg flex flex-col md:flex-row items-center justify-between shadow-md mb-8">
            <img
              src="https://layla.ai/logosArea/Booking.com%20hotel%20booking%20logo.svg"
              alt="Booking.com"
              className="w-[135px] object-contain mb-2 md:mb-0 md:ml-1.5"
            />
            <button
              onClick={() =>
                window.open(
                  `https://www.booking.com/searchresults.id.html?ss=${city?.city}&ssne=${city?.city}&ssne_untouched=${city?.city}&dest_type=city`,
                  "_blank"
                )
              }
              className="cursor-pointer bg-[#21bcbe] hover:bg-teal-600 text-white text-base py-2 px-4 rounded-lg transition w-full md:w-auto flex items-center justify-center gap-2"
            >
              <TbCalendarPlus />
              Book Hotel in {city?.city}
            </button>
          </div>

          {/* Itinerary Header */}
          <div className="flex justify-between items-center mb-2 border-b md:border-b-2 border-gray-300 pb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Itinerary</h3>
            {isEdit ? (
              <button
                onClick={() => setIsEdit(false)}
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white lg:text-base md:text-sm text-xs cursor-pointer flex items-center md:gap-2 gap-1"
              >
                <VscSaveAs className="text-sm md:text-base lg:text-lg" />
                Save
              </button>
            ) : (
              <>
                {isAddToTrip ? (
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white lg:text-base md:text-sm text-xs cursor-pointer flex items-center md:gap-2 gap-1">
                      <CiShare2 className="text-sm md:text-base lg:text-lg" />
                      Share Trip
                    </button>
                    <button
                      onClick={() => setIsEdit(true)}
                      className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white lg:text-base md:text-sm text-xs cursor-pointer flex items-center md:gap-2 gap-1"
                    >
                      <MdOutlineEditCalendar className="text-sm md:text-base lg:text-lg" />
                      Edit Trip
                    </button>
                  </div>
                ) : (
                  <>
                    {loadingAddToTrip ? (
                      <button className="lg:w-[170.89px] lg:h-[40px] md:w-[154.78px] md:h-[36px] w-[134.67px] h-[32px] justify-center rounded-lg bg-[#21bcbe] hover:bg-teal-600 text-white lg:text-base md:text-sm text-xs cursor-pointer flex items-center md:gap-2 gap-1">
                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToTrip}
                        className="px-4 py-2 rounded-lg bg-[#21bcbe] hover:bg-teal-600 text-white lg:text-base md:text-sm text-xs cursor-pointer flex items-center md:gap-2 gap-1"
                      >
                        <TbMapPinPlus className="text-sm md:text-base lg:text-lg -mt-1" />
                        Add to My Trip
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* Tombol Day */}
          <div className="day-buttons flex gap-3.5 mb-4 px-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
            <div className="flex gap-3.5 pt-2 pb-4">
              {days.map((dayLabel, idx) => (
                <button
                  key={dayLabel}
                  onClick={() => handleSelectDay(idx)}
                  className={`py-2 rounded-3xl cursor-pointer md:outline-[3px] outline-[2px] w-[50px] md:w-[100px] text-xs md:text-base font-semibold ${
                    selectedDay === dayLabel
                      ? "outline-black bg-slate-100"
                      : "outline-slate-300"
                  }`}
                >
                  {`Day ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Itinerary */}
          <div className="itinerary-cards">
            {days.map((day, idx) => (
              <div
                key={day}
                className="day-card bg-white/80 mb-2 rounded-lg overflow-hidden shadow"
                ref={cardRefs[idx]}
              >
                <div
                  className="day-card-header p-3 cursor-pointer bg-gray-100 flex justify-between items-center"
                  onClick={() => handleSelectDay(idx)}
                >
                  <h4 className="m-0">{`Day ${idx + 1}`}</h4>
                  <span
                    className="text-3xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCollapse(idx);
                    }}
                  >
                    {collapse[idx] ? (
                      <RiArrowDropDownLine />
                    ) : (
                      <RiArrowDropUpLine />
                    )}
                  </span>
                </div>
                {collapse[idx] && (
                  <div className="day-card-body p-3">
                    {isEdit ? (
                      <ReactSortable
                        list={itinerary[day]}
                        setList={(newList) => {
                          setItinerary((prev) => ({
                            ...prev,
                            [day]: newList,
                          }));
                        }}
                        group="locations"
                        animation={200}
                      >
                        {itinerary[day].map((place) => (
                          <div
                            key={place.slug}
                            className="place-item flex items-center px-2 py-3 border-b border-slate-300 last:border-b-0"
                            data-day={day}
                          >
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-14 h-14 md:w-16 md:h-16 rounded mr-5"
                            />
                            <div>
                              <h5
                                className="text-lg font-semibold text-gray-900 cursor-pointer"
                                onClick={() => zoomToLocation(place.coordinate)}
                              >
                                {place.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {place.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </ReactSortable>
                    ) : (
                      <>
                        {itinerary[day].map((place) => (
                          <div
                            key={place.slug}
                            className="place-item flex items-center px-2 py-3 border-b border-slate-300 last:border-b-0"
                            data-day={day}
                          >
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-14 h-14 md:w-16 md:h-16 rounded mr-5"
                            />
                            <div>
                              <h5
                                className="text-lg font-semibold text-gray-900 cursor-pointer"
                                onClick={() => zoomToLocation(place.coordinate)}
                              >
                                {place.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {place.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Kolom Kanan: Map */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="map-section w-full lg:w-[400px] h-[400px] md:h-[500px] lg:h-[650px] sticky top-1"
        >
          <MapContainer
            center={[35.6895, 139.6917]}
            zoom={selectedDay ? 16 : 12}
            className="w-full h-full rounded-lg"
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {!lastZoomed && (
              <FitBounds
                markers={
                  selectedDay
                    ? itinerary[selectedDay]
                    : Object.values(itinerary).flat()
                }
                padding={[50, 50]}
              />
            )}
            {(selectedDay
              ? itinerary[selectedDay]
              : Object.values(itinerary).flat()
            ).map((place) => (
              <Marker key={place.id} position={place.coordinate}>
                <Popup>
                  <div className="flex w-56 items-start space-x-3">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-14 h-14 md:w-16 md:h-16 object-fit rounded-md"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {place.name}
                      </h3>
                      <span className="text-xs font-medium text-gray-600 px-0.5 py-0.5 rounded-md w-fit">
                        {place.category}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </div>
    </div>
  );
}
