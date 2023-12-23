import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  
  const handleLogin = async()=>{

    try{
      const res = await axios.post("https://todos-24y5.onrender.com/signin", {email:email, password:password},{
      Headers:{
        'Content-Type': 'application/json',
      }
    })
      if(res.data.Authorization === undefined || res.data.Authorization === null) {
        setError(res.data)
        setTimeout(()=>setError(null), 3000)
      } else {
        Cookies.set('Authorization', res.data.Authorization, {expires:3})
        console.log(Cookies.get('Authorization'))
        navigate('/')
      }
      
    } catch(e){
      console.log("Error is: ", e)
    }

  }
  

  return (
    <div className='background'>
      <div className='authentication'>
        <div className='heading'>Login</div>
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
        {error && <p style={{ color: 'darkred', margin: '0' }}>{error}</p>} 
        <button className='btn btn-primary' style={{marginTop:"20px"}} onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}
