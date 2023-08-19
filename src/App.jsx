import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import toast, { Toaster } from 'react-hot-toast';

// const item = {
//   id: v4(),
//   name: "Clean the house"
// }

// const item2 = {
//   id: v4(),
//   name: "Wash the car"
// }

function App() {
  const [text, setText] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "TODO",
      name:"",
      items: []
    },
    "in-progress": {
      title: "IN-PROGRESS",
      name:"",
      items: []
    },
    // "in review":{
    //   title:"In Review",
    //   items:[]
    // },
    "done": {
      title: "COMPLETED",
      name:"",
      items: []
    }
    
  })
    // if(text.name.length < 3){
    //   toast.error("A task must have more than 3 characters")
    // }

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }
    
    if(destination.index < source.index){
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      

      return prev
    })
  }

  const addItem = () => {
    
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",  
        
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      } 
    })
   
    

    setText("")
  }

  return (
    <>
    <Toaster/>
    <div className="App">
             <div className= 'bg-blue-200 underline heading'> Task Management System with React DnD</div>
              
       <div className='input'>
        <input placeholder='Enter your todos here...'  className='block text-gray-700 text-sm font-bold mt-5 p-2 mb-2 rounded' type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        
        <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={addItem}>ADD</button> 
        
      </div> 

    <div className='main'> 
       <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3 className='font-bold mb-3'>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext> 
      </div>
    </div>
    </>
  );
}

export default App;