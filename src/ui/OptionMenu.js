import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import BlurDiv from './BlurDiv';
import { hideOptionMenu } from '../redux/actions';

const FullScreen = styled(BlurDiv)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  opacity: ${props => props.show ? '1' : '0'};
  transition: 0.2s;
  z-index: 10;
`

const PopUpContainer = styled.div`
  background: white;
  border-radius: 0.6em;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: ${props => props.show ? 'translate(-50%,-50%)' : 'translate(-50%,50%)'};
  transform-origin: bottom;
  opacity: ${props => props.show ? '1' : '0'};
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.2);
  border: none;
  margin-bottom: 1em;
  padding: 0.6em;
  width: 90vw;
  max-width: 400px;
`

const MessageContainer = styled.div`
  color: black;
  text-align: center;
`

const OptionMenu = props => {
  const { optionMenu, showOptionMenu } = useSelector(state => state.global)
  const dispatch = useDispatch()
  return <FullScreen show={showOptionMenu} onClick={e => {
    dispatch(hideOptionMenu())
  }} >
    <PopUpContainer show={showOptionMenu} onClick={e => { e.stopPropagation() }}>
      <MessageContainer >
        {optionMenu.map((option, index) => {
          return <div key={index} onClick={option.onClick}>
            {option.label}
          </div>
        })}
      </MessageContainer>
    </PopUpContainer>
  </FullScreen>
}

export default OptionMenu