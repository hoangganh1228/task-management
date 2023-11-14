const Task = require("../models/task.model");

const paginationHelper = require("../../../helpers/pagination");

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


// Pagination
  const countTasks = await Task.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2,
    },
    req.query,
    countTasks
  );
// End Pagination
 

  // Sort
  const sort = {};

  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems)
  .skip(objectPagination.skip);

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