import React from 'react'
import { useGoogleAPI } from '.'

const Map = ({ id, options, onMapLoad, onMapDragEnd, onZoomChanged, onMapIdle }) => {
  const onScriptLoad = React.useCallback(() => {
    const map = new window.google.maps.Map(
      document.getElementById(id),
      options);
    if (onMapDragEnd) {
      map.addListener('dragend', onMapDragEnd);
    }
    if (onZoomChanged) {
      map.addListener('zoom_changed', onZoomChanged);
    }
    if (onMapIdle) {
      map.addListener('idle', onMapIdle);
    }
    onMapLoad(map)
  }, [id, onMapLoad, onMapDragEnd, onZoomChanged, onMapIdle, options])
  useGoogleAPI(onScriptLoad)

  return <div style={{ width: '100%', height: '100%' }} id={id} />
}

export default Map