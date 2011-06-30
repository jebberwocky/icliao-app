/**
 * The app classes
 * @author jeff liu, jebberwocky@gmail.com
 */

com.icliao.EVENTS.app={
	
}

com.icliao.feedGrabber = function(){
	model = new com.icliao.feedModel(),
	fetcher = new com.icliao.feedFetcher(),
	parser = new com.icliao.feedParser(),
	worker = new com.icliao.worker(),
	this.delay = 5000,
	this.init = function(callback){
		model.addSetFeedsListener({"fire":function(arg){
			if(callback)
				callback(model);
		}});
		parser.addOnSuccessListener({"fire":function(arg){
			model.setFeeds(arg);
		}});
		fetcher.addOnSuccessListener( {"fire":function(arg){
			parser.parse(arg);
		}});
	},
	this.process  = function(url){
		worker.addTickListener({"fire": function(arg){
			task(url);
		}});
		worker.addStopListener({"fire": function(arg){
			console.log("work end:"+arg.name);
		}});
		worker.addStartListener({"fire": function(arg){
			console.log("work start:"+arg.name);
		}});
		worker.delay = this.delay;
		worker.start();
	},
	task = function(url){
		if(url !== ""){
			fetcher.fetch(url);
		}
	},
	this.giveup = function(){
		worker.stop();
	}
}

com.icliao.feedGrabber.prototype = new com.icliao.abstractEventObj;