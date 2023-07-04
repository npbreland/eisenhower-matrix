import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Task({ task, onClick, selected, deleteTask }) {
  const handleDeleteClick = e => {
    e.stopPropagation();
    deleteTask(task.id);
  };
  return (
    <div 
      className={selected === task.id ? "task selected" : "task"}
      onClick={onClick}
    >
        <div>
        {task.title}
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={e => handleDeleteClick(e)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
    </div>
  )
}
