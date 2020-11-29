import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import img1 from '../images/setosa.jpg';
import img2 from '../images/versicolor.jpg';
import img3 from '../images/virginica.jpg';

const StyledClassificationWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #012340;
  width: 100%;
  color: #f2ebdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  z-index: 100;

  h3 {
    margin-top: 20px;
  }

  img {
    width: 200px;
    height: auto;
  }

  ul {
    li {
      list-style: none;
      :not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
`;

const ClasificationWindow = ({ irisName, irisTypeArray }) => {
  const [isOpen, setIsOpen] = useState(true);
  const imgArray = [img1, img2, img3];

  function imageGenerate() {
    if (irisName === 'setosa') {
      return <img src={imgArray[0]} alt={irisName} />;
    }
    if (irisName === 'versicolor') {
      return <img src={imgArray[1]} alt={irisName} />;
    }
    if (irisName === 'virginica') {
      return <img src={imgArray[2]} alt={irisName} />;
    }
  }

  return (
    <>
      {isOpen ? (
        <StyledClassificationWindow>
          <h3>Flouer type: {irisName}</h3>
          {imageGenerate()}
          <ul>
            <li>setosa: {irisTypeArray[0]}</li>
            <li>versicolor: {irisTypeArray[1]}</li>
            <li>virginica: {irisTypeArray[2]}</li>
          </ul>
          <Button onClick={() => setIsOpen(!isOpen)}>OK</Button>
        </StyledClassificationWindow>
      ) : (
        <Button
          style={{ marginTop: '20px' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Open clasification result
        </Button>
      )}
    </>
  );
};

export default ClasificationWindow;
