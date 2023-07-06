import Modal from 'react-modal';

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

export function CreateTaskModal({ isOpen, onRequestClose, createTask }) {

  const handleSubmit = e => {
    e.preventDefault();
    const title = e.target.title.value;
    createTask(title);
    onRequestClose();
  };

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyles}
        contentLabel="Create Task"
      >
        <form onSubmit={e => handleSubmit(e)}>
          <h2>Add Task</h2>
          <input type="text" name="title" className="task-form-input" maxLength="50" />
          <button className="task-form-button" type="submit">Create</button>
        </form>
      </Modal>
  );
  
}

export function CompleteTaskModal({ isOpen, onRequestClose, completeTask, task }) {

  const handleSubmit = e => {
    e.preventDefault();
    const note = e.target.note.value;
    completeTask(task.id, note);
    onRequestClose();
  };

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyles}
        contentLabel="Complete Task"
      >
        <form onSubmit={e => handleSubmit(e)}>
          <h2>Complete Task:</h2>
          <p>{task.title}</p>
          <input type="text" name="note" className="task-form-input" placeholder="Optional note" maxLength="50" />
          <button className="task-form-button" type="submit">Complete</button>
        </form>
      </Modal>
  );
}
