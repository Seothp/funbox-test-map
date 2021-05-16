/* eslint-disable react/prop-types */
import { useState } from 'react';

import './RoutesList.css';

function RoutesList({
  routes, setRoutes, onRouteRemove, onAddRoute,
}) {
  const [inputValue, setInputValue] = useState('');
  const addRoute = (e) => {
    onAddRoute(e, inputValue);
    setInputValue('');
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragStart = (e, id) => {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('routeId', id);
  };
  const onDrop = (e) => {
    console.log(e);
    const id = Number(e.dataTransfer.getData('routeId'));
    const target = e.target.closest('.route');
    if (target === null) return;
    const { offsetTop, offsetHeight } = target;
    const { pageY } = e;
    let idx = Number(target.getAttribute('idx'));
    const isTopOfTarget = pageY - offsetTop < offsetHeight / 2;
    const routeToMove = routes.find((r) => r.id === id);
    const indexToMove = routes.findIndex((r) => r.id === id);
    if (!isTopOfTarget && indexToMove > idx) idx += 1;
    if (isTopOfTarget && indexToMove < idx) idx -= 1;
    const newRoutes = [...routes];
    newRoutes.splice(indexToMove, 1);
    newRoutes.splice(idx, 0, routeToMove);
    setRoutes(newRoutes);
  };
  return (
    <div className="routes">
      <form
        className="form"
        onSubmit={(e) => addRoute(e)}
        data-testid="routesListForm"
      >
        <input
          className="input"
          type="text"
          value={inputValue}
          placeholder="Имя маршрута"
          data-testid="routesListInput"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-btn" type="submit">
          add
        </button>
      </form>
      {routes && routes.length > 0 && (
        <ul
          className="routes-list"
          data-testid="routesList"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {routes.map((route, idx) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              className="route"
              key={route.id}
              onDragStart={(e) => onDragStart(e, route.id)}
              draggable
              idx={String(idx)}
            >
              <span className="route-title" data-testid="routeTitle">
                { route.title }
              </span>
              <button
                type="button"
                className="route-delete-btn"
                aria-label="Delete"
                onClick={() => onRouteRemove(route.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoutesList;
