import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link to="/">Crispy Canvas</Link>.
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
