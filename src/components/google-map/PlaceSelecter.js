import React from 'react'

const PlaceSelector = ({ id, options, onMapLoad }) => {
  const [value, setValue] = React.useState('')
  const [fetching, setFetching] = React.useState(false)
  return <div>
    <label>
      <div>Location</div>
      <input value={value} onChange={e => {
        if (e.target.value.trim().length > 0) {
          setValue(e.target.value)
          setFetching(true)
          const timer = setTimeout(() => {
            fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.REACT_APP_GOOGLE_MAP_API}$input=${value}`, {
              mode: 'cors'
            }).then(res => {
              if (res) {
                return res.json();
              }
            })
              .then(myJson => {
                console.log(myJson)
              })
          }, 1200);
          return () => {
            clearTimeout(timer)
          }
        }
        else {
          setFetching(false)
        }

      }} />
    </label>
  </div>
}

export default PlaceSelector