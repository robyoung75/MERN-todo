import React, { useEffect, useState } from "react";
import instance from "../../axios";
import Todo from "../Todo/Todo";

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
  }, [todos]);

  return (
    <div className="Todo">
      <h1>Todo</h1>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos
            ? todos.map((todo) => {
                return (
                  <Todo
                    key={todo._id}
                    description={todo.todo_description}
                    responsible={todo.todo_responsible}
                    priority={todo.todo_priority}
                    completed={todo.todo_completed}
                    id={todo._id}
                  
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
