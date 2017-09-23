function computed(){
	console.log('I am is computed')
}
function somethingComplitd(args){
	console.log("i am is somethingComplisted method")
	console.log(args)
}
function doSomething(arge,callback){
	somethingComplisted(args)
	callback()
}
function doSomething(args,callback){
	somethingComplisted(args)
	process.nextTick(callback)
}
doSomething('marico',function onEnd(){
	compute();
})