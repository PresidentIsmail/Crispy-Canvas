import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import Button from "../../ui/Button";

// get the helper function to create the order
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
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
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" style={{ display: "grid", gap: "1rem" }}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              style={!isValid && hasBlurred ? { color: "#f00" } : { color: "" }}
            />
            {!isValid && hasBlurred && (
              <div className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                Please enter a valid 10-digit phone number
              </div>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            id="priority"
            name="priority"
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        {/* Hidden input to send the cart data */}
        <input type="hidden" name="cart" value={JSON.stringify(fakeCart)} />

        <div>
          <Button
            type="primary"
            disabled={!isValid || !customer || !phone || !address}
          >
            Order now
          </Button>
        </div>
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
