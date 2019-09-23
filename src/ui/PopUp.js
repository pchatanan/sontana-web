import React from 'react'
import styled from 'styled-components'
import { setPopup } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button';

const PopUpContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: ${props => props.show ? 'translate(-50%,0)' : 'translate(-50%,100%)'};
  transform-origin: bottom;
  opacity: ${props => props.show ? '1' : '0'};
  transition: transform 0.2s, opacity 0.2s;
  background: transparent;
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.4);
  border: none;
  border-radius: 0.6em;
  margin-bottom: 1em;
  padding: 0.6em;
  width: 90vw;
  max-width: 400px;
`

const MessageContainer = styled.div`
  color: red;
`

const CloseButton = styled(Button)`
  width: 100%;
  margin-top: 0.6em;
`

const PopUp = props => {
  const { popup } = useSelector(state => state.global)
  const dispatch = useDispatch()
  return <PopUpContainer show={popup.popupType.length > 0}>
    <MessageContainer>
      {popup.message}
    </MessageContainer>
    <CloseButton secondary type='button' onClick={e => { dispatch(setPopup('', popup.message)) }}>{'dismiss'}</CloseButton>
  </PopUpContainer>
}

export default PopUp