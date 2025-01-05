import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "../feature/toDo/toDoSlice";

export const store = configureStore({
    reducer: toDoReducer
})