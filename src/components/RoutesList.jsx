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
    const id = Number(e.dataTransfer.getData('routeId'));
    const target = e.target.closest('.route');
    if (target === null) return;
    const { offsetTop, offsetHeight } = target;
    const { clientY } = e;
    let idx = Number(target.getAttribute('idx'));
    const isBottomOfTarget = clientY - offsetTop < offsetHeight / 2;
    const routeToMove = routes.find((r) => r.id === id);
    const indexToMove = routes.findIndex((r) => r.id === id);
    if (!isBottomOfTarget && indexToMove > idx) idx += 1;
    if (isBottomOfTarget && indexToMove < idx) idx -= 1;
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
      >
        <input
          className="input"
          type="text"
          value={inputValue}
          placeholder="Имя маршрута"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-btn" type="submit">
          add
        </button>
      </form>
      {routes && routes.length > 0 && (
        <ul
          className="routes-list"
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
              <span className="route-title">
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
