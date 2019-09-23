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

const validateRegister = (email, password, confirm_password) => {
  var error = null
  if (password !== confirm_password) {
    error = 'Passwords are not the same.'
  }
  return error
}

const RegisterPage = props => {
  const { email, password, confirm_password } = useSelector(state => state.registerPage)
  const [isSubmitted, setSubmitted] = React.useState(false)
  const dispatch = useDispatch()
  return <FullscreenDiv>
    <CenterContainer>
      <ContentWidth>
        <Form onSubmit={e => {
          setSubmitted(true)
          const errorMessage = validateRegister(email, password, confirm_password)
          if (!errorMessage) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(userCredential => {
                dispatch(resetForm())
                setSubmitted(false)
              })
              .catch(error => {
                dispatch(setPopup('error', error.message))
                setSubmitted(false)
              })
          }
          else {
            setSubmitted(false)
            dispatch(setPopup('error', errorMessage))
          }
          e.preventDefault()
        }}>
          <TextInput label='email' value={email} onChange={text => { dispatch(setText('email', text)) }} />
          <TextInput label='password' value={password} onChange={text => { dispatch(setText('password', text)) }} type='password' />
          <TextInput label='confirm password' value={confirm_password} onChange={text => { dispatch(setText('confirm_password', text)) }} type='password' />
          <div>
            <p>

            </p>
          </div>
          <Button disabled={isSubmitted} type='submit'>{isSubmitted ? 'Registering...' : 'Register'}</Button>
          <Link to='/'><Button secondary type='button'>Already have an account</Button></Link>
        </Form>
      </ContentWidth>
    </CenterContainer>
  </FullscreenDiv>
}

export default RegisterPage