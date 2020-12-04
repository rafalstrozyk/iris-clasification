import React, { useState } from 'react';
import styled from 'styled-components';
import irisBrain from '../brain';
import Button from './Button';

const StyledTextarea = styled.div`
  position: relative;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    margin-top: 15px;
    color: #f2ebdc;
    font-size: 2.2rem;
  }

  #data {
    margin: 20px 0;
  }

  .card {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #012340;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  .buttons-group {
    display: flex;
    > *:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const Textarea = () => {
  const [irisData, setIrisData] = useState(
    JSON.stringify(irisBrain.state.irisData, undefined, 2)
  );
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    setIrisData(e.target.value);
    setSaved(false);
  }

  function hanldeResetData() {
    irisBrain.resetData();
    setIrisData(JSON.stringify(irisBrain.state.irisData, undefined, 2));
    setSaved(true);
  }

  function handleSubmit() {
    irisBrain.setData = irisData;
    setSaved(true);
  }

  return (
    <StyledTextarea>
      {isOpen ? (
        <div className="card">
          <div className="container">
            <label htmlFor="data">Data</label>
            <textarea
              id="data"
              style={{ width: '400px', height: '72vh' }}
              value={irisData}
              onChange={(e) => handleChange(e)}
            />
            <p style={{ color: 'green' }}>
              {saved && 'data saved succesfull!'}
            </p>
            <div className="buttons-group">
              <Button onClick={hanldeResetData}>Reset starting data</Button>
              <Button onClick={handleSubmit}>Ok</Button>
              <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(!isOpen)}>Data setings</Button>
      )}
    </StyledTextarea>
  );
};

export default Textarea;
