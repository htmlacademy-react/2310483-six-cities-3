import {useNavigate} from 'react-router-dom';
import style from './style.module.css';
import { useAppSelector } from '../../shared/api/store/hooks';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const isNotFound = useAppSelector((state) => state.isNotFound);
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!isNotFound) {
        navigate('/');
      }
    },
    [isNotFound, navigate]
  );

  return (
    <div className={style.container}>
      <h1 className={style.title}>404</h1>
      <p className={style.description}>Page not found</p>
    </div>
  );
};

export default NotFoundPage;
