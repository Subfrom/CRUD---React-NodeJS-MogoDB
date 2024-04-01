import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "DATA FROM REDUX STORE",
    numberCart: 0,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
            state.numberCart = state.cart.length;

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            state.numberCart = state.cart.length;

            localStorage.setItem("cart", JSON.stringify(state.cart));

            if (state.cart.length === 0) {
                localStorage.clear();
            }

            return state;
        },
        clearCart: (state) => {
            state.cart = [];
            state.numberCart = 0;
            localStorage.clear();
        },
        incrementQuantity: (state, action) => {
            state.cart = state.cart.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart, incrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;