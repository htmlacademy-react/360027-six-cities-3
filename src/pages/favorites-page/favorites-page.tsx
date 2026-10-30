import useAppSelector from '@/hooks/use-app-selector';
import { selectFavoriteOffers } from '@/store/selectors';
import PlaceCard from '@/components/place-card/place-card';
import Logo from '@/components/logo/logo';
import Header from '@/components/header/header';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(selectFavoriteOffers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{offers[0]?.city.name}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {offers.map((offer) => (
                    <PlaceCard key={offer.id} offer={offer} type="favorites" />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </div>
  );
}

export default FavoritesPage;
