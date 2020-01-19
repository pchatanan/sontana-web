import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setDrawer } from '../redux/actions'
import { Route, Link } from 'react-router-dom'
import IconButton from '../ui/IconButton'
import AddIcon from '../ui/icons/AddIcon'
import MenuIcon from '../ui/icons/MenuIcon'

const NavBarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 60px;
  background: white;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
  z-index: 5;
`

const LeftMenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: 10px;
  transform: translate(0,-50%);
`

const RightMenuContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  margin-right: 10px;
  transform: translate(0,-50%);
`

const AddButton = props => {
  return <Link to='/add_classes'><IconButton Icon={AddIcon} /></Link>
}

const NavBar = props => {
  const dispatch = useDispatch()
  return <NavBarContainer>
    <LeftMenuContainer>
      <IconButton Icon={MenuIcon} onClick={e => {
        dispatch(setDrawer(true))
      }} />
    </LeftMenuContainer>
    <RightMenuContainer>
      <Route exact path='/myclasses' component={AddButton} />
    </RightMenuContainer>
  </NavBarContainer>
}

export default NavBar