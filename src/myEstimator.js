const Estimator = ({
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation,
  periodType,
  timeToElapse,
  reportedCases,
  totalHospitalBeds,
  estimationFactor
}) => {
  this.periodType = periodType;
  this.timeToElapse = timeToElapse;
  this.reportedCases = reportedCases;
  this.totalHospitalBeds = totalHospitalBeds;
  this.avgDailyIncomePopulation = avgDailyIncomePopulation;
  this.avgDailyIncomeInUSD = avgDailyIncomeInUSD;
  this.estimationFactor = estimationFactor;
};

Estimator.prototype.convertToDays = () => {
  if (this.periodType === 'weeks' || this.periodType === 'week') {
    return this.timeToElapse * 7;
  }
  if (this.periodType === 'months' || this.periodType === 'month') {
    return this.timeToElapse * 30;
  }
  return this.timeToElapse;
};

Estimator.prototype.rate = () => {
  let days = 0;
  days = this.convertToDays() / 3;
  return 2 ** Math.trunc(days);
};

Estimator.prototype.currentlyInfected = () => this.reportedCases * this.estimationFactor;

Estimator.prototype.infectionsByRequestedTime = () => this.currentlyInfected() * this.rate();

Estimator.prototype.severeCasesByRequestedTime = () => {
  Math.trunc(this.infectionsByRequestedTime() * 0.15);
};

Estimator.prototype.hospitalBedsByRequestedTime = () => {
  Math.trunc(this.totalHospitalBeds * 0.35 - this.severeCasesByRequestedTime());
};

Estimator.prototype.casesForICUByRequestedTime = () => {
  Math.trunc(this.infectionsByRequestedTime() * 0.05);
};

Estimator.prototype.casesForVentilatorsByRequestedTime = () => {
  Math.trunc(this.infectionsByRequestedTime() * 0.02);
};

Estimator.prototype.dollarsInFlight = () => {
  const factor = this.avgDailyIncomePopulation * this.avgDailyIncomeInUSD;
  const days = this.convertToDays();
  const res = (this.infectionsByRequestedTime() * factor) / days;
  return Math.trunc(res);
};

Estimator.prototype.results = () => ({
  currentlyInfected: this.currentlyInfected(),
  infectionsByRequestedTime: this.infectionsByRequestedTime(),
  severeCasesByRequestedTime: this.severeCasesByRequestedTime(),
  hospitalBedsByRequestedTime: this.hospitalBedsByRequestedTime(),
  casesForICUByRequestedTime: this.casesForICUByRequestedTime(),
  casesForVentilatorsByRequestedTime: this.casesForVentilatorsByRequestedTime(),
  dollarsInFlight: this.dollarsInFlight()
});

export default Estimator;
