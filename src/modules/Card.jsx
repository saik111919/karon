import PropTypes from "prop-types";

const Card = ({ image, title, description, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg dark:bg-gray-800">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
          {title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          {description}
        </p>
        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
          ${price}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
