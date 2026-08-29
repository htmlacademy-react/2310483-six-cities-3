import {useEffect, useRef} from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import { Offer } from '../../../api/models';

const useMarkers = (map: leaflet.Map | null, offers: Offer[], icon: leaflet.Icon) => {
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
          icon: icon,
        }
        );
        marker.addTo(markersLayer);

        markersRef.current.set(id, marker);
      });
    },
    [map, offers, icon],
  );

  return markersRef;
};

export default useMarkers;
