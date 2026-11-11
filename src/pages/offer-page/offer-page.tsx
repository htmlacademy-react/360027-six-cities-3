import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute, AuthorizationStatus, OfferTypeToLabel } from '@/const';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
} from '@/store/api-actions';
import {
  selectOffer,
  selectOfferStatus,
  selectShownNearbyOffers,
} from '@/store/offer-data/selectors';
import {
  selectReviews,
  selectShownReviews,
} from '@/store/reviews-data/selectors';
import { selectAuthorizationStatus } from '@/store/user-process/selectors';
import Header from '@/components/header/header';
import CardBadge from '@/components/card-badge/card-badge';
import BookmarkButton from '@/components/bookmark-button/bookmark-button';
import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewForm from '@/components/review-form/review-form';
import Map from '@/components/map/map';
import PlacesList from '@/components/places-list/places-list';
import Loader from '@/components/loader/loader';
import FullPageError from '@/components/full-page-error/full-page-error';
import { getPluralizedLabel, getRatingWidth } from '@/utils';

const MAX_IMAGES_COUNT = 6;

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(selectOffer);
  const { isLoading, isError, isNotFound } = useAppSelector(selectOfferStatus);
  const nearOffers = useAppSelector(selectShownNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const shownReviews = useAppSelector(selectShownReviews);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  if (isNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isError) {
    return <FullPageError />;
  }

  if (isLoading || !offer || offer.id !== id) {
    return <Loader />;
  }

  const {
    title,
    type,
    isPremium,
    price,
    rating,
    city,
    images,
    bedrooms,
    maxAdults,
    goods,
    host,
    description,
  } = offer;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, MAX_IMAGES_COUNT).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <CardBadge className="offer__mark" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <BookmarkButton type="offer" offerId={offer.id} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${getRatingWidth(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {OfferTypeToLabel[type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {getPluralizedLabel(bedrooms, 'Bedroom')}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {getPluralizedLabel(maxAdults, 'adult')}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={clsx(
                      'offer__avatar-wrapper user__avatar-wrapper',
                      host.isPro && 'offer__avatar-wrapper--pro',
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList
                  reviews={shownReviews}
                  reviewsCount={reviews.length}
                />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={offer.id} />
                )}
              </section>
            </div>
          </div>
          <Map
            className="offer__map"
            city={city}
            offers={[offer, ...nearOffers]}
            activeOfferId={offer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlacesList offers={nearOffers} type="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
