import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './Firebase'; 
import { child, get, onValue, ref, set } from 'firebase/database';
import JoinGroup from './JoinGroup';
import Register from './Register';
import ProjectNode from './ProjectNode';

const Landing = () => {
  let [userAuth, setUserAuth] = useState(false); 
  let [userGroup, setUserGroup] = useState(false); 
  let [regForm, setRegForm] =useState(false); 
  let [loginForm, setLoginForm] = useState(false); 
  let [groupID, setGroupID] = useState(''); 

  auth.onAuthStateChanged((cred) => {
    let uid = cred.uid
    let dbRef = ref(db) 
    get(child(dbRef, `users/${uid}/group/`))
    .then((childNode) => {
      let group = childNode.val().roomID; 
      setGroupID(`${group}`)
      console.log(groupID)
    })
    if (cred) {
      setUserAuth(true);
      setRegForm(false); 
      let uid = cred.uid; 
      let dbRef = ref(db); 
      get(child(dbRef, `users/${uid}/group/`))
      .then((group) => {
        if (group.exists()) {
          setUserGroup(true); 
        } else if (!group.exists()) {
          setUserGroup(false); 
        }
      })
    }
    else {
      setUserAuth(false); 
      setRegForm(true); 
    }
  })
  auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/group/projects/`))
    .then((project_items) => {
      project_items.forEach((projectNode) => {
          return( <ProjectNode title={projectNode.val().title} desc={projectNode.val().desc}/>)
      })
    })
  })
  return (
    <div className='mt-5'>
      {
        useEffect(() => {
          auth.onAuthStateChanged((cred) => {
            let uid = cred.uid
            let dbRef = ref(db)
            get(child(dbRef, `users/${uid}/group/`))
            .then((childNode) => {
              if(childNode.exists()) {
                setUserGroup(false);
              }
            })
          })
        }, [])
      }
      {
        regForm  ? <Register/> : null
      }
      {
        loginForm ? <>
        <div className='regForm h-[100vh] w-[100%] bg-white fixed top-0 z-10 flex justify-center items-center'>
            <form className="h-[80%] w-[80%] bg-white drop-shadow-2xl flex flex-col items-center justify-center gap-5">
              <label>User Name:</label>
              <input className='regUserNameInput p-1 font-bold bg-gray-100' type='text'  required/>
              <label>Password: </label>
              <input className='regPassInput p-1 font-bold bg-gray-100' type='password' required/>
              <button className='submitReg p-1 bg-blue-500 rounded-sm drop-shadow-xl text-white'>Login</button>
              <a className='text-blue-500 italic text-[14px] cursor-pointer hover:font-bold' onClick={() => {setRegForm(true)}}>Don't Have An Account? Register Here!</a>
            </form>
          </div>
        </> : null
      }
      {
        userGroup ? <>
      <h1 className="heroTitle text-center text-[14px]">Quick Links</h1>
      <div className="projectsQuickCont">
          
      </div>
        
        </> : <JoinGroup/>
      }
    </div>
  )
}

export default Landing