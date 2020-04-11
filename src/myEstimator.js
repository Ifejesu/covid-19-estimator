const Estimator = ({
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation,
  periodType,
  timeToElapse,
  reportedCases,
  totalHospitalBeds,
  estimationFactor
}) => {
  const convertToDays = () => {
    let days;
    if (periodType === 'days') {
      days = timeToElapse;
    } else if (periodType === 'weeks') {
      days = timeToElapse * 7;
    } else {
      days = timeToElapse * 30;
    }
    return days;
  };

  const infectionRate = () => {
    const days = convertToDays() / 3;
    return 2 ** Math.trunc(days);
  };

  const currentlyInfected = reportedCases * estimationFactor;

  const infectionsByRequestedTime = currentlyInfected * infectionRate;

  const severeCasesByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.15
  );

  const hospitalBedsByRequestedTime = Math.trunc(
    totalHospitalBeds * 0.35 - severeCasesByRequestedTime
  );

  const casesForICUByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.05
  );

  const casesForVentilatorsByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.02
  );

  const dollarsInFlight = () => {
    const factor = avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const days = convertToDays();
    const res = (infectionsByRequestedTime() * factor) / days;
    return Math.trunc(res);
  };

  const results = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return results;
};

export default Estimator;
