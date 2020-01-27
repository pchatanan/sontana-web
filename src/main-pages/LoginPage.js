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
  const dispatch = useDispatch()
  return <FullscreenDiv>
    <CenterContainer>
      <ContentWidth>
        <BlurDiv>
          <Form onSubmit={setSubmitting => {
            firebase.auth().signInWithEmailAndPassword(email, password)
              .then(userCredential => {
                dispatch(dismissPopup())
                dispatch(setText('password', ''))
                setSubmitting(false)
              })
              .catch(error => {
                dispatch(setPopup('error', error.message))
                setSubmitting(false)
              })
          }}>
            <TextInput label='email' value={email} onChange={text => { dispatch(setText('email', text)) }} />
            <TextInput label='password' value={password} onChange={text => { dispatch(setText('password', text)) }} type='password' />
            <Button type='submit' text='Log in' disabledText='Logging in ...' />
            <Link to='/register'><Button secondary type='button' text='Register new user' /></Link>
          </Form>
        </BlurDiv>
      </ContentWidth>
    </CenterContainer>
  </FullscreenDiv>
}

export default LoginPage