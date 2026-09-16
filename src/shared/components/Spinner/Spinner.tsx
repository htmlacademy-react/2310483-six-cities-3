
import styles from './styles.module.css';

const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}/>
    <p className="visually-hidden">Loading...</p>
  </div>
);

export default Spinner;
