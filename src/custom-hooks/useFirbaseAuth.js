import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const useFirebaseAuth = (handleAuthChanged) => {
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      handleAuthChanged(user)
    })
  }, [handleAuthChanged])
}

export default useFirebaseAuth