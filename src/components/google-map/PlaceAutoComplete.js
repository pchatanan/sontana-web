import React from 'react'
import { useGoogleAPI } from '.'
import Input from '../form-items/Input'

const PlaceAutoComplete = ({ options, onLoad, ...otherProps }) => {
  const inputRef = React.useRef()

  const onScriptLoad = React.useCallback(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options);
    onLoad(autocomplete)
  }, [onLoad, options])

  useGoogleAPI(onScriptLoad)

  return <Input {...otherProps} label='Type place name' type='text' ref={inputRef} />
}

export default PlaceAutoComplete