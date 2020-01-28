import React from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import { useSelector } from 'react-redux'

const ClassPage = props => {
    const { user } = useSelector(state => state.global)
    React.useEffect(() => {
        firebase.firestore().collection('classes').where('d.owner', '==', user.uid).onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    console.log(doc.data())
                })
            }
        })
    }, [])
    return <div>

    </div>
}

export default ClassPage