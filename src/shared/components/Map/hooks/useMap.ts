import { useState, useEffect, useRef } from 'react';
import leaflet, { Map } from 'leaflet';
import { City } from '../../../api/models';
import { TILE_LAYER, TILE_LAYER_ATTRIBUTION } from '../const';

const useMap = (mapRef: React.RefObject<HTMLElement>, city: City) => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(
    () => {
      if (mapRef.current !== null && !isRenderedRef.current) {
        const instance: Map = leaflet.map(mapRef.current, {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          zoom: city.location.zoom
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
    [mapRef, city]
  );

  return map;
};

export default useMap;
