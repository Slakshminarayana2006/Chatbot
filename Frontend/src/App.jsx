import { useState } from 'react'

import './App.css'
import Chatbot from './components/Chatbot'


function App() {

  return (
    <>
    <div className='bg-purple-100 h-screen flex items-center justify-center p-2'>
      <Chatbot />
    </div>
    </>
  )
}

export default App
