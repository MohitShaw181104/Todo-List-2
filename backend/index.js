const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/todo.jsx')
const { error } = require('console')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

  app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
    })

app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ 
        task: task 
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running')
})