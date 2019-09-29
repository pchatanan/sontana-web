import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setDrawer } from '../redux/actions'

const NavBarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 60px;
  background: white;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
  z-index: 5;
`

const NavBar = props => {
  const dispatch = useDispatch()
  return <NavBarContainer>
    <button onClick={e => {
      dispatch(setDrawer(true))
    }}>Menu</button>
  </NavBarContainer>
}

export default NavBar