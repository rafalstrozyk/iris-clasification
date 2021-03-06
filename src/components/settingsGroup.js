import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import IrisSliderGroup from './irisSliderGroup';
import Button from './Button';
import Input from './Input';
import Textarea from './textarea';
import ClasificationWindw from './ClasificationWindow';
import { Context } from '../globalState/store';
import irisBrain from '../brain';

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
  const [isLearning, setIsLearning] = useState(false);
  const [isClasification, setIsClasification] = useState(false);
  const [errors, setErrors] = useState(irisBrain.state.errors);
  const [hiddenLayers, setHiddenLayers] = useState(
    irisBrain.state.hiddenLayers.join(' ')
  );
  const [errorThresh, setErrorThresh] = useState(irisBrain.state.errorThresh);
  const [irisName, setIrisName] = useState('');
  const [irisTypeArray, setIrisTypeArray] = useState([0, 0, 0]);
  const [iterations, setIteration] = useState(irisBrain.state.iterations);
  const [learning, setLearning] = useState(irisBrain.state.learnigRate);
  const [openClasificationWindow, setOpenClasificationWindow] = useState(false);
  const [learningInfo, setLearningInfo] = useState(false);

  function handleIrisClarification() {
    setIsClasification(true);
    setOpenClasificationWindow(true);
    const output = irisBrain.irisClasification([
      state.sepalLength,
      state.sepalWidth,
      state.petalLenght,
      state.petalWidth,
    ]);

    setIrisName(irisBrain.nameClasification(output));
    setIrisTypeArray(output);
  }

  function handleLearn() {
    setIsClasification(false);
    irisBrain.irisTraining();
    setErrors(irisBrain.state.errors);
    setIsLearning(true);
    setLearningInfo(true);
  }

  function handleTextToArray(e) {
    setIsLearning(false);
    setLearningInfo(false);
    setHiddenLayers(e.target.value);
    irisBrain.setHiddenLayers = e.target.value;
  }

  function handleIterations(e) {
    setLearningInfo(false);
    setIteration(e.target.value);
    irisBrain.setIterations = e.target.value;
  }
  function handleLearningRate(e) {
    setLearningInfo(false);
    setLearning(e.target.value);
    irisBrain.setLearningRate = e.target.value;
  }

  function handleErrorThresh(e) {
    setLearningInfo(false);
    setErrorThresh(e.target.value);
    irisBrain.setErrorThresh = e.target.value;
  }

  function handleResetAll() {
    setLearningInfo(false);
    irisBrain.resetAllSettings();
    irisBrain.state.iterations = 1;
    setIsClasification(false);
    setIsLearning(false);
    setErrors(irisBrain.state.errors);
    setHiddenLayers(irisBrain.state.hiddenLayers.join(' '));
    setLearning(irisBrain.state.learnigRate);
    setErrorThresh(irisBrain.state.errorThresh);
    setIteration(irisBrain.state.iterations);
    setIrisName('');
    setIrisTypeArray([0, 0, 0]);
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
            max="8000"
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
          <label htmlFor="error-thresh">Error Thresh:</label>
          <Input
            value={errorThresh}
            id="error-thresh"
            type="number"
            min="0.001"
            step="0.001"
            max="0.999"
            onChange={(e) => handleErrorThresh(e)}
          />
        </div>
        <div className="container">
          <Textarea />
          <Button onClick={handleResetAll}>Reset all settings</Button>
        </div>
        <Button onClick={handleLearn}>Learn</Button>
      </StyledTrainBox>
      <p>Error: {errors.error}</p>
      <p>Iterations: {errors.iterations}</p>
      <p style={{ color: 'green' }}>
        {learningInfo && 'learning was successful!'}
      </p>
      {isLearning && (
        <>
          <div>
            <img
              src={`data:image/svg+xml;utf8,${irisBrain.svgGenerator()}`}
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
