
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../styles/cusStyle.css'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async()=>{
    try{
      const res = await axios({
        method:'POST',
        url:"https://todos-24y5.onrender.com/register",
        data:{
          email:email,
          password:password
        }
      })
      const message = res.data
      navigate('/login')
    } catch(e){
      console.log("Error is: ", e)
    }
  }


  return (
    <div className='background'>
      <div className='authentication'>
        <div className='heading'>Register</div>
        <div className='username'>
          <div className='title'>Email</div>
          <div className='input-box'>
            <input placeholder={"username"} value={email}
            onChange={e=>setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className='password'>
        <div className='title'>Password</div>
          <div className='input-box'>
            <input type='password' placeholder={"******"} value={password}
            onChange={e=>setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <button className='btn btn-primary' style={{marginTop:"20px"}} onClick={handleRegister}>Register</button>
      </div>
    </div>
  )
}


