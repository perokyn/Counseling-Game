import React, { useRef, useState, useEffect } from 'react'
import MainPage from './MainPage'

//-ytesting scaledrone
import {TestDrone} from '../components/testDrone'//REMEMBER TO NOT CALL THIS AS A COMPONENt BUT EXPORT FUNcTIONS to avoid coNITNuOUS CONNECTING at each render!!
import ConnectScaledrone from '../components/cscaledrone_connect'



const HomePage = (props) => {

return(
<div>
<MainPage data={props.data}/>
</div>
)
}
   
export default HomePage