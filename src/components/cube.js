import React, { useState , SetStateAction} from 'react'

const Cube = React.forwardRef((props, ref) => {
const[showRoll, setShowRoll]=useState(false)
const[showDice, setShowDice]=useState(false)
const handleStopRoll=()=>{
  setShowRoll(!showRoll)
  setShowDice(!showDice)
}

  return (
    <div ref={ref}  >
    {showRoll &&
    <p style={{color:'gray',backgroundColor:"whitesmoke"}}>
    {props.currentRoll}
    </p>  
    }
{showDice ?
    <p style={{color:'black',backgroundColor:"whitesmoke"}}>
rolling dice
    </p> :<p></p>
    }
      <div className='flex jsutify-between'>
      {showDice &&
    <button onMouseDown={props.onMouseDown} onClick={handleStopRoll} id='stop'
    className='bg-purple-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1'> 
    Stop Roll
    </button>  
    }
       {!showDice&& !showRoll&&
       <button onMouseUp={()=>setTimeout(()=>{setShowDice(!showDice)},1000)}  id='start' 
        className='bg-green-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1 '  
        onClick={props.onClick} >
          <span className='animate-ping'>Rolls</span>
          </button>
       }
      </div>
    </div>
  )
})

export default Cube