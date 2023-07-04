import Task from './task'
import Image from 'next/image'
import { useHotkeys } from 'react-hotkeys-hook';


export default function Square({ 
  name,
  description,
  assignKey, 
  assignTaskToSquare, 
  handleClickTask,
  setSelectedTask,
  tasks, 
  selectedTask,
  deleteTask,
}) {

  const canBeTargeted = tasks.length < 10 && selectedTask !== null;

  const KeyImage = ({ size, className }) => {
      return <Image
        src={`/icons8-${assignKey}-key-50.png`} 
        className={className}
        width={size}
        height={size}
        alt={`${assignKey} key`} 
      />;
  };

  const getCurrentTaskIndex = () => {
    return tasks.findIndex(task => task.id === selectedTask);
  };

  useHotkeys('up', e => {
    if (selectedTask === null) {
      return;
    }
    const currentTaskIndex = getCurrentTaskIndex();
    if (currentTaskIndex === -1) {
      return;
    }
    e.preventDefault();
    if (currentTaskIndex > 0) {
      setSelectedTask(tasks[currentTaskIndex - 1].id);
    } else {
      setSelectedTask(tasks[tasks.length - 1].id);
    }   
  });

  useHotkeys('down', e => {
    if (selectedTask === null) {
      return;
    }
    const currentTaskIndex = getCurrentTaskIndex();
    if (currentTaskIndex === -1) {
      return;
    }
    e.preventDefault();
    if (currentTaskIndex < tasks.length - 1) {
      setSelectedTask(tasks[currentTaskIndex + 1].id);
    } else {
      setSelectedTask(tasks[0].id);
    }   
  });

  return (
    <div className={`square ${name}`}>
      <div className="square-content">
        <div className="square-header">
            <h2 style={{display: "inline-block"}}>{name}</h2>
          <div style={{display: selectedTask ? 'block' : 'none'}}>
            <KeyImage size={40} />
          </div>
        </div>
        <div className="square-taskzone">
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              selected={selectedTask}
              deleteTask={deleteTask}
              onClick={() => handleClickTask(task.id)} 
            />
          ))}
        </div>
        <div 
          className="square-dropzone"
          onClick={assignTaskToSquare}
          style={{ display: canBeTargeted ? 'flex': 'none'}}>
          <div>
          Press {<KeyImage className="key-image-inline" size={30} />} or click here to assign task to square
          </div>
        </div>
        <div className="square-footer">
            {description}
        </div>
      </div>
    </div>
  )
}
