import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import game from '../assets/game.png'
import Cube from '../components/cubeTest'
import ReactPlayer from 'react-player/youtube'
//-ytesting scaledrone
// import {TestDrone} from '../components/testDrone'//REMEMBER TO NOT CALL THIS AS A COMPONENt BUT EXPORT FUNcTIONS to avoid coNITNuOUS CONNECTING at each render!!
// import ConnectScaledrone from '../components/cscaledrone_connect'
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

    const[userStarts, setUserStarts]=useState('Admin starts')

    const [questions, setQuestions] = useState(props.data)
    const[loginComplete, setLoginComplete]=useState(true)
    const [questionVisible, setQuestionVisible] = useState(false)
    const rollTo = useRef()
    const [cubeVisible, setCubeVisible] = useState(true)
    const content = questions

    const[clientCode, setClientCode]=useState('code')


    const getLocation=()=>{
        const localUrl=props.location.toString()
        if(localUrl.indexOf('?')>0){
            const linkCode=localUrl.slice(localUrl.indexOf('?')+1,localUrl.length)
            console.log("CLIENT side:",linkCode)
          }
    
    }
    getLocation()
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
        currentRoll: 0,
        setCurrentQuestion: '',
        questionVisible: false,
        numofRoll: 0
    })
    
//DRONE STATES=========================
    const [room, setRoom]=useState()
    const [drone, setDrone]=useState()
    const[admin, setAdmin]=useState(true)
    let members=[]
    const [player, setPlayer] = useState({})

const setPlayerName= e=> {
    setPlayer({
    player: {
        id: e.target.value///CONTINUE FROM HEER TO SET ADMIN ID
    }
})
}

//================================================================================================================================
//=======================END PLAYERS STATE SETUP====================================================================\
//================================================================================================================================

//Generate code for client

const generateCode=()=>{
console.log("location", props.location)
    const clientCode=(Math.floor(Math.random() * (6 - 1) + 1))
 setClientCode(props.location +'?'+ (Math.floor(Math.random() * 10000) + 10000).toString().substring(1))
}




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
        if(player.player.id.toString()==="Csilla")
        {setAdmin(admin)
            const player1 = { ...player.player };
            player1.id = drone.clientId;
        }else
        {
               setAdmin(!admin)
                const player2 = { ...player.player };
                player2.id = drone.clientId;

        }
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
    room.on('message', message => {//maybe add get message function on question closed-->get the player name form the current client and compare it tothe data in the messgae
        console.log("message yaaay", message, "Sender Name",message.data.name.player.id)
       if(player.player.id!==message.data.name.player.id && !message.data.content.playing)
       {
           
        console.log("PLAYER2 is playng yaaay",message.data.content.playing) 

    //    setP2State({...p2State, playing:!p2State.playing})
        //SET p2 sette here to get roll and current positin and move figure
            // setP2State({})
       }

       if(message.data.name.player.id.toString()==="Csilla"&& !message.data.content.playing)
       {
        console.log("Csilla is  NOT playing yaaay",message.data.content.playing) 

        setP1State({...p1State, playing:false})
        setP2State({...p2State, playing:true})

       }else if(message.data.name.player.id.toString()==="Csilla"&& message.data.content.playing)
       {
        console.log("Csilla is Playing yaaay",message.data.content.playing) 
        setP1State({...p1State, playing:true})
        setP2State({...p2State, playing:false})
       }

       if(message.data.name.player.id.toString()!=="Csilla"&& !message.data.content.playing)
       {
        console.log("Client is  NOT playing yaaay",message.data.content.playing) 
        setP2State({...p2State, playing:false})
        setP1State({...p1State, playing:true})
       }else if(message.data.name.player.id.toString()==="Csilla"&& message.data.content.playing)
       {
        console.log("Client is  Playing yaaay",message.data.content.playing) 
        setP2State({...p2State, playing:true})
        setP1State({...p1State, playing:false})
       }


    });

    setLoginComplete(!loginComplete)
}

   const sendMessage = (player) => {
    if(drone){ 
                console.log("message reached",p1State.currentRoll)
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
if(p1State.currentPosition===0 && cubeVisible){
    let cube_position = '#cube' + p1State.currentPosition.toString()
    $(cube_position).css('visibility', 'visible')
}
}
gameStart()

//==================================================================================
//===============SET ROLL NUMBER FOR player1=======================================//
    const startRoll = () => {
        //console.log('NUMROLL',(p1State.numofRoll + 1))
        if(admin)
        {
            setP1State({...p1State, currentRoll:(Math.floor(Math.random() * (6 - 1) + 1)), numofRoll:p1State.numofRoll+1})
            console.log("ROLLED  ADMIN")
        }
        else if(!admin)
        {
            setP2State({...p2State, currentRoll:(Math.floor(Math.random() * (6 - 1) + 1)), numofRoll:p2State.numofRoll+1})
        console.log("ROLLED NON ADMIN")
        }  
    }
    const setSteps = () => {
        //this gets a call from handleStop roll which tsrats to animate the figure
        //this is where maybe add  aswitch statement to handle player1 and player2 
        //this method should also be called from use Effect when data is avaliable form player2
        switch (player) {
            case admin:
                setStep(p1State.currentPosition, p1State.currentRoll + p1State.currentPosition)
                break
            case !admin:
                setStep(p2State.currentPosition, p2State.currentRoll + p2State.currentPosition)
                break
            default: setStep(p1State.currentPosition, p1State.currentRoll + p1State.currentPosition)
        }
    }

    const afterRoll = (position) => {
        if (p1State.currentPosition > 0) { setCubeVisible(!cubeVisible)   }   
     //setCurrentPosition(position)///this was currentPosition +postion before, DO NOT EVER MODIFY CURRENTPOS, IT is being updated after every roll end with position++. ONLY update currentroll by adding currentposition to it!!
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
        if(!admin)//if not admin client closed teh wuestion set it status to not playing and set Admin client statops to playing
        {
            setP2State({...p2State,playing:false})
            setP1State({...p1State,playing:true})

        }
        else if(admin)
        {
            setP2State({...p2State,playing:true})
            setP1State({...p1State,playing:false})
        }
        ///CONTINUE FROM HERE 07/10 !!! send state with updated playing or not playing and update message
      //  sendMessage(player)//-->send signal to change player rolling message to your turn CONTINUE FROM HERE
        setQuestionVisible(!questionVisible)
        setCubeVisible(!cubeVisible)
        setTimeout(() => {
           //show cube after question closed
            if(!cubeVisible){let cube_position = '#cube' + p1State.currentPosition.toString()
              $(cube_position).css('visibility', 'visible') 
    }
                
        }, 2000)

    }
    //for two player game
    const stopRoll = () => {
        setTimeout(() => { setSteps() }, 1000)//TODO----solve issue of showwing figure on start-------------------------------!!!!    //this is where maybe add  aswitch statement to handle player1 and player2 steps
        console.log("CURRENTROLL", p1State.currentRoll)
        //sendMessage(player)
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
                {admin? <idv></idv>:<div className=' flex flex-col '><textarea id="playerName"placeholder="player " className=" p-2 text-sm h-10  rounded-xl mb-3" onChange={e=>{setPlayerName(e)}}></textarea>
                <textarea id="clientCode"placeholder="your code " className=" p-2 text-sm h-10  rounded-xl mb-3" ></textarea></div>}
                
                <button className='p-3 bg-gray-500 rounded-xl mb-3 text-xl text-white mt-3' onClick={()=>generateCode()}>Generate link</button>
                <textarea placeholder={clientCode} value={clientCode} className=" p-2 text-sm h-10  rounded-xl mb-3"></textarea>
               <div className='flex'>
                <label className="switch">
                   <input type="checkbox" onChange={()=>userStarts==="Admin starts" ? setUserStarts("Client starts"):setUserStarts("Admin starts") }></input>
                  <span className="slider round"></span>
                </label>
                <div className='text-sm text-white pl-3 text-align-center'>{userStarts}</div>
                </div>
            <button className='p-3 bg-blue-200 rounded-xl  text-xl text-white mt-3' onClick={()=>createRoom()}>Login</button>
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
                                <Cube currentRoll={p1State.currentRoll} onMouseDown={() => stopRoll()} onClick={startRoll} ref={rollTo} />
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
                                   <Cube currentRoll={p1State.currentRoll} onMouseDown={() => stopRoll()} onClick={startRoll} ref={rollTo} />
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