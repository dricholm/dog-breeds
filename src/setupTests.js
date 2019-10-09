jest.mock('react-lazyload', () => jest.fn(({ children }) => children));
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));
