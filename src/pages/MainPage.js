import React, {useState} from 'react'
import BaseStepSquare from '../components/BaseStepSquare'
import $ from "jquery";



const MainPage=(props)=>{


    
const content={"data":

    [
    

        {"text":"hello",
         "value":0,
         "question":"how are you today?"
        },

        {"text":"haho",
        "value":1,
        "question":"are you happy?"
       },

       {"text":"yaaay",
       "value":0,
       "question":"Cats are fun?"
        },
        
               



    ]



}
    
///get specific div step! TODO make this query in a loop and set innerhtml with timed functions
$(function(){
    $("#step2").click(function(){
     alert('clocked')
    })
   
    
    })
    
 
    

return(



    <div className='flex' >


{content.data.map((step,index)=>(
    <div id={'step'+index.toString()} key={index}  >
        {index}
<BaseStepSquare  value={step.value}  content={step.text } question={step.question}/>
</div>


))}


    </div>
)




}

export default MainPage