const express = require("express");
const router = express.Router();

const Todo = require("../model/todo");


// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    if (error.name === "CastError") {
      return res.status(404).json({
        message: "Invalid ID"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
});


// POST create todo
router.post("/", async (req, res) => {
  try {

    const todo = new Todo({
      title: req.body.title
    });

    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });
  }
});

//get todo by id
router.get("/:id", async(req,res)=>{
  try
  {
    const todo= await Todo.findById(req.params.id)
    if(!todo)
    {
      return res.status(404).json({
        message: "Todo not found"
      })
    }
    res.json(todo)
  }
  catch(error)
  {
    if(error.name == "CastError")
    {
        return res.status(400).json({
          message: "Invalid TD format"
        })
    }
    res.status(500).json(
      {
        message: error.message
      }
    )
  }
});

//update todo by id
router.put("/:id",async(req,res) =>{
  try{
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!updatedTodo)
    {
      return res.status(404).json(
        {message: "Todo not found"}
      )
    }
    res.json(updatedTodo)
  }
  catch(error)
  {
    if(error.name == "CastError")
    {
        return res.status(400).json({
          message: "Invalid TD format"
        })
    }
    res.status(500).json(
      {
        message: error.message
      }
    )
  }
})

//delete by id
router.delete("/:id", async (req, res) => {
  try {

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.json({
      message: "Todo deleted successfully"
    });

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;