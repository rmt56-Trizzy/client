import "leaflet/dist/leaflet.css";
import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import FitBounds from "../../components/Fitbounds";

export default function RecommendationDetail() {
  const [selectedDay, setSelectedDay] = useState(null);
  const mapRef = useRef(null);

  const itinerary = {
    day1: [
      {
        id: 1,
        name: "Senso-ji Temple",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuk4v4XbgfT9f6EwaGeLueL779qdpDTRHPg&s",
        coordinate: [35.7148, 139.7967],
        category: "Religious Sites",
      },
      {
        id: 2,
        name: "Tokyo Skytree",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6G9PAqpDkzEo_sMoEZgS69zIw-UkJO1gtdw&s",
        coordinate: [35.71, 139.8107],
        category: "Architectural Buildings",
      },
    ],
    day2: [
      {
        id: 3,
        name: "Meiji Shrine",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmgW1cw86-pbW2JgFQmE7HuJIH3PyroFEiw&s",
        coordinate: [35.6764, 139.6993],
        category: "Religious Sites",
      },
      {
        id: 4,
        name: "Shibuya Crossing",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFc_BBbqG1n6_1GyrLuiYDqPFk8dwqHCI-A&s",
        coordinate: [35.6595, 139.7005],
        category: "Points of Interest & Landmarks",
      },
    ],
    day3: [
      {
        id: 5,
        name: "Imperial Palace",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBt6IIAICwKD5jCeAeTd1XXIIaHou0wq4zg&s",
        coordinate: [35.6852, 139.7528],
        category: "Architectural Buildings",
      },
      {
        id: 6,
        name: "Ginza",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfS5dQAgS4Gdd-r0vuTLKiDW2Pyf0At8GGEw&s",
        coordinate: [35.6717, 139.7636],
        category: "Points of Interest & Landmarks",
      },
    ],
  };

  const days = Object.keys(itinerary);

  //   const city = "cape town".replaceAll(" ", "+")
  const city = "Tokyo";

  const [collapse, setCollapse] = useState(
    Array.from({ length: days.length }, () => false)
  );

  const toggleCollapse = (index) => {
    setSelectedDay(selectedDay === days[index] ? null : days[index]);
    setCollapse((prev) => prev.map((val, i) => (i === index ? !val : false)));
  };

  const zoomToLocation = (coordinates) => {
    if (mapRef.current) {
      mapRef.current.flyTo(coordinates, 16); // Fly ke koordinat dan zoom level 16
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
              src="/img/booking.png" // Ganti dengan logo aplikasi Anda
              alt="App Logo"
              className="w-32 h-[49px] object-contain ml-1"
            />

            {/* Tombol Booking */}
            <button
              onClick={() =>
                window.open(
                  `https://www.booking.com/searchresults.id.html?ss=${city}&ssne=${city}&ssne_untouched=${city}&dest_type=city`,
                  "_blank"
                )
              }
              className="cursor-pointer bg-[#21bcbe] hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Book Hotel in {city}
            </button>
          </div>

          {/* Itinerary Header dengan tombol Save */}
          <div className="flex justify-between items-center mb-2">
            <h3 className=" text-[24px] font-semibold ">Itinerary</h3>
            <button className="px-4 py-2 rounded bg-[#21bcbe] hover:bg-teal-600 text-white cursor-pointer">
              Add to My Trip
            </button>
          </div>

          <hr className="my-4" />

          {/* Tombol-tombol Day */}
          <div className="day-buttons flex gap-3.5 mb-4 py-2">
            {days.map((dayLabel, idx) => (
              <button
                key={dayLabel}
                onClick={() => toggleCollapse(idx)}
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
              >
                {/* Header Card */}
                <div
                  className="day-card-header p-3 cursor-pointer bg-gray-100 flex justify-between items-center"
                  onClick={() => toggleCollapse(idx)}
                >
                  <h4 className="m-0">{`Day ${idx + 1}`}</h4>
                  <span className="text-3xl">
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
                    {itinerary[day].map((place, i) => (
                      <div
                        key={place.id}
                        className={`place-item flex items-center px-2 py-3 ${
                          i !== itinerary[day].length - 1
                            ? "border-b border-slate-300"
                            : ""
                        }`}
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

            <FitBounds
              markers={
                selectedDay
                  ? itinerary[selectedDay]
                  : [...itinerary.day1, ...itinerary.day2, ...itinerary.day3]
              }
              padding={[50, 50]}
            />

            {(selectedDay
              ? itinerary[selectedDay]
              : [...itinerary.day1, ...itinerary.day2, ...itinerary.day3]
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
