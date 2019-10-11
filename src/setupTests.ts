import '@testing-library/jest-dom/extend-expect';

jest.mock('react-lazyload', () => jest.fn(({ children }) => children));
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));
