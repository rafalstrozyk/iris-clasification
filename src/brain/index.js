import brain from '../../node_modules/brain.js/src/index';
import { irisLearningData } from './data';

const initState = {
  errors: {
    error: '',
    iterations: '',
  },
  irisNames: ['setosa', 'versicolor', 'virginica'],
  irisData: irisLearningData,
  hiddenLayers: [4, 3],
  iterations: 1,
  learnigRate: 0.1,
  errorThresh: 0.005,
  trainedNet: null,
};

const irisBrain = {
  state: { ...initState },
  net: () => {
    return new brain.NeuralNetwork({
      hiddenLayers: irisBrain.state.hiddenLayers,
    });
  },
  irisTraining: () => {
    const outputData = irisBrain.state.irisData.map((item) => [
      item.species === 'setosa' ? 1 : 0,
      item.species === 'versicolor' ? 1 : 0,
      item.species === 'virginica' ? 1 : 0,
    ]);

    const trainingData = irisBrain.state.irisData.map((item) => [
      item.sepalLength,
      item.sepalWidth,
      item.petalLength,
      item.petalWidth,
    ]);

    const fullData = [];
    for (let i = 0; i < irisBrain.state.irisData.length; i++) {
      fullData.push({
        input: trainingData[i],
        output: outputData[i],
      });
    }

    irisBrain.state.trainedNet = irisBrain.net();

    irisBrain.state.trainedNet.train(fullData, {
      log: (error) => (irisBrain.state.errors = error),
      logPeriod: 1,
      iterations: irisBrain.state.iterations,
      learningRate: irisBrain.state.learnigRate,
    });
  },
  set setHiddenLayers(hiddenLayers) {
    if (hiddenLayers.length > 0) {
      const str = hiddenLayers;
      const words = str.split(' ');
      const intArray = words.map((str) => parseInt(str));
      const intArrayNonNan = intArray.filter((val) => !Number.isNaN(val));
      irisBrain.state.hiddenLayers = intArrayNonNan;
    }
  },
  resetHiddenLayers: () => {
    irisBrain.state.hiddenLayers = [4, 3];
  },
  set setErrorThresh(newErrorThresh) {
    irisBrain.state.errorThresh = newErrorThresh;
  },
  set setIterations(newIterations) {
    irisBrain.state.iterations = parseInt(newIterations);
  },
  set setLearningRate(newLearningRate) {
    irisBrain.state.learnigRate = parseFloat(newLearningRate);
  },
  set setData(newData) {
    irisBrain.state.irisData = JSON.parse(newData);
  },
  resetData: () => {
    irisBrain.state.irisData = irisLearningData;
  },
  irisClasification: (item) => {
    return irisBrain.state.trainedNet.run(item);
  },
  nameClasification: (values) => {
    let i = values.indexOf(Math.max(...values));
    return irisBrain.state.irisNames[i];
  },
  svgGenerator: () => {
    return brain.utilities.toSVG(irisBrain.state.trainedNet);
  },
  resetAllSettings: () => {
    irisBrain.state = { ...initState };
  },
};

export default irisBrain;
