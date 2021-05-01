
import React, { Component, useState } from "react";


class ConnectScaledrone extends Component{

    state = {
        messages: [
          {
            text: "This is a test message!",
            member: {
              color: "blue",
              username: "bluemoon"
            }
          }
        ],
        member: {
          username: 'player1',
          color:'#ffffff'
        }
      }


    constructor(props) {
        super();
        this.drone = new window.Scaledrone("DJHRuXNgQyi58qY0", {
          data: this.state.member
        });
        this.drone.on('open', error => {
          if (error) {
            return console.error(error);
          }
          const member = {...this.state.member};
          member.id = this.drone.clientId;
          this.setState({member});
        });

//Listening to room messages
        const room = this.drone.subscribe('observable-room');

        room.on('open', error => {
            if (error) {
              return console.error(error);
            }
            // Connected to room
          });
          
          room.on('message', message => {
            console.log("message yaaay",message)
          });


      }


sendMessage(){

    const message = {
        hello: 'world',
        score: 10
      };

      this.drone.publish({
        room: 'room_name',
        message: message
      });

}




    render(){
return(



    <div className='p-10 bg=green-200 text-xl text-white font-bol'> Scaledrone text
    <button className='rounded-xl p-3 bg-pink-400'
    
    onClick={(e)=>{this.sendMessage()}}>
        Send Message</button>
    </div>
)
}
}

export default ConnectScaledrone