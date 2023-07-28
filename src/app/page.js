'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useState } from 'react';
import Modal from 'react-modal';

import { CreateTaskModal, CompleteTaskModal } from './modals';

import {
  useCreateEffect,
  useReadEffect,
  useUpdateEffect,
  useDeleteEffect
} from './hooks';
import { createTaskId } from './lib';

import Square from './square';

Modal.setAppElement('#page');

const keyMap = {
  1: 'do',
  2: 'schedule',
  3: 'delegate',
  4: 'delete',
};

export default function Home() {

  const [ tasks, setTasks ] = useState([]);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ createTaskModelIsOpen, setCreateTaskModelIsOpen ] = useState(false);
  const [ completeTaskModalIsOpen, setCompleteTaskModelIsOpen ] = useState(false);

  const [ tasksToAdd, setTasksToAdd] = useState([]);
  const [ tasksToUpdate, setTasksToUpdate ] = useState([]);
  const [ tasksToDelete, setTasksToDelete ] = useState([]);

  const openCompleteTaskModal = () => {
    setCompleteTaskModelIsOpen(true);
  };

  const getSelectedTask = () => {
    return tasks.find(task => task.id === selectedTask);
  };

  const createTask = title => {
    const newTask = {
      userId: 1,
      timeCreated: Date.now(),
      title,
      category: 'delete',
    };

    newTask.id = createTaskId(newTask.userId, newTask.timeCreated);
    setTasksToAdd([ ...tasksToAdd, newTask ]);
    setTasks([ ...tasks, newTask ]);
  };

  const changeCategory = (taskId, category) => {
    const tasksCopy = [ ...tasks ];
    const task = tasksCopy.find(task => task.id === taskId);
    task.category = category;
    setTasks(tasksCopy);

    task.updates = [
      { attribute: 'category', value: category }
    ];
    setTasksToUpdate([ ...tasksToUpdate, task ]);
  };

  const completeTask = (taskId, note) => {
    const tasksCopy = [ ...tasks ];
    const task = tasksCopy.find(task => task.id === taskId);

    task.updates = [
      { attribute: 'completed', value: true },
      { attribute: 'note', value: note }
    ];
    setSelectedTask(null);
    setTasks(tasks.filter(task => task.id !== taskId));
    setTasksToUpdate([ ...tasksToUpdate, task ]);
  };


  const deleteTask = taskId => {
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(null);
    setTasks(tasks.filter(task => task.id !== taskId));
    setTasksToDelete([ ...tasksToDelete, task ]);
  };


  const handleClickTask = id => {
    if (selectedTask === id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(id);
    }
  };

  /* Hotkeys */
  useHotkeys(['1', '2', '3', '4'], e => {
    if (selectedTask) {
      const category = keyMap[e.key];
      changeCategory(selectedTask, category);
    }
  });
  useHotkeys('esc', () => setSelectedTask(null));
  /* End Hotkeys */

  /* Custom Effect Hooks */
  useCreateEffect(tasksToAdd);
  useReadEffect(setTasks);
  useUpdateEffect(tasksToUpdate);
  useDeleteEffect(tasksToDelete);
  /* End Custom Effect Hooks */

  const doTasks = tasks.filter(task => task.category === 'do');
  const scheduleTasks = tasks.filter(task => task.category === 'schedule');
  const delegateTasks = tasks.filter(task => task.category === 'delegate');
  const deleteTasks = tasks.filter(task => task.category === 'delete');

  return (
    <div id="page">
      <CreateTaskModal
        isOpen={createTaskModelIsOpen} 
        onRequestClose={() => setCreateTaskModelIsOpen(false)}
        createTask={createTask}
      />
      {selectedTask && 
        <CompleteTaskModal 
          isOpen={completeTaskModalIsOpen}
          onRequestClose={() => setCompleteTaskModelIsOpen(false)}
          completeTask={completeTask}
          task={getSelectedTask()}
        />
      }
      <div className="header">
        <h1>Eisenhower Matrix</h1>
        <p>Task prioritization system used by <a href="https://en.wikipedia.org/wiki/Dwight_D._Eisenhower" target="_blank" rel="noreferrer">Ike</a></p>
      </div>
      <div className="row">
        <Square 
          category="do"
          assignKey={1}
          description="Tasks with deadlines and consequences"
          tasks={doTasks}
          handleClickTask={handleClickTask}
          setSelectedTask={setSelectedTask}
          openCompleteTaskModal={openCompleteTaskModal}
          selectedTask={selectedTask}
          deleteTask={deleteTask}
          changeCategory={changeCategory}
        />
        <Square 
          category="schedule"
          assignKey={2}
          description="Tasks with unclear deadlines that contribute to long-term success"
          tasks={scheduleTasks}
          handleClickTask={handleClickTask}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          openCompleteTaskModal={openCompleteTaskModal}
          deleteTask={deleteTask}
          changeCategory={changeCategory}
        />
      </div>
      <div className="row">
        <Square 
          category="delegate"
          assignKey={3}
          description="Tasks that must get done but don't require your specific skill set"
          tasks={delegateTasks}
          handleClickTask={handleClickTask}
          setSelectedTask={setSelectedTask}
          openCompleteTaskModal={openCompleteTaskModal}
          selectedTask={selectedTask}
          deleteTask={deleteTask}
          changeCategory={changeCategory}
        />
        <Square
            category="delete"
            assignKey={4}
            description="Distractions and unnecessary tasks"
            tasks={deleteTasks}
            setSelectedTask={setSelectedTask}
            handleClickTask={handleClickTask}
            openCompleteTaskModal={openCompleteTaskModal}
            selectedTask={selectedTask}
            deleteTask={deleteTask}
            changeCategory={changeCategory}
        />
      </div>
      <button
        className="fab" 
        onClick={() => setCreateTaskModelIsOpen(true)}>
        + Add Task
      </button>
      <div className="footer">
        <p>Made by <a href="https://github.com/npbreland" target="_blank" rel="noreferrer">@npbreland</a></p>
        <p>Square descriptions text from <a href="https://asana.com/resources/eisenhower-matrix" rel="noreferrer" target="_blank">Asana</a></p>
        <p><a target="_blank" href="https://icons8.com/icon/54526/1-key">Key</a> icons by <a target="_blank" href="https://icons8.com">Icons8</a></p>
      </div>
    </div>
  )
}
