import { useAppSelector } from '../../api/store/hooks';
import styles from './styles.module.css';

const ErrorMessage = () => {
  const errorMessage = useAppSelector((state) => state.error);

  return (errorMessage)
    ? (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    )
    :
    null;
};

export default ErrorMessage;
