import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import game from '../assets/game.png'
import { data } from '../data/data'
import Cube from '../components/cubeTest'
import ReactPlayer from 'react-player/youtube'

import {TestDrone} from '../components/testDrone'
//-ytesting scaledrone
// import {TestDrone} from '../components/testDrone'//REMEMBER TO NOT CALL THIS AS A COMPONENt BUT EXPORT FUNcTIONS to avoid coNITNuOUS CONNECTING at each render!!
// import ConnectScaledrone from '../components/cscaledrone_connect'
const sendMessage_out = (drone,data) => {
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


const MainPage = (props) => {

    const [questions, setQuestions] = useState(props.data)
   // const [currentQuestion, setCurrentQuestion] = useState([])
   //const [currentRoll, setCurentRoll] = useState(0)
  //  const [currentPosition, setCurrentPosition] = useState(0)
   // const [numofRoll, setNumofRoll] = useState(0)
    const[loginComplete, setLoginComplete]=useState(true)
    const [questionVisible, setQuestionVisible] = useState(false)
    const rollTo = useRef()
    const [cubeVisible, setCubeVisible] = useState(true)
    const content = questions
//TO DO remember to learn how to set state fetures and not upodate the whole state!!!! SPREAD OPERATOR!!!{...p1State, currentPosition=position}
    const [p1State, setP1State] = useState({
        id:'',
        playing: false,
        rolled: false,
        currentPosition: 0,
        currentRoll: 0,
        setCurrentQuestion: '',
        questionVisible: false,
        numofRoll: 0,
    })
    //===PLAYERE 2 LOGIC======================\\
    //p2 state
    const [p2State, setP2State] = useState({
        id:'',
        playing: false,
        rolled: false,
        currentPosition: 0,
        currentRoll: 6,
        setCurrentQuestion: '',
        questionVisible: false,
        numofRoll: 0

    })
    console.log('Player1', p1State)
//DRONE STATES=========================
    const [room, setRoom]=useState()
    const [drone, setDrone]=useState()
    const[admin, setAdmin]=useState(true)
    let members=[]
    const [player, setPlayer] = useState(
    {
        player: {

            id: "player2"///CONTINUE FROM HEER TO SET ADMIN ID
        }
    }
)
//================================================================================================================================
//=======================END PLAYERS STATE SETUP====================================================================\
//================================================================================================================================

//================================================================================================================================
//=========================DRONE SETUP============================================================================================
//================================================================================================================================
//was conusleiong room DJHRuXNgQyi58qY0 now game
const createRoom=()=>{
    const drone = new window.Scaledrone("sYoK5pOn8DZhOPRJ", { 
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
    const room = drone.subscribe('observable-room'); //<---CONTINUE FROM EHRE BY SETTING UP ROOMNAME FROM Login as code 6/26/2021
     setRoom({room:room})
     room.on('members', m => {
        members = m;
        console.log("MEMBER LIST",members)
       if(members.length>1){
        setAdmin(!admin)
       }
        
       });
    room.on('message', message => {//maybe add get message function on question closed
        console.log("message yaaay", message)
    });

    setLoginComplete(!loginComplete)
}
// if (room){//CONTINUE FROM HERE--->make sure this only gets called once and not updateing every with re-render
//     room.room.on('message', message => {//maybe add get message function on question closed ISSUE SOLVED :) MOVED CODE TO createRoom()
//     console.log("message yaaay", message)
// });
// }
   const sendMessage = () => {
    if(drone){ 
                console.log("message reached",p1State.currentRoll)
        sendMessage_out(drone,p1State.currentRoll)
    }
    }

//++===ON GAME START========================
//show cube at first step

const gameStart=()=>{
if(p1State.currentPosition===0 && cubeVisible){
    let cube_position = '#cube' + p1State.currentPosition.toString()
    $(cube_position).css('visibility', 'visible')
}

}

gameStart()

//==================================================================================

//===============SET ROLL NUMBER FOR player1=======================================//
    const startRoll = () => {
        console.log('NUMROLL',(p1State.numofRoll + 1))
        setP1State({...p1State, currentRoll:(Math.floor(Math.random() * 6) + 1), numofRoll:p1State.numofRoll+1})
    }

    const setSteps = () => {
        //this gets a call from handleStop roll which tsrats to animate the figure
        //this is where maybe add  aswitch statement to handle player1 and player2 
        //this method should also be called from use Effect when data is avaliable form player2
        let player = 'player1'
        switch (player) {
            case 'player1':
                setStep(p1State.currentPosition, p1State.currentRoll + p1State.currentPosition)
                break
            case 'player2':
                setStep(p2State.currentPosition, p2State.currentRoll + p2State.currentPosition)
                break
            default: setStep(p1State.currentPosition, p1State.currentRoll + p1State.currentPosition)
        }
    }

    const afterRoll = (position) => {
        if (p1State.currentPosition > 0) { setCubeVisible(!cubeVisible)   }
        
     //   setCurrentPosition(position)///this was currentPosition +postion before, DO NOT EVER MODIFY CURRENTPOS, IT is being updated after every roll end with position++. ONLY update currentroll by adding currentposition to it!!
       setP1State({...p1State, currentPosition:position})
    }

    //==========Roll to question widnow top
    const handleQuestionVisible = (e) => {
        setQuestionVisible(!questionVisible)
        console.log("rolltoCalled", e.target.id)

        $(function () {

            $('html, body').animate({
                scrollTop: $('#mainquestion').offset().top - 20
            }, 2000);
        });
    }

    //=========QUESTION CLOSED SHOW CUBE AT LOCATION==============
    const handleQuestionClose_CubeVisible = () => {
        setQuestionVisible(!questionVisible)
        setCubeVisible(!cubeVisible)
        setTimeout(() => {
           //show cube after question closed
            if(!cubeVisible){let cube_position = '#cube' + p1State.currentPosition.toString()
              $(cube_position).css('visibility', 'visible') 
    }
                
        }, 2000)

    }

    //TO DO  
    //INtegrate https://www.pubnub.com/blog/build-a-multiplayer-tic-tac-toe-game-in-react/?fbclid=IwAR1UMo0EQxKkVzpP1ypQEQpaTrBFBJD80fJpV8s_4BCQxdGty1F1tinUROE
    //for two player game
    const handleStopRoll = () => {
        setTimeout(() => { setSteps() }, 1000)//TODO----solve issue of showwing figure on start-------------------------------!!!!    //this is where maybe add  aswitch statement to handle player1 and player2 steps
        console.log("CURRENTROLL", p1State.currentRoll)
        sendMessage()
        setTimeout(() => { setCubeVisible(!cubeVisible)
            let cube_position = '#cube' + p1State.currentPosition.toString()
            $(cube_position).css('visibility', 'hidden') 
        }, 2000)
    }
    //===================FIGURE STEP LOGIC=============================================
    const setStep = (position, goTo) => {

        let interval = setInterval(function () {

            if (position <= goTo) {             ///<=====set steps forward here   max step number=  content.data.length-1

                let currentStep = '#step' + position.toString()

                if (position > 0) {
                    let stepback = '#step' + (position - 1).toString()
                    $(function () {
                        $(stepback).css('visibility', 'hidden')

                    })
                }
                $(function () {
                    $(currentStep).css('visibility', 'visible')
                })

                if (position === goTo) {
                    //update current position
                    afterRoll(position)
                }
                //show questionmark for given step----------------------------
                if (position > 0 && position === goTo) {
                    let current_question = '#q' + position.toString()
                    $(function () {
                        setTimeout(() => { $(current_question).css('visibility', 'visible') }, 1000)
                    })
                    $(function () {
                        $(current_question).click(function () {
                            $(current_question).css('visibility', 'hidden')
                        })
                    })
                }
                //---------------------------------------------------------------
                position++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
    return (
        <div className='relative grid justify-items-stretch'>

            {loginComplete&& 
            <div className=' flex flex-col absolute bg-green-300 p-8 rounded-xl justify-self-center'>
                <textarea placeholder="player " className=" p-2 text-sm h-10  rounded-xl mb-3"></textarea>
                <textarea placeholder="code " className=" p-2 text-sm h-10  rounded-xl mb-3"></textarea>
            <button className='p-3 bg-blue-200 rounded-xl  text-xl text-white' onClick={()=>createRoom()}>Login</button>
            </div>
            }
          
            <div className=' flex mb-3 '>

                <div className='p-3'>
                    Welcome to the game of All about You
               <img alt='3d characters' src={game}></img>

                </div>
                {/* {cubeVisible && !questionVisible &&
                    <div id='cubeFrame' className='bg-green-200 rounded-xl  p-6 absolute z-40 '>

                        {
                            p2State.playing ?
                                <div>Player 2 is rolling</div> :
                                <Cube currentRoll={p1State.currentRoll} onMouseDown={() => handleStopRoll()} onClick={startRoll} ref={rollTo} />
                        }
                    </div>} */}
            </div>
            <div className='grid grid-cols-5 ' >

                {content.map(step => (
                    <div key={step.fields.id} className='relative ' >

                        <div style={step.fields.id === 4 || step.fields.id === 14 || step.fields.id === 24 || step.fields.id === 34 || step.fields.id === 44 ?
                            { backgroundColor: 'green', height: '2rem', borderTopRightRadius: '3rem', borderWidth: '2px', borderColor: 'black', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.2rem' } : { display: "hidden" }}></div>

                        <div style={step.fields.id === 9 || step.fields.id === 19 || step.fields.id === 29 || step.fields.id === 39 || step.fields.id === 49 ?
                            { backgroundColor: 'green', height: '2rem', borderTopLeftRadius: '3rem' } : { display: "hidden" }}></div>

                        <img style={{
                            marginTop: step.fields.id === 4 || step.fields.id === 14 || step.fields.id === 24 || step.fields.id === 34 || step.fields.id === 44 || step.fields.id === 9 || step.fields.id === 19 || step.fields.id === 29 || step.fields.id === 39 || step.fields.id === 49 ?
                                '2rem' : '0rem'
                        }} id={'step' + step.fields.id.toString()} alt='figure' src={figure} className=' absolute -top-6 w-16 h-16 invisible'    ></img>

                        <div >

                               {/*HANDLE SHOW QUESTION DIV*/ }
                            <div className='relative grid justify-items-center items-center'>
     
                                <div onClick={e => { handleQuestionVisible(e) }}
                                    onMouseDown={() => {setP1State({...p1State, currentQuestion:[step.fields.question, step.fields.media]})  }}//passing question data to popup window
                                    className=' text-3xl flex p-10  bg-blue-400 rounded-lg z-10 cursor-pointer absolute'
                                    style={{ visibility: 'hidden' }}
                                    id={'q' + step.fields.id.toString()}>
                                    <span className='animate-ping'>?</span>
                                </div>
                                 {/*HANDLE SHOW CUBE DIV*/ }
                                 {/*Show cube at current location, id is a combination of the current locatio + cube, get the idea adn set visibility */ }
                            <div  className='text-xl text-black absolute -top-14   ritgh-0'
                                  id={'cube' + step.fields.id.toString()}
                                  style={{ visibility: 'hidden' }}
                                  > cube                                  
                                  
                                  {cubeVisible && !questionVisible &&
                                    <div id='cubeFrame' className='bg-green-200 rounded-xl  p-6 absolute z-40 '>
                                  {
                                   p2State.playing ?
                                   <div>Player 2 is rolling</div> :
                                   <Cube currentRoll={p1State.currentRoll} onMouseDown={() => handleStopRoll()} onClick={startRoll} ref={rollTo} />
                                  }
                                   </div>}                                   
                            </div>
                            </div>
                            <BaseStepSquare value={step.fields.id} content={step.fields.question} question={step.fields.Name} />
                        </div>
                    </div>
                ))}

            </div>
            {questionVisible && <div className='absolute grid bg-blue-500 w-full p-3 items-center' style={{ top: '0px', bottom: '0px', width: "100%" }}>
                <div className='bg-blue-200 rounded-xl p-3 shadow-2xl'>

                    <div id='mainquestion' className='flex justify-end items-center'>
                        <span onClick={e => { handleQuestionClose_CubeVisible() }} className=' grid items-center  justify-items-center w-11 h-11 rounded-full bg-white hover:bg-gray-200 text-xl text-blue-500 cursor-pointer'>X</span>
                    </div>

                    <div className='grid justify-items-center'>

                        <p className=' text-gray-600 text-3xl font-semibold my-2'>{p1State.currentQuestion[0]}</p>
                        {p1State.currentQuestion[1] && <ReactPlayer url={p1State.currentQuestion[1]} />}
                    </div>

                </div>
            </div>

            }

        </div>
    )
}

export default MainPage