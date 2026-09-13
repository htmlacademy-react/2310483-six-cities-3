import { AuthStatus } from '../../api/const';
import { useAppSelector } from '../../api/store/hooks';
import { getOffersFetchingStatus } from '../../api/store/slices/offers/selector';
import { getAuthStatus } from '../../api/store/slices/user/selectors';
import styles from './styles.module.css';

const Spinner = () => {
  const authStatus = useAppSelector(getAuthStatus);
  const isFetching = useAppSelector(getOffersFetchingStatus);

  return (
    (authStatus === AuthStatus.Unknown || isFetching)
      ?
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}/>
      </div>
      :
      null
  );
};

export default Spinner;
