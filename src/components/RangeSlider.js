import React from 'react';
import styled from 'styled-components';

const StyledRageSlider = styled.div`
  display: flex;
  flex-direction: column;
  .container {
    display: flex;
  }
  input[type='range'] {
    width: 85%;
    margin: -1.4px 15px;
    background-color: transparent;
    -webkit-appearance: none;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    background: #012340;
    border: 3.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 4.6px;
    width: 100%;
    height: 25.8px;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-thumb {
    margin-top: -2.1px;
    width: 10px;
    height: 23px;
    background: rgba(242, 235, 220, 0.93);
    border: 0;
    border-radius: 7px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #3fa5fc;
  }
  input[type='range']::-moz-range-track {
    background: #012340;
    border: 3.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 4.6px;
    width: 100%;
    height: 25.8px;
    cursor: pointer;
  }
  input[type='range']::-moz-range-thumb {
    width: 10px;
    height: 23px;
    background: rgba(242, 235, 220, 0.93);
    border: 0;
    border-radius: 7px;
    cursor: pointer;
  }
  input[type='range']::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 2.5px 0;
    color: transparent;
    width: 100%;
    height: 25.8px;
    cursor: pointer;
  }
  input[type='range']::-ms-fill-lower {
    background: #000000;
    border: 3.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 9.2px;
  }
  input[type='range']::-ms-fill-upper {
    background: #012340;
    border: 3.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 9.2px;
  }
  input[type='range']::-ms-thumb {
    width: 10px;
    height: 23px;
    background: rgba(242, 235, 220, 0.93);
    border: 0;
    border-radius: 7px;
    cursor: pointer;
    margin-top: 0px;
  }
  input[type='range']:focus::-ms-fill-lower {
    background: #012340;
  }
  input[type='range']:focus::-ms-fill-upper {
    background: #3fa5fc;
  }

  @supports (-ms-ime-align: auto) {
    input[type='range'] {
      margin: 0;
    }
  }
`;

const RangeSlider = ({ min, max, val, step, onChangeFunc, title }) => (
  <StyledRageSlider>
    <label>{title}</label>
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={val}
        step={step}
        onChange={onChangeFunc}
      />
      <p>{val} cm</p>
    </div>
  </StyledRageSlider>
);

export default RangeSlider;
