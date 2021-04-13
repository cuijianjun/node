var http = require('http');
const fs = require('fs')
const { fstat } = require('node:fs');
const { request } = require('node:http');
const { response } = require('express');

http.createServer(function(req,res){
	// console.log("this is a req", getPrototypeChain(req));
	// res.writeHead(200,{'Content-Type':'text/html'});
	// res.write('<h1>Node.js</h1>');
	// res.end('<p>PACT</p>');
	const {url, method} = request;
	if (url === "/" && method === "GET") {
		fs.readFile('index.txt', (err, data) => {
			if (err) {
				req.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
				req.end("500 服务器错误 哈哈")
				return
			}
			res.statusCode = 200
			res.setHeader('Content-Type', "text/html")
			res.end(data)
		})
	} else if (url === 'users' && method === 'GET') {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify({name: "TOM"}));
	} else {
		res.statusCode = 404
		res.setHeader('Content-Type','text/html');
		res.end('404 page')
	}
}).listen(3000);
console.log('HTTP server is listening at port 3000')

// 打印原型
function getPrototypeChain(obj) {
	const protoChain = []
	while(obj = Object.getPrototypeOf(obj)) {
		protoChain.push(obj)
	}
	return protoChain
}