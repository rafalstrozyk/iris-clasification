import brain from '../../node_modules/brain.js/src/index';
import { irisLearningData } from './data';

// initial state
const initState = {
  errors: {
    error: '',
    iterations: '',
  },
  irisNames: ['setosa', 'versicolor', 'virginica'],
  irisData: irisLearningData,
  initHiddenLayers: [4, 3],
  initIterations: 1,
  initLearnigRate: 0.1,
};
let state = initState;

// brain
let net = new brain.NeuralNetwork({
  hiddenLayers: state.initHiddenLayers,
});

// hange hiddel layers
export function hangeHiddenLayers(hiddenLayers) {
  if (hiddenLayers.length > 0) {
    net = new brain.NeuralNetwork({
      hiddenLayers: hiddenLayers,
    });
  }
}

export function resetAllSettings() {
  state = initState;
}
// get hidden layers
export function getHiddenLayers() {
  return state.initHiddenLayers;
}

// reset hidden layers
export function resetHiddenLayers() {
  net = new brain.NeuralNetwork({
    hiddenLayers: state.initHiddenLayers,
  });
}

// training AI
export function irisTraining() {
  const outputData = state.irisData.map((item) => [
    item.species === 'setosa' ? 1 : 0,
    item.species === 'versicolor' ? 1 : 0,
    item.species === 'virginica' ? 1 : 0,
  ]);

  const trainingData = state.irisData.map((item) => [
    item.sepalLength,
    item.sepalWidth,
    item.petalLength,
    item.petalWidth,
  ]);

  const fullData = [];
  for (let i = 0; i < state.irisData.length; i++) {
    fullData.push({
      input: trainingData[i],
      output: outputData[i],
    });
  }
  console.log(state.initLearnigRate);

  net.train(fullData, {
    log: (error) => (state.errors = error),
    logPeriod: 1,
    iterations: state.initIterations,
    learningRate: state.initLearnigRate,
  });
}

export function setIterations(iterations) {
  state.initIterations = iterations;
}
export function setLearningRate(learningRate) {
  state.initLearnigRate = learningRate;
}
export function getIterations() {
  return state.initIterations;
}
export function getLearningRate() {
  return state.initLearnigRate;
}

// clasification iris
function irisClasification(item) {
  return net.run(item);
}

export function getIrisLearningData() {
  return state.irisData;
}

// set new learning data
export function setIrisLearningData(newData) {
  if (newData) {
    state.irisData = newData;
  }
}

// reset data to initial state learning data
export function resetData() {
  state.irisData = irisLearningData;
}

// get iris type name
export function irisNameClasification(values) {
  let i = values.indexOf(Math.max(...values));
  return state.irisNames[i];
}

export function svgGenerator() {
  return brain.utilities.toSVG(net);
}

// get error info
export function errorInfo() {
  return state.errors;
}

export default irisClasification;
