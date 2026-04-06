import React, {useEffect, useRef, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { addUserMessage, sendMessage } from '../store/Slice/chatSlice';
import '../App.css'


function Chatbot() {
  const bottomref = useRef(null);
  const[input, setInput] = useState('');

  const dispatch = useDispatch();
  const {messages, loading} = useSelector((state) => state.chat);
  const handleSend = () => {
    if(!input.trim()) return;

    dispatch(addUserMessage(input));
    dispatch(sendMessage(input));
    setInput("");
  }

  useEffect(() => {
    bottomref.current?.scrollIntoView({behavior : 'smooth'})
  }, [messages]);
  return (
    <>
        <div className="main w-full h-full max-w-md mx-auto bg-white rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden shadow-gray-600">
            
            <div className="display flex-1 overflow-y-auto scroll-smooth p-3 flex flex-col gap-2 ">
                {
                    messages.map((msg, i) => {

                        return (
                        <div className={`message  flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} 
                        key={i}
                        >
                            <div className={`px-3 py-2 rounded-xl max-w-[70%] ${msg.sender === "user" ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}>
                                {msg.text}</div>
                        </div>
                        )
                    })
                }
                {loading && (
                    <div className="text-sm text-gray-500">Bot is typing...</div>
                )}
                <div ref={bottomref}></div>
                
            </div>
            <div className="inp h-14 flex gap-2 p-2 focus:outline-none ">
                <div className="text flex-1">
                    <input type="text" className='flex-1 bg-white rounded-3xl h-10  px-3 py-2 focus:outline-none border border-purple-700 placeholder:text-black' placeholder='Enter Your Text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}

                    />
                </div>
                <div className="send">
                    <button className='bg-purple-600 text-white font-bold cursor-pointer rounded-3xl h-10 w-24 border border-purple-700' 
                    onClick={handleSend}
                    disabled = {loading}
                    >Send</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Chatbot