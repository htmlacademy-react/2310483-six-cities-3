import OfferPreview from '../components/OfferPreview/OfferPreview';
import { getFavoriteOffersCb, OffersSortCb } from './func';
import { generateOfferPreview, generateOffers } from './mocks/fake-data';

describe('getFavoriteOffersCb', () => {
  it('Should return a Map object with favorite offer', () => {
    const mockOffer = generateOfferPreview(true);
    const expectedResult = new Map<string, OfferPreview[]>([[mockOffer.city.name, [mockOffer]]]);
    const result = getFavoriteOffersCb(new Map<string, OfferPreview[]>(), mockOffer);

    expect(result).toEqual(expectedResult);
  });
});

describe('offersSortCb', () => {
  it('Should return initial array of offers with "Popular" type', () => {
    const offers = generateOffers(5, false);

    const result = offers.sort(OffersSortCb['Popular']);
    expect(result).toEqual(offers);
  });

  it('Should return an array of offers sorted "Price: low to high"', () => {
    const offers = [
      generateOfferPreview(true, undefined, 500, 5),
      generateOfferPreview(true, undefined, 400, 4),
      generateOfferPreview(true, undefined, 600, 3),
    ];

    const expectedResut = [
      offers[1],
      offers[0],
      offers[2],
    ];

    const result = offers.sort(OffersSortCb['Price: low to high']);
    expect(result).toEqual(expectedResut);
  });

  it('Should return an array of offers sorted "Price: high to low"', () => {
    const offers = [
      generateOfferPreview(true, undefined, 500, 5),
      generateOfferPreview(true, undefined, 400, 4),
      generateOfferPreview(true, undefined, 600, 3),
    ];

    const expectedResut = [
      offers[2],
      offers[0],
      offers[1],
    ];

    const result = offers.sort(OffersSortCb['Price: high to low']);
    expect(result).toEqual(expectedResut);
  });

  it('Should return an array of offers sorted "Top rated first"', () => {
    const offers = [
      generateOfferPreview(true, undefined, 500, 4),
      generateOfferPreview(true, undefined, 400, 5),
      generateOfferPreview(true, undefined, 600, 3),
    ];

    const expectedResut = [
      offers[1],
      offers[0],
      offers[2],
    ];

    const result = offers.sort(OffersSortCb['Top rated first']);
    expect(result).toEqual(expectedResut);
  });
});
