import React from 'react'
import Map from '../components/google-map/Map'
import { useSelector } from 'react-redux'
import IconButton from '../ui/IconButton'
import CurrentLocationIcon from '../ui/icons/CurrentLocationIcon'
import styled from 'styled-components'
import useFetchClasses from '../custom-hooks/useFetchClasses'

const OverlayButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 5;
`

const getMapPosition = (mapBounds, center) => {
  if (mapBounds && center) {
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(mapBounds.getNorthEast(), mapBounds.getSouthWest());
    return {
      center: {
        lat: center.lat(),
        lng: center.lng()
      },
      radius: distance / 2000 // radius in km
    }
  }
  else {
    return {
      center: null, radius: null
    }
  }

}

const HomePage = props => {
  const { userLoc } = useSelector(state => state.global)
  const [mapGeo, setMapGeo] = React.useState({
    center: null, radius: null
  })
  const mapRef = React.useRef()
  const fetchedClasses = useFetchClasses(mapGeo.center, mapGeo.radius)
  React.useEffect(() => {
    if (fetchedClasses && fetchedClasses.length > 0) {
      fetchedClasses.forEach(fetchedClass => {
        var myLatLng = { lat: fetchedClass.data.coordinates.latitude, lng: fetchedClass.data.coordinates.longitude };
        var marker = new window.google.maps.Marker({
          position: myLatLng,
          map: mapRef.current,
          title: fetchedClass.data.name
        });
      })
    }
  }, [fetchedClasses])
  const onMapLoad = React.useCallback(map => {
    console.log('map loaded')
    mapRef.current = map
  }, [])
  const onMapIdle = React.useCallback(() => {
    const mapGeo = getMapPosition(mapRef.current.getBounds(), mapRef.current.getCenter())
    setMapGeo(mapGeo)
  }, [setMapGeo])
  const onMapDragEnd = React.useCallback(() => {
    const mapGeo = getMapPosition(mapRef.current.getBounds(), mapRef.current.getCenter())
    setMapGeo(mapGeo)
    // const mapBounds = mapRef.current.getBounds()
    // const center = mapRef.current.getCenter()
    // console.log(center)
    // const distance = window.google.maps.geometry.spherical.computeDistanceBetween(mapBounds.getNorthEast(), mapBounds.getSouthWest());
    // console.log(distance)

    // const geoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(center.lat(), center.lng()), radius: distance / 2000 });
    // // Get query (as Promise)
    // geoQuery.get().then(value => {
    //   // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    //   value.docs.forEach(doc => {
    //     const data = doc.data()
    //     console.log(data)
    //     var myLatLng = { lat: data.coordinates.latitude, lng: data.coordinates.longitude };
    //     var marker = new window.google.maps.Marker({
    //       position: myLatLng,
    //       map: mapRef.current,
    //       title: data.name
    //     });
    //   })
    // });
  }, [setMapGeo])
  const onCurrentLocationClick = React.useCallback(e => {
    mapRef.current.setCenter({ lat: userLoc.lat, lng: userLoc.lng })
  }, [mapRef, userLoc.lat, userLoc.lng])
  const options = React.useMemo(() => {
    return {
      center: { lat: userLoc.lat, lng: userLoc.lng },
      zoom: 18,
      minZoom: 15,
      maxZoom: 18,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy'
    }
  }, [userLoc.lat, userLoc.lng])
  return <div style={{ width: '100%', height: '100%' }}>
    <OverlayButton>
      <IconButton Icon={CurrentLocationIcon} onClick={onCurrentLocationClick} />
    </OverlayButton>
    <Map id='GOOGLE_MAP_HOME_PAGE' options={options} onMapLoad={onMapLoad} onMapDragEnd={onMapDragEnd} onMapIdle={onMapIdle} />
  </div>
}

export default HomePage