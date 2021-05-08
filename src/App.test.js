import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { container } = render(<App />);
  const list = container.querySelector('ul[data-testid="routes-list"]');
  console.log(list);
});
