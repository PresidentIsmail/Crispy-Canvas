import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#1976D2", color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Crispy Canvas
            </Link>
            .
          </h2>
        </div>
        <div>
          <SearchOrder />
        </div>
        <div>
          <button style={{ backgroundColor: "#000" }}>
            <Link to="/menu" style={{ textDecoration: "none", color: "white" }}>
              Menu
            </Link>
          </button>
          <button style={{ backgroundColor: "#000" }}>
            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              Cart
            </Link>
            .
          </button>
          <button style={{ backgroundColor: "#000" }}>
            <Link
              to="/order/new"
              style={{ textDecoration: "none", color: "white" }}
            >
              Order
            </Link>
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
