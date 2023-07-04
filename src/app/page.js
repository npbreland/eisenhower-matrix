'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useState } from 'react';

import Square from './square';

const initTasks = [
  { id: 1, category: 'do', title: 'Do laundry' },
  { id: 2, category: 'schedule', title: 'Make dentist appointment' },
  { id: 3, category: 'delegate', title: 'Write emails to prospective clients' },
  { id: 4, category: 'delete', title: 'argue with neighbor' },
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
        <h1>Eisenhower Matrix</h1>
        <p>Task prioritization system used by <a href="https://en.wikipedia.org/wiki/Dwight_D._Eisenhower" target="_blank" rel="noreferrer">Ike</a></p>
      </div>
      <div className="row">
        <Square 
          name="Do"
          description="Tasks with deadlines and consequences"
          assignKey={1}
          tasks={doTasks}
          handleClickTask={handleClickTask}
          selectedTask={selectedTask}
          assignTaskToSquare={() => assignSelectedTask(1)}
        />
        <Square 
          name="Schedule"
          description="Tasks with unclear deadlines that contribute to long-term success"
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
          description="Tasks that must get done but don't require your specific skill set"
          assignKey={3}
          tasks={delegateTasks}
          handleClickTask={handleClickTask}
          selectedTask={selectedTask}
          assignTaskToSquare={() => assignSelectedTask(3)}
        />
        <Square
            name="Delete"
            description="Distractions and unnecessary tasks"
            assignKey={4}
            tasks={deleteTasks}
            handleClickTask={handleClickTask}
            selectedTask={selectedTask}
            assignTaskToSquare={() => assignSelectedTask(4)}
        />
      </div>
      <div className="footer">
        <p>Made by <a href="https://github.com/npbreland" target="_blank" rel="noreferrer">@npbreland</a></p>
        <p>Square descriptions text from <a href="https://asana.com/resources/eisenhower-matrix" rel="noreferrer" target="_blank">Asana</a></p>
      </div>
    </div>
  )
}
