import React, { useState } from 'react'
import $ from "jquery";
import Emitter from '../utils/SpecialEvents'

const Cube = React.forwardRef((props, ref) => {



const[timesRolled, setTimesRolled]=useState(0)
const[rollNUmber, setRollNumber]=useState(1)
const[rolling, setRollin]=useState(true)


  











  return (

    <div ref={ref}  >
      

      <div className='flex jsutify-between'>
        <button onMouseDown={props.onMouseDown} id='stop' className='bg-purple-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1'> Stop Roll</button>
        <button  id='start' className='bg-green-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1'  onClick={props.onClick}>Roll</button>
      </div>
    </div>
  )
})


export default Cube