import React from 'react'

export const useGoogleAPI = onScriptLoad => React.useEffect(() => {
  if (!window.google) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    // Below is important. 
    //We cannot access google.maps until it's finished loading
    s.addEventListener('load', e => {
      onScriptLoad()
    })
  } else {
    console.log('Alr loaded')
    onScriptLoad()
  }
}, [onScriptLoad])
