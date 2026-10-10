import { useState } from 'react';
import clsx from 'clsx';
import { Offers } from '@/types/offer';
import PlacesList from '@/components/places-list/places-list';
import Header from '@/components/header/header';
import CitiesList from '@/components/cities-list/cities-list';
import Sorting from '@/components/sorting/sorting';
import Map from '@/components/map/map';
import MainEmpty from '@/components/main-empty/main-empty';

type MainPageProps = {
  offers: Offers;
};

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const isEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header isActiveLogo />

      <main
        className={clsx('page__main page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <CitiesList />
        <div className="cities">
          <div
            className={clsx('cities__places-container container', {
              'cities__places-container--empty': isEmpty,
            })}
          >
            {isEmpty ? (
              <MainEmpty />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in Amsterdam
                </b>
                <Sorting />
                <PlacesList
                  offers={offers}
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
