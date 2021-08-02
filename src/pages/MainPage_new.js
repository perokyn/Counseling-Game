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
    const[userStarts, setUserStarts]=useState('Admin starts')
    //code for client
    const[clientCode, setClientCode]=useState('code')
    const[admin, setAdmin]=useState(true)
    //check url code for client code do deremine current cleints status and update UI accordingly
    
    const getLocation=()=>{
        const localUrl=props.location.toString()
        if(localUrl.indexOf('?')>0){
            const linkCode=localUrl.slice(localUrl.indexOf('?')+1,localUrl.length)
            console.log("CLIENT side:",linkCode)//compare this code against clientCode
          }
    }
    getLocation()
    
        return(
      <div>


      </div>
        )      
        
    }

    export default MainPage1