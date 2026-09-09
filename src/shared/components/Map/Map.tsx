import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapLocation, OfferPreview, Offer } from '../../api/models';
import useMap from './hooks/useMap';
import useMarkers from './hooks/useMarkers';
import { PageType } from '../../api/const';
import { ACTIVE_MARKER, DEFAULT_MARKER } from './const';


type MapProps = {
  center: MapLocation;
  offers: Array<OfferPreview | Offer>;
  selectedOfferId: string | null;
  pageType?: PageType;
};

const Map = ({center, offers, selectedOfferId, pageType = PageType.Main}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, center);
  const markersRef = useMarkers(map, offers, selectedOfferId);
  const activeMarkerRef = useRef<leaflet.Marker | null>(null);

  useEffect(
    () => {
      if (activeMarkerRef.current) {
        activeMarkerRef.current?.setIcon(DEFAULT_MARKER);
        activeMarkerRef.current = null;
      }

      if (!selectedOfferId) {
        return;
      }

      const marker = markersRef.current.get(selectedOfferId);

      if (!marker) {
        return;
      }

      marker.setIcon(ACTIVE_MARKER);
      activeMarkerRef.current = marker;
    },
    [selectedOfferId, markersRef]
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
