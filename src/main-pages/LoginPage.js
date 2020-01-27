import React from 'react'
import { setText, setPopup, dismissPopup } from '../redux/actions';
import Form from '../ui/Form';
import FullscreenDiv from '../ui/FullscreenDiv';
import CenterContainer from '../ui/CenterContainer';
import TextInput from '../components/form-items/TextInput';
import ContentWidth from '../ui/ContentWidth';
import Button from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Link } from 'react-router-dom'
import BlurDiv from '../ui/BlurDiv';

const LoginPage = props => {
  const { email, password } = useSelector(state => state.loginPage)
  const [isSubmitted, setSubmitted] = React.useState(false)
  const dispatch = useDispatch()
  return <FullscreenDiv>
    <CenterContainer>
      <ContentWidth>
        <BlurDiv>
          <Form onSubmit={e => {
            setSubmitted(true)
            firebase.auth().signInWithEmailAndPassword(email, password)
              .then(userCredential => {
                dispatch(dismissPopup())
                dispatch(setText('password', ''))
                setSubmitted(false)
              })
              .catch(error => {
                dispatch(setPopup('error', error.message))
                setSubmitted(false)
              })
            e.preventDefault()
          }}>
            <TextInput label='email' value={email} onChange={text => { dispatch(setText('email', text)) }} />
            <TextInput label='password' value={password} onChange={text => { dispatch(setText('password', text)) }} type='password' />
            <Button disabled={isSubmitted} type='submit'>{isSubmitted ? 'Logging in...' : 'Login'}</Button>
            <Link to='/register'><Button secondary type='button'>{'Register new user'}</Button></Link>
          </Form>
        </BlurDiv>
      </ContentWidth>
    </CenterContainer>
  </FullscreenDiv>
}

export default LoginPage