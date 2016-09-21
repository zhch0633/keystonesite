/**
 * Created by 淡斋 on 03/02/16.
 * use this api to get category from the server 
 */

var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var q = keystone.list('PostCategory').model.find();

	q.exec(function(err, results) {
		if (err) {
			res.send({error: 'Not found'});
		} else {
			var jsonRaw = [];
			//generate blogs list needed contents
			for (var i = 0; i < results.length; i++) {
				jsonRaw.push(results[i]);
			}

			res.header("Access-Control-Allow-Origin", "*");//access control allow origin 
			res.send(JSON.stringify(jsonRaw));
		}
	});

};
