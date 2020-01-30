import React from 'react'
import styled from 'styled-components'
import { dismissPopup } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button';
import BlurDiv from './BlurDiv';

const PopUpContainer = styled(BlurDiv)`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: ${props => props.show ? 'translate(-50%,0)' : 'translate(-50%,100%)'};
  transform-origin: bottom;
  opacity: ${props => props.show ? '1' : '0'};
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.2);
  border: none;
  margin-bottom: 1em;
  padding: 0.6em;
  width: 90vw;
  max-width: 400px;
  border-radius: 0.6em;
`

const MessageContainer = styled.div`
  color: white;
`

const CloseButton = styled(Button)`
  width: 100%;
  margin-top: 0.6em;
`

const PopUp = props => {
  const { popup, showPopup } = useSelector(state => state.global)
  const dispatch = useDispatch()
  return <PopUpContainer show={showPopup}>
    <MessageContainer>
      {popup.message}
    </MessageContainer>
    <CloseButton secondary type='button' onClick={e => { dispatch(dismissPopup()) }} text={'dismiss'} />
  </PopUpContainer>
}

export default PopUp