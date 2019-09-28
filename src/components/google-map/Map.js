import React from 'react'

const Map = ({ id, options, onMapLoad }) => {

  React.useEffect(() => {
    const onScriptLoad = () => {
      const map = new window.google.maps.Map(
        document.getElementById(id),
        options);
      onMapLoad(map)
    }
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        onScriptLoad()
      })
    } else {
      onScriptLoad()
    }
  }, [id, onMapLoad, options])



  return <div style={{ width: 500, height: 500 }} id={id} />
}

export default Map