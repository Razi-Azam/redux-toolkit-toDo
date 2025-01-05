import React, {useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, updateTodo } from '../feature/toDo/toDoSlice'


function Todo() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [editId, setEditId] = useState(null)
    const [updatedInput, setUpdatedInput] = useState('')
    //create a ref to create a reference to the input field
    const inputRef = useRef(null)
    //error message
    const [error, setError] = useState('')

    //edit todo
    const handleEdit = (todo) => {
        setEditId(todo.id)
        setUpdatedInput(todo.text)
        setTimeout(() => {
            if(inputRef.current) {
                //focus the input field
                inputRef.current.focus()
            }
        }, 0) //delay is for ensureing the input is mounted before focusing
    }

    //update the todo
    const handleUpdate = () => {
        
        //validate empty field
        if(!updatedInput.trim()) {
            setError("Todo cannot be empty!")
            return
        }

        dispatch(updateTodo({id: editId, text: updatedInput}))
        setError('')
        setEditId(null)
        setUpdatedInput('')
    }

    //cancel edit todo
    const handleCancelEdit = () => {
        setError('')
        setEditId(null)
        setUpdatedInput(updatedInput)
    }

  return (
    <>
    <div><h2 className="mt-2 text-xl font-bold">--- Todos --</h2></div>
    <ul className="list-none">
        {todos.map((todo) => (
            <li key={todo.id}
                className="mt-4 flex justify-between
                items-center bg-zinc-800 px-4 py-2 rounded
                lg:flex-row sm:flex-col xs:flex-col"
            >
                {editId === todo.id ? (
                    <input
                        type="text"
                        className="bg-zinc-800
                        px-4 py-2 rounded max w-4/6
                         text-white lg:mb-0"
                        value={updatedInput}
                        onChange={(e) => setUpdatedInput(e.target.value)}
                        ref={inputRef} //pass the inputRef prop to the ref attribute of the input field
                    />
                    
                ) : (
                    <div className="text-white">{todo.text}</div>
                )
                }
                {error && (<span className="absolute left-56 top-44 bg-red-200 px-2 my-1 text-red-800 text-lg">{error}</span>)}
                <div className='flex lg-mt-0 lg:mt-0 md:mt-4 xs:mt-4'>
                    {editId === todo.id ? (
                        <div>
                            <button
                                className="text-white bg-orange-600
                                border-0 py-1 px-4 focus:outline-none 
                                hover:bg-orange-800 rounded text-md mr-2"
                                onClick={(e) => handleCancelEdit()}
                            >Cancel Edit</button>
                            <button
                                className="text-white bg-blue-600
                                border-0 py-1 px-4 focus:outline-none 
                                hover:bg-blue-800 rounded text-md mr-2"
                                onClick={handleUpdate}
                            >update</button>
                        </div>
                    ) : (
                        <button
                            className="text-white bg-green-600
                            border-0 py-1 px-4 focus:outline-none 
                            hover:bg-green-800 rounded text-md mr-2"
                            onClick={() => handleEdit(todo)}
                        >Edit</button>
                    )
                    }

                    {/*why do we use callback here to call the method? because if we call method directly then it will execute instantly. We use callback because it will call the method only when the button is clicked */}
                    <button
                        onClick={() => dispatch(removeTodo(todo.id))} //we pass only reference of the method like onClick={dispatch}, but we can call the method using callback like this () => dispatch()
                        className="text-white bg-red-400
                        border-0 py-1 px-4 focus:outline-none 
                        hover:bg-red-700 rounded text-md"
                    >X</button>
                </div>
            </li>
        ))}
    </ul>
    </>
  )
}

export default Todo