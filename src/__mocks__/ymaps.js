/* eslint-disable */
class YMap {
  addPolyline() {}

  updatePolyline(coordinates) {}

  addPlacemark(title, id) {
    return {
      events: {
        add(events, cb) {},
        remove(events, cb) {}
      },
      geometry: {
        getCoordinates() {
          return [0, 0]
        }
      }
    }
  }

  removePlacemark(placemark) {}
}

export default new YMap();
