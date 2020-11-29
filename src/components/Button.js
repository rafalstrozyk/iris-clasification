import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #d9d2c5;
  padding: 1rem;
  border: 2px solid #012e40;
  outline: none;
  border-radius: 4px;
  color: #012340;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
  font-weight: 700;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;

  :hover {
    background-color: #f2ebdc;
    transform: translateY(-5px);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.5);
  }

  :active {
    background-color: #012340;
    color: #f2ebdc;
    transform: translateY(0);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
`;

export default StyledButton;
