export default class DataTransfer {
  constructor() {
    this.data = {};
    this.types = [];
    this.files = [];
  }

  setData(format, data) {
    this.data[format] = data;
  }

  getData(format) {
    return this.data[format];
  }
}
