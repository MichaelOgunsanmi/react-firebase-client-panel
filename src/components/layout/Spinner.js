import React from 'react'
import spinnerLogo from './spinner.gif'

export default function Spinner() {
  return (
    <div>
      <img src={spinnerLogo} alt="Loading..." style= {{ width: '200px', margin: 'auto', display: 'block'}}/>
    </div>
  )
}
