import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setDrawer } from '../redux/actions'

const NavBarContainer = styled.div`
  width: 100vw;
  height: 60px;
  background: white;
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