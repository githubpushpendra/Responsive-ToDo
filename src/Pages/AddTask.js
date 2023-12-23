import {React, useEffect, useState} from 'react'
import { BiTrash } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import makeRequest from '../service/makeRequest';
import Cookies from 'js-cookie';


export default function AddTask() {

  const Navigate = useNavigate()

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  // const [taskStatus, setTaskStatus] = useState([]);
  const [createTaskDependency, setCreateTaskDependency] = useState(false)
  const [logout, setLogout] = useState(false)
  const api = "https://todos-24y5.onrender.com/tasks"

  const fetchTasks = ()=>{
    makeRequest(api, 'GET', null, async(err, reqObj)=>{
      if(err) {
        setError(err)
        setTimeout(()=> setError(null), 3000)
      } else {
        try {
          const res = await axios(reqObj)
          console.log(res)
          if(res.status === 200) {
            if(Array.isArray(res.data)) {
              setTasks(res.data)
              console.log(tasks)
            }
            
          } else {
            setError("Unable to fetch your todos")
            setTimeout(()=>setError(null), 3000)
          }
        } catch(e){
          console.log("Error in fetching tasks: ", e)
        }
      }
    })
  }

  useEffect(()=>{
    const cookie = Cookies.get('Authorization')
    console.log("Cookie is: ", cookie)
    if(cookie === undefined || cookie === null) setLogout(true)
    else setLogout(false)
    fetchTasks()
  }, [logout])


  function handleChange(event){
    setName(event.target.value);
  }

  function isValid(name){
    if(name.length > 2 && !/^\d+$/.test(name)) {
      return true;
    }
    return false;
  }

  const createTask = ()=>{
    if(isValid(name)){
      console.log("task name is: ", name)
      makeRequest(api, 'POST', {name:name, done:false}, async(err, reqObj)=>{
        if(err) {
          setError(err)
          setTimeout(()=> setError(null), 3000)
        } else {
          try {
            const res = await axios(reqObj)
            if(res.status !== 201) {
              setError("Please try again")
              setTimeout(()=>setError(null), 3000)
            }
            else fetchTasks()
          } catch(e) {
            console.log(e)
          }
        }
      })
    }
    else {
      setError("Please Enter Valid Todo Name");
      setTimeout(()=>setError(null), 3000)
    }
  }

  function handleSubmit(event){
    event.preventDefault();  
    setName('')
    createTask()
  }

  const handleDelete = (index)=>{
    makeRequest(api, 'DELETE', {name: tasks[index].name}, async(err, reqObj)=>{
      try{
        const res = await axios(reqObj)
        if(res.status !== 204) {
          setError("Please try again")
          setTimeout(()=>setError(null), 3000)
        }
        else fetchTasks()
      } catch(e) {
        console.log("Could not delete task: ", e)
      }
    })
   
  }

  function handleToggle(index){
    makeRequest(api, 'PUT', {name: tasks[index].name, done: !tasks[index].done}, async(err, reqObj)=>{
      try {
        const res = await axios(reqObj)
        if(res.status !== 200) {
          setError("Please try again")
          setTimeout(()=>setError(null), 3000)
        }
        else fetchTasks()
      } catch(e){
        console.log("Could not update data", e)
      }
    })
  }

  const handleLogout = () =>{
    Cookies.remove('Authorization')
    setTasks([])
    setLogout((prev)=> !prev)
  }

  return (
    <div className='background'>

      { logout===false ? (
        <button  className='btn btn-primary auth-btn-log' onClick={handleLogout}>Logout</button>
        ): (
        <div className='btns'>
          <button className='btn btn-primary auth-btn-log' onClick={()=>Navigate('/login')}>Login</button>
          <button className='btn btn-primary auth-btn-reg' onClick={()=>Navigate('/register')}>Register</button>
        </div>)
      }
      

      <div className='todos'>
        <h1>TODOs</h1>
        <form onSubmit={handleSubmit}  className="task-form">
          <div className='searchBox'>
            <div className='searchBInside'>
              <label>
                <input type="text" value={name} name="task" placeholder='Enter Your Task' onChange={handleChange} />
              </label>
            </div>
          </div>
          <div className='button'>
            <div className='childBtn'>
              <input type="submit" value="+" className='btn btn-primary btn-sm main-btn' />
            </div>
          </div>
          <i className="bi bi-plus"></i>
        </form>  
        {error && <p style={{ color: 'darkred', margin: '0' }}>{error}</p>}   
        <div>
        
        <ul className="task-list">
          {tasks ? tasks.map((task, index) => (
            <li key={index} type="none" className="task-item">
              <span className="toggle-icon" onClick={() => handleToggle(index)}>
                {task.done ? '☑' : '☐'}
              </span>
              <span className='task-text'>{task.name}</span>
              <BiTrash className="delete-icon" onClick={() => handleDelete(index)} />
            </li>
          )) : <h1>task is empty</h1>}
        </ul>
      </div>

      </div>
      
    </div>
  )
}

