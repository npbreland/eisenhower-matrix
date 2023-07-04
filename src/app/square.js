export default function Square({ name, assignKey, focused, onClick, children }) {
  return (
    <div className={ focused ? 'square focused' : 'square' } onClick={onClick}>
      <div className="square-header">
        <h2>{name}</h2>
        <div className="square-key">{assignKey}</div>
      </div>
      {children}
    </div>
  )
}
