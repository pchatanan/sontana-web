import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { setUserLoc } from '../redux/actions'

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

const usePosition = (watch = false, settings = defaultSettings) => {
  const dispatch = useDispatch()

  const onChange = useCallback(({ coords, timestamp }) => {
    // setPosition({
    //   latitude: coords.latitude,
    //   longitude: coords.longitude,
    //   accuracy: coords.accuracy,
    //   timestamp,
    // });
    console.log(coords)
    dispatch(setUserLoc({
      lat: coords.latitude,
      lng: coords.longitude,
      error: null
    }))
  }, [dispatch])

  const onError = useCallback((error) => {
    // setError(error.message);
    dispatch(setUserLoc({
      lat: 13.7563,
      lng: 100.5018,
      error: error.message
    }))
  }, [dispatch])

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      dispatch(setUserLoc({
        lat: 13.7563,
        lng: 100.5018,
        error: 'Geolocation is not supported'
      }))
      // setError('Geolocation is not supported');
      return;
    }

    let watcher = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, settings);
    } else {
      geo.getCurrentPosition(onChange, onError, settings);
    }

    return () => watcher && geo.clearWatch(watcher);
  }, [settings, watch, dispatch, onChange, onError]);
};

export default usePosition