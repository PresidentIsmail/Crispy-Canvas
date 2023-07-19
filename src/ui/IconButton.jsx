// prop validation
import PropTypes from "prop-types";

// Icons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconButton = ({ type, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="0  inline-flex items-center rounded-full bg-yellow-400 p-2.5 text-center text-sm font-semibold text-white hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-300
 dark:focus:ring-yellow-300"
    >
      {type === "plus" ? <PlusIcon /> : <MinusIcon />}
    </button>
  );
};

// prop validation
IconButton.propTypes = {
  type: PropTypes.oneOf(["plus", "minus"]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
