import React from 'react'
import { setText, resetForm, setPopup } from '../redux/actions';
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

const validateRegister = (email, password, confirm_password) => {
  var error = null
  if (password !== confirm_password) {
    error = 'Passwords are not the same.'
  }
  return error
}

const RegisterPage = props => {
  const { email, password, confirm_password } = useSelector(state => state.registerPage)
  const dispatch = useDispatch()
  return <FullscreenDiv>
    <CenterContainer>
      <ContentWidth>
        <BlurDiv>
          <Form onSubmit={setSubmitting => {
            const errorMessage = validateRegister(email, password, confirm_password)
            if (!errorMessage) {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                  dispatch(resetForm())
                  setSubmitting(false)
                })
                .catch(error => {
                  dispatch(setPopup('error', error.message))
                  setSubmitting(false)
                })
            }
            else {
              setSubmitting(false)
              dispatch(setPopup('error', errorMessage))
            }
          }}>
            <TextInput label='email' value={email} onChange={text => { dispatch(setText('email', text)) }} />
            <TextInput label='password' value={password} onChange={text => { dispatch(setText('password', text)) }} type='password' />
            <TextInput label='confirm password' value={confirm_password} onChange={text => { dispatch(setText('confirm_password', text)) }} type='password' />
            <Button type='submit' text='Register' disabledText='Registering...' />
            <Link to='/'><Button secondary type='button' text='Already have an account' /></Link>
          </Form>
        </BlurDiv>
      </ContentWidth>
    </CenterContainer>
  </FullscreenDiv>
}

export default RegisterPage