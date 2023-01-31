import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react'
import { auth, db } from './Firebase';
import Login from './Login';

const Register = () => {
    let [loginForm, setLoginForm] = useState(false); 

    return (
        <div className='regForm h-[100vh] w-[100%] bg-white fixed top-0 z-10 flex justify-center items-center'>
        <form className="h-[80%] w-[80%] bg-white drop-shadow-2xl flex flex-col items-center justify-center gap-5">
            <p className='errorText text-center text-[14px] text-red-400'></p>
            <label>Name:</label>
            <input className='regNameInput p-1 font-bold bg-gray-100' type='text' placeholder='John Doe' required/>
            <label>Email:</label>
            <input className='regEmailInput p-1 font-bold bg-gray-100' type='email'  placeholder='Example@domain.com' required/>
            <label>Password: </label>
            <input className='regPassInput p-1 font-bold bg-gray-100' type='password' required/>
            <button className='submitReg p-1 bg-blue-500 rounded-sm drop-shadow-xl text-white' onClick={(e) => {
                e.preventDefault(); 

                let regNameInput = document.querySelector('.regNameInput'); 
                let regEmailInput = document.querySelector('.regEmailInput'); 
                let regPassInput = document.querySelector('.regPassInput'); 

                let name = regNameInput.value; 
                let email = regEmailInput.value; 
                let password = regPassInput.value; 

                createUserWithEmailAndPassword(auth, email, password) 
                    .then(() => {
                    auth.onAuthStateChanged((cred) => {
                        let uid = cred.uid; 
                        set(ref(db, `users/${uid}/`), {
                        name: name, 
                        email: email, 
                        uid: uid
                        })
                    })
                })
                .catch((err) => {
                    let errorText = document.querySelector('.errorText'); 
                    let error = err.message; 
                    errorText.textContent = error
                    console.log("this is the error:" + err.message)
                })
            }}>Register</button>
            <a className='text-blue-500 italic text-[14px] cursor-pointer hover:font-bold' onClick={() => { setLoginForm(true)}}>Already Have An Account? Log In!</a>
        </form>
        {
            loginForm ? <Login/> : null
        }
    </div>
    )
}

export default Register