
import React, { Component, useState, useEffect } from "react";

///   TO_DO TRANSPLANT this to MainPage and connection is ready between the two players :)
//SOLVE MULTIPLE RENDERINGS IN MAIN PAGE it causes multiple signups to scaledrone!
//JUSt call this function and do not render it with main page
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



export const TestDrone = (props) => {

    const [room, setRoom]=useState()
    const [drone, setDrone]=useState()
    const[admin, setAdmin]=useState(true)
    const[loginComplete, setLoginComplete]=useState(true)
    const[location, setLocation]=useState(0)
    let members=[]



    useEffect(()=>{
        console.log("updated roll", props.data)
        if(props.data!==location){
         console.log("Neww roll", props.data)
        
            setLocation({location:props.data})
           sendMessage()
             
        }
    },[])
    
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




//CONENCTION SUCCESSFUL CONTINUE FROM HERE BY PASSING ROLL NUMBERS
const sendMessage = () => {
if(drone){ 
            
    sendMessage_out(drone,props.data)
}
}

    // const sendMessage = () => {
    //     if(drone){ 
            
    //         console.log("attempting message")
    //         drone.drone.publish({
    //         room: 'observable-room',
    //         message: {
    //           name: "player",
    //           content: "lets wrokout"
    //         }
    //       });}
       

    // }



    return (



        <div className='p-10 bg=green-200 text-xl text-white font-bol'> Scaledrone text
            <button className='rounded-xl p-3 bg-blue-400'
                onClick={(e) => { sendMessage() }}>
                Send Message</button>

{!admin? <div>User</div>:<div>Admin</div>}
                <button className='rounded-xl p-3 bg-blue-400'
                 onClick={(e) => { createRoom() }}>
                 Login</button>

                



        </div>
    )
}
