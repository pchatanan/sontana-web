import React from 'react';
import LoginPage from './main-pages/LoginPage';
import useFirebaseAuth from './custom-hooks/useFirbaseAuth';
import { setUser } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { BrowserRouter, Route } from 'react-router-dom'
import RegisterPage from './main-pages/RegisterPage';
import PopUp from './ui/PopUp';
import FullscreenDiv from './ui/FullscreenDiv';
import LoginBackground from './res/plouzane.jpg';
import Desk from './res/desk.jpg'
import styled from 'styled-components'
import NavBar from './components/NavBar';
import NavDrawer from './components/NavDrawer';
import HomePage from './main-pages/HomePage';

const LoginPageBackground = styled(FullscreenDiv)`
  background-image: url(${LoginBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Background = styled(FullscreenDiv)`
  background-image: url(${Desk});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const App = props => {
  const { user, authLoading, popup } = useSelector(state => state.global)
  const dispatch = useDispatch()
  const memoizedCallback = React.useCallback(
    user => dispatch(setUser(user)),
    [dispatch],
  );
  useFirebaseAuth(memoizedCallback)
  if (authLoading) {
    return <div>
      Authenticating...
    </div>
  }
  return (
    <BrowserRouter>
      <PopUp message={popup.message} />
      {user ? <Background>
        <NavBar />

        you are logged in!
        <button onClick={e => {
          firebase.auth().signOut()
        }}>Logout</button>
        <Route exact path='/' component={HomePage} />
        <NavDrawer />
      </Background> : <LoginPageBackground>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </LoginPageBackground>}
    </BrowserRouter>
  );
}

export default App
