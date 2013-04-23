/*
 * GET home page.
 */

exports.createqr = function(req, res){
  res.render('createqr', { title: 'QR Manager' });
};

exports.getqrs = function(req, res){
  res.render('getqrs', { title: 'QR Manager' });
};