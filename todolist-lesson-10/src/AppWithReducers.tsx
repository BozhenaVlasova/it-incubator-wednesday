import React, {useReducer} from 'react';
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


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithReducers() {
    const todolistId_1: string = v1();
    const todolistId_2: string = v1();

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Orange", isDone: false},
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        let action = removeTaskAC(taskId, todolistId)
        dispatchTasks(action)
    }
    const addTask = (title: string, todolistId: string) => {
        let action = addTaskAC(title, todolistId)
        dispatchTasks(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchTasks(action)
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        let action = changeTaskTitleAC(taskId, title, todolistId)
        dispatchTasks(action)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) => {
        let action = changeTodoListFilterAC(filter, todolistId)
        dispatchTodolists(action)
    }
    const changeTodoListTitle = (title: string, todolistId: string) => {
        let action = changeTodoListTitleAC(title, todolistId)
        dispatchTodolists(action)
    }
    const removeTodolist = (todolistId: string) => {
        let action = RemoveTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const addTodolist = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
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

export default AppWithReducers;
