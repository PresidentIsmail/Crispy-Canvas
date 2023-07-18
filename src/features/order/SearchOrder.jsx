import { useState } from "react";
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="orderId">Enter Order ID</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchOrder;
