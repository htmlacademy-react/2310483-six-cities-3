import { AuthStatus } from '../../api/const';
import { useAppSelector } from '../../api/store/hooks';
import styles from './styles.module.css';

const Spinner = () => {
  const isFetching = useAppSelector((state) => state.isFetching);
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    (isFetching || authStatus === AuthStatus.Unknown)
      ?
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}/>
      </div>
      :
      null
  );
};

export default Spinner;
