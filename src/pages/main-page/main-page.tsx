import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { CityName } from '@/types/offer';
import { getPluralizedLabel } from '@/utils';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { cityChange } from '@/store/app-process/app-process';
import { selectCity } from '@/store/app-process/selectors';
import {
  selectCityOffers,
  selectSortedCityOffers,
} from '@/store/offers-data/selectors';
import PlacesList from '@/components/places-list/places-list';
import Header from '@/components/header/header';
import CitiesList from '@/components/cities-list/cities-list';
import Sorting from '@/components/sorting/sorting';
import Map from '@/components/map/map';
import MainEmpty from '@/components/main-empty/main-empty';

function MainPage(): JSX.Element {
  const city = useAppSelector(selectCity);
  const offers = useAppSelector(selectCityOffers);
  const sortedOffers = useAppSelector(selectSortedCityOffers);
  const dispatch = useAppDispatch();
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const isEmpty = offers.length === 0;

  const handleCityChange = useCallback(
    (newCity: CityName) => {
      dispatch(cityChange(newCity));
    },
    [dispatch],
  );

  return (
    <div className="page page--gray page--main">
      <Header isActiveLogo />

      <main
        className={clsx('page__main page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <CitiesList activeCity={city} onCityChange={handleCityChange} />
        <div className="cities">
          <div
            className={clsx('cities__places-container container', {
              'cities__places-container--empty': isEmpty,
            })}
          >
            {isEmpty ? (
              <MainEmpty cityName={city} />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {getPluralizedLabel(offers.length, 'place')} to stay in {city}
                </b>
                <Sorting />
                <PlacesList
                  offers={sortedOffers}
                  type="cities"
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>
            )}
            <div className="cities__right-section">
              {!isEmpty && (
                <Map
                  className="cities__map"
                  city={offers[0].city}
                  offers={offers}
                  activeOfferId={activeOfferId}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
