import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    type TodolistType = {
        id: string
        title: string
        filter: FilterValuesType
    }
    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistID1,
            title: "What to learn",
            filter: "active"
        },
        {
            id: todolistID2,
            title: "What to read",
            filter: "all"
        }
    ])


let [tasks, setTasks] = useState({
    [todolistID1]:[
        { id: v1(), title: "React and Redux", isDone: true },
        { id: v1(), title: "Typescript", isDone: true },
        { id: v1(), title: "Chinese", isDone: false }
    ],
    [todolistID2]:[
        { id: v1(), title: "Das Kapital", isDone: true },
        { id: v1(), title: "JS for kids", isDone: true },
        { id: v1(), title: "Clean code", isDone: false }
    ]
})

    function removeTask(id: string, todolistID: string) {
    let todolistTasks = tasks[todolistID];
        tasks[todolistID] = todolistTasks.filter( t => t.id !== id );
        setTasks({ ...tasks })
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistID];
        tasks[todolistID] = [task, ...todolistTasks];
        setTasks({ ...tasks})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    let todolistTasks = tasks[todolistID];
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({ ...tasks});
    }



    function changeFilter(value: FilterValuesType, todolistID: string) {
       let theTodolist = todolists.find( tl => tl.id === todolistID);
       if (theTodolist) {
           theTodolist.filter = value;
           setTodolists([... todolists])
       }

    }


    return (
        <div className="App">
            {
                todolists.map( tl => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter( t => t.isDone === false)
                    } else if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter( t => t.isDone === true)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
