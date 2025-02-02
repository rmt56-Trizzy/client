import PropTypes from "prop-types";
export default function ReviewCard({ name, review, img }) {
  return (
    <div className="gap-4 bg-[#b0efef] rounded-lg md:text-base text-xs text-black font-semibold  md:p-3 p-2 h-full">
      <div className="flex items-center gap-2 md:gap-3">
        <img
          src={img}
          alt={name}
          className="lg:w-10 lg:h-10 w-8 h-8 rounded-full"
        />
        <p>{name}</p>
      </div>
      <p className="mt-2 text-center">{review}</p>
    </div>
  );
}

ReviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
