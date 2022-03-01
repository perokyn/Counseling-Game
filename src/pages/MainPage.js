import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure1.png'
import figure2 from '../assets/figure4.png'
import game from '../assets/game.png'
import Cube from '../components/cubeTest'
import ReactPlayer from 'react-player/youtube'

import Confetti from 'react-confetti'

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
    
const MainPage = (props) => {
   
    const localUrl=props.location.toString()
    const[userStarts, setUserStarts]=useState('Admin starts')
    const [questions, setQuestions] = useState(props.data)
    const[loginComplete, setLoginComplete]=useState(false)
    const [questionVisible, setQuestionVisible] = useState(false)
    const rollTo = useRef()
    const [cubeVisible, setCubeVisible] = useState(true)
    const content = questions
    const[clientLink, setclientLink]=useState('Generate link and forward it to your client')
    const[clientCode, setCode]=useState(0)
    const [room, setRoom]=useState()
    const [drone, setDrone]=useState()
    const[admin, setAdmin]=useState(true)
    const[othePlayerPlaying, setOthePlayerPlaying]=useState(false)
    const[update, setUpdate]=useState("")
    const[otherPlayerQ,setotherPLayerQ]=useState(false)
    const[gameFinsih, setGameFinsih]=useState(false)
    const[player2Name,setPlayer2Name]=useState("")
    let members=[]
  
  
const setClientCode=(e)=>{

    setCode(e.target.value)
}

    const [player, setPlayer] = useState({player:{id:""}})
           const setPlayerName= e=> {
            setPlayer({
                      player: {
                      id: e.target.value
                      }
                        })
                      }
const switchPlayers=()=>{
    userStarts==="Admin starts" ? setUserStarts("Client starts"):setUserStarts("Admin starts") 
    if(admin&&userStarts==="Client starts"){
        setOthePlayerPlaying(!othePlayerPlaying)
    }
}

    //Generate link and code for client
const generateCode=()=>{
    let start //variable to check by client to show the cube or not
    if(userStarts==="Admin starts"){
     start=1 
    }else{start=0}
     setclientLink(props.location +'?'+ (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)+start)
    }
    
    //compare client and url code to complete login                    
    const compareCode=()=>{
        if(localUrl.indexOf('?')>0){
            const linkCode=localUrl.slice(localUrl.indexOf('?')+1,localUrl.length)
              if(clientCode.toString()!==linkCode){
                console.log("You cant login! Client code: ",clientCode, "location code:",linkCode)
              } 
               if(clientCode.toString()===linkCode&& localUrl.slice(localUrl.indexOf('?')+5,localUrl.length)==='1'){
                setOthePlayerPlaying(!othePlayerPlaying) //show other player is playing instead cube 
                console.log("You have successfully logged in")
                setLoginComplete(!loginComplete)   }

               if(clientCode.toString()===linkCode&&localUrl.slice(localUrl.indexOf('?')+5,localUrl.length)==='0'){
                    console.log("You have successfully logged in")
                  setLoginComplete(!loginComplete)
                }  
          }
    }
    
    
    const [p1State, setP1State] = useState({
        id:'1',
        playing: false,
        rolled: false,
        currentPosition: 0,
        currentRoll: 0,
        CurrentQuestion: '',
        questionVisible: false,
        numofRoll: 0,
        finished:false
    })
    //===PLAYERE 2 LOGIC======================\\
    //p2 state
    const [p2State, setP2State] = useState({
        id:'2',
        playing: false,
        rolled: false,
        currentPosition: 0,
        currentRoll: 0,
        setCurrentQuestion: '',
        questionVisible: false,
        numofRoll: 0,
        finished:false
    })
    
    
//================================================================================================================================
//=======================END PLAYERS STATE SETUP====================================================================\
//===============================================================================================================================
//================================================================================================================================
//=========================DRONE SETUP============================================================================================
//================================================================================================================================
//was conusleiong room DJHRuXNgQyi58qY0 now game
const createRoom=()=>{
//set admin/not admin based on url code also later on call the compare location code method    
if(localUrl.indexOf('?')>0){
    setAdmin(!admin)
    compareCode()
}else(setAdmin(admin))

//put this below into condiitional statement to prvent multiple logins when client code fails
    const drone = new window.Scaledrone("sYoK5pOn8DZhOPRJ", { 
    });
  setDrone({drone:drone})
    drone.on('open', error => {
        if (error) {
            return console.error(error);
        }
        if(admin)
        {
            const player1 = { ...player.player };
            player1.id = drone.clientId;
        }else
        {
             const player2 = { ...player.player };
            player2.id = drone.clientId;
        }
        
    });
    const room = drone.subscribe('observable-room'); //<---CONTINUE FROM EHRE BY SETTING UP ROOMNAME FROM Login as code 6/26/2021
     setRoom({room:room})
     room.on('members', m => {
        members = m;
        console.log("MEMBER LIST",members)
       });

    room.on('message', message => {
    if(message.data.name.player.id!==player.player.id ){
        setPlayer2Name(message.data.name.player.id)
    switch (message.data.content.playing) {
        case true:
          console.log('PLAYING TRUE: STart P2steps to:', message.data.content.currentPosition);
          console.log('SET STEPS P2steps to:', (message.data.content.currentPosition+message.data.content.currentRoll));
          console.log("Question: ", message.data)
          setotherPLayerQ(!otherPlayerQ)
          console.log("CLIENT POSITION BEFORE Roll& Q:", p2State.currentPosition, p2State.currentRoll)
          //game end check:
          if(message.data.content.currentPosition+message.data.content.currentRoll>(questions.length-1)){
            setGameFinsih(!gameFinsih)
          }
          //-------------------------------------------
          setStep2(message.data.content.currentPosition, message.data.content.currentPosition+message.data.content.currentRoll)

          break
        case false:
          console.log('PLAYING FALSE');
       
          setTimeout(()=>{setOthePlayerPlaying(!othePlayerPlaying)
          setUpdate("updated")
                console.log('CLOSE OTHER PLayer info:', otherPlayerQ)},1000)
          break;
        default:
          console.log("NO CASE EXECUTED");
      }
    }

    });

   if(admin&&localUrl.indexOf('?')<0){setLoginComplete(!loginComplete)}
}

   const sendMessage = (player) => {
    if(drone){ 
                console.log("message reached",p1State.currentRoll,"P1STATE playing:",p1State.playing, "P2STATEPLAYING", p2State.playing)
                if(admin)
                {
                    console.log("This is ADMIN client sending message")
                    sendMessage_out(drone,player,p1State)
                }
                else if(!admin)
                {
                    console.log("This is a non admin client sending message")
                    sendMessage_out(drone,player,p2State)
                }
    }
    }

 
//++===ON GAME START========================
//show cube at first step
const gameStart=()=>{
if(p1State.currentPosition===0 &&  cubeVisible &&loginComplete){
    let cube_position = '#cube' + p1State.currentPosition.toString()
    $(cube_position).css('visibility', 'visible')
   // $('#stepP20').css('visibility', 'visible')
    $('#step0').css('visibility', 'visible')
    
}
}
gameStart()

//==================================================================================
//================USER ACTIONS=====================================================//
    const startRoll = () => {
        //console.log('NUMROLL',(p1State.numofRoll + 1))
        if(admin)
        {
            setP1State({...p1State, currentRoll:(Math.floor(Math.random() * (6 - 1) + 1)), numofRoll:p1State.numofRoll+1,playing:true})
            console.log("ROLLED  ADMIN")
        }
        else if(!admin)
        {
            setP2State({...p2State, currentRoll:(Math.floor(Math.random() * (6 - 1) + 1)), numofRoll:p2State.numofRoll+1, playing:true})
        console.log("ROLLED NON ADMIN")
        }  
    }

    
    const setSteps = () => {
        if(p1State.currentRoll + p1State.currentPosition>questions.length){setGameFinsih(!gameFinsih)}
      
      if(admin){setStep(p1State.currentPosition, p1State.currentRoll + p1State.currentPosition)   
    }
      else if(!admin){
          
        setStep(p2State.currentPosition, p2State.currentRoll + p2State.currentPosition)} 
        console.log("CLIENT POSITION after Roll:", p2State.currentPosition, p2State.currentRoll)
      
    }

    
    
    const afterRoll = (position) => {
        if (p1State.currentPosition > 0) { setCubeVisible(!cubeVisible)   }   
     //setCurrentPosition(position)///this was currentPosition +postion before, DO NOT EVER MODIFY CURRENTPOS, IT is being updated after every roll end with position++. ONLY update currentroll by adding currentposition to it!!
       setP1State({...p1State, currentPosition:position})
       setP2State({...p2State, currentPosition:position})
    }

    //==========Roll to question widnow top
    const handleQuestionVisible = (e) => {
        setQuestionVisible(!questionVisible)
        // console.log("rolltoCalled", e.target.id)
        // sendQuestion()
        $(function () {
            $('html, body').animate({
                scrollTop: $('#mainquestion').offset().top - 20
            }, 2000);
        });
    }
    //========Update visnibity state for cube and questions
    const handleQuestionClose_CubeVisible = () => {
          setotherPLayerQ(!otherPlayerQ)
      if(admin){ console.log(" ADMIN UPDATE CLOSE QUESTION REACHED","update:",update)
          p1State.playing=false
       }else if(!admin){console.log(" CLIENT UPDATE CLOSE QUESTION REACHED")
       p2State.playing=false
       }
        setQuestionVisible(!questionVisible)
        setCubeVisible(!cubeVisible)
        setOthePlayerPlaying(true)//Always use boolean values and not just a variable itself!)
        setUpdate("")
        setTimeout(() => {
           //show cube after question closed
            if(!cubeVisible){let cube_position = '#cube' + p1State.currentPosition.toString()
              $(cube_position).css('visibility', 'visible') 
              sendMessage(player)
              console.log("PLAYER object: ",p1State,"UPDATED:",update,"Othe rpeople:",othePlayerPlaying)
            }     
        }, 2000)

    }

    const stopRoll = () => {
        setTimeout(() => { setSteps() }, 1000)//TODO----solve issue of showwing figure on start-------------------------------!!!!    //this is where maybe add  aswitch statement to handle player1 and player2 steps
        console.log("CURRENTROLL", p1State.currentRoll,"p2roll",p2State.currentRoll)

        setTimeout(()=>{ 
             sendMessage(player)}, 500)

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
    //==================FIGURE2 STEP LOGIC==============================================
    const setStep2 = (position, goTo) => {
        
        let interval = setInterval(function () {
           
            if (position <= goTo) {             ///<=====set steps forward here   max step number=  content.data.length-1
                let currentStep = '#stepP2' + position.toString()
                if (position > 0) {
                    let stepback = '#stepP2' + (position - 1).toString()
                    $(function () {
                        $(stepback).css('visibility', 'hidden')
                    })
                }
                $(function () {
                    $(currentStep).css('visibility', 'visible')
                })
                if (position === goTo) {
                    //update current position
                    // afterRoll(position)
                }
                position++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
    return (
        <div className='relative grid justify-items-stretch'>
            {!loginComplete&& 
            <div style={{position:"absolute",zIndex:3, width:"100%",backgroundColor:"rgb(26, 213, 219)",height:"100%",opacity:1,display:"flex",justifyItems:"center",padding:"30px",borderRadius:"10px"}}>
            <div className=' flex flex-col h-96 bg-blue-500 p-8 rounded-xl opacity-100 mx-auto'>
               { localUrl.indexOf('?')<0? <div className='flex flex-col'>
               <textarea id="playerName"placeholder="player name " className=" p-2 text-sm h-10  rounded-xl mb-3" onChange={e=>{setPlayerName(e)}}></textarea>
                <div className='flex'>
                   <label className="switch">
                   <input type="checkbox" onChange={()=>switchPlayers()}></input>
                    <span className="slider round"></span>
                   </label>
                    <div className='text-sm text-white pl-3 text-align-center'>{userStarts}</div>
                </div>
                <button className='p-3 bg-pink-500 hover:bg-pink-400 rounded-xl mb-3 text-xl text-white mt-3' onClick={()=>generateCode()}>Generate link</button>
                <textarea placeholder={clientLink} value={clientLink} readOnly={true} className=" p-2 text-sm h-30  rounded-xl mb-3"></textarea>
                </div>:<div className=' flex flex-col '><textarea id="playerName"placeholder="player " className=" p-2 text-sm h-10  rounded-xl mb-3" onChange={e=>{setPlayerName(e)}}></textarea>
                <textarea id="clientLink"placeholder="your code " className=" p-2 text-sm h-10  rounded-xl mb-3" onChange={e=>setClientCode(e)} ></textarea></div>}
                <button className='p-3 bg-green-400 rounded-xl hover:bg-green-300  text-xl text-white mt-3' onClick={()=>createRoom()}>Login</button>
            </div>
            </div>
            }
            <div className=' flex mb-3 '>
                <div className='p-3 text-blue-500'>
                    Welcome to the game of All about You
               <img alt='3d characters' src={game}></img>
                </div>
            </div>
               {/* HANDLE FINISH GAME */}
            {gameFinsih&&<div id="game-finish" className='absolute grid bg-blue-500 w-full p-3 items-center z-50 text-6xl text-center' style={{ top: '0px', bottom: '0px', width: "100%" }}>We have a winner<Confetti 
      width={window.innerWidth + 'px'} 
      height={window.innerHeight + 'px'} ></Confetti></div>
             }
            {/* //game grid */}
            <div className='grid grid-cols-5 ' >
                {content.map(step => (
                    <div key={step.fields.id} className='relative ' >

                        <div style={step.fields.id === 4 || step.fields.id === 14 || step.fields.id === 24 || step.fields.id === 34 || step.fields.id === 44 ?
                            { backgroundColor: 'green', height: '2rem', borderTopRightRadius: '3rem', borderWidth: '2px', borderColor: 'black', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.2rem' } : { display: "hidden" }}></div>

                        <div style={step.fields.id === 9 || step.fields.id === 19 || step.fields.id === 29 || step.fields.id === 39 || step.fields.id === 49 ?
                            { backgroundColor: 'green', height: '2rem', borderTopLeftRadius: '3rem' } : { display: "hidden" }}></div>

                        <div style={{
                            marginTop: step.fields.id === 4 || step.fields.id === 14 || step.fields.id === 24 || step.fields.id === 34 || step.fields.id === 44 || step.fields.id === 9 || step.fields.id === 19 || step.fields.id === 29 || step.fields.id === 39 || step.fields.id === 49 ?
                                '2rem' : '0rem'
                        }} id={'step' + step.fields.id.toString()}  className=' absolute -top-12 invisible'>

                           <p className='text-sm bg-black p-2 text-center rounded-xl border border-indigo-600'>{player.player.id}</p>
                            <img alt='figure' src={figure} className="w-16 h-16"></img>
                        </div>
                        
                         <div style={{
                            marginTop: step.fields.id === 4 || step.fields.id === 14 || step.fields.id === 24 || step.fields.id === 34 || step.fields.id === 44 || step.fields.id === 9 || step.fields.id === 19 || step.fields.id === 29 || step.fields.id === 39 || step.fields.id === 49 ?
                                '2rem' : '0rem'
                        }} id={'stepP2' + step.fields.id.toString()} className=' absolute -top-12 left-32  invisible'>

                            {player2Name?<p className='text-sm bg-black p-2 text-center rounded-xl border border-indigo-600' style={{borderStyle:"inset",borderWidth:'2px'}}>{player2Name}</p>:<p></p>}
                            <img alt='figure2' src={figure2} className="w-16 h-16"></img>
                        </div>

                        <div>
                               {/*HANDLE SHOW QUESTION DIV*/ }
                            <div className='relative grid justify-items-center items-center'>
                                <div onClick={e => { handleQuestionVisible(e) }}
                                    onMouseDown={() => { setP1State({...p1State, currentQuestion:[step.fields.question, step.fields.media]})}}//passing question data to popup window
                                  
                                    className=' text-3xl flex p-10  bg-blue-400 hover:bg-blue-600 rounded-lg z-10 cursor-pointer absolute' 
                                    style={{ visibility: 'hidden',borderStyle:"inset",borderWidth:'2px' }}
                                    id={'q' + step.fields.id.toString()}>
                                    <span className='animate-ping'>?</span>
                                </div>
                                 {/*HANDLE SHOW CUBE DIV*/ }
                                 {/*Show cube at current location, id is a combination of the current locatio + cube, get the idea adn set visibility */ }
                            <div  className='text-xl text-black absolute -top-14   ritgh-0'
                                  id={'cube' + step.fields.id.toString()}
                                  style={{ visibility: 'hidden' }} >                                
                                  {cubeVisible && !questionVisible &&
                                    <div id='cubeFrame' className='  p-6 absolute z-40 '>
                                  {
                                   othePlayerPlaying &&update!=="updated" ?
                                   <div className='text-sm text-center w-44 absolute bg-green-200 rounded-xl p-2 right-3 top-20'  style={{borderStyle:"inset",borderWidth:'4px'}}>{ player2Name?player2Name+"'s turn":"Please wait"}
                                   </div> :
                                   <Cube currentRoll={admin?p1State.currentRoll:p2State.currentRoll} onMouseDown={() => stopRoll()} onClick={startRoll} ref={rollTo} />
                                  }
                                   </div>}                                   
                            </div>
                            </div>
                            <BaseStepSquare value={step.fields.id} content={step.fields.question} question={step.fields.Name} />
                        </div>
                    </div>
                ))}
            </div>
            {questionVisible && <div id='finish_screen' className='absolute grid bg-blue-500 w-full p-3 items-center' style={{ top: '0px', bottom: '0px', width: "100%" }}>
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