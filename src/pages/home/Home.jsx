import React from 'react'
import Banner from './Banner'
import Topsells from './Topsells'
import Recomended from './Recomended'
import News from './News'
// import Topsells from './Topsells'


// Uncomment this line if you want to include the Topsells component

const Home = () => {
  return (
    <>
        <Banner/>
        <Topsells/> 
        <Recomended/>
        <News/> 
    </>
  )
}

export default Home