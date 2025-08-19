import React, { useState } from 'react';
import axios from 'axios';


function link() {
  const[task, setTask] = useState<string>("")
  const handleAdd = () => {
    axios.post('http://localhost:3001/add', { task: task })
    .then(result => {
      location.reload();
    })
    .catch(err => console.error(err));
  };


  return (
    <div className='connect_form'>
      <input type="text" placeholder='Enter Task' onChange={(e)=> setTask(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Add Task</button>
    </div>
  )
}

export default link
