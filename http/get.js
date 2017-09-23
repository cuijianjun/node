//引入模块
var http = require('http');
var urls = require('url');
var util = require('util');

//创建服务

http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end(util.inspect(urls.parse(req.url,true)));
}).listen(3000);