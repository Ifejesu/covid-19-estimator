const Estimator = ({
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation,
  periodType,
  timeToElapse,
  reportedCases,
  tHB,
  estimationFactor
}) => {
  const convertToDays = () => {
    if (periodType === 'weeks' || periodType === 'week') {
      return timeToElapse * 7;
    }
    if (periodType === 'months' || periodType === 'month') {
      return timeToElapse * 30;
    }
    return timeToElapse;
  };

  const rate = () => {
    const days = convertToDays() / 3;
    return 2 ** Math.trunc(days);
  };

  const currentlyInfected = () => reportedCases * estimationFactor;

  const infectionsByRequestedTime = () => currentlyInfected() * rate();

  const severeCasesByRequestedTime = () => Math.trunc(infectionsByRequestedTime() * 0.15);

  const hospitalBedsByRequestedTime = () => Math.trunc(tHB * 0.35 - severeCasesByRequestedTime());

  const casesForICUByRequestedTime = () => Math.trunc(infectionsByRequestedTime() * 0.05);

  const casesForVentilatorsByRequestedTime = () => Math.trunc(infectionsByRequestedTime() * 0.02);

  const dollarsInFlight = () => {
    const factor = avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const days = convertToDays();
    const res = (infectionsByRequestedTime() * factor) / days;
    return Math.trunc(res);
  };

  const results = () => ({
    currentlyInfected: currentlyInfected(),
    infectionsByRequestedTime: infectionsByRequestedTime(),
    severeCasesByRequestedTime: severeCasesByRequestedTime(),
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(),
    casesForICUByRequestedTime: casesForICUByRequestedTime(),
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(),
    dollarsInFlight: dollarsInFlight()
  });

  return results;
};

export default Estimator;
