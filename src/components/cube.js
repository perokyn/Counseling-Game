import React, { useState } from 'react'
import $ from "jquery";
import Emitter from '../utils/SpecialEvents'

const Cube = React.forwardRef((props, ref) => {






  let incr = 1

  const roll = () => {
    //console.log("startshow called",`show${incr}`)



    $('#cube').attr("class", `show${incr}`);



    if (incr === 6) {
      incr = 1

    } else {
      incr++

    }




  }








  $(function () {

    let timing = 500;
    let interval

    $("#start").click(function () {


      interval = setInterval(function () {

        roll()

      }, timing)

    });

    $("#stop").click(function () {

      clearInterval(interval);

      const className = $('#cube').attr('class');
      //console.log("current umber ",className ) 
      Emitter.emit('ROLLED', className)

    });

  });











  return (

    <div ref={ref}  >
      <div id="container">
        <div id="cube" className="show1">
          <div className="top"></div>
          <div className="front"></div>
          <div className="left"></div>
          <div className="back"></div>
          <div className="right"></div>
          <div className="bottom"></div>
        </div>

      </div>

      <div className='flex jsutify-between'>
        <button id='stop' className='bg-purple-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1'> Stop Roll</button>
        <button id='start' className='bg-green-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1' >Roll</button>
      </div>
    </div>
  )
})


export default Cube