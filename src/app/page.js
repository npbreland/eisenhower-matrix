'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useState } from 'react';

import Square from './square';
import Task from './task'

const initTasks = [
  { id: 1, category: 'do', title: 'Do laundry' },
  { id: 2, category: 'schedule', title: 'Make dentist appointment' },
  { id: 3, category: 'delegate', title: 'Write emails to prospective clients' },
  { id: 4, category: 'delete', title: 'Meeting that could be an email' },
  { id: 5, category: 'do', title: 'Buy groceries' },
  { id: 6, category: 'schedule', title: 'Schedule oil change' },
  { id: 7, category: 'delegate', title: 'Ask for help with project' },
  { id: 8, category: 'delete', title: 'Meeting that could be an email' },
  { id: 9, category: 'do', title: 'check smoke detector' },
  { id: 10, category: 'schedule', title: 'something' },
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
      const task = tasks.find(task => task.id === selectedTask);
      const updatedTask = { ...task, category: keyMap[category] };
      setTasks(tasks.map(task => task.id === selectedTask ? updatedTask : task));
    }
  };

  useHotkeys(['1', '2', '3', '4'], e =>  assignSelectedTask(e.key));
  useHotkeys('esc', () => setSelectedTask(null));

  const doTasks = tasks.filter(task => task.category === 'do');
  const scheduleTasks = tasks.filter(task => task.category === 'schedule');
  const delegateTasks = tasks.filter(task => task.category === 'delegate');
  const deleteTasks = tasks.filter(task => task.category === 'delete');

  return (
    <div>
      <div className="header">
        <h1>Eisenhower To-Do</h1>
        <p>To-do list using <a href="https://asana.com/resources/eisenhower-matrix">Eisenhower Matrix</a></p>
      </div>
      <div className="row">
        <Square 
          name="Do"
          assignKey={1}
          tasks={doTasks}
          handleClickTask={handleClickTask}
          selectedTask={selectedTask}
          assignTaskToSquare={() => assignSelectedTask(1)}
        />
        <Square 
          name="Schedule"
          assignKey={2}
          tasks={scheduleTasks}
          handleClickTask={handleClickTask}
          selectedTask={selectedTask}
          assignTaskToSquare={() => assignSelectedTask(2)}
        />
      </div>
      <div className="row">
        <Square 
          name="Delegate"
          assignKey={3}
          tasks={delegateTasks}
          handleClickTask={handleClickTask}
          selectedTask={selectedTask}
          assignTaskToSquare={() => assignSelectedTask(3)}
        />
        <Square
            name="Delete"
            assignKey={4}
            tasks={deleteTasks}
            handleClickTask={handleClickTask}
            selectedTask={selectedTask}
            assignTaskToSquare={() => assignSelectedTask(4)}
        />
      </div>
      <div className="footer">
        <p>Made by <a href="https://github.com/npbreland">@npbreland</a></p>
      </div>
    </div>
  )
}
