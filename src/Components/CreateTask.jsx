import { useState } from "react";
import  toast  from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({tasks,setTasks})=>{

    const[task,setTask]=useState({
        id:"",
        name:"",
        status:"todo"  // can also be In Progress or Completed
    })
    

    const handleSubmit = (e)=>{
        e.preventDefault();
 
        if (task.name.length < 3)
        return toast.error("A task must have more than 3 characters..")
        if (task.name.length >45)
        return toast.error("A task must not have more than 45 characters..")
        //  if (!task.name == NaN)
        // return  toast.error("Sorry.. A task cannot be a number")

        // if (typeof task.name === Number) {
        //     toast.error('Sorry... A task cannot be a number');
        //   }
          
        

        setTasks((prev)=>{
            const list = [...prev, task]
            localStorage.setItem("tasks",JSON.stringify(list))
            
            return list;
        })

        toast.success("Task created successfully..")
        setTask({
            id:"",
            name:"",
            status:"todo"
        })
    };

    

    return(
    <form onSubmit={handleSubmit}>
        <input className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 px-2 h-12 w-64" type="text"
        value={task.name}
        onChange={(e)=>setTask({...task, id:uuidv4(),name:e.target.value})}
        />
       <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
    </form>)
}


export default CreateTask;