import './App.css'
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');


  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Create Task</h2>
      <form onSubmit={()=> console.log('submit')}>
        <div>
          <label>Title:</label><br />
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Status:</label><br />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label><br />
          <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        </div>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default App;
