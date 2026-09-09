import { Offer } from '../../../shared/api/models';
import { useState, useEffect } from 'react';
import { api } from '../../../shared/api/services/api';
import { ApiPaths } from '../../../shared/api/const';
import { useAppDispatch } from '../../../shared/api/store/hooks';
import { setIsFetching } from '../../../shared/api/store/action';

export const useGetOffer = (id?: string): Offer | null => {
  const dispatch = useAppDispatch();
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(
    () => {
      let shouldUpdate = true;
      const fetchData = async () => {
        dispatch(setIsFetching(true));
        setOffer(null);

        try {
          const {data} = await api.get<Offer>(`${ApiPaths.Offers}/${id}`);

          if (shouldUpdate) {
            setOffer(data);
          }
        } finally {
          dispatch(setIsFetching(false));
        }
      };
      if (id) {
        fetchData();
      }

      return () => {
        shouldUpdate = false;
      };
    },
    [id, dispatch]
  );

  return offer;
};
