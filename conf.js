
module.exports = function(ENV){
  var dev = {
    db: {
      name: "devmarket"
    }
  }
  var test = {
    db: {
      name: "testmarket"
    }
  }
  var pro = {
    db: {
      name: "market"
    }
  }
  switch(ENV){
    case 'dev':
        return dev
    case 'pro':
        return pro
    case "test":
      return test
    default:
        return dev
  }
}
