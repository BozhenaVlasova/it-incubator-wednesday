import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "./constans";

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string,
    todolistId: string
}

export type changeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}

export type changeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

export type ActionsType = RemoveTodolistAT | AddTodolistAT | changeTodoListTitleAT | changeTodoListFilterAT

const initialState: Array<TodolistType> = []

export const todolistsReducer = (todolists = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}


export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: REMOVE_TODOLIST, id})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: ADD_TODOLIST, title, todolistId: v1()})
export const changeTodoListTitleAC = (title: string, id: string): changeTodoListTitleAT => ({type: CHANGE_TODOLIST_TITLE, title, id})
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): changeTodoListFilterAT => ({type: CHANGE_TODOLIST_FILTER, filter, id})