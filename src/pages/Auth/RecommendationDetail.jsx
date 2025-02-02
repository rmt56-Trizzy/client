import "leaflet/dist/leaflet.css";
import React, { useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import FitBounds from "../../components/Fitbounds";
import { ReactSortable } from "react-sortablejs";

export default function RecommendationDetail() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [lastZoomed, setLastZoomed] = useState(null);
  const [itinerary, setItinerary] = useState({
    day1: [
      {
        slug: "sensoji",
        name: "Senso-ji Temple",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuk4v4XbgfT9f6EwaGeLueL779qdpDTRHPg&s",
        coordinate: [35.7148, 139.7967],
        category: "Religious Sites",
      },
      {
        slug: "tokyo",
        name: "Tokyo Skytree",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6G9PAqpDkzEo_sMoEZgS69zIw-UkJO1gtdw&s",
        coordinate: [35.71, 139.8107],
        category: "Architectural Buildings",
      },
    ],
    day2: [
      {
        slug: "meiji",
        name: "Meiji Shrine",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmgW1cw86-pbW2JgFQmE7HuJIH3PyroFEiw&s",
        coordinate: [35.6764, 139.6993],
        category: "Religious Sites",
      },
      {
        slug: "shibuya",
        name: "Shibuya Crossing",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFc_BBbqG1n6_1GyrLuiYDqPFk8dwqHCI-A&s",
        coordinate: [35.6595, 139.7005],
        category: "Points of Interest & Landmarks",
      },
    ],
    day3: [
      {
        slug: "imperial",
        name: "Imperial Palace",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBt6IIAICwKD5jCeAeTd1XXIIaHou0wq4zg&s",
        coordinate: [35.6852, 139.7528],
        category: "Architectural Buildings",
      },
      {
        slug: "ginza",
        name: "Ginza",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfS5dQAgS4Gdd-r0vuTLKiDW2Pyf0At8GGEw&s",
        coordinate: [35.6717, 139.7636],
        category: "Points of Interest & Landmarks",
      },
    ],
  });

  const mapRef = useRef(null);

  const days = Object.keys(itinerary);

  const [collapse, setCollapse] = useState(
    Array.from({ length: days.length }, () => true)
  );

  const toggleCollapse = (index) => {
    setCollapse((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const cardRefs = days.map(() => useRef(null));

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

  const city = "Tokyo";

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
    <div className="max-w-[63rem] mx-auto pt-8 pb-12">
      <div className="grid grid-cols-[550px_1fr] gap-8">
        {/* Kolom Kiri */}
        <div className="left-column">
          {/* Thumbnail dengan overlay nama kota */}
          <div className="thumbnail-section relative mb-4">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/84/4b/d7/caption.jpg?w=1200&h=-1&s=1&cx=994&cy=946&chk=v1_6a1bd939ce726b103997"
              alt="City Thumbnail"
              className="w-full rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60 rounded-b-lg">
              {/* Gradient cover on top of the image */}
            </div>
            <div className="absolute bottom-[43px] left-4 bg-opacity-60 px-2 py-1 rounded">
              <h2 className="text-white text-5xl font-medium">
                Tokyo for 3 days
              </h2>
            </div>
          </div>

          {/* Card untuk tombol Book Hotel */}
          <div className="bg-slate-200 p-[14px] rounded-lg flex items-center justify-between shadow-md mb-8">
            {/* Logo */}
            <img
              src="/img/booking.png"
              alt="App Logo"
              className="w-[135px]  object-contain ml-1.5"
            />

            {/* Tombol Booking */}
            <button
              onClick={() =>
                window.open(
                  `https://www.booking.com/searchresults.id.html?ss=${city}&ssne=${city}&ssne_untouched=${city}&dest_type=city`,
                  "_blank"
                )
              }
              className="cursor-pointer bg-[#21bcbe] hover:bg-teal-600 text-white text-base font-semibold py-2 px-4 rounded-lg transition"
            >
              Book Hotel in {city}
            </button>
          </div>

          {/* Itinerary Header dengan tombol Save */}
          <div className="flex justify-between items-center mb-2">
            <h3 className=" text-[24px] font-semibold ">Itinerary</h3>
            <button className="px-4 py-2 rounded-lg bg-[#21bcbe] hover:bg-teal-600 text-white text-base cursor-pointer">
              Add to My Trip
            </button>
          </div>

          <hr className="my-4" />

          {/* Tombol-tombol Day */}
          <div className="day-buttons flex gap-3.5 mb-4 py-2">
            {days.map((dayLabel, idx) => (
              <button
                key={dayLabel}
                onClick={() => handleSelectDay(idx)}
                className={`py-2 rounded-3xl cursor-pointer outline-[3px] ${
                  selectedDay === dayLabel
                    ? "outline-black"
                    : "outline-slate-300"
                } w-[100px]`}
              >
                {`Day ${idx + 1}`}
              </button>
            ))}
          </div>

          {/* Cards Itinerary */}
          <div className="itinerary-cards">
            {days.map((day, idx) => (
              <div
                key={day}
                className="day-card bg-white/80 mb-2 rounded-lg overflow-hidden shadow"
                ref={cardRefs[idx]}
              >
                {/* Header Card */}
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
                {/* Isi Card (Collapsible) */}
                {collapse[idx] && (
                  <div className="day-card-body p-3">
                    {/* Menambahkan ReactSortable di sini */}
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
                      {itinerary[day].map((place, i) => (
                        <div
                          key={place.slug}
                          className={`place-item flex items-center px-2 py-3 border-b border-slate-300`}
                          data-day={day}
                        >
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-16 h-16 rounded mr-5"
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Map */}
        <div className="map-section w-[550px] h-[650px] sticky top-1">
          <MapContainer
            center={[35.6895, 139.6917]}
            zoom={selectedDay ? 16 : 12}
            className="w-[80%] h-[650px] rounded-lg"
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
                    {/* Gambar */}
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-16 h-16 object-fit rounded-md"
                    />

                    {/* Info Tempat */}
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {place.name}
                      </h3>

                      {/* Kategori */}
                      <span className="text-xs font-medium text-gray-600 px-0.5 py-0.5 rounded-md w-fit">
                        {place.category}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
