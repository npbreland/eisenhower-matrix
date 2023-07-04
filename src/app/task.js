import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Task({ 
  task, 
  setSelectedTask, 
  selected, 
  deleteTask,
  openCompleteTaskModal
}) {
  const handleDeleteClick = e => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleCompleteClick = e => {
    e.stopPropagation();
    setSelectedTask(task.id);
    openCompleteTaskModal();
  }
  return (
    <div 
      className={selected === task.id ? "task selected" : "task"}
      onClick={() => setSelectedTask(task.id)}
    >
        <div>
        {task.title}
        </div>
        <div>
          <button onClick={e => handleCompleteClick(e)}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={e => handleDeleteClick(e)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
    </div>
  )
}
