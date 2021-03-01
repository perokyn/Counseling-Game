import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import { data } from '../data/data'
import Cube from '../components/cube'
import Emitter from '../utils/SpecialEvents'
const MainPage = (props) => {

    const [currentRoll, setCurentRoll] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(0)
    const[numofRoll, setNumofRoll]=useState(0)
    const rollTo = useRef()


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

    




    const content = data

    ///get specific div step! TODO make this query in a loop and set innerhtml with timed functions
    $(function () {
        $("#step2").click(function () {
            alert('clicked')
        })


    })




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


    //console.log("datalength",content.data.length)
    //check length of data and the number of times the interval runs, to keep figure visible on the last step
    const setStep = (position, goTo) => {

        // let time = currentPosition;          ///<============this here can be the current position initialized to 0
        //let goTo=currentRoll                   //Remember these variables were time =position before


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


                position++;
                
                if (position === goTo) {
                  //  console.log("inititated AFTERROLL")
                    afterRoll(position)
                }

            } else {
               // console.log("CLEAR INTERVAL")
                clearInterval(interval);

            }
        }, 1000);



    }


    //setSteps()



    return (

        <div>

            <div className=' flex mb-3 '>
                <div className='p-3'>

                    Welcome to the game of All about You
 </div>
                <div className='bg-green-200 rounded-xl flex p-6'>
                    <Cube ref={rollTo} />
                </div>
            </div>
            <div className='grid grid-cols-5 ' >


                {content.data.map((step, index) => (



                    <div key={step.value} className='relative ' >

                        <div style={step.value === 4 || step.value === 14 || step.value === 24 || step.value === 34 || step.value === 44 ?
                            { backgroundColor: 'green', height: '2rem', borderTopRightRadius: '3rem', borderWidth: '2px', borderColor: 'black', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.2rem' } : { display: "hidden" }}></div>

                        <div style={step.value === 9 || step.value === 19 || step.value === 29 || step.value === 39 || step.value === 49 ?
                            { backgroundColor: 'green', height: '2rem', borderTopLeftRadius: '3rem' } : { display: "hidden" }}></div>



                        <img style={{
                            marginTop: step.value === 4 || step.value === 14 || step.value === 24 || step.value === 34 || step.value === 44 || step.value === 9 || step.value === 19 || step.value === 29 || step.value === 39 || step.value === 49 ?
                                '2rem' : '0rem'
                        }} id={'step' + step.value.toString()} alt='figure' src={figure} className=' absolute -top-6 w-16 h-16 invisible'    ></img>

                        <div >
                          
                            <BaseStepSquare value={step.value} content={step.text} question={step.question} />
                        </div>
                    </div>


                ))}


            </div>
        </div>
    )




}

export default MainPage