/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';

import RoutesList from './components/RoutesList';
import YMap from './ymaps';

import './App.css';

let lastId = 0;
function newId() {
  lastId += 1;
  return lastId;
}
function App() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    YMap.addPolyline();
  }, []);
  useEffect(() => {
    if (routes.length > 0) {
      YMap.updatePolyline(routes.map((route) => route.placemark.geometry.getCoordinates()));
    }
    routes.forEach((route) => {
      route.placemark.events.remove(['drag'], onPlacemarkDrag);
      route.placemark.events.add(['drag'], onPlacemarkDrag);
    });
  }, [routes]);
  const onPlacemarkDrag = () => {
    YMap.updatePolyline(routes.map((route) => route.placemark.geometry.getCoordinates()));
  };
  const addRoute = (e, title) => {
    const id = newId();
    e.preventDefault();
    const placemark = YMap.addPlacemark(title, id);
    placemark.events.add(['drag'], onPlacemarkDrag);
    setRoutes([...routes, { title, placemark, id }]);
  };
  const removeRoute = (id) => {
    const routeToRemove = routes.find((r) => r.id === id);
    setRoutes(routes.filter((route) => route.id !== id));
    YMap.removePlacemark(routeToRemove.placemark);
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
