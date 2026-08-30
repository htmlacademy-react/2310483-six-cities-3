import {useEffect, useRef} from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import { Offer } from '../../../api/models';
import {DEFAULT_MARKER, ACTIVE_MARKER} from '../const';

const useMarkers = (map: leaflet.Map | null, offers: Offer[], offerId?: string) => {
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Map<string, leaflet.Marker>>(
    new globalThis.Map<string, leaflet.Marker>()
  );

  useEffect(
    () => {
      if (!map) {
        return;
      }

      if (!markersLayerRef.current) {
        markersLayerRef.current = leaflet.layerGroup().addTo(map);
      }

      const markersLayer = markersLayerRef.current;

      markersLayer.clearLayers();
      offers.forEach(({id, location: {latitude, longitude}}) => {
        const marker = leaflet.marker({
          lat: latitude,
          lng: longitude,
        },
        {
          icon: id === offerId ? ACTIVE_MARKER : DEFAULT_MARKER,
        }
        );
        marker.addTo(markersLayer);

        markersRef.current.set(id, marker);
      });
    },
    [map, offers, offerId],
  );

  return markersRef;
};

export default useMarkers;
