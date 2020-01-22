import React from 'react'
import { useGoogleAPI } from '.'

const Map = ({ id, options, onMapLoad }) => {
  const onScriptLoad = React.useCallback(() => {
    const map = new window.google.maps.Map(
      document.getElementById(id),
      options);
    onMapLoad(map)
  }, [id, onMapLoad, options])
  useGoogleAPI(onScriptLoad)

  return <div style={{ width: '100%', height: '100%' }} id={id} />
}

export default Map