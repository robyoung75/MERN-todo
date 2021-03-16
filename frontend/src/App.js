import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TodoList from "./Components/TodoList/TodoList";
import EditTodo from "./Components/EditTodo/EditTodo";
import CreateTodo from "./Components/CreateTodo/CreateTodo";
import logo from "../src/logo.svg";
function App() {

  
  return (
    <Router>
      <div className="App container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a
            className="navbar-brand"
            href="https://codingthesmartway.com"
            target="_blank"
          >
            <img
              src={logo}
              width="30"
              height="30"
              alt="CodingTheSmartWay.com"
            />
          </a>
          <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
        </nav>
        <br/>
        <h2>MERN-stack Todo App</h2>
        <Route path="/" component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
