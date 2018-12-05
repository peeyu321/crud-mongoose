const async = require('async');
const helper = require('./helper');

process.on('message', async(urls)=>{
	async.map(urls,helper.requestAndSave, (err, data)=>{
		if (err){
			console.log(err)
		}
		process.send(urls.length)	
	})
})

/*
requestAndSave({url: "http://example.com/", method: "GET"}, (err, res)=>{
})
*/
