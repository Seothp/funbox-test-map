/* eslint-disable */
class YMap {
  constructor() {
    /*
      map: {
        geoObjects: {
          add() {}
          remove() {}
        }
        getCenter() {}
      }
      placemark
    */
    // window.ymaps.ready(() => {
    //   this.map = new window.ymaps.Map('YMap', {
    //     center: [55.76, 37.64],
    //     zoom: 7,
    //   });
    // });
  }

  addPolyline() {
    // window.ymaps.ready(() => {
    //   this.polyline = new window.ymaps.Polyline(
    //     [], {}, {
    //       strokeColor: '#000000',
    //       strokeWidth: 4,
    //     },
    //   );
    //   this.map.geoObjects.add(this.polyline);
    // });
  }

  updatePolyline(coordinates) {
    // this.polyline.geometry.setCoordinates(coordinates);
  }

  addPlacemark(title, id) {
    // const placemark = new window.ymaps.GeoObject({
    //   geometry: {
    //     type: 'Point',
    //     coordinates: this.map.getCenter(),
    //   },
    //   properties: {
    //     balloonContent: title,
    //   },
    // }, {
    //   draggable: true,
    // });
    // this.map.geoObjects.add(placemark, id);
    // return placemark;
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

  removePlacemark(placemark) {
    // this.map.geoObjects.remove(placemark);
  }
}

export default new YMap();
