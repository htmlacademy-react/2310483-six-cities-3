import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../api/models';
import useMap from './hooks/useMap';
import useMarkers from './hooks/useMarkers';
import { PageType } from '../../api/const';
import { ACTIVE_MARKER, DEFAULT_MARKER } from './const';


type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
  pageType?: PageType;
};

const Map = ({city, offers, selectedOffer, pageType = PageType.Main}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersRef = useMarkers(map, offers, selectedOffer?.id);
  const activeMarkerRef = useRef<leaflet.Marker | null>(null);

  useEffect(
    () => {
      if (activeMarkerRef.current) {
        activeMarkerRef.current?.setIcon(DEFAULT_MARKER);
        activeMarkerRef.current = null;
      }

      if (!selectedOffer) {
        return;
      }

      const marker = markersRef.current.get(selectedOffer.id);

      if (!marker) {
        return;
      }

      marker.setIcon(ACTIVE_MARKER);
      activeMarkerRef.current = marker;
    },
    [selectedOffer, markersRef]
  );

  return(
    <div
      ref={mapRef}
      style={{
        height: '100%',
        width: pageType === PageType.Offer ? '1144px' : '100%',
        left: pageType === PageType.Offer ? 'calc(50% - 572px)' : '0'}}
    />
  );
};

export default Map;
