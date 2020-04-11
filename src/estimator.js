import Estimator from "./myEstimator";
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

    return { data, impact: impact.results(), severeImpact: severeImpact.results() };
};

export default covid19ImpactEstimator;
