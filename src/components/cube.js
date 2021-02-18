import React, {useState} from 'react'
import $ from "jquery";


const Cube = () => {

const[rolling, setRolling]=useState(true)

let incr=1

    const roll= (start)=> {
        
       
      $('#cube').addClass(`show${incr}`);
      if(incr===6) {
        incr=1
        
      } else {
          incr++
        console.log("startshow called",incr)
      }
   
    
}
        
    

  
    const startRoll=()=>{
        let interval = setInterval(function() {   

        roll(0)

        },1000)      
    }
    
   

    const stopRoll=()=>{
    
roll(false)
           console.log('Stop roll',rolling)
      }
    

      



     /* const roll= (start)=> {
        let incr=1
       
       
        let interval = setInterval(function() {       

      $('#cube').addClass(`show${incr}`);
      if(incr===6) {
        incr=1
      } else {
          incr++
        console.log("startshow called",incr)
      }
      if(incr===3){clearInterval(interval)
    incr=1}
    },1000)*/











    return (

        <div>
            <div id="container">
                <div id="cube" className="show1">
                    <div className="top"></div>
                    <div className="front"></div>
                    <div className="left"></div>
                    <div className="back"></div>
                    <div className="right"></div>
                    <div className="bottom"></div>
                </div>
                <div className='flex'>
                    <button id='button' onClick={stopRoll} className='bg-green-400 text-white text-sm font semibold rounded-xl p-3 mt-3'> Stop Roll</button>
                    <button id='button' onClick={startRoll} className='bg-green-400 text-white text-sm font semibold rounded-xl p-3 mt-3'>Roll</button>
                </div>
        </div>
        </div>
    )
}


export default Cube