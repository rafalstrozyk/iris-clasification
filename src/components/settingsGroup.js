import React, { useContext, useState } from 'react';
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

  function handleIrisClarification() {
    const output = irisClasification([
      state.sepalLength,
      state.sepalWidth,
      state.petalLenght,
      state.petalWidth,
    ]);

    setIrisName(irisNameClasification(output));
    setIrisTypeArray(output);
    setIsClasification(true);
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

  function handleResetAll() {
    resetAllSettings();
    setIsClasification(false);
    setIsTrainig(false);
    setErrors(errorInfo());
    setHiddenLayers(getHiddenLayers().join(' '));
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
        </div>
        <div className="container">
          <Textarea />
          <Button onClick={handleResetAll}>Reset all settings</Button>
        </div>
        <Button onClick={handleTrain}>Train</Button>
      </StyledTrainBox>

      {isTraining && (
        <>
          <p>Error: {errors.error}</p>
          <p>Iterations: {errors.iterations}</p>
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
        <ClasificationWindw irisName={irisName} irisTypeArray={irisTypeArray} />
      )}
    </StyledSettingsGroup>
  );
};

export default SettingsGroup;
