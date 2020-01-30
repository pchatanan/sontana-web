import React from 'react';
import LoginPage from './main-pages/LoginPage';
import useFirebaseAuth from './custom-hooks/useFirbaseAuth';
import { useSelector } from 'react-redux'
import 'firebase/auth'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RegisterPage from './main-pages/RegisterPage';
import PopUp from './ui/PopUp';
import OptionMenu from './ui/OptionMenu'
import FullscreenDiv from './ui/FullscreenDiv';
import LoginBackground from './res/plouzane.jpg';
import Desk from './res/desk.jpg'
import styled from 'styled-components'
import NavBar from './components/NavBar';
import NavDrawer from './components/NavDrawer';
import HomePage from './main-pages/HomePage';
import Authenticating from './ui/Authenticating';
import CenterContainer from './ui/CenterContainer';
import ContentContainer from './ui/ContentContainer';
import AddClassPage from './main-pages/AddClassPage';
import EmailNotVerifiedPage from './main-pages/EmailNotVerifiedPage';
import ManageClassPage from './main-pages/ManageClassPage';
import ClassPage from './main-pages/ClassPage';
import usePosition from './custom-hooks/usePosition'

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
  usePosition()
  useFirebaseAuth()
  if (authLoading) {
    return <FullscreenDiv>
      <CenterContainer>
        <Authenticating />
      </CenterContainer>
    </FullscreenDiv>
  }
  return (
    <BrowserRouter>
      <OptionMenu />
      <PopUp message={popup.message} />
      {user ? (user.emailVerified ? <Background>
        <NavBar />
        <ContentContainer>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/manage_classes' component={ManageClassPage} />
          <Route exact path='/add_classes' component={AddClassPage} />
          <Route exact path='/class' component={ClassPage} />
        </ContentContainer>
        <NavDrawer />
      </Background> : <EmailNotVerifiedPage />) : <LoginPageBackground>
          <Switch>
            <Route exact path='/register' component={RegisterPage} />
            <Route exact component={LoginPage} />
          </Switch>
        </LoginPageBackground>}
    </BrowserRouter>
  );
}

export default App
