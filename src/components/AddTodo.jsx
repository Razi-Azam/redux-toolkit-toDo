import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addTodo } from '../feature/toDo/toDoSlice'

function AddTodo() {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')


    //dispatch make changes in the store with the help of reducers
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()

        //validate the input field
        if(!input.trim()) {
            setError("Todo cannot be empty!")
            return
        }

        dispatch(addTodo(input))
        //reset the input field
        setError('')
        setInput('')
    }

    //clear the input field
    const handleClear = () => {
        setInput('')
    }

  return (
    <form onSubmit={addTodoHandler} className='space-x-3 t-12'>
        <input
            type="text"
            className="bg-slate-700 rounded border-2 border-gray-800 
            focus:border-slate-700 focus:ring-2 focus:ring-slate-600
             outline-none text-white py-1 px-3 leading-8
            transition-colors duration-200 ease-in-out md:w-9/12 sm:w-3/5 xs:w-full xs:my-4"
            placeholder="Enter a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        {error && (<span className="absolute left-52 top-44 bg-red-200 px-2 text-red-800 text-lg">{error}</span>)}
        <button
            type="submit"
            className="text-white bg-slate-800 border-2
            shadow-lg border-slate-900 py-2 px-4
            focus:outline-none hover:bg-slate-700 
            rounded text-lg hover:text-slate-300"
        >
            Add Todo
        </button>
        <button
            type="button"
            onClick={handleClear}
            className="text-white bg-slate-800 border-2
            shadow-lg border-slate-900 py-2 px-4
            focus:outline-none hover:bg-slate-700 
            rounded text-lg hover:text-slate-300"
        >
            Clear
        </button>
    </form>
  )
}

export default AddTodo