import React, { useEffect, useState } from "react";
import './TodoList.css'
import { Link } from "react-router-dom";
import instance from "../../axios";


function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await instance.get();
      if (response) {
        //   console.log(response);
        setTodos(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Todo">
      
      <h3>Todos List</h3>
      <table className="table table-striped" style={{marginTop: 20}}>
          <thead>
              <tr>
                  <th>Description</th>
                  <th>Responsible</th>
                  <th>Priority</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
             {todos !== [] ? todos.map(todo => {
                 return (
                     <tr key={todo._id}>
                         <td className={todo.todo_completed ? 'completed' : ""}>{todo.todo_description}</td>
                         <td>{todo.todo_responsible}</td>
                         <td>{todo.todo_priority}</td>
                         <td><Link to={`/edit/${todo._id}`}>Edit</Link></td>
                     </tr>
                 )
             }) : null }
          </tbody>
      </table>
    </div>
  );
}

export default TodoList;
