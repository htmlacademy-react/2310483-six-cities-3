import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../api/models';
import useMap from './hooks/useMap';
import useMarkers from './hooks/useMarkers';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
};

const defaultMarker = leaflet.icon({
  iconUrl: 'img/pin.svg',
});

const activeMarker = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
});

const Map = ({city, offers, selectedOffer}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersRef = useMarkers(map, offers, defaultMarker);
  const activeMarkerRef = useRef<leaflet.Marker | null>(null);

  useEffect(
    () => {
      if (activeMarkerRef) {
        activeMarkerRef.current?.setIcon(defaultMarker);
        activeMarkerRef.current = null;
      }

      if (!selectedOffer) {
        return;
      }

      const marker = markersRef.current.get(selectedOffer.id);

      if (!marker) {
        return;
      }

      marker.setIcon(activeMarker);
      activeMarkerRef.current = marker;
    },
    [selectedOffer, markersRef]
  );

  return(
    <div
      ref={mapRef}
      style={{height: '100%', width: '100%'}}
    />
  );
};

export default Map;
