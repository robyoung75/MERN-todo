import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { useHistory, useParams } from "react-router-dom";

function EditTodo() {
  const [desc, setDesc] = useState("");
  const [responsible, setResponsible] = useState("");
  const [priority, setPriority] = useState("");
  const [completed, setCompleted] = useState(false);
  const [todos, setTodos] = useState("");
  const [params, setParams] = useState("");

  const paramsId = useParams();
  const id = paramsId.id;

  const history = useHistory();

  //   console.log("id >>>> ", id);

  const fetchData = async () => {
    try {
      const response = await instance.get("/" + id);
      if (response) {
        //   console.log(response);
        setTodos(response.data);
        setDesc(response.data.todo_description);
        setResponsible(response.data.todo_responsible);
        setPriority(response.data.todo_priority);
        setCompleted(response.data.todo_completed);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSetCompleted = (e) => {
    e.preventDefault();
    setCompleted(completed === false ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit button");

    const updatedTodo = {
      todo_description: desc,
      todo_responsible: responsible,
      todo_priority: priority,
      todo_completed: completed,
    };

    console.log("newTodo >>> ", updatedTodo);
    await instance.post("/update/" + id, updatedTodo);

    setDesc("");
    setResponsible("");
    setPriority("");
    setCompleted(false);
    setParams("");

    history.push("/");
  };

  useEffect(() => {
    setParams(id);
    let mounted = true;
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="EditTodo">
      <h3>Update Todo</h3>
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
              type="radio"
              className="form-check-input"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={priority === "Low"}
              onChange={handleSetPriority}
            />
            <label htmlFor="" className="form-check-label">
              Low
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={priority === "Medium"}
              onChange={handleSetPriority}
            />
            <label htmlFor="" className="form-check-label">
              Medium
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={priority === "High"}
              onChange={handleSetPriority}
            />
            <label htmlFor="" className="form-check-label">
              High
            </label>
          </div>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completedCheckbox"
            name="completedCheckbox"
            value={completed}
            onChange={handleSetCompleted}
            checked={completed}
          />
          <label htmlFor="completedCheckbox" className="form-check-label">
            Completed
          </label>
        </div>
        <br />
        <div className="form-group">
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
