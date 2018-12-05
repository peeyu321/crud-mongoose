const p = require('phin').unpromisified;
const { exec } = require('child_process');
const base_url = require("./configs.js").rts_source;

let requestAndSave = (urli, cb)=>{
	const start = Date.now()
	p(filter_url(urli), (err, res)=>{
		const end = Date.now()
		
		let temp = base_url+uuid()
		p({url: temp, method: "PUT", data: {id:urli._id, exectime: (end-start)}}, ()=>{
				cb()
		})
	})
}

let curler =(id, cb)=>{
	let args = `-X GET "http://localhost:5984/rts/_design/excel/_view/foo?descending=true&limit=100" -G -d reduce=false --data-urlencode key='"${id}"'`
   exec('curl ' + args, function (error, stdout, stderr) {
		let x = JSON.parse(stdout) 
		cb(x.rows)
	});
}

let filter_url = (info)=>{
	return {
		method: info.method,
		data: info.data || {},
		headers: info.headers || {},
		url: info.url
	}
} 

let uuid =()=>{
	let ms = +new Date()
	let ns = process.hrtime()[1]
	return ms.toString()+ns.toString() 
}


let percentile =(arr, p)=>{
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];

    var index = arr.length * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
}

module.exports = {percentile, curler, requestAndSave}
