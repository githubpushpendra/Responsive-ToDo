import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import CustomLoader from './CustomLoader.js'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)

  const handleLogin = async()=>{

    setLoader(true)

    // const backend_home_url = 'https://todos-24y5.onrender.com'
    const backend_home_url = 'http://localhost:5000'
    try{
      const res = await axios.post(`${backend_home_url}/signin`, {email:email, password:password},{
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
    setLoader(false)
  }
  

  return (
    <div className='background'>
      <div className='authentication'>
        <div className='display-6 mb-4 text-black'>Login</div>
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
        {error && <p style={{ color: 'darkred', margin: '0' }}>{error}</p>} 
        { loader ? <CustomLoader /> :
          <button className='btn btn-primary' style={{marginTop:"20px"}} onClick={handleLogin}>Login</button>
        }
      </div>
    </div>
  )
}
