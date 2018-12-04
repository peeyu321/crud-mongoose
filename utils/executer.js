const p = require('phin').unpromisified
const uuid = require('uuid/v4');
const async = require('async');
const base_url = require("./configs.js").rts_source;

process.on('message', async(urls)=>{
	async.map(urls, requestAndSave, (err, data)=>{
		if (err){
			console.log(err)
		}
		process.send(urls.length)	
	})
})

let requestAndSave = (urli, cb)=>{
	const start = Date.now()
	p(filter_url(urli), (err, res)=>{
		const end = Date.now()
		
		let temp = base_url+uuid()
		p({url: temp, method: "PUT", data: {id:urli._id, exectime: (end-start), timestamp: Date.now()}}, ()=>{
				cb()
		})
	})
}

let filter_url = (info) => {
	return {
		method: info.method,
		data: info.data || {},
		headers: info.headers || {},
		url: info.url
	}
} 

/*
requestAndSave({url: "http://example.com/", method: "GET"}, (err, res)=>{
})
*/
