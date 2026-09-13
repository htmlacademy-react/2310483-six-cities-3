import {useNavigate} from 'react-router-dom';
import styles from './style.module.css';
import { Paths } from '../../shared/api/const';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>Page not found</p>
      <button onClick={() => navigate(Paths.Main)} className={styles.linkButton}>
        Go to Main page
      </button>
    </div>
  );
};

export default NotFoundPage;
