import React, { useContext, useState} from 'react';
import styled from 'styled-components';
import IrisSliderGroup from './irisSliderGroup';
import Button from './Button';
import Input from './Input';
import Textarea from './textarea';
import ClasificationWindw from './ClasificationWindow';
import { Context } from '../globalState/store';
import irisClasification, {
  hangeHiddenLayers,
  getHiddenLayers,
  errorInfo,
  irisTraining,
  irisNameClasification,
  resetAllSettings,
  svgGenerator,
  setIterations,
  setLearningRate,
  getLearningRate,
  getIterations,
} from '../brain';

const StyledSettingsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledTrainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-top: 15px;
  }

  .container {
    display: flex;
    align-items: center;

    > *:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const SettingsGroup = () => {
  const [state] = useContext(Context);
  const [isTraining, setIsTrainig] = useState(false);
  const [isClasification, setIsClasification] = useState(false);
  const [errors, setErrors] = useState(errorInfo());
  const [hiddenLayers, setHiddenLayers] = useState(getHiddenLayers().join(' '));
  const [irisName, setIrisName] = useState('');
  const [irisTypeArray, setIrisTypeArray] = useState([0, 0, 0]);
  const [iterations, setIteration] = useState(getIterations());
  const [learning, setLearning] = useState(getLearningRate());
  const [openClasificationWindow, setOpenClasificationWindow] = useState(false);

  function handleIrisClarification() {
    setIsClasification(true);
    setOpenClasificationWindow(true);
    const output = irisClasification([
      state.sepalLength,
      state.sepalWidth,
      state.petalLenght,
      state.petalWidth,
    ]);

    setIrisName(irisNameClasification(output));
    setIrisTypeArray(output);
  }

  function handleTrain() {
    irisTraining();
    setErrors(errorInfo());
    setIsTrainig(true);
  }

  function handleTextToArray(e) {
    setIsTrainig(false);
    setHiddenLayers(e.target.value);
    const str = e.target.value;
    const words = str.split(' ');
    const intArray = words.map((str) => parseInt(str));
    const intArrayNonNan = intArray.filter((val) => !Number.isNaN(val));
    hangeHiddenLayers(intArrayNonNan);
  }

  function handleIterations(e) {
    // setIsTrainig(false);
    setIteration(e.target.value);
    setIterations(parseInt(e.target.value));
  }
  function handleLearningRate(e) {
    // setIsTrainig(false);
    setLearning(e.target.value);
    setLearningRate(parseFloat(e.target.value));
  }

  function handleResetAll() {
    resetAllSettings();
    setIsClasification(false);
    setIsTrainig(false);
    setErrors(errorInfo());
    setHiddenLayers(getHiddenLayers().join(' '));
    setIterations(1);
    setLearning(getLearningRate());
    setIteration(getIterations());
    setIrisName('');
    setIrisTypeArray([0, 0, 0]);
    console.log(getIterations());
  }

  return (
    <StyledSettingsGroup>
      <StyledTrainBox>
        <div className="container">
          <label htmlFor="hiden-layers">Hidden Layers:</label>
          <Input
            id="hiden-layers"
            type="text"
            value={hiddenLayers}
            onChange={(e) => handleTextToArray(e)}
          />
          <label htmlFor="iterations">Iterations:</label>
          <Input
            id="iterations"
            type="number"
            value={iterations}
            min="1"
            max="2000"
            onChange={(e) => handleIterations(e)}
          />
          <label htmlFor="learning-rate">Learning Rate:</label>
          <Input
            id="learning-rate"
            type="number"
            value={learning}
            min="0.1"
            step="0.1"
            max="0.9"
            onChange={(e) => handleLearningRate(e)}
          />
        </div>
        <div className="container">
          <Textarea />
          <Button onClick={handleResetAll}>Reset all settings</Button>
        </div>
        <Button onClick={handleTrain}>Train</Button>
      </StyledTrainBox>
      <p>Error: {errors.error}</p>
      <p>Iterations: {errors.iterations}</p>

      {isTraining && (
        <>
          <div>
            <img
              src={`data:image/svg+xml;utf8,${svgGenerator()}`}
              alt="diagram"
            />
          </div>
          <IrisSliderGroup />
          <Button onClick={handleIrisClarification}>Start clasification</Button>
        </>
      )}
      {isClasification && (
        <ClasificationWindw
          irisName={irisName}
          isOpen={openClasificationWindow}
          setIsOpen={setOpenClasificationWindow}
          irisTypeArray={irisTypeArray}
        />
      )}
    </StyledSettingsGroup>
  );
};

export default SettingsGroup;
