import styled from 'styled-components'

const Button = styled.button`
  padding: 0.6em;
  border-radius: 0.3em;
  border: none;
  width: 100%;
  color: white;
  background: linear-gradient(to right, #00d2ff, #3a7bd5);
  cursor: pointer;
  box-shadow: 0px 2px 5px 0px #3a7bd5;
  box-sizing: border-box;
  ${props => props.secondary && `
    background: transparent;
    color: #3a7bd5;
    box-shadow: none;
    border: solid #3a7bd5 1px;
  `}
  ${props => props.disabled && `
    background: grey;
    color: white;
    box-shadow: none;
  `}
`

export default Button