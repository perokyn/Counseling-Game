
import React, { Component, useState, useEffect } from "react";


///   TO_DO TRANSPLANT this to MainPage and connection is ready between the two players :)
//SOLVE MULTIPLE RENDERINGS IN MAIN PAGE it causes multiple signups to scaledrone!
//JUSt call this function and do not render it with main page
const TestDrone = () => {

    const [player, setPlayer] = useState(

        {
            player: {

                id: "player2"
            }


        }

    )
    const drone = new window.Scaledrone("DJHRuXNgQyi58qY0", {
        data: player.player
    });






    drone.on('open', error => {
        if (error) {
            return console.error(error);
        }
        const player1 = { ...player.player };
        player1.id = drone.clientId;
        //this.setState({member});
    });

    const room = drone.subscribe('observable-room');

    room.on('open', error => {
        if (error) {
            return console.error(error);
        }
        // Connected to room
    });

    room.on('message', message => {
        console.log("message yaaay", message)
    });










    const sendMessage = () => {


    }



    return (



        <div className='p-10 bg=green-200 text-xl text-white font-bol'> Scaledrone text
            <button className='rounded-xl p-3 bg-blue-400'

                onClick={(e) => { sendMessage() }}>
                Send Message</button>
        </div>
    )
}

export default TestDrone