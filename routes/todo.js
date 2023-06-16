const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/post", async (req, res) => {
  const todo = new Todo({
    thing: req.body.thing,
    isDone: req.body.isDone,
  });
  try {
    const newTodo = await todo.save();
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", getTodo, async (req, res) => {
  res.send(res.todo);
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id, "line 33");
    let id = req.params.id;
    const todo = await Todo.findByIdAndDelete();

    if (todo) {
      res.json({ message: "已經delete" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "remove todo faild" });
  }
});
router.patch("/:id", getTodo, async (req, res) => {
  console.log(req.params.id);
  if (req.body.thing != null) {
    res.todo.thing = req.body.thing;
  }
  if (req.body.isDone != null) {
    res.todo.isDone = req.body.isDone;
  }
  try {
    const options = { new: true };
    const result = await Todo.findByIdAndUpdate(req.params.id, res.todo, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 檢查是否有該代辦事項
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == undefined) {
      return res.send(res.status(404).json({ message: "Can't find todo" }));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.todo = todo;
  next();
}

module.exports = router;
