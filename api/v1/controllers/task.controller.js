const Task = require("../models/task.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };


  //Bo loc
  if(req.query.status) {
    find.status = req.query.status;
  }
  
  
  //Het bo loc


  // Sort
  const sort = {};

  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const tasks = await Task.find(find).sort(sort)

  //End Sort

  res.json(tasks);
}

  

  


module.exports.detail = async (req, res) => {
    const id = req.params.id;
  
    const task = await Task.findOne({
      _id: id,
      deleted: false
    });
  
    res.json(task);
  }