import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// speial useSelector functions from cartSlice
import { selectTotalQuantity, selectTotalPrice } from "./cartSlice";

// function to format the currency
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  // display the total number of pizzas and the total price
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>

      {totalQuantity > 0 && <Link to="/cart">Open cart &rarr;</Link>}
    </div>
  );
}

export default CartOverview;
