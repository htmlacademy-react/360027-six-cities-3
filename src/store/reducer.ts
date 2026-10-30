import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortType } from '@/const';
import { CityName, Offers } from '@/types/offer';
import { changeCity, changeSort } from './action';
import { fetchOffersAction } from './api-actions';

type InitialState = {
  city: CityName;
  offers: Offers;
  sortType: SortType;
  isOffersLoading: boolean;
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  sortType: SortType.Popular,
  isOffersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersLoading = false;
    });
});
