import { useNavigate } from 'react-router-dom';
import { ApiPaths, AuthStatus, Paths } from '../const';
import { api } from '../services/api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useState } from 'react';
import { getAuthStatus } from '../store/slices/user/selectors';
import { getFavoriteOffers } from '../store/slices/favorites/selectors';
import { getOffers } from '../store/slices/offers/selector';
import { deleteFavoriteOffer, setFavoriteOffer } from '../store/slices/favorites/favorites-slice';

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
  const authStatus = useAppSelector(getAuthStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavorite = favoriteOffers.some((favOffer) => favOffer.id === id);
  const offers = useAppSelector(getOffers);
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
