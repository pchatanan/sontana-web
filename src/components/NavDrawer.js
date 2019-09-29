import React from 'react'
import styled from 'styled-components'
import BlurDiv from '../ui/BlurDiv'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from '../redux/actions'

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

const NavDrawerContainer = styled.div`
  position: absolute;
  width: 80vw;
  max-width: 400px;
  height: 60px;
  background: white;
  height: 100vh;
  left: ${props => props.show ? '0' : '-100%'};
  transition: 0.2s ease-out;
`

const NavDrawer = props => {
  const dispatch = useDispatch()
  const drawerIsOpen = useSelector(state => state.global.drawerIsOpen)
  return <FullScreen show={drawerIsOpen} onClick={e => {
    dispatch(setDrawer(false))
  }}>
    <NavDrawerContainer show={drawerIsOpen}>
    </NavDrawerContainer>
  </FullScreen>
}

export default NavDrawer