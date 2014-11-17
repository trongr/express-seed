module.exports = (function(){
  var u = {}

  u.send = function(res, er, re){
    // console.log(JSON.stringify({er:er, re:re}, 0, 2)) // TODO. remove
    if (er) return res.status(404).send(er)
    res.send(re)
  }

  return u
}());
