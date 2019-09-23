import React from 'react'
import styled from 'styled-components'

const FormContainer = styled.form`
  width: 100%;
`

const FormItemContainer = styled.div`
  margin: 1em;
`

const Form = props => {
  const { children, ...otherProps } = props
  return <FormContainer {...otherProps}>
    {children.map((child, index) => {
      return <FormItemContainer key={index}>
        {child}
      </FormItemContainer>
    })}
  </FormContainer>
}

export default Form