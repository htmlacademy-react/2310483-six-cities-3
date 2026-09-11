import { useNavigate } from 'react-router-dom';
import { ApiPaths, AuthStatus, Paths } from '../const';
import { api } from '../services/api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFavoriteOffer, deleteFavoriteOffer } from '../store/action';
import { useState } from 'react';

const FavoriteStatus = new Map<boolean, number>(
  [
    [true, 1],
    [false, 0],
  ]
);

type UseSetFavoriteReturnType = {
  isUpdating: boolean;
  isBookmarkActive: boolean;
  favoriteChangeHandler: () => Promise<boolean | null | undefined>;
}

export const useFavoriteChange = (id?: string): UseSetFavoriteReturnType => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authStatus);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const isFavorite = favoriteOffers.offers.some((favOffer) => favOffer.id === id);
  const offers = useAppSelector((state) => state.offers);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isBookmarkActive, setIsBookmarkActive] = useState<boolean>(isFavorite);

  const favoriteChangeHandler = async () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(Paths.Login);
      return null;
    }

    if (!id) {
      return;
    }

    const offer = offers.find((item) => item.id === id);
    if (!offer) {
      return;
    }

    setIsUpdating(true);
    const {status} = await api.post<number>(`${ApiPaths.Favorite}/${id}/${FavoriteStatus.get(!isBookmarkActive)}`);

    if (status === 200 || status === 201) {
      setIsUpdating(false);
      setIsBookmarkActive(!isBookmarkActive);
      dispatch(isFavorite ? deleteFavoriteOffer(id) : setFavoriteOffer({...offer, isFavorite: true}));
      return true;
    }
  };

  return {
    isUpdating,
    isBookmarkActive,
    favoriteChangeHandler,
  };
};
