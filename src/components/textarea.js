import React, { useState } from 'react';
import styled from 'styled-components';
import { getIrisLearningData, setIrisLearningData, resetData } from '../brain';
import Button from './Button';

const StyledTextarea = styled.div`
  position: relative;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      margin-top: 15px;
      color: #f2ebdc;
      font-size: 2.2rem;
    }

    #data {
      margin: 20px 0;
    }
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
    JSON.stringify(getIrisLearningData(), undefined, 2)
  );
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    setIrisData(e.target.value);
  }

  function hanldeResetData() {
    resetData();
    setIrisData(getIrisLearningData());
  }

  function handleSubmit(e) {
    setIrisLearningData(JSON.parse(irisData));
    setIsOpen(!isOpen);
    e.preventDefault();
  }

  return (
    <StyledTextarea>
      {isOpen ? (
        <div className="card">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="data">Data</label>
            <textarea
              id="data"
              style={{ width: '400px', height: '80vh' }}
              value={irisData}
              onChange={(e) => handleChange(e)}
            />
            <div className="buttons-group">
              <Button onClick={hanldeResetData}>Reset starting data</Button>
              <Button type="submit">Ok</Button>
              <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
            </div>
          </form>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(!isOpen)}>Data setings</Button>
      )}
    </StyledTextarea>
  );
};

export default Textarea;
