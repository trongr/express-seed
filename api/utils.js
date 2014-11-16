module.exports = (function(){
  var u = {}

  u.send = function(res, er, re){
    if (er) return res.status(404).send(er)
    res.send(re)
  }

  return u
}());
