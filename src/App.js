import React, {useState} from 'react'
import './App.css';
import HomePage from './pages/Home'
import Loading from './pages/Loading';
function App() {
  const[data, setdata]=useState()
  
  const Airtable = require('airtable');
  Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: ''             //old key7CMgeXJp3gxPkG 
  });
  
const base = require('airtable').base('')
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
  //console.log("state", data)
  return (
    <div className="text-gray-300 text-4xl font-normal grid justify-items-center">
  {/* <TestDrone data={"hello Propss :)"}/> */}
  {/* animejs wont work in camel case section, no access to div */}
     <div className='flex mx-2  '>
       { data?<HomePage data={data} location={location}/>:
 <div className="absolute ">
 <div>Loading AirTable data ...</div>
  </div>}
     </div>
    </div>
  );
}


export default App;
