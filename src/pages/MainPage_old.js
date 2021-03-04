import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import { data } from '../data/data'
import Cube from '../components/cube'
import Emitter from '../utils/SpecialEvents'
const MainPage = (props) => {

    const [questions, setQuestions] = useState(props.data)

    const [currentRoll, setCurentRoll] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(0)
    const [numofRoll, setNumofRoll] = useState(0)

    const [questionVisible, setQuestionVisible] = useState(false)
    const rollTo = useRef()

    console.log("data passed to main page", questions[0].fields.Name)
///*Airtable data struct questions[0].fields.question ==>main question
///*Airtable data struct questions[0].fields.Name) ==>step tile

    useEffect(() => {


        Emitter.on("ROLLED", (value) => {

            //FOR SOME REASON EVENT TRIGGERS 2 TIMES FROM CUBE!!


            setCurentRoll(parseInt(value[0].slice(4, 5)))
            setNumofRoll(value[1])//keeping track number of rolls plus initiate re-render even if the rolled number === to value stored in currentRoll

        })



        setSteps()//update roll number to currentPosiiton +currentRoll and call setStep() to execute fiure movement

        // console.log('ROLL FOMR EFFECT', currentRoll)
        // console.log('ROLL NUMBER FOMR EFFECT', numofRoll)
        //remember this wont fire if the rolled number is the same as currentRoll in the state!!!!

    }, [currentRoll, numofRoll])//whatever you put there, when it is changing it will re run the functions inside useeffect






    const content = questions

    ///get specific div step! TODO make this query in a loop and set innerhtml with timed functions
    /*  $(function () {
          $("#q2").click(function () {
              alert('clicked')
          })
  
  
      })*/




    const setSteps = () => {
        //currentpiosition gets updated and keeps steps rolling to updated roll before new roll
        //onli update current position whem tehe is  a new roll.
        //if roll is less then current position , then current position wont get update due to the logic in setStep

        setStep(currentPosition, currentRoll + currentPosition)

        /*  if (currentPosition === currentRoll) {
  
              // this is the first case at the begining of the game or in case this condition occurs until current position becomes greater then 6
              setStep(currentPosition, currentRoll + currentPosition)
              console.log("DO not initiate roll", currentPosition, currentRoll)
  
  
              //setStep(currentPosition,updateRoll)
          } else {
  
  
              console.log("current pos is not equal to roll")
  
              setStep(currentPosition, currentRoll + currentPosition)
          }*/


    }


    const afterRoll = (position) => {

        //this below updates current posiiton but only if current roll is greater then
        setCurrentPosition(position)///this was currentPosition +postion before, DO NOT EVER MODIFY CURRENTPOS, IT is being updated after every roll end with position++. ONLY update currentroll by adding currentposition to it!!

        console.log('CURRENT POS after roll:', position,)


    }


    //==========Roll to question idnow top
    const handleQuestionVisible=(e)=>{
        setQuestionVisible(!questionVisible) 

        console.log("rolltoCalled",e.target.id) 
       
            
            $(function (){
                

                $('html, body').animate({
                    scrollTop: $('#mainquestion').offset().top-20
                }, 2000);
            });
        
        
        


    }


    //console.log("datalength",content.data.length)
    //check length of data and the number of times the interval runs, to keep figure visible on the last step
    const setStep = (position, goTo) => {

        // let time = currentPosition;          ///<============this here can be the current position initialized to 0
        //let goTo=currentRoll                   //Remember these variables were time =position before


        let interval = setInterval(function () {


            if (position <= goTo) {             ///<=====set steps forward here   max step number=  content.data.length-1

                let currentStep = '#step' + position.toString()

                //TO DO SOMEWHERE HERE SET THE POPUP WINDOW IF CURRENTPOS IS DONE CALCULATING MAKE PUPUP VISIBLE WITH SATA
                if (position > 0) {
                    let stepback = '#step' + (position - 1).toString()
                    $(function () {
                        $(stepback).css('visibility', 'hidden')

                    })
                }

                $(function () {
                    $(currentStep).css('visibility', 'visible')
                    //roll to current position on screen

                    /*  $(function (){
                          $('html, body').animate({
                              scrollTop: $(currentStep).offset().top-20
                          }, 2000);
                      });*/

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


    //setSteps()



    return (

        <div className='relative'>

            <div className=' flex mb-3 '>
                <div className='p-3'>

                    Welcome to the game of All about You
 </div>
                <div className='bg-green-200 rounded-xl flex p-6'>
                    <Cube ref={rollTo} />
                </div>
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

                            <div className='relative grid justify-items-center items-center'>

                                <div   onClick={e => {handleQuestionVisible(e)}}   
                                 className=' text-3xl flex p-10  bg-blue-400 rounded-lg z-10 cursor-pointer absolute'
                                 style={{ visibility: 'hidden' }} 
                                 id={'q' + step.fields.id.toString()}> 
                                 <span className='animate-ping'>?</span>
                                 </div>

                            </div>
                            <BaseStepSquare value={step.fields.id} content={step.fields.question} question={step.fields.Name} />
                        </div>
                    </div>


                ))}


            </div>

            {questionVisible && <div  className='absolute grid bg-green-300 w-full p-3 items-center' style={{ top: '0px', bottom: '0px', width: "100%" }}>
                <div className='bg-blue-200 '>
                    <div id='mainquestion' className='flex justify-end items-center'>
                        <span  onClick={e => { setQuestionVisible(!questionVisible) }} className=' grid items-center  justify-items-center w-11 h-11 rounded-full bg-gray-600 text-3xl font-semibold cursor-pointer'>X</span>
                    </div>

               MAIN question

              </div>
            </div>

            }


        </div>
    )




}

export default MainPage