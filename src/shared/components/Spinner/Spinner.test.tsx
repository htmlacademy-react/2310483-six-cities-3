import { screen, render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('Should be rendered correctly', () => {
    render(<Spinner />);
    const expectedText = 'Loading...';

    const result = screen.getByText(expectedText);
    expect(result).toBeInTheDocument();
  });
});
