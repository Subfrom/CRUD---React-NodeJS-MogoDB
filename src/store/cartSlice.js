import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart")) || [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            item.quantity++;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item.quantity > 1) {
                item.quantity--;
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
    },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;