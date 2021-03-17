// mongodb password dbRyoung_helloGing75er

const express = require("express");
const todoRoutes = express.Router();
const app = express();
// const bodyParser = require('body-parser');
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const connection_url = `mongodb+srv://admin:dbRyoung_helloGing75er@todo.zyzrx.mongodb.net/mern_todo_db?retryWrites=true&w=majority`;

const Todo = require("./models/todo.model");

app.use(cors());
app.use(express.json());

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection etablished successfully");
});

app.get("/", (req, res) => {
  // res.status(200).send("Hello Baby")
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
      res.status(400).send("No todos found")
    } else {
      res.status(200).json(todos);
    }
  });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
      res.status(400).send("No document seems to exist with that ID");
    } else {
      res.json(todo);
    }
  });
});

app.post("/add", (req, res) => {
  let todo = new Todo(req.body);
  console.log(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("adding new todo failed");
    });
});

app.post("/update/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      console.log(err)
      res.status(404).send("No document exists");
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo
        .save()
        .then((todo) => {
          res.status(200).json(todo);
        })
        .catch((err) => {
          console.log(err)
          res.status(400).send("Update not possible");
        });
    }
  });
});
app.use("/todos", todoRoutes);
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
