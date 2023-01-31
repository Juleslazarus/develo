import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from './Firebase'
import Register from './Register'

const Login = () => {
    let [regForm, setRegForm]=useState(false)
    return (
        <div className='regForm h-[100vh] w-[100%] bg-white fixed top-0 z-10 flex justify-center items-center'>
        <form className="h-[80%] w-[80%] bg-white drop-shadow-2xl flex flex-col items-center justify-center gap-5">
            <p className='errorText text-center text-[14px] text-red-400'></p>
            <label>User Name:</label>
            <input className='emailInput p-1 font-bold bg-gray-100' type='text'  required/>
            <label>Password: </label>
            <input className='passInput p-1 font-bold bg-gray-100' type='password' required/>
            <button className='submitReg p-1 bg-blue-500 rounded-sm drop-shadow-xl text-white' onClick={(e) => {
                e.preventDefault(); 
                let emailInput = document.querySelector('.emailInput'); 
                let passInput = document.querySelector('.passInput'); 

                let email = emailInput.value; 
                let password = passInput.value; 
                signInWithEmailAndPassword(auth, email, password)
                .catch((err) => {
                    let errorText = document.querySelector('.errorText'); 
                    let error = err.message; 
                    errorText.textContent = error
                    console.log("this is the error:" + err.message)
                })
            }}>Login</button>
            <a className='text-blue-500 italic text-[14px] cursor-pointer hover:font-bold' onClick={() => {setRegForm(true)}}>Don't Have An Account? Register Here!</a>
        </form>
        {
            regForm ? <Register/> : null
        }
    </div>
    )
}

export default Login