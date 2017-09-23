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