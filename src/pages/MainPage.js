import React, {useState} from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";
import figure from '../assets/figure.png'
import {data} from '../data/data'

const MainPage=(props)=>{


    
const content=data
    
///get specific div step! TODO make this query in a loop and set innerhtml with timed functions
$(function(){
    $("#step2").click(function(){
     alert('clocked')
    })
   
    
    })
    



     
console.log("datalength",content.data.length)
 //check length of data and the number of times the interval runs, to keep figure visible on the last step
  const setStep=()=>{
    
    let time = 0;

    let interval = setInterval(function() { 
        if (time <= content.data.length-1) { 
      
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
 


const indexing=[0,1,2,3,4,9,8,7,6,5]
    
 // console.log("colors", setStep())
  

return(



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
)




}

export default MainPage