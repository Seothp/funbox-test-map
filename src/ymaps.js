class YMap {
  constructor() {
    window.ymaps.ready(() => {
      this.map = new window.ymaps.Map('YMap', {
        center: [55.76, 37.64],
        zoom: 7,
      });
    });
  }

  addPolyline() {
    window.ymaps.ready(() => {
      this.polyline = new window.ymaps.Polyline(
        [], {}, {
          strokeColor: '#000000',
          strokeWidth: 4,
        },
      );
      this.map.geoObjects.add(this.polyline);
    });
  }

  updatePolyline(coordinates) {
    this.polyline.geometry.setCoordinates(coordinates);
  }

  addPlacemark(title, id) {
    const placemark = new window.ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: this.map.getCenter(),
      },
      properties: {
        balloonContent: title,
      },
    }, {
      draggable: true,
    });
    this.map.geoObjects.add(placemark, id);
    // eslint-disable-next-line no-debugger
    // debugger;
    return placemark;
  }

  removePlacemark(placemark) {
    this.map.geoObjects.remove(placemark);
  }
}

export default new YMap();
