/**
 * Created by 淡斋 on 21/03/16.
 * a json api for get a specific json object 
 */
var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var q = keystone.list('Post').model.find().where('_id', req.query.id).sort('-publishedDate').populate('author').limit('1').populate('categories');

	q.exec(function(err, results) {
		if(err){
			res.send({ error: 'Not found' });
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
