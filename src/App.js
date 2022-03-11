import React, {useState} from 'react'
import './App.css';
import HomePage from './pages/Home'
import anime from 'animejs';
function App() {
  const[data, setdata]=useState()
  
  const Airtable = require('airtable');
  Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: 'keyYnyKIu714D54nt'             //old key7CMgeXJp3gxPkG 
  });
  
const base = require('airtable').base('appC9kYVpX4ewyzZM')

if (data){console.log("data is in")}else{

  ;(async () => {
    const records = await base('Counseling')
    .select({
      view: 'Grid view',
    }).firstPage()
      
   setTimeout(()=>{setdata(records)},1000) 
  
    /*for (const record of records) {
      console.log(record.fields)
    }*/
  })()
}
//check if the url has the genrated code to identify client
const location=window.location.href

anime ({
  targets: 'div.box',
  translateY: [
      {value: 200, duration: 500},
      {value:0, duration: 800}  
  ],
  rotate: {
  value: '1turn',
  },
  borderRadius: 50,
  direction: 'alternate',
  easing: 'easeInOutQuad',
  delay: function() { return anime.random(0, 1000); },
  autoplay: true,
  loop: true,
  elasticity: 200 
 
}); 


  //console.log("state", data)
  return (
    <div className="text-gray-300 text-4xl font-bold grid justify-items-center">
  {/* <TestDrone data={"hello Propss :)"}/> */}
     <div className='flex mx-2  '>
       { data?<HomePage data={data} location={location}/>:
 <div className="absolute ">
 <div id="boxes">
        <div class="box red"></div>
        <div class="box blue"></div>
        <div class="box green"></div>
        <div class="box cyan"></div>
    </div>
  </div>}
     </div>
    </div>
  );
}


export default App;
