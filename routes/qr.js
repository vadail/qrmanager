
var qrmodel = require('../models/qr');  

/*
 * GET qrs listing.
 */ 
exports.list = function(req, res){
  return qrmodel.find(function (err, qrs) {
    if (!err) {
      return res.send(qrs);
    } else {
      return console.log(err);
    }
  });
};

exports.create = function(req, res){
  
  console.log("POST: ");
  //console.log(req);
  console.log(req.body);
  
  var qr = new qrmodel({
    folder: req.body.folder,
    url: req.body.url,
    targets: req.body.targets
  });

  qr.save(function(err) {
    if (!err) {
      console.log("created");
      qr.url="www.Çr.es/"+qr._id;
      qr.save();
      return res.send(qr);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
};

exports.remove = function(req, res){
  
  console.log("REmOVE: ");
  console.log(req.body);
  
  return qrmodel.findById(req.params.id, function (err, qr) {
    
    if(qr == null){
    	return res.send(404, 'Sorry, we cannot find that!');
    }

    return qr.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
        return res.send(err);
      }
    });
  });
};

exports.find = function(req, res){
  
  console.log("FIND: ");
  console.log(req.body);
  
  return qrmodel.findById(req.params.id, function (err, qr) {
    if (!err) {
      if(qr==null){
      	return res.send(404, 'Sorry, we cannot find that!');
      }else{
      	return res.send(qr);
      }
      
    } else {
      console.log(err);
      return res.send(404, 'Sorry, we cannot find that!');
    }
  });
};

exports.update = function(req, res){
  
  console.log("UPDATE: ");
  console.log(req.body);
  
  return qrmodel.findById(req.params.id, function (err, qr) {
    qr.folder = req.body.folder,
    qr.url = req.body.url,
    qr.targets = req.body.targets
    return qr.save(function (err) {
      if (!err) {
        console.log("updated");
        return res.send(qr);
      } else {
        console.log(err);
        return res.send(err);
      }      
    });
  });
};
