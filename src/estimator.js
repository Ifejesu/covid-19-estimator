const Estimator = require('./myEstimator');

const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  const impact = new Estimator({
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    estimationFactor: 10
  });

  const severeImpact = new Estimator({
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    estimationFactor: 50
  });

  return {
    data,
    impact,
    severeImpact
  };
};

module.export = covid19ImpactEstimator;
