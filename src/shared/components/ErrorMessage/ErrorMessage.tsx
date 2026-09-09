import { useAppSelector } from '../../api/store/hooks';
import styles from './styles.module.css';

const ErrorMessage = () => {
  const errorMessage = useAppSelector((state) => state.error);
  const isNotFound = useAppSelector((state) => state.isNotFound);

  return (errorMessage && !isNotFound)
    ? (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    )
    :
    null;
};

export default ErrorMessage;
