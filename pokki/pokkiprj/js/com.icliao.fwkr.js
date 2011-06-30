/**
 * The fake worker classes
 * @author jeff liu, jebberwocky@gmail.com
 */

com.icliao.EVENTS.worker={
	"WORKER_TICK":"com.icliao.worker.tick",
	"WORKER_STOP":"com.icliao.worker.stop",
	"WORKER_START":"com.icliao.worker.start"
}

com.icliao.worker = function(){
	intervalId = "",
	this.name ="",
	this.delay=1000,
	this.debug_counter = 0,
	this.isStop = false,
	this.start = function(){
		var o = this;
		isStop = false;
		intervalId = setInterval(
			function() { 
				o.tick();
				o.debug_counter++;
			}
		,this.delay);
		this.fireStartEvent(this);
	},
	this.stop = function(){
		var o = this;
		isStop = true;
		clearInterval(intervalId);
		this.fireStopEvent(this);
	},
	this.tick = function(){
		this.fireTickEvent(this);
	},
	this.reset = function(){
		this.debug_counter = 0;
		this.stop();
		this.start();
	},
	this.addTickListener = function(el){
		this.addEventListener(com.icliao.EVENTS.worker.WORKER_TICK, el);
	},
	this.addStopListener = function(el){
		this.addEventListener(com.icliao.EVENTS.worker.WORKER_STOP, el);
	},
	this.addStartListener = function(el){
		this.addEventListener(com.icliao.EVENTS.worker.WORKER_START, el);
	}
	this.fireTickEvent = function(arg){
		this.fireEvent(com.icliao.EVENTS.worker.WORKER_TICK,arg)
	},
	this.fireStopEvent = function(arg){
		this.fireEvent(com.icliao.EVENTS.worker.WORKER_STOP,arg)
	},
	this.fireStartEvent = function(arg){
		this.fireEvent(com.icliao.EVENTS.worker.WORKER_START,arg)
	}
}

com.icliao.worker.prototype = new com.icliao.abstractEventObj;