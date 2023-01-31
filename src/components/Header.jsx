import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Landing from './Landing'
import Messages from './Messages'
import Projects from './Projects'
import Tasks from './Tasks'
import Group from './Group'
import {motion} from 'framer-motion'


const Header = () => {
  
  return (
    <motion.div className='mt-5'>
      <Router>
      <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: 'tween', duration: .9, ease: "easeInOut"}} className='headerCont flex gap-2 justify-center text-gray-600 '>
        <NavLink  className="transition-all delay-50" style={({isActive}) => ({color: isActive ? 'black' : "rgb(75, 85, 95)", fontWeight: isActive ? "600" : "400", borderBottom: isActive ? "rgb(59, 130, 246) solid" : "none" })} exact="true" to="/" element={<Landing/>}>Home</NavLink>
        <NavLink  className="transition-all delay-50" style={({isActive}) => ({color: isActive ? 'black' : "rgb(75, 85, 95)", fontWeight: isActive ? "600" : "400", borderBottom: isActive ? "rgb(59, 130, 246) solid" : "none" })} exact="true" to="/Messages" element={<Messages/>}>Messages</NavLink>
        <NavLink  className="transition-all delay-50" style={({isActive}) => ({color: isActive ? 'black' : "rgb(75, 85, 95)", fontWeight: isActive ? "600" : "400", borderBottom: isActive ? "rgb(59, 130, 246) solid" : "none" })} exact="true" to="/Projects" element={<Projects/>}>Projects</NavLink>
        <NavLink  className="transition-all delay-50" style={({isActive}) => ({color: isActive ? 'black' : "rgb(75, 85, 95)", fontWeight: isActive ? "600" : "400", borderBottom: isActive ? "rgb(59, 130, 246) solid" : "none" })} exact="true" to="/Tasks" element={<Tasks/>}>Tasks</NavLink>
        <NavLink  className="transition-all delay-50" style={({isActive}) => ({color: isActive ? 'black' : "rgb(75, 85, 95)", fontWeight: isActive ? "600" : "400", borderBottom: isActive ? "rgb(59, 130, 246) solid" : "none" })} exact="true" to="/Group" element={<Group/>}>Group</NavLink>
      </motion.div>
        <Routes>
          <Route index element={<Landing/>}/>
          <Route path='Messages' element={<Messages/>}/>
          <Route path='Projects' element={<Projects/>}/>
          <Route path='Tasks' element={<Tasks/>}/>
          <Route path='Group' element={<Group/>}/>
        </Routes>
      </Router>
        
    </motion.div>
  )
}



export default Header