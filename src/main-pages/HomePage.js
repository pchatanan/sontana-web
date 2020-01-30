import React from 'react'
import Map from '../components/google-map/Map'
import { useSelector } from 'react-redux'

const HomePage = props => {
  const { userLoc } = useSelector(state => state.global)
  console.log(userLoc)
  const onMapLoad = React.useCallback(map => {
    console.log('map loaded')
  }, [])
  const options = React.useMemo(() => {
    return {
      center: { lat: userLoc.lat, lng: userLoc.lng },
      zoom: 18,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
  }, [userLoc.lat, userLoc.lng])
  return <div style={{ width: '100%', height: '100%' }}>
    <Map id='GOOGLE_MAP_HOME_PAGE' options={options} onMapLoad={onMapLoad} />
  </div>
}

export default HomePage