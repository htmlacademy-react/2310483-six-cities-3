import { generateOfferPreview } from '../../../../utils/mocks/fake-data';
import { SlicesNames } from '../../../const';
import { getCity, getOffersFetchingStatus, getFilteredOffers, getOffers } from './selectors';


describe('Favorites Slice Selectors', () => {
  const state = {
    [SlicesNames.Offers]: {
      city: 'Paris',
      offers: [
        generateOfferPreview(true, 'Paris'),
        generateOfferPreview(true, 'London'),
        generateOfferPreview(true, 'Vienna'),
        generateOfferPreview(true, 'Paris'),
      ],
      isFetching: false,
    }
  };

  it('Should return an array of offers', () => {
    const offers = state[SlicesNames.Offers].offers;
    const result = getOffers(state);

    expect(result).toEqual(offers);
  });

  it('Should return a city', () => {
    const city = state[SlicesNames.Offers].city;
    const result = getCity(state);

    expect(result).toEqual(city);
  });

  it('Should return an isFetching flag of offers', () => {
    const isFetching = state[SlicesNames.Offers].isFetching;
    const result = getOffersFetchingStatus(state);

    expect(result).toEqual(isFetching);
  });

  it('Should return an array of filtered offers', () => {
    const expectedValue = [state[SlicesNames.Offers].offers[0], state[SlicesNames.Offers].offers[3]];

    const result = getFilteredOffers(state);

    expect(result).toEqual(expectedValue);
  });
});
