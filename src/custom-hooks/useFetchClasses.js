import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GeoFirestore } from 'geofirestore';


const useFetchClasses = (center, radius) => {
  const [fetchedClasses, setFetchedClasses] = React.useState()
  React.useEffect(() => {
    if (center && radius) {
      const firestore = firebase.firestore();
      const geofirestore = new GeoFirestore(firestore);
      const geocollection = geofirestore.collection('classes');
      const geoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(center.lat, center.lng), radius });
      // Get query (as Promise)
      geoQuery.get().then(value => {
        // All GeoDocument returned by GeoQuery, like the GeoDocument added above
        var temp = []
        value.docs.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          temp.push({ id, data })
        })
        setFetchedClasses(temp)
      });
    }
  }, [center, radius])

  return fetchedClasses
}

export default useFetchClasses