import { useEffect, useRef } from 'react';
import { Icon, layerGroup, Marker } from 'leaflet';
import clsx from 'clsx';
import { City, Offer } from '@/types/offer';
import useMap from '@/hooks/use-map';
import {
  MARKER_ANCHOR,
  MARKER_SIZE,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
} from './const';
import 'leaflet/dist/leaflet.css';

type MapOffer = Pick<Offer, 'id' | 'location'>;

type MapProps = {
  className: string;
  city: City;
  offers: MapOffer[];
  activeOfferId: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: MARKER_SIZE,
  iconAnchor: MARKER_ANCHOR,
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: MARKER_SIZE,
  iconAnchor: MARKER_ANCHOR,
});

function Map({
  className,
  city,
  offers,
  activeOfferId,
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOfferId]);

  return <section className={clsx(className, 'map')} ref={mapRef}></section>;
}

export default Map;
