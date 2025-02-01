import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import FitBounds from "../../components/Fitbounds";

export default function RecommendationDetail() {
  const [selectedDay, setSelectedDay] = useState(null);

  const itinerary = {
    day1: [
      {
        id: 1,
        name: "Senso-ji Temple",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuk4v4XbgfT9f6EwaGeLueL779qdpDTRHPg&s",
        coordinate: [35.7148, 139.7967],
      },
      {
        id: 2,
        name: "Tokyo Skytree",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6G9PAqpDkzEo_sMoEZgS69zIw-UkJO1gtdw&s",
        coordinate: [35.71, 139.8107],
      },
    ],
    day2: [
      {
        id: 3,
        name: "Meiji Shrine",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmgW1cw86-pbW2JgFQmE7HuJIH3PyroFEiw&s",
        coordinate: [35.6764, 139.6993],
      },
      {
        id: 4,
        name: "Shibuya Crossing",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFc_BBbqG1n6_1GyrLuiYDqPFk8dwqHCI-A&s",
        coordinate: [35.6595, 139.7005],
      },
    ],
    day3: [
      {
        id: 5,
        name: "Imperial Palace",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBt6IIAICwKD5jCeAeTd1XXIIaHou0wq4zg&s",
        coordinate: [35.6852, 139.7528],
      },
      {
        id: 6,
        name: "Ginza",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfS5dQAgS4Gdd-r0vuTLKiDW2Pyf0At8GGEw&s",
        coordinate: [35.6717, 139.7636],
      },
    ],
  };

  const days = Object.keys(itinerary);

  const [collapse, setCollapse] = useState(
    Array.from({ length: days.length }, () => true)
  );

  const toggleCollapse = (index) => {
    setSelectedDay(selectedDay === days[index] ? null : days[index]);
    setCollapse((prev) => prev.map((val, i) => (i === index ? !val : false)));
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
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60">
              {/* Gradient cover on top of the image */}
            </div>
            <div className="absolute bottom-[43px] left-4 bg-opacity-60 px-2 py-1 rounded">
              <h2 className="text-white text-5xl font-medium">
                Tokyo for 3 days
              </h2>
            </div>
          </div>

          {/* Itinerary Header dengan tombol Save */}
          <div className="itinerary-header flex justify-between items-center mb-2">
            <h3 className=" text-lg font-semibold ">Itinerary</h3>
            <button className="px-4 py-2 rounded bg-[#21bcbe] hover:bg-teal-600 text-white cursor-pointer">
              Save
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
                } w-[135px]`}
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
                  <span className="text-2xl">{collapse[day] ? "−" : "+"}</span>
                </div>
                {/* Isi Card (Collapsible) */}
                {collapse[idx] && (
                  <div className="day-card-body p-3">
                    {itinerary[day].map((place) => (
                      <div
                        key={place.id}
                        className="place-item flex items-center mb-2 px-2"
                      >
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-16 h-16 rounded mr-5"
                        />
                        <span>{place.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Map */}
        <div className="map-section w-[550px] h-[650px]">
          <MapContainer
            center={[35.6895, 139.6917]}
            zoom={selectedDay ? 16 : 12}
            className="w-[80%] h-[650px] rounded-lg"
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
                  <div className="flex items-center w-52">
                    {" "}
                    {/* Gunakan flex untuk sejajar */}
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-13 h-13 object-cover rounded-lg mr-3"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{place.name}</h3>
                      <p className="text-sm text-gray-600">
                        {place.description}
                      </p>
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
