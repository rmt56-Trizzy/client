import PropTypes from "prop-types";
import { NavLink } from "react-router";
import ReactCountryFlag from "react-country-flag";

export default function TopPlaceCard({ topPlaces }) {
  return (
    <NavLink
      to={"/recommendation/4"}
      className="relative h-full cursor-pointer"
    >
      <div className="absolute top-0 rounded-xl left-0 w-full h-full bg-gradient-to-b from-blue-500/45 to-transparent "></div>

      <img
        src={topPlaces?.cityImage}
        alt={topPlaces?.city}
        className="rounded-xl w-full h-full object-cover"
      />

      <div className="absolute md:top-2 md:py-3 md:px-5 top-0 p-2 flex md:gap-2 gap-1 items-center">
        <p className="font-bold text-white md:text-xl lg:text-2xl text-xs">
          {topPlaces?.city}
        </p>
        <ReactCountryFlag
          countryCode={topPlaces?.countryCode}
          svg
          className="md:mt-1 md:text-xl text-sm"
        />
      </div>
    </NavLink>
  );
}

TopPlaceCard.propTypes = {
  topPlaces: PropTypes.object,
};
