import React, { useState , SetStateAction} from 'react'
import {TestDrone} from './testDrone_old'

export const sendMessage_out = (drone,data) => {
    if(drone){ 
        
        console.log("attempting message")
        drone.drone.publish({
        room: 'observable-room',
        message: {
          name: "player",
          content: data
        }
      });}
    }



//CONTINUE FROM HERE, this might not be the best solution to create and send message from here..
const Cube = React.forwardRef((props, ref) => {
    const [room, setRoom]=useState()
    const [drone, setDrone]=useState()
    const[admin, setAdmin]=useState(true)
    const[loginComplete, setLoginComplete]=useState(true)
    const[location, setLocation]=useState(0)
    let members=[]

const[showRoll, setShowRoll]=useState(false)
const[showDice, setShowDice]=useState(false)

const handleStopRoll=()=>{
  setShowRoll(!showRoll)
  setShowDice(!showDice)
}



const [player, setPlayer] = useState(

    {
        player: {

            id: "player2"
        }

    }

)

const createRoom=()=>{
    const drone = new window.Scaledrone("DJHRuXNgQyi58qY0", {
       
    });
setDrone({drone:drone})

    drone.on('open', error => {
        if (error) {
            return console.error(error);
        }
        const player1 = { ...player.player };
        player1.id = drone.clientId;
        //this.setState({member});
    });



     const room = drone.subscribe('observable-room');
     setRoom({room:room})
     room.on('members', m => {
        members = m;
        console.log("MEMBER LIST",members)
       if(members.length>1){
        setAdmin(!admin)

       }
        
       });

    

}

if (room){
    
    room.room.on('message', message => {
    console.log("message yaaay", message)
});
}


const sendMessage = () => {

    if(drone){ 
                
        sendMessage_out(drone,props.currentRoll)
    }
    
    
    }





  return (

    <div ref={ref}  >
   
    {showRoll &&
    <p style={{color:'gray'}}>
    {props.currentRoll}
    </p>  
    }
{showDice ?
    <p style={{color:'gray'}}>
rolling dice
    </p>  :<p></p>
    }
    

      <div className='flex jsutify-between'>
     
      {showDice &&
    <button onMouseDown={props.onMouseDown} onClick={handleStopRoll} id='stop'
    onMouseUp={()=>sendMessage()}
    
    className='bg-purple-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1'> 
    Stop Roll
    </button>  
    }
        
       
       {!showDice&& !showRoll&&
       <button onMouseUp={()=>setTimeout(()=>{setShowDice(!showDice)},1000)}  id='start' 
        className='bg-green-400 text-white text-sm font semibold rounded-xl p-3 mt-3 mx-1'  
        onClick={props.onClick}>
          Roll
          </button>

       
       }
        

      </div>
    </div>
  )
})


export default Cube