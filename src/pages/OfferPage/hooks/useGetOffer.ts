import { Offer } from '../../../shared/api/models';
import { useState, useEffect } from 'react';
import { api } from '../../../shared/api/services/api';
import { ApiPaths } from '../../../shared/api/const';

type UseGetOfferReturnType = {
  offer: Offer | null;
  isFetching: boolean;
  isNotFound: boolean;
}

export const useGetOffer = (id?: string): UseGetOfferReturnType => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  useEffect(
    () => {
      let shouldUpdate = true;
      const fetchData = async () => {
        setOffer(null);
        setIsFetching(true);
        try {
          const {data} = await api.get<Offer>(`${ApiPaths.Offers}/${id}`);

          if (shouldUpdate) {
            setOffer(data);
          }
        } catch {
          setIsNotFound(true);
        } finally {
          setIsFetching(false);
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

  return {
    offer,
    isFetching,
    isNotFound
  };
};
