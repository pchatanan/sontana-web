import React from 'react'
import Map from '../components/google-map/Map'

const HomePage = props => {
  const onMapLoad = React.useCallback(map => {
    console.log('map loaded')
  }, [])
  const options = React.useMemo(() => {
    return {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
  }, [])
  return <div style={{ width: '100%', height: '100%' }}>
    <Map id='GOOGLE_MAP_HOME_PAGE' options={options} onMapLoad={onMapLoad} />
  </div>
}

export default HomePage