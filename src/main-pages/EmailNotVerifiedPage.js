import React from 'react'
import FullscreenDiv from '../ui/FullscreenDiv'
import CenterContainer from '../ui/CenterContainer'
import Button from '../ui/Button'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { useSelector, useDispatch } from 'react-redux'
import { setPopup } from '../redux/actions';

const CountDown = props => {
  const [currentCount, setCurrentCount] = React.useState(props.count || 0)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log('execute interval')
      console.log(currentCount)
      if (currentCount >= 0) {
        console.log('subtract')
        setCurrentCount(currentCount => currentCount - 1)
      }
    }, 1000);
  }, [props.count, currentCount])
  if (currentCount < 0) {
    return props.render()
  }
  else {
    return <div>{`You have to wait for ${currentCount} seconds`}</div>
  }
}

const EmailNotVerifiedPage = props => {
  const [countDown, setCountDown] = React.useState()
  const [status, setStatus] = React.useState('CHECKING')
  const { user } = useSelector(state => state.global)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const sendEmail = () => {
      setStatus('SENDING')
      user.sendEmailVerification().then(() => {
        setStatus('SENT')
        console.log('Sent')
        dispatch(setPopup('info', 'Verification email sent!'))
        timestampRef.set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    }

    const timestampRef = firebase.firestore().collection('verification_email').doc(user.uid)
    timestampRef.onSnapshot(doc => {
      if (doc.exists) {
        const docData = doc.data()
        if (docData.timestamp) {
          const storedMillis = docData.timestamp.toMillis()
          const getServerTime = firebase.functions().httpsCallable('getServerTime');
          getServerTime().then(result => {
            const currentMillis = result.data
            if (currentMillis - storedMillis > 180000) {
              sendEmail()
            }
            else {
              const waitingTime = Math.round((180000 - (currentMillis - storedMillis)) / 1000)
              setCountDown(waitingTime)
              setStatus('WAITING')
            }
          });
        }
      }
      else {
        sendEmail()
      }
    })
  }, [user, dispatch, user.uid])

  const render = () => {
    switch (status) {
      case 'CHECKING':
        return <div>Checking</div>
      case 'WAITING':
        if (countDown > 0) {
          return <CountDown count={countDown} render={() => {
            return <Button>Resend Verification Email</Button>
          }} />
        }
        else {
          return
        }
      case 'SENDING':
        return <div>Sending</div>
      case 'SENT':
        return <div>Email Sent</div>
    }
  }

  return <FullscreenDiv style={{ background: 'grey' }}>
    <CenterContainer>
      {render()}
    </CenterContainer>
  </FullscreenDiv>
}

export default EmailNotVerifiedPage