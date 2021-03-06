import React, { useRef, useState, useEffect } from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import game from '../assets/game.png'
import { data } from '../data/data'
import Cube from '../components/cube'
import Emitter from '../utils/SpecialEvents'
import ReactPlayer from 'react-player/youtube'




const MainPage = (props) => {

    const [questions, setQuestions] = useState(props.data)
    const [currentQuestion, setCurrentQuestion] = useState([])


    const [currentRoll, setCurentRoll] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(0)
    const [numofRoll, setNumofRoll] = useState(0)

    const [questionVisible, setQuestionVisible] = useState(false)
    const rollTo = useRef()


const[cubeVisible, setCubeVisible]=useState(true)

   // console.log("data passed to main page", questions[0].fields.Name)
    ///*Airtable data struct questions[0].fields.question ==>main question
    ///*Airtable data struct questions[0].fields.Name) ==>step tile

    useEffect(() => {


        Emitter.on("ROLLED", (value) => {

            //FOR SOME REASON EVENT TRIGGERS 2 TIMES FROM CUBE!!
            

            setCurentRoll(parseInt(value[0].slice(4, 5)))
            setNumofRoll(value[1])//keeping track number of rolls plus initiate re-render even if the rolled number === to value stored in currentRoll

        })



        setSteps()//update roll number to currentPosiiton +currentRoll and call setStep() to execute fiure movement


        //remember this wont fire if the rolled number is the same as currentRoll in the state!!!!

    }, [currentRoll, numofRoll])//whatever you put there, when it is changing it will re run the functions inside useeffect






    const content = questions




    const setSteps = () => {


        setStep(currentPosition, currentRoll + currentPosition)


    }


    const afterRoll = (position) => {
      if(currentPosition>0){setCubeVisible(!cubeVisible)}
        
        setCurrentPosition(position)///this was currentPosition +postion before, DO NOT EVER MODIFY CURRENTPOS, IT is being updated after every roll end with position++. ONLY update currentroll by adding currentposition to it!!

        //console.log('CURRENT POS after roll:', position,)


    }


    //==========Roll to question idnow top
    const handleQuestionVisible = (e) => {
        setQuestionVisible(!questionVisible)

        console.log("rolltoCalled", e.target.id)


        $(function () {


            $('html, body').animate({
                scrollTop: $('#mainquestion').offset().top - 20
            }, 2000);
        });

    }


    const handleQuestionClose_CubeVisible=()=>{

        setQuestionVisible(!questionVisible) 
        if(currentPosition>0){setCubeVisible(!cubeVisible)}
        

    }

    const setStep = (position, goTo) => {



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

        <div className='relative'>

            <div className=' flex mb-3 '>
                <div className='p-3'>
                    Welcome to the game of All about You
               <img alt='3d characters' src={game}></img>

                </div>
        {cubeVisible && !questionVisible && <div className='bg-green-200 rounded-xl  p-6 absolute'>
                    <Cube ref={rollTo} />
                </div>}
              

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

                                <div onClick={e => { handleQuestionVisible(e) }}
                                    onMouseDown={() => { setCurrentQuestion([step.fields.question, step.fields.media]) }}//passing question data to popup window
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

            {questionVisible && <div className='absolute grid bg-blue-500 w-full p-3 items-center' style={{ top: '0px', bottom: '0px', width: "100%" }}>
                <div className='bg-blue-200 rounded-xl p-3 shadow-2xl'>

                    <div id='mainquestion' className='flex justify-end items-center'>
                        <span onClick={e => { handleQuestionClose_CubeVisible() }} className=' grid items-center  justify-items-center w-11 h-11 rounded-full bg-white hover:bg-gray-200 text-xl text-blue-500 cursor-pointer'>X</span>
                    </div>

                    <div className='grid justify-items-center'>

                        <p className=' text-gray-600 text-3xl font-semibold my-2'>{currentQuestion[0]}</p>
                        {currentQuestion[1] && <ReactPlayer url={currentQuestion[1]} />}
                    </div>

                </div>
            </div>

            }


        </div>
    )




}

export default MainPage