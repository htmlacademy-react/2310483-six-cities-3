import {Link} from 'react-router-dom';
import style from './style.module.css';

const NotFoundPage = () => (
  <div className={style.container}>
    <h1 className={style.title}>404</h1>
    <p className={style.description}>Page not found</p>
    <Link className={style.linkButton} to="/">Go to main page</Link>
  </div>
);

export default NotFoundPage;
