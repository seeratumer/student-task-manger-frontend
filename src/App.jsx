import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const API_URL = 'http://localhost:5000/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority })
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🚀 Modern Task Manager</h1>
        <p style={styles.subheading}>Organize your daily goals efficiently with MongoDB</p>

        <form onSubmit={addTask} style={styles.form}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            style={styles.input}
          />
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            style={styles.select}
          >
            <option value="High">High 🔴</option>
            <option value="Medium">Medium 🟡</option>
            <option value="Low">Low 🟢</option>
          </select>
          <button type="submit" style={styles.addButton}>Add Task</button>
        </form>

        <div style={styles.taskList}>
          {tasks.length === 0 ? (
            <p style={styles.emptyText}>No tasks found. Add a task above to get started!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={styles.taskItem}>
                <div>
                  <span style={styles.taskTitle}>{task.title}</span>
                  <span style={{
                    ...styles.badge, 
                 backgroundColor: task.priority === 'High' ? '#fee2e2' : task.priority === 'Medium' ? '#fef3c7' : '#d1fae5',
                    color: task.priority === 'High' ? '#991b1b' : task.priority === 'Medium' ? '#92400e' : '#065f46'
                  }}>
                    {task.priority || 'Medium'}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Professional Inline CSS Styles taake design 100% perfect aaye
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    border: '1px solid #e2e8f0'
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '8px'
  },
  subheading: {
    fontSize: '14px',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  input: {
    flex: '1',
    minWidth: '200px',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  addButton: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  taskTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#334155',
    marginRight: '10px',
    wordBreak: 'break-all'
  },
  badge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '6px',
    marginLeft: '8px'
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '30px',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1'
  }
};

export default App;