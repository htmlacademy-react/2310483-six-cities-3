import { useAppDispatch, useAppSelector } from '../../api/store/hooks';
import { clearFavoritesError } from '../../api/store/slices/favorites/favorites-slice';
import { clearOffersError } from '../../api/store/slices/offers/offers-slice';
import { getFetchOffersErrorStatus } from '../../api/store/slices/offers/selector';
import styles from './styles.module.css';

const ErrorMessages = {
  offers: 'Can\'t load offers',
  favorites: 'Can\'t load favorites',
};


const ErrorMessage = () => {
  const fetchOffersError = useAppSelector(getFetchOffersErrorStatus);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearOffersError());
    dispatch(clearFavoritesError());
  };

  return (fetchOffersError)
    ? (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{ErrorMessages.offers}</p>
        <button className={styles.skipButton} onClick={handleClose}>
          Skip
        </button>
      </div>
    )
    :
    null;
};

export default ErrorMessage;
