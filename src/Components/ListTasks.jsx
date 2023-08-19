import { useEffect, useState } from "react";

const ListTasks = ({tasks, setTasks}) =>{

    const [todos,settodos] = useState([]);
    const [inprogress, setInprogress] = useState([]);
    const [completed,setCompleted]= useState([]);

    useEffect(()=>{
        const filterTodos = tasks.filter(task=>task.status==="todo")
        const filterInprogress = tasks.filter(task=>task.status==="inprogress")
        const filterCompleted = tasks.filter(task=>task.status==="completed")

        settodos(filterTodos)
        setInprogress(filterInprogress)
        setCompleted(filterCompleted)
    },[tasks]);

    const statuses = ["todos", "inprogress","completed"];

    return(
        <div className="flex gap-16"> 
            {
                statuses.map((status,index)=>{
                  return  <Section key={index} status={status} tasks={tasks} setTasks={setTasks} 
                  todos={todos}
                  inprogress={inprogress}
                  completed={completed}
                  />    
                })
            }
        </div>
    )
}

export default ListTasks;

// const Section = ({status,tasks,setTasks,todos,inprogress,completed})=>{
//     let text= "todo"
//     let bg="bg-slate-500"
//     let tasksToMap = "todos"

//     if(status === "inprogress"){
//         text="In Progress"
//         bg = "bg-purple-500"
//         tasksToMap= "inprogress"
//     }
//     if(status =="completed"){
//         text="Completed"
//         bg = "bg-green-500";
//     }

//     return (
//         <div className="w-64">
//            <Header text={text} bg={bg} count={tasksToMap.length} /> 
//            {
//           tasksToMap.length > 0 &&
//             tasksToMap.map((task,index) => {
//               return (
//                 <Task key={index} task={task} tasks={tasks} setTasks={setTasks} />
//               );
//             })
//           }
//         </div>
//       );
// };
const Header = ({text,bg,count})=>{
    return(
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text} <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">{count}</div>
        </div>
    )
}

