export class TimeFrameDataStruct {
  constructor(obj) {
    this.startTime = obj.startTime;
    this.stopTime = obj.stopTime;
    this.increment = obj.increment;
  }

  printTimeFrames() {
    console.log(this.startTime);
    console.log(this.stopTime);
  }
  getStartTimePos() {
      return this.startTime * this.increment;
  }

  getStopTimePos() {
      return this.stopTime * this.increment;
  }
}
