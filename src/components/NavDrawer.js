import React from 'react'
import styled from 'styled-components'
import BlurDiv from '../ui/BlurDiv'
import CenterContainer from '../ui/CenterContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from '../redux/actions'
import firebase from 'firebase/app'
import 'firebase/auth'
import { withRouter } from 'react-router-dom'

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

const NavItem = styled.div`
  position: relative;
  height: 60px;
  width: 100%;
  background: grey;
  color: white;
  cursor: pointer;
`

const NavDrawer = props => {
  const dispatch = useDispatch()
  const drawerIsOpen = useSelector(state => state.global.drawerIsOpen)
  return <FullScreen show={drawerIsOpen} onClick={e => {
    dispatch(setDrawer(false))
  }}>
    <NavDrawerContainer onClick={e => { e.stopPropagation() }} show={drawerIsOpen}>
      <NavItem onClick={e => {
        props.history.push('/')
        dispatch(setDrawer(false))
      }}>
        <CenterContainer>
          Home
        </CenterContainer>
      </NavItem>
      <NavItem onClick={e => {
        props.history.push('/myclasses')
        dispatch(setDrawer(false))
      }}>
        <CenterContainer>
          My Classes
        </CenterContainer>
      </NavItem>
      <NavItem onClick={e => {
        firebase.auth().signOut()
        dispatch(setDrawer(false))
      }}>
        <CenterContainer>
          Logout
        </CenterContainer>
      </NavItem>
    </NavDrawerContainer>
  </FullScreen>
}

export default withRouter(NavDrawer)