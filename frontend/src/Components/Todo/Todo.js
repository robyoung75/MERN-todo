import React from "react";
import { Link } from "react-router-dom";
import "./Todo.css";

function Todo({ description, priority, responsible, id, completed }) {
  return (
    <tr key={id}>
      <td className={completed ? "completed" : ""}>{description}</td>
      <td>{responsible}</td>
      <td>{priority}</td>
      <td>
        <Link to={`/edit/${id}`}>Edit</Link>
      </td>
    </tr>
  );
}

export default Todo;
