import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    ActionsType, AddTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolistId_1: string = v1();
    const todolistId_2: string = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask = (taskId: string, todolistId: string) => {
        let action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }
    const addTask = (title: string, todolistId: string) => {
        let action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        let action = changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) => {
        let action = changeTodoListFilterAC(filter, todolistId)
        dispatch(action)
    }
    const changeTodoListTitle = (title: string, todolistId: string) => {
        let action = changeTodoListTitleAC(title, todolistId)
        dispatch(action)
    }
    const removeTodolist = (todolistId: string) => {
        let action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }

    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todolistsItems = todolists.map(tl => {
        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <Grid item>
                <Paper
                    elevation={4}
                    sx={{p: '10px'}}
                >
                    <TodoList
                        key={tl.id}
                        todolistId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={filteredTasksForRender}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTodoListFilter={changeTodoListFilter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    sx={{p: '10px 0px'}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid
                    container
                    spacing={3}
                >
                    {todolistsItems}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
