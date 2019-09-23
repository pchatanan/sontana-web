import React from 'react'
import styled from 'styled-components'

const FormErrorContainer = styled.div`
  display: flex;
  transform: ${props => props.show ? 'scaleY(1)' : 'scaleY(0)'};
  transform-origin: bottom;
  opacity: ${props => props.show ? '1' : '0'};
  transition: transform 0.2s, opacity 0.2s;
  background: transparent;
  color: red;
  box-shadow: none;
  border: solid red 1px;
  padding: 0.6em;
  border-radius: 0.6em;
`

const ErrorContainer = styled.div`
  flex: 1;
`

const FormError = props => {
  const { errorMessage, show, onDismiss } = props
  return <FormErrorContainer show={show}>
    <ErrorContainer>{errorMessage}</ErrorContainer>
    <button type='button' onClick={e => { onDismiss() }}>{'x'}</button>
  </FormErrorContainer>
}

export default FormError