import React from 'react'
import Map from '../components/google-map/Map'

const HomePage = props => {
    const onMapLoad = React.useCallback(map => {
        console.log('map loaded')
    }, [])
    const options = React.useMemo(() => {
        return {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        }
    }, [])
    return <div>
        <Map id='GOOGLE_MAP_HOME_PAGE' options={options} onMapLoad={onMapLoad} />
    </div>
}

export default HomePage