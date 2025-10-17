import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'


const initialState = {
    cartitems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addtoCart: (state, action) => {
            const existingItem = state.cartitems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartitems.push(action.payload);
              Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Item added sucessfully",
  showConfirmButton: false,
  timer: 1500
});
            } else {
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Item already existe",
  showConfirmButton: false,
  timer: 1500
});
            }
        },
        removeFromCart: (state, action) => {
          state.cartitems = state.cartitems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartitems = []
            

        }

    }
});

export const { addtoCart, removeFromCart ,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
