
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
    let members=[]
    
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

    }
    
    // const drone = new window.Scaledrone("DJHRuXNgQyi58qY0", {
    //     data: player.player
    // });






    // drone.on('open', error => {
    //     if (error) {
    //         return console.error(error);
    //     }
    //     const player1 = { ...player.player };
    //     player1.id = drone.clientId;
    //     //this.setState({member});
    // });

    // const room = drone.subscribe('observable-room');

    // List of currently online members, emitted once
//   room.on('members', m => {
//     members = m;
//     // updateMembersDOM(); uncomment later
//     console.log("MEMBER LIST",members)
//    });

//     room.on('open', error => {
//         if (error) {
//             return console.error(error);
//         }else if(members.length>2){
//             return console.log("There are", members,"users!!!!")
//         }
//         return members// Connected to room
//     });

//     room.on('message', message => {
//         console.log("message yaaay", message)
//     });
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
                <button className='rounded-xl p-3 bg-blue-400'

onClick={(e) => { createRoom() }}>
createRoom</button>
        </div>
    )
}
