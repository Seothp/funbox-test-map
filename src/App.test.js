import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

import YMap from './ymaps';

jest.mock('./ymaps');

/**
 *
 * @param {array} routes
 */
function addRoutes(routes) {
  routes.forEach((routeTitle) => {
    const form = screen.getByTestId('routesListForm');
    const input = screen.getByTestId('routesListInput');
    fireEvent.change(input, { target: { value: routeTitle } });
    fireEvent.submit(form);
  });
}
function getRouteByText(text) {
  const routeTitle = screen.getByText(text);
  return routeTitle.parentNode;
}

test('list should be null until elements added', () => {
  render(<App />);
  const list = screen.queryByTestId('routesList');
  expect(list).toBeNull();
});

test('route should be added correctly', () => {
  render(<App />);
  addRoutes(['route 1']);
  screen.getByText('route 1');
  console.log(YMap.addPlacemark);
});

test('route should be removed correctly', () => {
  const title = 'route to delete';
  render(<App />);
  addRoutes([title]);
  const route = getRouteByText(title);
  const btn = route.querySelector('button');
  fireEvent.click(btn);
  expect(route).not.toBeInTheDocument();
});

// OK, probably I can't test DND with react testing library
// because it don't let me work with coordinates :)
