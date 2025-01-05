import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}

//a slice in aa redux toolkit is similar to en enhanced version of a reducer
export const toDoSlice = createSlice({
    name: 'todo',
    initialState, //we can also insert it as - initialState: [{id: 1, text: "Hello world"}]
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), //create a unique id
                text: action.payload   //or action.payload.text
            }
            state.todos.push(todo) //insert the new todo in todos list
        }, //addTodo property
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            //find the todo which needs to be updated
            const todo = state.todos.find((todo) => todo.id === action.payload.id)
            //update the todo
            if(todo)
                todo.text = action.payload.text
        }
    }
})

//export all the funtionalities individually from todoSLice
export const {addTodo, removeTodo, updateTodo} = toDoSlice.actions

//exort all the reducers
export default toDoSlice.reducer

