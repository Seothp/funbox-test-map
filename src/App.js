/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';

import RoutesList from './components/RoutesList';

import './App.css';

let lastId = 0;
let YMap;
let polyline;
function newId() {
  lastId += 1;
  return lastId;
}
/*
  dragndrop:
    onmousedown -> remove el from dom, add el to body, make it absolute
*/
function App() {
  const [routes, setRoutes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const initYMap = () => {
      YMap = new window.ymaps.Map('YMap', {
        center: [55.76, 37.64],
        zoom: 7,
      });
    };
    window.ymaps.ready(initYMap);
    window.ymaps.ready(() => {
      polyline = new window.ymaps.Polyline(
        [], {}, {
          strokeColor: '#000000',
          strokeWidth: 4,
        },
      );
      YMap.geoObjects.add(polyline);
    });
  }, []);
  useEffect(() => {
    if (routes.length > 0) {
      window.ymaps.ready(() => {
        polyline.geometry.setCoordinates(
          routes.map((route) => route.placemark.geometry.getCoordinates()),
        );
      });
    }
    routes.forEach((route) => {
      route.placemark.events.remove(['drag'], onPlacemarkDrag);
      route.placemark.events.add(['drag'], onPlacemarkDrag);
    });
  }, [routes]);
  const onPlacemarkDrag = () => {
    polyline.geometry.setCoordinates(
      routes.map((route) => route.placemark.geometry.getCoordinates()),
    );
  };
  const addRoute = (e) => {
    const id = newId();
    e.preventDefault();
    const placemark = new window.ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: YMap.getCenter(),
      },
    }, {
      draggable: true,
    });
    YMap.geoObjects.add(placemark, id);
    placemark.events.add(['drag'], onPlacemarkDrag);
    setRoutes([...routes, { title: inputValue, placemark, id }]);
  };
  const removeRoute = (id) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const routeToRemove = routes.find((r) => r.id === id);
    setRoutes(routes.filter((route) => route.id !== id));
    YMap.geoObjects.remove(routeToRemove.placemark);
  };
  // const onRouteDrag = () => {

  // };

  return (
    <div className="App">
      <form onSubmit={addRoute}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">
          add
        </button>
      </form>
      <RoutesList
        routes={routes}
        onRouteRemove={removeRoute}
      />
      {/* {routes && routes.length > 0 && (
        <ul className="routes">
          {routes.map((route) => (
            <li className="route" key={route.id}>
              <span className="route-title">
                { route.title }
              </span>
              <button
              type="button"
              className="route-delete-btn" onClick={() => removeRoute(route.id)}>X</button>
            </li>
          ))}
        </ul>
      )} */}
      <div className="" id="YMap" style={{ width: 900, height: 600 }} />
    </div>
  );
}

export default App;
