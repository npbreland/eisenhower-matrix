export default function Task({ task, onClick, selected }) {
  return (
    <div 
      className={selected === task.id ? "task selected" : "task"}
      onClick={onClick}>
        {task.title}
    </div>
  )
}
