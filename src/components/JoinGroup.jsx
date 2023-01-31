import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { auth, db } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { child, get, ref, set } from 'firebase/database';


const JoinGroup = () => {
    let [joinMenu, setJoinMenu] = useState(false); 
    let [createMenu, setCreateMenu] = useState(false); 


  return (
    <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: 'tween', duration: .9, ease: "easeInOut"}} className='flex flex-col items-center'>
        <h1 className='text-center text-[14px] mt-5'>You Have Not Joined A Group. <br></br> Join One Now!</h1>
        <button className='JoinGroupBtn p-1 bg-blue-500 text-white font-bold rounded-sm drop-shadow-lg' onClick={() => { setJoinMenu(true); setCreateMenu(false)}}>Join Group</button>
        {
            joinMenu ? <>
                <form className='bg-gray-200 fixed h-[12vh] w-[100%] drop-shadow-lg flex flex-col justify-center items-center'>
                    <label>Group ID:</label>
                    <input className='joinRoomID p-1' type='text' placeholder='Room1235' required/>
                    <button className='submitRoom p-1 bg-blue-500 text-white font-bold rounded-sm drop-shadow-lg' onClick={(e) => {
                        e.preventDefault(); 

                        let joinRoomID = document.querySelector('.joinRoomID'); 
                        let roomID = joinRoomID.value; 
                        auth.onAuthStateChanged((cred) => {
                            let dbRef = ref(db); 
                            let uid = cred.uid; 
                            get(child(dbRef, `users/${uid}/`))
                            .then((userNode) => {
                                let email = userNode.val().email; 
                                let name = userNode.val().name; 
                                set(ref(db, `users/${uid}/group/`), {
                                    roomID: roomID
                                }), 
                                set(ref(db, `groups/${roomID}/users/${uid}/`), {
                                    uid: uid, 
                                    email: email, 
                                    name: name
                                })
                                .then(() => {
                                    setJoinMenu(false); 
                                }) 
                            })
                        })
                        
                    }}>Join Room</button>
                    <a className='CreateGroup text-blue-500 text-[14px] italic underline cursor-pointer' onClick={() => { setCreateMenu(true); setJoinMenu(false)}}>Create Room Instead</a>
                </form>
            </> : null
        }
        {
            createMenu ? <>
                <form className='bg-gray-200 fixed h-[19vh] w-[100%] drop-shadow-lg flex flex-col justify-center items-center'>
                    <label>Group Name:</label>
                    <input className='createRoomName p-1'/> 
                    <label>Room ID:</label>
                    <input className='createRoomID p-1'/>
                    <button className='createRoom p-1 bg-blue-500 text-white font-bold rounded-sm drop-shadow-lg'>Create Room</button>
                    <a className='joinGroup text-blue-500 text-[14px] italic underline cursor-pointer' onClick={() => { setCreateMenu(false); setJoinMenu(true);}}>Join Room Instead</a>
                </form>
            </> : null
        }
    </motion.div>
  )
}

export default JoinGroup