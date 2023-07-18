import { useState } from "react";

import { Form, redirect } from "react-router-dom";

// get the helper function to create the order
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // used for validating the form
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(false); // Initially assume the phone number is valid
  const [hasBlurred, setHasBlurred] = useState(false); // Track if the user has blurred the phone number input

  const cart = fakeCart;

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    validatePhoneNumber();
  };

  const validatePhoneNumber = () => {
    const phonePattern = /^[0-9]{10}$/;
    setIsValid(phonePattern.test(phone));
  };

  return (
    <div style={{width: "500px"}}>
        <h4>Ready to order? Let&apos;s go!</h4>

        <Form method="POST" style={{ display: "grid", gap: "1rem" }}>
          <label htmlFor="customer">First Name</label>
          <input
            type="text"
            name="customer"
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            style={!isValid && hasBlurred ? {color:"#f00"} : {color:""}}
          />
          {!isValid && hasBlurred && (
            <div style={{color:"#f00"}}>
              Please enter a valid 10-digit phone number
            </div>
          )}

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="priority">
            <input type="checkbox" id="priority" name="priority" />
            Want to give your order priority?
          </label>

          {/* Hidden input to send the cart data */}
          <input type="hidden" name="cart" value={JSON.stringify(fakeCart)} />

          <button
            type="submit"
            disabled={!isValid || !customer || !phone || !address}
          >
            Order now
          </button>
        </Form>
     </div>
  );
}

// action function that will have access to the form data
export async function action({ request }) {
  // get the form data from the request body
  const formData = await request.formData();

  // convert the form data to a json object
  const data = Object.fromEntries(formData.entries());

  // model the data, make a new order, override the cart with the parsed cart and set priority to a boolean
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  // create the order and redirect to the order.id page
  const { id } = await createOrder(order);
  return redirect(`/order/${id}`);
}

export default CreateOrder;
