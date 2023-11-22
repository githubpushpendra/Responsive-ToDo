import {React, useEffect, useState} from 'react'
import { BiTrash } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddTask() {

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [taskStatus, setTaskStatus] = useState([]);

  function handleChange(event){
    setName(event.target.value);
  }

  function isValid(name){
    if(name.length > 2 && !/^\d+$/.test(name)) {
      return true;
    }
    return false;
  }

  function handleSubmit(event){
    event.preventDefault();
    if(isValid(name)){
      setTasks([...tasks, name]);
      setTaskStatus([...taskStatus, {name:name, done:false}]);
    }
    else {
      setError("Please Enter Valid Todo Name");
      setTimeout(()=>{
        setError(null);
      }, 3000);
    }
  }

   useEffect(()=>{
  //   var Id = setInterval(()=>{
  //     if(name.length == 0) clearInterval(Id);
  //     else{
  //       const truncatedName = name.substring(0, name.length - 1);
  //       setName(truncatedName);
  //     }
  //   }, 500)
      setName('');
   }, [tasks])

  function handleDelete(index){
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  function handleToggle(index){
    console.log("Handle toggle");
    const updatedTaskStatus = [...taskStatus];
    updatedTaskStatus[index].done = !updatedTaskStatus[index].done;
    setTaskStatus(updatedTaskStatus);
  }

  return (

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
            <input type="submit" value="+" className='btn btn-primary btn-sm' />
          </div>
        </div>
        <i class="bi bi-plus"></i>
      </form>  
      {error && <p style={{ color: 'darkred', margin: '0' }}>{error}</p>}   
      <div>
      
      <ul className="task-list">
        {tasks ? tasks.map((task, index) => (
          <li key={index} type="none" className="task-item">
            <span className="toggle-icon" onClick={() => handleToggle(index)}>
              {taskStatus[index].done ? '☑' : '☐'}
            </span>
            <span className='task-text'>{task}</span>
            <BiTrash className="delete-icon" onClick={() => handleDelete(index)} />
          </li>
        )) : <h1>task is empty</h1>}
      </ul>
    </div>

    </div>
  )
}
