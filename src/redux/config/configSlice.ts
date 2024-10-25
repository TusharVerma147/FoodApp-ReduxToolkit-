import {createSlice} from '@reduxjs/toolkit';
import { getProductsAction } from './configAction';

interface ConfigModal {
  isLoading: boolean;
  count: number;
  products?: any;
  matched: boolean;
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
};

const ConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    // SET_CONFIG_DATA: (state: ConfigModal, action: ActionType) => {
    //   const {payload} = action;
    //   return {...state, ...payload};
    // },
    // increaseCount: (state: ConfigModal, action: ActionType) => {
    //   console.log('increaseCount', state, action);
    //   state.count += 1;
    // },
    // decreaseCount: (state: ConfigModal) => {
    //   state.count -= 1;
    // },
    // increaseCountByPayload: (state: ConfigModal, action: ActionType) => {
    //   console.log('action', action);
    //   state.count += action?.payload.increaseBy;
    // },
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

export const {
  increaseCount,
  decreaseCount,
  SET_CONFIG_DATA,
  increaseCountByPayload,
} = ConfigSlice.actions;

export default ConfigSlice.reducer;
