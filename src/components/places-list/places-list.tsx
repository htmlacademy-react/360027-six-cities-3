import clsx from 'clsx';
import { Offers } from '@/types/offer';
import PlaceCard from '@/components/place-card/place-card';

type PlacesListType = 'cities' | 'near-places';

const PlacesListTypeToClassName: Record<PlacesListType, string> = {
  cities: 'cities__places-list tabs__content',
  'near-places': 'near-places__list',
};

type PlacesListProps = {
  offers: Offers;
  type: PlacesListType;
  onActiveOfferChange?: (id: string | null) => void;
};

function PlacesList({
  offers,
  type,
  onActiveOfferChange,
}: PlacesListProps): JSX.Element {
  const handleCardMouseEnter = (id: string) => {
    onActiveOfferChange?.(id);
  };

  const handleCardMouseLeave = () => {
    onActiveOfferChange?.(null);
  };

  return (
    <div className={clsx(PlacesListTypeToClassName[type], 'places__list')}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          type={type}
          onMouseEnter={() => handleCardMouseEnter(offer.id)}
          onMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default PlacesList;
