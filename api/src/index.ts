import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Todo } from "./models/todo";
import { getRepository } from "typeorm";

type ITodo = {
  id?: any
  name: string;
  completed: boolean;
};

const app = express();
const helmet = require("helmet");
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
app.use( helmet() );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.get("/todos", async (req, res) => {
  try{
  const items = await Todo.find({
    order: {
      sort: "ASC",
    },
  });
  res.send({ items });
  res.status(200)
}
catch (err) {
  console.log(err);
   }
  }
);

app.get("/todos/:id", async (request, reply) => {
  const { id } = request.params;
  const Todos = getRepository(Todo);
  const book = await Todos.findOne(id);
  return reply.send({ book });
});


app.post("/addTask", async (request, reply) => {
  const Todos = getRepository(Todo);
  const task = new Todo();
  task.name = request.body.name;
  task.sort = request.body.sort;
  task.id = request.body.id;
  task.completed = request.body.completed;
  const data = await Todos.save(task);
  return reply.send({ data });
});

app.put("/todos/:id", async (request, reply) => {
  const { id} = request.params;
  console.log('updated', id)
  const Todos = getRepository(Todo);
  // await Todos.update({ id as any}, { ...request.body });
  const book = await Todos.findOne(id);
  return reply.send({ book });
});

app.delete("/todos/:id", async (request, reply) => {
  const { id } = request.params;
  const Todos = getRepository(Todo);
  const todoToDelete = await Todos.findOne(id);
  // await Todos.remove(todoToDelete);
  return reply.send({ todo: todoToDelete });
});



createConnection({
  type: "sqlite",
  database: `${__dirname}/../todo.db`,
  logging: true,
  entities: [Todo],
  namingStrategy: new SnakeNamingStrategy(),
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
