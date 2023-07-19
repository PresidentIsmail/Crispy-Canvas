// setup cart slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // data for testing
    // {
    //   pizzaId: 1,
    //   name: "Sicilian",
    //   quantity: 1,
    //   unitPrice: 18,
    //   totalPrice: 18,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // payload is a new item
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.pizzaId === newItem.pizzaId,
      );

      if (existingItemIndex !== -1) {
        // update quantity and totalPrice
        state.cart[existingItemIndex] = {
          ...state.cart[existingItemIndex],
          quantity: state.cart[existingItemIndex].quantity + newItem.quantity,
          totalPrice:
            state.cart[existingItemIndex].totalPrice + newItem.totalPrice,
        };
      } else {
        // add new item
        state.cart.push(newItem);
      }
    },

    quantityMinusOne(state, action) {
        // payload is an id
        const pizzaId = action.payload;
        const existingItemIndex = state.cart.findIndex(
            (item) => item.pizzaId === pizzaId,
        );

        

        if (existingItemIndex !== -1) {
            // update quantity and totalPrice
            state.cart[existingItemIndex] = {
            ...state.cart[existingItemIndex],
            quantity: state.cart[existingItemIndex].quantity - 1,
            totalPrice:
                state.cart[existingItemIndex].totalPrice -
                state.cart[existingItemIndex].unitPrice,
            };
        }
    },

    removeFromCart(state, action) {
      // payload is an id
      const pizzaId = action.payload;
      state.cart = state.cart.filter((x) => x.pizzaId !== pizzaId);
    },

    emptyCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, quantityMinusOne, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// ==============================================================================
//============= functions to be used in components with useSelector =============
// ==============================================================================

// selectCart returns the cart array
export const selectCart = (state) => state.cart.cart;

// selectTotalQuantity returns the total quantity of items in the cart
export const selectTotalPrice = (state) =>
  state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

// selectTotalPrice returns the total price of items in the cart
export const selectTotalQuantity = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);

// selectItemQuantity returns the quantity of a specific item in the cart
export const selectItemQuantity = (state, id) => {
  const item = state.cart.cart.find((x) => x.id === id);
  return item ? item.quantity : 0;
};

// selectItemTotalPrice returns the total price of a specific item in the cart
export const selectItemTotalPrice = (state, id) => {
  const item = state.cart.cart.find((x) => x.id === id);
  return item ? item.totalPrice : 0;
};

// selectItem returns the item object from the cart
export const selectItem = (state, id) =>
  state.cart.cart.find((x) => x.id === id);
