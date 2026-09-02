import { useState, useEffect, useRef } from 'react';
import leaflet, { Map } from 'leaflet';
import { MapLocation } from '../../../api/models';
import { TILE_LAYER, TILE_LAYER_ATTRIBUTION } from '../const';

const useMap = (mapRef: React.RefObject<HTMLElement>, center: MapLocation) => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(
    () => {
      if (mapRef.current !== null && !isRenderedRef.current) {
        const instance: Map = leaflet.map(mapRef.current, {
          center: {
            lat: center.latitude,
            lng: center.longitude,
          },
          zoom: center.zoom
        });

        leaflet
          .tileLayer(
            TILE_LAYER,
            {
              attribution: TILE_LAYER_ATTRIBUTION,
            },
          )
          .addTo(instance);

        setMap(instance);
        isRenderedRef.current = true;
      }
    },
    [mapRef, center]
  );

  useEffect(
    () => {
      if (map !== null) {
        map.setView({
          lat: center.latitude,
          lng: center.longitude
        });
      }
    },
    [center, map]
  );

  return map;
};

export default useMap;
