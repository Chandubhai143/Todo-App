import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId === null) {
      // Create
      const newTodo = { ...formData, id: Date.now() };
      setTodos([...todos, newTodo]);
    } else {
      // Update
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, ...formData } : todo
      );
      setTodos(updatedTodos);
      setEditId(null);
    }
    setFormData({ name: '', email: '', password: '' }); // Clear form
  };

  // Delete a todo
  const handleDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  // Edit a todo
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setFormData({ name: todoToEdit.name, email: todoToEdit.email, password: todoToEdit.password });
    setEditId(id);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1 className="text-center text-danger">Todo App</h1>
      <div className="container w-50 h-100 border-black bg-info-subtle rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}  // Toggle password visibility
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              onChange={togglePasswordVisibility}
            />
            <label className="form-check-label" htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit" className="btn btn-success">
            {editId === null ? 'Save' : 'Update'}
          </button>
        </form>
         </div>
      {/* Display Data in Table Outside the Form */}
      {todos.length > 0 && (
          <table className="table table-bordered text-center w-75 me-auto ms-auto mt-4">
            <thead className="table-secondary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.name}</td>
                  <td>{todo.email}</td>
                  <td>{todo.password}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="btn btn-info me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
    </>
  );
};

export default TodoApp;
