import {createSlice} from '@reduxjs/toolkit';
import {getProductsAction} from './configAction';

interface ConfigModal {
  isLoading: boolean;
  count: number;
  products?: any;
  matched: boolean;
  likedItems: {[key: number]: boolean};
  cartItems: any[];
}

type ActionType = {
  type: string;
  payload: any;
};

let initialState = {
  isLoading: false,
  count: 0,
  products: [],
  matched: false,
  likedItems: [],
  cartItems: [],
};

const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    SET_CONFIG_DATA: (state: ConfigModal, action: ActionType) => {
      const {payload} = action;
      return {...state, ...payload};
    },
    increaseCount: (state: ConfigModal, action: ActionType) => {
      console.log('increaseCount', state, action);
      state.count += 1;
    },
    decreaseCount: (state: ConfigModal) => {
      state.count -= 1;
    },
    increaseCountByPayload: (state: ConfigModal, action: ActionType) => {
      console.log('action', action);
      state.count += action?.payload.increaseBy;
    },
    toggleLikeItem: (state, action) => {
      console.log(action.payload.id)
      const itemId = action.payload.id;
      const existingItemIndex = state.likedItems.findIndex(
        item => item.id === itemId,
      );
      if(existingItemIndex >= 0){
        state.likedItems.splice(existingItemIndex, 1);
      }
      else {
        state.likedItems.push(action.payload)
      }
      // const isLiked = state.likedItems[itemId];
      // state.likedItems[itemId] = !isLiked;

      // if (!isLiked) {
      //   const likedItem = state.products.find(product => product.id === itemId);
      //   if (likedItem) {
      //     state.likedItems.push(likedItem);
      //   }
      // } else {
      //   state.likedItems = state.cartItems.filter(item => item.id !== itemId);
      // }
    },

    addIncrease: (state, action) => {
      const existingItem = state.cartItems.find(
        product => product.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...action.payload, quantity: 1});
      }
    },

    decrease: (state, action) => {
      const existingItem = state.cartItems.find(
        product => product.id === action.payload.id,
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            item => item.id !== action.payload.id,
          );
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    removefrombag: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProductsAction.fulfilled, (state, action) => {
      console.log('action', action);
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsAction.rejected, state => {
      state.isLoading = false;
    });

    builder.addMatcher(
      //return condition from this callback function
      action => action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.isLoading = false;
        state.matched = true;
      },
    );
    builder.addDefaultCase((state, action) => {
      console.log('default case', action);
      state.isLoading = false;
    });
  },
  selectors: {
    getProducts: (state: ConfigModal) => state.products,
  },
});

export const {getProducts} = ConfigSlice.selectors;

// export const {toggleLikeItem, addIncrease, decrease, removefrombag} = ConfigSlice.actions;

export const {
  increaseCount,
  decreaseCount,
  SET_CONFIG_DATA,
  increaseCountByPayload,
  toggleLikeItem, addIncrease, decrease, removefrombag,
} = ConfigSlice.actions;

export default ConfigSlice.reducer;
