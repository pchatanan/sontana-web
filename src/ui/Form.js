import React from 'react'
import styled from 'styled-components'

const FormContainer = styled.form`
  width: 100%;
`

const FormItemContainer = styled.div`
  margin: 1em;
`

const Form = props => {
  const [submitting, setSubmitting] = React.useState(false)
  const { children, onSubmit, ...otherProps } = props
  return <FormContainer {...otherProps} onSubmit={e => {
    setSubmitting(true)
    e.preventDefault()
    onSubmit(setSubmitting)
  }} >
    {children.map((child, index) => {
      return <FormItemContainer key={index}>
        {React.cloneElement(child, { submitting })}
      </FormItemContainer>
    })}
  </FormContainer>
}

export default Form