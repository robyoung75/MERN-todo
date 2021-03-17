import React, { useState } from "react";
import instance from "../../axios";


function CreateTodo() {
  const [desc, setDesc] = useState("");
  const [responsible, setResponsible] = useState("");
  const [priority, setPriority] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSetDesc = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  const handleSetResponsible = (e) => {
    e.preventDefault();
    setResponsible(e.target.value);
  };

  const handleSetPriority = (e) => {
    e.preventDefault();
    setPriority(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    console.log("submit button");

    const newTodo = {
      todo_description: desc,
      todo_responsible: responsible,
      todo_priority: priority,
      todo_completed: completed,
    };

    console.log("newTodo >>> ", newTodo);

    await instance.post("/add", newTodo);

    setDesc("");
    setResponsible("");
    setPriority("");
    setCompleted(false);
  };

  return (
    <div className="CreateTodo" style={{ marginTop: 10 }}>
      <h3>Create New Todo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Description: </label>
          <input
            type="text"
            className="form-control"
            value={desc}
            onChange={handleSetDesc}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Responsible: </label>
          <input
            type="text"
            className="form-control"
            value={responsible}
            onChange={handleSetResponsible}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={priority === "Low"}
              onChange={handleSetPriority}
            />
            <label htmlFor="priorityLow" className="form-check-label">
              Low
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={priority === "Medium"}
              onChange={handleSetPriority}
            />
            <label htmlFor="priorityMedium" className="form-check-label">
              Medium
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={priority === "High"}
              onChange={handleSetPriority}
            />
            <label htmlFor="priorityHigh" className="form-check-label">
              High
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Todo"
            className="btn btn-primary"
            onSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
