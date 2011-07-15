/**
 * The app classes
 * @author jeff liu, jebberwocky@gmail.com
 */

com.icliao.EVENTS.app={
	
}

com.icliao.feedGrabber = function(){
	this.model = new com.icliao.feedModel(),
	this.fetcher = new com.icliao.feedFetcher(),
	this.parser = new com.icliao.feedParser(),
	this.worker = new com.icliao.worker(),
	this.delay = 5000,
	this.init = function(callback){
		var h = this;
		this.model.addSetFeedsListener({"fire":function(arg){
			if(callback)
				callback(h.model);
		}});
		this.parser.addOnSuccessListener({"fire":function(arg){
			h.model.setFeeds(arg);
		}});
		this.fetcher.addOnSuccessListener( {"fire":function(arg){
			console.log("parsing");
			h.parser.parse(arg);
		}});
	},
	this.process  = function(url){
		var h = this;
		this.worker.addTickListener({"fire": function(arg){
			h.task(url);
		}});
		this.worker.addStopListener({"fire": function(arg){
			console.log("work end:"+arg.name);
		}});
		this.worker.addStartListener({"fire": function(arg){
			console.log("work start:"+arg.name);
		}});
		this.worker.delay = this.delay;
		this.worker.start();
	},
	this.task = function(url){
		if(url !== ""){
			this.fetcher.fetch(url);
		}
	},
	this.giveup = function(){
		this.worker.stop();
	}
}

com.icliao.feedGrabber.prototype = new com.icliao.abstractEventObj;