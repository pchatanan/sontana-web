import React from 'react'
import { useGoogleAPI } from '.'
import Input from '../form-items/Input'

const PlaceAutoComplete = ({ options, onLoad }) => {
  const inputRef = React.useRef()

  const onScriptLoad = React.useCallback(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options);
    onLoad(autocomplete)
  }, [onLoad, options])
  useGoogleAPI(onScriptLoad)

  return <Input label='Type place name' type='text' ref={inputRef} />
}

export default PlaceAutoComplete