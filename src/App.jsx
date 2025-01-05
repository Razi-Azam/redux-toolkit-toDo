import React from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'
import Header from './components/header'

function App() {

  return (
    <>
      <div 
        className='border border-slate-950
        rounded-lg shadow-2xl w-auto
      bg-slate-400 px-4 py-6 pb-12 h-auto min-h-[600px]'>
        <Header />
        <AddTodo />
        <Todo />
      </div>
    </>
  )
}

export default App
