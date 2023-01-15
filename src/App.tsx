import { useReducer } from "react";

const App:React.FC = () => {

  // Use hook useReducer for manage state / initial state

  const colors = ['white', 'lightblue', 'yellow', 'lightgreen', 'pink', 'orange']

  const [ state, dispatch ] = useReducer((prev: any, next: any) => {
    return {...prev, ...next}
  }, {value: '', array: []})

  // after click 'Add' task, update state ( added to array object with text, isDone and random color - background circle with first task letter )

  const updateState = () => {
    const randomColor = Math.floor(Math.random()* colors.length)
    if ( state.title ) {
      dispatch({array: [...state.array, {text: state.value, isDone: false, color: colors[randomColor]}]})
      dispatch({value: ''})
    } return
  }

  // after click 'Delete' task, filtered choiced task and remove from list , finally update state.

  const removeFromState = (index: any) => {
    const newEventArray = [...state.array]
    const filteredEventArray = newEventArray.filter((item: any) => item.text !== state.array[index].text)
    dispatch({array: filteredEventArray})
  }

  // after click on task text, toggle choiced task as done / active ( line-through )

  const toggleStateIsDone = (index: any) => {
    const stateArrayIsDone = state.array[index].isDone
    dispatch(state.array[index].isDone = !stateArrayIsDone)
  }

  return(
    <div>
      <h2>Todo List</h2>
      <h3>with useReducer hook</h3>
      <div className='input-wrapper'>
        <input value={state.title} onChange={(e: any) => dispatch({title: e.target.value})}/>
        <button onClick={updateState}>Add</button>
      </div>
        <div className='tasks-wrapper'>
          {state.array.length ? 
            state.array.map((item: any, index: any) => 
              <div 
                  key={index}  
                  className='task'
                  onClick={() => toggleStateIsDone(index)} 
              >
                <div className='task-circle' style={{backgroundColor: `${item.color}`}}><div className='task-circle-letter'>{item.text.charAt(0).toUpperCase()}</div></div>
                <p style={item.isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{item.text}</p>
                <button 
                  onClick={() => removeFromState(index)}>Delete</button>
              </div>
            ) : 
            <div>No tasks...</div>
          }  
        </div>
    </div>
  )
}

export default App;