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
      {user ? <div>
        you are logged in!
        <button onClick={e => {
          firebase.auth().signOut()
        }}>Logout</button>
      </div> : <div>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </div>}
    </BrowserRouter>
  );
}

export default App
