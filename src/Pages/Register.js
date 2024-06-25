
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CustomLoader from './CustomLoader'

import '../styles/cusStyle.css'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  // const backend_home_url = 'https://todos-24y5.onrender.com'
  const backend_home_url = 'http://localhost:5000'
  const handleRegister = async()=>{
    setLoader(true)
    try{
      const res = await axios({
        method:'POST',
        url:`${backend_home_url}/register`,
        data:{
          email:email,
          password:password
        }
      })
      const message = res.data
      if(res.status === 200)
      navigate('/login')
    } catch(e){
      console.log("Error is: ", e)
    }
    setLoader(false)
  }


  return (
    <div className='background'>
      <div className='authentication'>
        <div className='display-6 mb-4 text-black'>Register</div>
        <div className='username'>
          <div className='h4 text-black'>Email</div>
          <div className='input-box'>
            <input placeholder={"username"} value={email}
            onChange={e=>setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className='password'>
        <div className='h4 mt-2 text-black'>Password</div>
          <div className='input-box'>
            <input type='password' placeholder={"******"} value={password}
            onChange={e=>setPassword(e.target.value)}
            ></input>
          </div>
        </div>

        {
          loader ? <CustomLoader /> :
          <button className='btn btn-primary' style={{marginTop:"20px"}} onClick={handleRegister}>Register</button>
        }
        
      </div>
    </div>
  )
}


