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
  if (this.periodType === 'days' || this.periodType === 'day') {
    return this.timeToElapse;
  }
  else if (this.periodType === 'weeks' || this.periodType === 'week') {
    return this.timeToElapse * 7;
  }
  else if (this.periodType === 'months' || this.periodType === 'month') {
    return this.timeToElapse * 30;
  }
  else {
      return 0;
    }
};

Estimator.prototype.rateOfInfection = () => {
  const days = this.convertToDays() / 3;

  return 2 ** Math.trunc(days);
};

Estimator.prototype.currentlyInfected = () => {
  return this.reportedCases * this.estimationFactor;
};
Estimator.prototype.infectionsByRequestedTime = () => {
  return this.currentlyInfected() * this.rateOfInfection();
};
Estimator.prototype.severeCasesByRequestedTime = () => {
  return Math.trunc(this.infectionsByRequestedTime() * 0.15);
};
Estimator.prototype.hospitalBedsByRequestedTime = () => {
  return Math.trunc(
    this.totalHospitalBeds * 0.35 - this.severeCasesByRequestedTime()
  );
};

Estimator.prototype.casesForICUByRequestedTime = () => {
  return Math.trunc(this.infectionsByRequestedTime() * 0.05);
};

Estimator.prototype.casesForVentilatorsByRequestedTime = () => {
  return Math.trunc(this.infectionsByRequestedTime() * 0.02);
};
Estimator.prototype.dollarsInFlight = () => {
  const factor = this.avgDailyIncomePopulation * this.avgDailyIncomeInUSD;
  const days = this.convertToDays();
  const res = (this.infectionsByRequestedTime() * factor) / days;
  return Math.trunc(res);
};

Estimator.prototype.results = () => {
  return {
    currentlyInfected: this.currentlyInfected(),
    infectionsByRequestedTime: this.infectionsByRequestedTime(),
    severeCasesByRequestedTime: this.severeCasesByRequestedTime(),
    hospitalBedsByRequestedTime: this.hospitalBedsByRequestedTime(),
    casesForICUByRequestedTime: this.casesForICUByRequestedTime(),
    casesForVentilatorsByRequestedTime: this.casesForVentilatorsByRequestedTime(),
    dollarsInFlight: this.dollarsInFlight()
  };
};

export default Estimator;
