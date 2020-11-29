import React, { useContext} from 'react';
import RageSlider from '../components/RangeSlider';
import { Context } from '../globalState/store';

import styled from 'styled-components';

const StyledSliderGroup = styled.div`
  width: 50%;
`;

const IrisSliderGroup = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <StyledSliderGroup>
      <RageSlider
      title="Sepla Length"
        min="0.1"
        max="9"
        val={state.sepalLength}
        step="0.1"
        onChangeFunc={(e) =>
          dispatch({ type: 'SET_SEPLA_LENGTH', payload: e.target.value })
        }
      />
      <RageSlider
      title="Sepla Width"
        min="0.1"
        max="9"
        val={state.sepalWidth}
        step="0.1"
        onChangeFunc={(e) =>
          dispatch({ type: 'SET_SEPLA_WIDTH', payload: e.target.value })
        }
      />
      <RageSlider
      title="Petal Length"
        min="0.1"
        max="9"
        val={state.petalLenght}
        step="0.1"
        onChangeFunc={(e) =>
          dispatch({ type: 'SET_PETAL_LENGTH', payload: e.target.value })
        }
      />
      <RageSlider
      title="Petal Width"
        min="0.1"
        max="9"
        val={state.petalWidth}
        step="0.1"
        onChangeFunc={(e) =>
          dispatch({ type: 'SET_PETAL_WIDTH', payload: e.target.value })
        }
      />
    </StyledSliderGroup>
  );
};

export default IrisSliderGroup;
