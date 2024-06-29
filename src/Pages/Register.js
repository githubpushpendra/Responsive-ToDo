
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
  const [error, setError] = useState('null')
  const backend_home_url = 'https://todos-24y5.onrender.com'
  // const backend_home_url = 'http://localhost:5000'
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
      console.log("I am message: ", message)
      if(res.status === 200){
        navigate('/login')
      } else {
        // console.log("I am error: ", res.data)
        setError(res.data)
        setTimeout(()=>setError(null), 3000)
      }
    } catch(e){
      // console.log("Error is: ", e.response.data)
      setError(e.response.data)
      setTimeout(()=>setError(null), 3000)
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
        <p style={{ color: 'darkred', margin: '0' }}>KRsna@123 (Len should be at least 8)</p>
        {error && <p style={{ color: 'darkred', margin: '0' }}>{error}</p>} 

        {
          loader ? <CustomLoader /> :
          <button className='btn btn-primary' style={{marginTop:"20px"}} onClick={handleRegister}>Register</button>
        }
        
      </div>
    </div>
  )
}


