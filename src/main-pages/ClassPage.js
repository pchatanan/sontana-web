import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const ClassPage = props => {
  const [classObj, setClassObj] = React.useState()
  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const classId = params.get('c');
    if (!classId) {
      props.history.push('/')
    }
    else {
      return firebase.firestore().collection('classes').doc(classId).onSnapshot(doc => {
        if (doc.exists) {
          setClassObj({
            id: doc.id,
            data: doc.data()
          })
        }
        else {
          props.history.push('/')
        }
      })
    }
  }, [props.location.search, props.history])
  if (classObj) {
    return <div>
      {classObj.data.d.name}
    </div>
  }
  return <div>
    Loading class data ...
  </div>
}

export default ClassPage