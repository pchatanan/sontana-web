import React from 'react'
import styled from 'styled-components'

const IconButtonContainer = styled.button`
  height: 40px;
  width: fit-content;
  minWidth: 40px;
  border-radius: 20px;
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  background: #3a7bd5;
  :hover {
    background: #00d2ff;
  }
`

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`

const IconButton = ({ Icon, ...otherProps }) => {
  return <IconButtonContainer {...otherProps}>
    <IconContainer>
      <Icon fill='white' />
    </IconContainer>
  </IconButtonContainer>
}

export default IconButton