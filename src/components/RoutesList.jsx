/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
function RoutesList({ routes, setRoutes, onRouteRemove }) {
  // const onDrag = () => {

  // };
  // const onDragEnd = () => {
  //   document.removeEventListener('mousemove', onDrag);
  // };
  // const onDragStart = (e) => {
  //   const route = e.target.closest('.route');
  //   const routeList = route.closest('.routes');
  //   route.style.position = 'absolute';
  //   route.style.left = e.clientX;
  //   route.style.right = e.clientY;
  //   console.log(e);
  //   routeList.removeChild(route);
  //   document.body.appendChild(route);
  //   document.addEventListener('mousemove', onDrag);
  //   document.addEventListener('onmouseup', onDragEnd);
  // };
  if (routes && routes.length > 0) {
    return (
      <ul className="routes">
        {routes.map((route) => (
          <li
            className="route"
            key={route.id}
            // onMouseDown={onDragStart}
          >
            <span className="route-title">
              { route.title }
            </span>
            <button type="button" className="route-delete-btn" onClick={() => onRouteRemove(route.id)}>X</button>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default RoutesList;
