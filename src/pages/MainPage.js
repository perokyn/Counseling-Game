import React, {useRef, useState, useEffect} from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import {data} from '../data/data'
import Cube from '../components/cube'
import Emitter from '../utils/SpecialEvents'
const MainPage=(props)=>{

    const[currentRoll, setCurentRoll]=useState(0)
    const[currentPosition, setCurentPosition]=useState(0)


useEffect(()=>{


    Emitter.on("ROLLED", (value)=>{
        if(!currentRoll){

            setCurentRoll(parseInt(value.slice(4,5)) )

        }else(setCurentRoll( parseInt(value.slice(4,5)) ))
        })
   
   // console.log("colors", setStep())
    
  


})
    
const content=data
const rollTo= React.createRef() 
///get specific div step! TODO make this query in a loop and set innerhtml with timed functions
$(function(){
    $("#step2").click(function(){
     alert('clocked')
    })
   
    
    })
    



     
console.log("datalength",content.data.length)
 //check length of data and the number of times the interval runs, to keep figure visible on the last step
  const setStep=()=>{
    
    let time = 0;          ///<============this here can be the current position initialized to 0

    let interval = setInterval(function() { 
        if (time <= currentRoll) {             ///<=====set steps forward here   max step number=  content.data.length-1
      
            let  currentStep='#step'+time.toString()

         
            if(time>0){
                let stepback='#step'+(time-1).toString()
                $(function(){
                    $(stepback).css('visibility', 'hidden' )
            
               })     
            }

            $(function(){
                $(currentStep).css('visibility', 'visible')
        
           })

          
           time++;
        }
        else { 
           clearInterval(interval);
        }
     }, 1000);
   
   
       
  }


  setStep()
 


return(

<div>

    <div className=' flex mb-3 '>
 <div className='p-3'>

Welcome to the game of All about You
 </div>
 <div className='bg-green-200 rounded-xl flex p-6'>
       <Cube ref={rollTo}/>
    </div>
</div>
    <div className='grid grid-cols-5 ' >


{content.data.map((step, index)=>(


   
   <div  key={step.value} className='relative ' >

<div style={  step.value===4 ||step.value===14||step.value===24 || step.value===34 || step.value===44? 
    {backgroundColor:'green', height:'2rem', borderTopRightRadius:'3rem', borderWidth:'2px',borderColor:'black',borderTopLeftRadius:'0.5rem',borderBottomLeftRadius:'0.2rem'} :{display:"hidden"}  }></div>

    <div style={  step.value===9 || step.value===19 || step.value===29 || step.value===39 || step.value===49? 
    {backgroundColor:'green', height:'2rem', borderTopLeftRadius:'3rem'} :{display:"hidden"}  }></div>



     <img style={ { marginTop:step.value===4 ||step.value===14||step.value===24 || step.value===34 || step.value===44 || step.value===9 || step.value===19 || step.value===29 || step.value===39 || step.value===49? 
        '2rem' : '0rem' } } id={'step'+step.value.toString()} alt='figure' src={figure}   className=' absolute -top-6 w-16 h-16 invisible'    ></img>    
     
     <div  >
     <BaseStepSquare  value={step.value}  content={step.text } question={step.question}/>
     </div>
   </div>


))}


    </div>
    </div>
)




}

export default MainPage