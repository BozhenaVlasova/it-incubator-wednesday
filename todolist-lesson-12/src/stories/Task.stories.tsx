import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {id: 'sdfg', title: 'JS', isDone: false},
        todolistId: '52058'
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


export const TaskDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskDoneStory.args = {
    task: {id: 'sdfg', title: 'JS', isDone: true},
}


const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: 'sdfghj', title: 'HTML', isDone: false})
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        setTask({id: 'sdfghj', title: 'HTML', isDone: !task.isDone})
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        setTask({id: 'sdfghj', title: newTitle, isDone: false})
    }
    return <Task
        task={task}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={args.removeTask}
        todolistId={'ertgiuyt'}
        />
}
export const TaskStory = Template1.bind({});