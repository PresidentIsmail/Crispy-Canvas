import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Button from "../../ui/Button";

// dispatch action creator from cartSlice
import { removeFromCart } from "./cartSlice";

import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  // function to remove a pizza from the cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(pizzaId));
  };

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" onClick={handleRemoveFromCart}>
          Delete
        </Button>
      </div>
    </li>
  );
}

// prop validation
CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
