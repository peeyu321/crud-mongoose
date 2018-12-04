const { fork } = require('child_process');
const URLInfo = require('../models/urlinfo.model');
const p = require('phin').unpromisified

const rts_base_url = require("../utils/configs").rts_source;

exports.urlinfo_create = function (req, res, next) {
    let urlinfo = new URLInfo(
        {
            url: req.body.url,
            method: req.body.method,
				data: req.body.data,
				headers: req.body.headers
        }
    );

    urlinfo.save(function (err, urlinfo) {
        if (err) return next(err);
        
			let response = {
				success: true,
				_id: urlinfo._id
			}
        res.send(response)
    })
};

exports.urlinfo_get= function (req, res, next) {
    URLInfo.findById(req.params.id, function (err, urlinfo) {
 			if (err) return next(err);
				
				if (!urlinfo) {
				  res.send({success:false}) 
				} else{
					
						  //query 
					//p(url: rts_base_url)
					//RT.findById(req.params.id, function(err, rt){
					/*	if (err) return next(err);
						if (!rt){
							rt.rts = [];
						}*/
						let response = {
								 success: true,
								 url: urlinfo.url,
								 id: urlinfo._id,
								 method: urlinfo.method,
								 data: urlinfo.data || {},
								 headers: urlinfo.headers || {}
						}

					/*			 responses: rt.rts || [],
								 "50th_percentile": (rt.rts.length===0)? "" : percentile(rts.rts, 0.50),
								 "75th_percentile": (rt.rts.length===0)? "" : percentile(rts.rts, 0.75),
								 "95th_percentile": (rt.rts.length===0)? "" : percentile(rts.rts, 0.95),
								 "99th_percentile": (rt.rts.length===0)? "" : percentile(rts.rts, 0.99)*/
						res.send(response);
				 //})
			}
    })
};

exports.urlinfo_update = function (req, res, next) {
    URLInfo.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, urlinfo) {
          if (err) return next(err);
			let response = {
				success: true,
				_id: urlinfo._id
			}
         res.send(response);
    });
};

exports.urlinfo_delete = function (req, res, next) {
    URLInfo.findByIdAndRemove(req.params.id, {$set: req.body}, function (err, urlinfo) {
          if (err) return next(err);
			let response = {
				success: true
			}
         res.send(response);
    });
};

exports.ulrinfo_index = function (req, res, next) {
	URLInfo.find({}, function(err, urlinfos){
          if (err) return next(err);
			 res.send({urls: urlinfos})
	})
}

exports.urlinfo_monitor = function(){
	const process = fork('./utils/executer.js');	
	setInterval(function(){
		URLInfo.find({}, function(err, urlinfos){
			process.send(urlinfos)
		})
	}, 1000);
	
	process.on('message', (message) => {
     console.log(`[INFO] count=${message} date=${Date.now()}`);//counter here
   });	
}

//Simple version, without validation or sanitation
exports.test = function (req, res) {
   res.send('Greetings from the Test controller!');
};
