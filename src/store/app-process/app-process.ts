import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '@/const';
import { CityName } from '@/types/offer';

type AppProcess = {
  city: CityName;
  sortType: SortType;
};

const initialState: AppProcess = {
  city: DEFAULT_CITY,
  sortType: SortType.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    cityChange: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    sortTypeChange: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const { cityChange, sortTypeChange } = appProcess.actions;
