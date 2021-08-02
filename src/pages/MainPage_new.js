import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import game from '../assets/game.png'
import Cube from '../components/cubeTest'
import ReactPlayer from 'react-player/youtube'
import MainPage from './MainPage';


const sendMessage_out = (drone,player,data) => {
    if(drone){ 
        console.log("attempting message")
        drone.drone.publish({
        room: 'observable-room',
        message: {
          name: player,
          content: data
        }
      });}
    }

    const MainPage1=(props)=>{


     //set who is playing
      const[userStarts, setUserStarts]=useState('admin')


        return(
      <div>


      </div>
        )      
        
    }

    export default MainPage1