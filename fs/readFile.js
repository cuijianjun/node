var fs = require('fs');

fs.readFile("cont.txt",function(err,data){
	if(err){
		console.log(err)
	}else{
		console.log(data)
	}
})

fs.readFile("cont.txt","UTF-8",function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
})

// 异步读取

fs.readFile("./cont.txt", (err, data) => {
	if (err) {throw err};
	console.log("data", data.toString());
})

(async () => {
	const fs = require('fs');
	const {promisify} = require('util');
	const readFile = promisify(fs.readFile)
	const data = await readFile('./conf.js')
	console.log("data", data.toString());
})()