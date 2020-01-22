import React from 'react'
import { useGoogleAPI } from '.'

const PlaceAutoComplete = ({ options, onLoad }) => {
  const inputRef = React.useRef()

  const onScriptLoad = React.useCallback(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options);
    onLoad(autocomplete)
  }, [onLoad, options])
  useGoogleAPI(onScriptLoad)

  return <div>
    <label>
      <div>Type place name</div>
      <input type='text' ref={inputRef} />
    </label>
  </div>
}

export default PlaceAutoComplete