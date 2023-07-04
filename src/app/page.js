'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useState } from 'react';
import Modal from 'react-modal';

import Square from './square';

Modal.setAppElement('#page');

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

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Home() {

  const [ tasks, setTasks ] = useState(initTasks);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ addTaskModalIsOpen, setAddTaskModelIsOpen ] = useState(false);
  const [ completeTaskModalIsOpen, setCompleteTaskModelIsOpen ] = useState(false);

  const openAddTaskModal = () => {
    setAddTaskModelIsOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModelIsOpen(false);
  };

  const openCompleteTaskModal = () => {
    setCompleteTaskModelIsOpen(true);
  };

  const closeCompleteTaskModal = () => {
    setCompleteTaskModelIsOpen(false);
  };

  const addTask = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const newTask = { id: tasks.length + 1, category: 'delete', title };
    setTasks([ ...tasks, newTask ]);
    closeAddTaskModal();
  };

  const completeTask = e => {
    e.preventDefault();
    const note = e.target.note.value;

    // TODO: Send task with note to backend
    deleteTask(selectedTask);
    closeCompleteTaskModal();
  };

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

  const deleteTask = id => {
    setSelectedTask(null);
    setTasks(tasks.filter(task => task.id !== id));
  };

  useHotkeys(['1', '2', '3', '4'], e =>  assignSelectedTask(e.key));
  useHotkeys('esc', () => setSelectedTask(null));

  const doTasks = tasks.filter(task => task.category === 'do');
  const scheduleTasks = tasks.filter(task => task.category === 'schedule');
  const delegateTasks = tasks.filter(task => task.category === 'delegate');
  const deleteTasks = tasks.filter(task => task.category === 'delete');

  console.log(selectedTask);
  const selectedTaskTitle = selectedTask ? tasks.find(task => task.id === selectedTask).title : '';

  return (
    <div id="page">
      <Modal
        isOpen={addTaskModalIsOpen}
        onRequestClose={closeAddTaskModal}
        style={modalStyles}
        contentLabel="Add Task"
      >
        <form onSubmit={e => addTask(e)}>
          <h2>Add Task</h2>
          <input type="text" name="title" className="task-form-input" maxLength="50" />
          <button className="task-form-button" type="submit">Add</button>
        </form>
      </Modal>
      <Modal
        isOpen={completeTaskModalIsOpen}
        onRequestClose={closeCompleteTaskModal}
        style={modalStyles}
        contentLabel="Complete Task"
      >
        <form onSubmit={e => completeTask(e)}>
          <h2>Complete Task:</h2>
          <p>{selectedTaskTitle}</p>
          <input type="text" name="note" className="task-form-input" placeholder="Optional note" maxLength="50" />
          <button className="task-form-button" type="submit">Complete</button>
        </form>
      </Modal>
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
          setSelectedTask={setSelectedTask}
          openCompleteTaskModal={openCompleteTaskModal}
          selectedTask={selectedTask}
          deleteTask={deleteTask}
          assignTaskToSquare={() => assignSelectedTask(1)}
        />
        <Square 
          name="Schedule"
          description="Tasks with unclear deadlines that contribute to long-term success"
          assignKey={2}
          tasks={scheduleTasks}
          handleClickTask={handleClickTask}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          openCompleteTaskModal={openCompleteTaskModal}
          deleteTask={deleteTask}
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
          setSelectedTask={setSelectedTask}
          openCompleteTaskModal={openCompleteTaskModal}
          selectedTask={selectedTask}
          deleteTask={deleteTask}
          assignTaskToSquare={() => assignSelectedTask(3)}
        />
        <Square
            name="Delete"
            description="Distractions and unnecessary tasks"
            assignKey={4}
            tasks={deleteTasks}
            setSelectedTask={setSelectedTask}
            handleClickTask={handleClickTask}
            openCompleteTaskModal={openCompleteTaskModal}
            selectedTask={selectedTask}
            deleteTask={deleteTask}
            assignTaskToSquare={() => assignSelectedTask(4)}
        />
      </div>
      <button
        style={{ display: selectedTask ? 'none' : 'block' }}
        className="fab" 
        onClick={() => openAddTaskModal()}>
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
