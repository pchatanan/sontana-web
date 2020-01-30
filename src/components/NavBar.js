import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setDrawer } from '../redux/actions'
import { Route, Link } from 'react-router-dom'
import IconButton from '../ui/IconButton'
import AddIcon from '../ui/icons/AddIcon'
import MenuIcon from '../ui/icons/MenuIcon'
import OptionIcon from '../ui/icons/OptionIcon'
import { showOptionMenu, hideOptionMenu } from '../redux/actions'
import firebase from 'firebase/app'
import 'firebase/firestore'

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

const ManageButton = props => {
  const dispatch = useDispatch()
  const params = new URLSearchParams(props.location.search);
  const classId = params.get('c');
  const onOptionClick = React.useCallback(e => {
    console.log('option button clicked')
    dispatch(showOptionMenu([
      {
        label: 'Remove',
        onClick: e => {
          firebase.firestore().collection('classes').doc(classId).delete().then(() => {
            dispatch(hideOptionMenu())
            props.history.push('manage_classes')
          })
        }
      },
      {
        label: 'Edit'
      }]))
  }, [dispatch, classId, props.history])
  return <IconButton Icon={OptionIcon} onClick={onOptionClick} />
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
      <Route exact path='/manage_classes' component={AddButton} />
      <Route exact path='/class' component={ManageButton} />
    </RightMenuContainer>
  </NavBarContainer>
}

export default NavBar