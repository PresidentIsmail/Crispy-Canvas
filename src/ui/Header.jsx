import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  const { username } = useSelector((state) => state.user);

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Crispy Canvas Co.
      </Link>

      <SearchOrder />

      {username && <Username />}
    </header>
  );
}

export default Header;
