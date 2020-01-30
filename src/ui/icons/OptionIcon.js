import React from 'react'

const OptionIcon = props => {
  return <svg width="100%" height="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="256" cy="256" r="64" />
    <circle cx="256" cy="448" r="64" />
    <circle cx="256" cy="64" r="64" />
  </svg>
}

export default OptionIcon