import React, {useState} from 'react'





const BaseStepSquare=React.forwardRef((props, ref)=>{

    
    
    const randomColor =()=>{
        
    const color=Math.floor(Math.random()*16777215).toString(16);
   
    return "#" + color.toString();
  }

    const newColor=randomColor()


return(



    <div onClick={props.handleClick}  className='flex p-3 border-2 border-gray-800 rounded-xl ' style={{backgroundColor:newColor}}>
<div ref={props.ref}>
  
<div className='text-sm font-bold text-white'>

{props.question}
</div>

</div>


    </div>
)




})

export default BaseStepSquare