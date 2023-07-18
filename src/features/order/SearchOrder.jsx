import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // there must be an orderId
    if (!orderId) {
      return;
    }

    // navigate to /order/:orderId
    navigate(`/order/${orderId}`);

    // reset orderId
    setOrderId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "baseline" }}
    >
      <div
        style={{
          backgroundColor: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          color: "#000",
        }}
      >
        <label htmlFor="orderId">Enter Order ID</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{ width: "auto" }}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            cursor: "pointer",
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchOrder;
