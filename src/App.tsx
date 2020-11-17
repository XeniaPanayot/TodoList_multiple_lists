import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';


export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>(`all`);
    let chosenTasks = tasks;
    if (filter === `active`) {
        chosenTasks = tasks.filter(t => !t.isDone);
    }
    if (filter === `completed`) {
        chosenTasks = tasks.filter(t => t.isDone)
    }
    function changeFilter (value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={chosenTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
