import {render} from '@testing-library/react';
import {vi} from 'vitest';
import ScrollToTop from './ScrollToTop';
import {useLocation} from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

const mockedUseLocation = vi.mocked(useLocation);

describe('ScrollToTop', () => {
  it('Scrolls on top on render', () => {
    mockedUseLocation.mockReturnValue({
      pathname: '/offers',
      search: '',
      hash: '',
      state: '',
      key: 'default',
    });

    const scrollToMock = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(<ScrollToTop />);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    scrollToMock.mockRestore();
  });
});
