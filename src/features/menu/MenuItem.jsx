// props validation
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  quantityMinusOne,
  emptyCart,
} from "../cart/cartSlice";

// special useSelector function to get the quantity of a specific item
import { selectItemQuantity } from "../cart/cartSlice";

import Button from "../../ui/Button";
import IconButton from "../../ui/IconButton";

// get the helper function to format the currency
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  // useSelector to get the cart from the store
  const cart = useSelector((state) => state.cart);
  const quantity = useSelector((state) => {
    const item = state.cart.cart.find((item) => item.pizzaId === id);
    return item ? item.quantity : 0;
  });

  // dispatch the action
  const dispatch = useDispatch();

  // function to add the pizza to the cart
  function handleAddToCart() {
    // create the item object
    const item = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };

    // dispatch the action with the item object
    dispatch(addToCart(item));
  }

  // function to remove the pizza from the cart
  function handleRemoveOne() {
    // no action if the quantity is 0
    // if (quantity === 0) return;

    // if quantity is 1, remove the item from the cart
    if (quantity === 1) {
      dispatch(removeFromCart(id));
      return;
    }

    dispatch(quantityMinusOne(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <>
              <p className="text-sm">{formatCurrency(unitPrice)}</p>
              <div className="flex items-center justify-between">
                <IconButton type="minus" onClick={handleRemoveOne}>
                  Add to cart
                </IconButton>
                <p className="mx-4">{quantity}</p>
                <IconButton type="plus" onClick={handleAddToCart}>
                  Add to cart
                </IconButton>
              </div>
            </>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

// validate the props
MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
