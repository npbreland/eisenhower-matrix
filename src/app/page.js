'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useState, useEffect } from 'react';

import Square from './square';
import Task from './task'

const initTasks = [
  { id: 1, category: 'do', title: 'Do laundry' },
  { id: 2, category: 'schedule', title: 'Make dentist appointment' },
  { id: 3, category: 'delegate', title: 'Write emails to prospective clients' },
  { id: 4, category: 'delete', title: 'Meeting that could be an email' },
];

const keyMap = {
  1: 'do',
  2: 'schedule',
  3: 'delegate',
  4: 'delete',
};

export default function Home() {
  const [ tasks, setTasks ] = useState(initTasks);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ focusedSquare, setFocusedSquare ] = useState(1);

  const handleClickTask = id => {
    if (selectedTask === id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(id);
    }
  };

  const assignSelectedTask = category => {
    if (selectedTask) {
      const tasksCopy = [ ...tasks ];
      const task = tasksCopy.find(task => task.id === selectedTask);
      task.category = keyMap[category];
      setTasks(tasksCopy);
    }
  };

  useHotkeys(['1', '2', '3', '4'], e =>  assignSelectedTask(e.key));

  return (
    <div>
      <div className="header">
        <h1>Eisenhower To-Do</h1>
        <p>To-do list using <a href="https://asana.com/resources/eisenhower-matrix">Eisenhower Matrix</a></p>
      </div>
      <div className="row">
        <Square 
          name="Do"
          focused={focusedSquare == 1}
          assignKey={1}
          onClick={() => assignSelectedTask(1)}
        >
          {tasks.filter(task => task.category === 'do').map(task => (
            <Task 
              key={task.id}
              task={task}
              selected={selectedTask}
              onClick={() => handleClickTask(task.id)}
            />
          ))}
        </Square>
        <Square 
          name="Schedule"
          focused={focusedSquare == 2}
          assignKey={2}
          onClick={() => assignSelectedTask(2)}
        >
          {tasks.filter(task => task.category === 'schedule').map(task => (
            <Task
              key={task.id}
              task={task}
              selected={selectedTask}
              onClick={() => handleClickTask(task.id)} 
            />
          ))}
        </Square>
      </div>
      <div className="row">
        <Square 
          name="Delegate"
          focused={focusedSquare == 3}
          assignKey={3}
          onClick={() => assignSelectedTask(3)}
        >
          {tasks.filter(task => task.category === 'delegate').map(task => (
            <Task
              key={task.id}
              task={task}
              selected={selectedTask}
              onClick={() => handleClickTask(task.id)} 
            />
          ))}
        </Square>
        <Square
            name="Delete"
            focused={focusedSquare == 4}
            assignKey={4}
            onClick={() => assignSelectedTask(4)}
        >
          {tasks.filter(task => task.category === 'delete').map(task => (
            <Task 
              key={task.id}
              task={task}
              selected={selectedTask}
              onClick={() => handleClickTask(task.id)} 
            />
          ))}
        </Square>
      </div>
      <div className="footer">
        <p>Made by <a href="https://github.com/npbreland">@npbreland</a></p>
      </div>
    </div>
  )
}
