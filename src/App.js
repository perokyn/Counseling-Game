import React, {useState} from 'react'
import './App.css';
import MainPage from './pages/MainPage'

function App() {

  const[data, setdata]=useState()
  
  const Airtable = require('airtable');
  Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: 'key7CMgeXJp3gxPkG'
  });
  

  const base = require('airtable').base('appC9kYVpX4ewyzZM')


if (data){console.log("data is in")}else{

  ;(async () => {
    const records = await base('Counseling')
    .select({
      view: 'Grid view',
    }).firstPage()
      
  setdata(records)

    /*for (const record of records) {
      console.log(record.fields)
    }*/
  })()




}



  //console.log("state", data)
  
  return (
    <div className="text-gray-300 text-4xl font-bold grid justify-items-center bg-gray-400">
  
     <div className='flex mx-2 p-6'>
       {data?<MainPage data={data}/>:<div className='text-4xl text-red-200'>Loading Data from Airtable...</div>}
     

     </div>
    
    </div>
  );
}

export default App;
