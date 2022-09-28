export class TimeFrame {
  constructor(obj) {
    this.startTime = obj.startTime;
    this.stopTime = obj.stopTime;
    this.increment = obj.increment
    this.description = obj.description;
  }

  getStartTimePos() {
      return this.startTime * this.increment;
  }

  getStopTimePos() {
      return this.stopTime * this.increment;
  }

}
