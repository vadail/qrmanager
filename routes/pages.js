
var http = require('http'),
qrmodel = require('../models/qr');  

exports.createqr = function(req, res){
	res.render('createqr', { title: 'QR Manager',id: '13Sdfcd4' });
};

exports.getqrs = function(req, res){
	res.render('getqrs', { title: 'QR Manager' });
};

exports.getqr = function(req, res){

	return qrmodel.findById(req.params.id, function (err, qr) {
		if (!err) {
			if(qr==null){
				return res.send(404, 'Sorry, we cannot find that!');
			}else{
				console.log("Petición lectura QR: " + req.connection.remoteAddress);

				var options = {
					host: 'localhost',
					port: 81,
					path: '/ip2country/?ip='+req.connection.remoteAddress
					//path: '/ip2country/?ip=79.147.18.208'
				};

				http.get(options, function(resIP2C) {
					resIP2C.on("data", function(country) {
						console.log("Country: "+country);
						useragent = req.headers["user-agent"];
						console.log(req.headers["user-agent"]);

						url="";
						platform="any";
						platform2="any";
						if(useragent.match(/Android/i)){
							platform="android";
						}else{
							if(useragent.match(/iPhone|iPad|iPod/i)){
								platform="iphone";
								platform2="ios";
							}else{
								if(useragent.match(/iPad/i)){
									platform="ipad";
								}else{
									if(useragent.match(/IEMobile/i)){
										platform="windowsphone";
									}else{
										if(useragent.match(/BlackBerry/i) || useragent.match(/BB10; Touch/)){
											platform="blackberry";
										}else{
											if(useragent.match(/Opera Mini/i)){
												platform="opera";
											}else{
												platform="any";
											}
										}	      			
									}
								}
							}
						}

						console.log("Plataforma:"+platform);

						for (var i = 0; i < qr.targets.length; i++) {

							if((qr.targets[i].platform==platform||qr.targets[i].platform=="any"||qr.targets[i].platform==platform2)&&(qr.targets[i].country==country||qr.targets[i].country=="any")){
								return res.redirect(qr.targets[i].url);
							}
						};

						return res.send(404, 'Sorry, we cannot find a target for your device and country!');
					});

				}).on('error', function(e) {
					console.log("Got error: " + e.message);
					return res.send(500, e.message);
				});
			}

		} else {
			console.log(err);
			return res.send(404, 'Sorry, we cannot find that!');
		}
	});
};