import { useReducer } from "react";

const App:React.FC = () => {

  // Use hook useReducer for manage state / initial state

  const colors = ['white', 'lightblue', 'yellow', 'lightgreen', 'pink', 'orange']

  const [ event, updateEvent ] = useReducer((prev: any, next: any) => {
    return {...prev, ...next}
  }, {title: '', array: []})

  // after click Add Task, update event state ( added to array object with text, isDone and random color - background circle with first task letter )

  const updateEventFnc = () => {
    const randomColor = Math.floor(Math.random()* colors.length)
    if ( event.title ) {
      updateEvent({array: [...event.array, {text: event.title, isDone: false, color: colors[randomColor]}]})
      updateEvent({title: ''})
    } return
  }

  // after click Delete Task, update event state ( filtered choiced task and remove from list , finally update event )

  const deleteFnc = (index: any) => {
    const newEventArray = [...event.array]
    const filteredEventArray = newEventArray.filter((item: any) => item.text !== event.array[index].text)
    updateEvent({array: filteredEventArray})
  }

  // after click on task text, toggle choiced task as done / active ( line-through )

  const isDoneFnc = (index: any) => {
    const filteredEventIsDone = event.array[index].isDone
    updateEvent(event.array[index].isDone = !filteredEventIsDone)
  }

  return(
    <div>
      <h2>Todo List</h2>
      <h3>with useReducer hook</h3>
      <div className='input-wrapper'>
        <input value={event.title} onChange={(e: any) => updateEvent({title: e.target.value})}/>
        <button onClick={updateEventFnc}>Add</button>
      </div>
        <div className='tasks-wrapper'>
          {event.array.length ? 
            event.array.map((item: any, index: any) => 
              <div 
                  key={index}  
                  className='task'
                  onClick={() => isDoneFnc(index)} 
              >
                <div className='task-circle' style={{backgroundColor: `${item.color}`}}><div className='task-circle-letter'>{item.text.charAt(0).toUpperCase()}</div></div>
                <p style={item.isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{item.text}</p>
                <button 
                  onClick={() => deleteFnc(index)}>Delete</button>
              </div>
            ) : 
            <div>No tasks...</div>
          }  
        </div>
      
    </div>
  )
}

export default App;