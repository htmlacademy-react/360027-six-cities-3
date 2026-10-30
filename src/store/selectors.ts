import { createSelector } from '@reduxjs/toolkit';
import { SortType } from '@/const';
import { Offers } from '@/types/offer';
import { State } from '@/types/state';

function sortOffers(offers: Offers, sortType: SortType): Offers {
  switch (sortType) {
    case SortType.Popular:
      return offers;
    case SortType.PriceAsc:
      return [...offers].sort(
        (firstOffer, secondOffer) => firstOffer.price - secondOffer.price,
      );
    case SortType.PriceDesc:
      return [...offers].sort(
        (firstOffer, secondOffer) => secondOffer.price - firstOffer.price,
      );
    case SortType.TopRated:
      return [...offers].sort(
        (firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating,
      );
  }
}

export const selectCity = (state: State) => state.city;

export const selectOffers = (state: State) => state.offers;

export const selectSortType = (state: State) => state.sortType;

export const selectIsOffersLoading = (state: State) => state.isOffersLoading;

export const selectFavoriteOffers = createSelector([selectOffers], (offers) =>
  offers.filter((offer) => offer.isFavorite),
);

export const selectCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city),
);

export const selectSortedCityOffers = createSelector(
  [selectCityOffers, selectSortType],
  (offers, sortType) => sortOffers(offers, sortType),
);
