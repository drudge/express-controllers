
// GET     /pages   ->  index
exports.index = function(req, res){
  res.send('index');
};

// GET     /pages/new   ->  new
exports.new = function(req, res){
  res.send('new');
};

// POST    /pages   ->  create
exports.create = function(req, res){
  res.send('create');
};

// GET     /pages/:page   ->  show
exports.show = function(req, res){
  res.send('show ' + req.params.page);
};

// GET     /pages/:page/edit  ->  edit
exports.edit = function(req, res){
  res.send('edit ' + req.params.page);
};

// PUT     /pages/:page   ->  update
exports.update = function(req, res){
  res.send('update ' + req.params.page);
};

// DELETE  /pages/:page   ->  destroy
exports.destroy = function(req, res){
  res.send('destroy ' + req.params.page);
};
