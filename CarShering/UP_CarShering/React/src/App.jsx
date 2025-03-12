import './App.css'
import Header from './Components/Header'
import carauto from './assets/carauto.png'
import TabAutoReg from './TabsAutoReg'
import Register from './Components/Register'
import LoginPass from './Components/LoginPass'
import Footer from './Components/Footer'
import { useState } from 'react'

export default function App() {
  const [tab, setTab] = useState('auto', 'reg')
  
  return (
    <>
    <Header/>
      <img src = {carauto} style = {{height: 300, width: 540, marginTop: 20}}></img>
      <TabAutoReg active = {tab} onChange = {(current) => setTab(current)}/>
      {tab === 'auto' &&(
        <LoginPass/> 
      )}
      {tab === 'reg' &&(
        <Register/>
      )}
      <Footer/>
    </>
  )
}

