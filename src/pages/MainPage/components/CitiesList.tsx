import { useState } from 'react';
import { Cities } from '../../../shared/api/const';
import classnames from 'classnames';
import { useAppDispatch } from '../../../shared/api/store/hooks';

const CitiesList = () => {
  const [currentCity, setCurrentCity] = useState<string>('Paris');
  const dispatch = useAppDispatch();

  const handleCityClick = (city: string) => {
    if (city !== currentCity) {
      setCurrentCity(city);
      dispatch({
        type: 'city/change',
        payload: city,
      });
    }
  };

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            onClick={
              () => handleCityClick(city)
            }
            className={
              classnames(
                'locations__item-link tabs__item',
                {'tabs__item--active': city === currentCity},
              )
            }
            href="#"
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CitiesList;
