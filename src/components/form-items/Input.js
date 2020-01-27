import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Input = React.forwardRef((props, ref) => {
  const { label, value, onChange, submitting, ...otherProps } = props
  return <Label>
    {label}
    <input disabled={submitting} ref={ref} value={value} onChange={e => { onChange && onChange(e.target.value) }} {...otherProps} />
  </Label>
})

export default Input