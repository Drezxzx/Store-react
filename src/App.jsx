// import { useState, useEffect } from 'react'
import {Header} from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import {useEffect} from 'react'
import Main from './components/HomePage.jsx'



function App() {
  
  useEffect(()=>{
    const url = window.location.href
    if (url){
        document.title= "Pagina principal"
    }
   }, [])
  return (
    <>
    <Header/>
    <Main/>
    <Footer/>
    </>
  )
}

export default App
