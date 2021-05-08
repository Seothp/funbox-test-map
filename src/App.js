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
function App() {
  const [routes, setRoutes] = useState([]);
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
  const addRoute = (e, title) => {
    const id = newId();
    e.preventDefault();
    const placemark = new window.ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: YMap.getCenter(),
      },
      properties: {
        balloonContent: title,
      },
    }, {
      draggable: true,
    });
    YMap.geoObjects.add(placemark, id);
    placemark.events.add(['drag'], onPlacemarkDrag);
    setRoutes([...routes, { title, placemark, id }]);
  };
  const removeRoute = (id) => {
    const routeToRemove = routes.find((r) => r.id === id);
    setRoutes(routes.filter((route) => route.id !== id));
    YMap.geoObjects.remove(routeToRemove.placemark);
  };
  return (
    <div className="App">
      <div className="map-with-routes">
        <RoutesList
          routes={routes}
          onRouteRemove={removeRoute}
          setRoutes={setRoutes}
          onAddRoute={addRoute}
        />
        <div className="map" id="YMap" />
      </div>
    </div>
  );
}

export default App;
