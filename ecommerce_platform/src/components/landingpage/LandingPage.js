import React from 'react'
import About from './About'
import Home from './Home'
import Work from './Work'

import Contact from './Contact'
import Footer from './Footer'
import './LandingPage.css'

function LandingPage() {
  return (
    <div>
        <Home></Home>
        <About></About>
        <Work></Work>
        <Contact></Contact>
        <Footer></Footer>
    </div>
  )
}

export default LandingPage