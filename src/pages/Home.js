import React from 'react'
import MainPage from './MainPage'

const HomePage = (props) => {

return(
<div>
<MainPage data={props.data} location={props.location}/>
</div>
)

}

export default HomePage