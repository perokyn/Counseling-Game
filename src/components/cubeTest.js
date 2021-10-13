import React, { useState , SetStateAction} from 'react'
import dice from '../assets/dice.gif'

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


const counter=()=>{

let num =1;
 
setTimeout(()=>{num++
  console.log=("counter", num)}, 200)
console.log("counter pressed")

}


  return (

    <div ref={ref}  >
   
    {showRoll &&
    <p className="color-black bg-green-200 rounded-xl p-3" style={{borderStyle:"inset",borderWidth:'4px'}}>
    <span className='text-sm'>You rolled: </span>{props.currentRoll}
    </p>  
    }
{showDice ?
    <p style={{color:'black',backgroundColor:"whitesmoke",padding:'2px',}} className="rounded-xl">
      <img alt="rolling dice" src={dice} className="rounded-xl"></img>
    </p>  :<p></p>
    }
      <div className='flex jsutify-between'>
     
      {showDice &&
    <button onMouseDown={props.onMouseDown} onClick={handleStopRoll} id='stop'
    onMouseUp={()=>sendMessage()}
    
    className='bg-purple-400  hover:bg-purple-600 text-white text-2xl font semibold rounded-xl p-8 mt-3 mx-1 border-2 border-whitesmoke'> 
    <span className='animate-pulse'>Stop Roll</span>
    </button>  
    }
        
       
       {!showDice&& !showRoll&&
       
       <button onMouseUp={()=>setTimeout(()=>{setShowDice(!showDice)},1000)}  id='start' 
        className='bg-green-400 hover:bg-green-600 text-white text-2xl font semibold rounded-xl p-8 mt-3 mx-1 border-4 border-indigo-600 '  
        onClick={props.onClick} onMouseDown={()=>counter} style={{borderStyle:"inset",borderWidth:'4px'}}>
          <span className='animate-pulse'>Roll</span>
          </button>
         
       
       }
        

      </div>
    </div>
  )
})


export default Cube