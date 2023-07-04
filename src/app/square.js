export default function Square({ 
  name,
  assignKey, 
  focused, 
  assignTaskToSquare, 
  children, 
  canBeTargeted
}) {
  return (
    <div className={ focused ? `square focused ${name}` : `square ${name}` }>
      <div className="square-content">
        <div className="square-header">
          <h2>{name}</h2>
          <div className="square-key">{assignKey}</div>
        </div>
        <div className="square-taskzone">
          {children}
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
