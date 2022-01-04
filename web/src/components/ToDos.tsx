import { accordionSummaryClasses, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import  Card  from '@mui/material/Card';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


type Todo = {
  id?: any
  name: any
  completed: boolean;
};

const ToDos = () =>{
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [task, setTask] = useState("")

    function handleChange(event:any) {
     setTask(event.target.value)
    }
    const onDeleteClick = ()=> {
      console.log('deleted')

    }
    const onSubmit = (event:any) => {
      event.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
         'Connection': 'keep-alive',
         'Keep-Alive': 'timeout=5',
         'Referrer-Policy': 'no-referrer',
         'X-Frame-Options': 'SAMEORIGIN'
        
        },
        body:{ 
          "sort": 8,
          "name": task,
          "completed": false, }
      }
      axios
        .post("addTask", requestOptions)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    const getTodos = async () => {
      return fetch("todos")
        .then((res) => res.json())
        .then((res) => res.items);
    };



      useEffect(() => {
        getTodos().then(setTodos);
      }, []);
    
return (
<Container>
       <Card sx={{ minWidth: 150 }} >
      <CardContent style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 70%, rgba(4,117,192,1) 86%, rgba(0,212,255,1) 100%)'}}>
        <Typography sx={{ fontSize: '1.5rem' }} color="white">
         To-Do
        </Typography>
      <ul style={{color:"white"}}>
        {todos.map((item: any) => (
          <div>
          <li  key={item.id}>{item.name} <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flexEnd'}}></div></li>
          </div>
        ))}
        
      </ul>
        <input value={task} onChange={handleChange} type="placeholder" placeholder="Add todo" />
        <input onClick={onSubmit} type="submit" value="Submit" />
      </CardContent>
      </Card>
    </Container>

)

}

export default ToDos