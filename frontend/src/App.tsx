import './App.css'
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [createdTask, setCreatedTask] = useState<any>(null);


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const task = { title, description, status, due_date: dueDate };

    try {
      const response = await fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const data = await response.json();
      setCreatedTask(data);

      // Reset form
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');

    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };


  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
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
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
      {createdTask && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          textAlign: 'left',
          color: '#333'
        }}>
          <h3 style={{ marginTop: 0 }}>Successfully created task!</h3>
          <p><strong>Title:</strong> {createdTask.title}</p>
          <p><strong>Description:</strong> {createdTask.description}</p>
          <p><strong>Status:</strong> {createdTask.status}</p>
          <p><strong>Due Date:</strong> {createdTask.due_date}</p>
        </div>
      )}
    </div>
  );
}

export default App;
