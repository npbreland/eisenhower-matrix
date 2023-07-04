import Task from './task'

export default function Square({ 
  name,
  assignKey, 
  focused, 
  assignTaskToSquare, 
  handleClickTask,
  tasks, 
  selectedTask,
}) {

  const canBeTargeted = tasks.length < 10 && selectedTask !== null;

  return (
    <div className={ focused ? `square focused ${name}` : `square ${name}` }>
      <div className="square-content">
        <div className="square-header">
          <h2>{name}</h2>
          <div className="square-key">{assignKey}</div>
        </div>
        <div className="square-taskzone">
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              selected={selectedTask}
              onClick={() => handleClickTask(task.id)} 
            />
          ))}
        </div>
        <div 
          className="square-dropzone"
          onClick={assignTaskToSquare}
          style={{ display: canBeTargeted ? 'flex': 'none'}}>
          Press {assignKey} or click here to assign task to square
        </div>
      </div>
    </div>
  )
}
