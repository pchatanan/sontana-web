import React from 'react'
import styled from 'styled-components'

const TextInputContainer = styled.div`
  position: relative;
  width: 100%;
  background: #F6F6F6;
  padding: 0.6em;
  border-radius: 0.3em;
  text-align: center;
  box-sizing: border-box;
`

const Input = styled.input`
  display: inline-block;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid lightgrey;
  width: ${props => props.show ? '12rem' : '0'}
  ${props => props.show && `
    margin: 0 0 0 1em;
  `}
  transition: width 0.2s, margin 0.2s;
`

const Label = styled.label`
  color: grey;
  display: inline-block;
`

const TextInput = props => {
  const { label, value, onChange, ...otherProps } = props
  const [focus, setFocus] = React.useState(false)
  const inputRef = React.useRef()
  React.useEffect(() => {
    if (focus) {
      inputRef.current.focus()
    }
  }, [focus])
  return <TextInputContainer onClick={e => {
    setFocus(true)
  }}>
    <Label show={focus || value.length > 0}>{label}</Label>
    <Input ref={inputRef} value={value}
      show={focus || value.length > 0}
      onFocus={e => { setFocus(true) }}
      onBlur={e => { setFocus(false) }}
      onChange={e => { onChange(e.target.value) }} {...otherProps} />
  </TextInputContainer>
}

export default TextInput