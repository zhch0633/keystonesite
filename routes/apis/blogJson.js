/**
 * Created by 淡斋 on 03/02/16.
 * use this api to get mock json from server 
 */

var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

	//this is the query 
	var q;
	
	if(req.query.category){
		q = keystone.list('Post').model.find().where('state', 'published').where('categories').in([req.query.category]).sort('-publishedDate').populate('author').populate('categories');
	} else {
		q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').populate('categories');
	}

	q.exec(function(err, results) {
		if (err) {
			res.send({error: 'Not found'});
		} else {
			var jsonRaw = [];
			//generate blogs list needed contents
			for (var i = 0; i < results.length; i++) {
				var item = {
					id: results[i]._id,
					title: results[i].title,
					publishedDate: results[i].publishedDate,
					brief: results[i].content.brief,
					categories:results[i].categories,
					image:results[i].image
				};
				jsonRaw.push(item);
			}

			res.header("Access-Control-Allow-Origin", "*");//access control allow origin 
			res.send(JSON.stringify(jsonRaw));
		}
	});
};
