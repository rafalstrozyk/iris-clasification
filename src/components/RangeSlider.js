import React from 'react';
import styled from 'styled-components';

const StyledRageSlider = styled.div`
  display: flex;
  flex-direction: column;
  .container {
    display: flex;
  }
  input[type='range'] {
    width: 90%;
    margin-right: 15px;
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
