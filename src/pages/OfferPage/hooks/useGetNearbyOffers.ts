import { OfferPreview } from '../../../shared/api/models';
import { useState, useEffect } from 'react';
import { api } from '../../../shared/api/services/api';
import { ApiPaths } from '../../../shared/api/const';

export const useGetNearbyOffers = (id?: string) => {
  const [nearbyOffers, setNearbyOffers] = useState<OfferPreview[]>([]);

  useEffect(
    () => {
      let shouldUpdate = true;

      const fetchData = async () => {
        const {data} = await api.get<OfferPreview[]>(`${ApiPaths.Offers}/${id}/nearby`);
        if (shouldUpdate) {
          setNearbyOffers(data);
        }
      };

      if (id) {
        fetchData();
      }

      return () => {
        shouldUpdate = false;
      };
    },
    [id]
  );

  return nearbyOffers;
};
