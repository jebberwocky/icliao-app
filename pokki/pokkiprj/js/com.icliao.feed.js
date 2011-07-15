/**
 * The feed fetching, parsing & model classes
 * @author jeff liu, jebberwocky@gmail.com
 */
 
com.icliao.EVENTS.feed  = {
	"FETCH_SUCCESS":"com.icliao.fetcher.success",
	"FETCH_FAIL":"com.icliao.fetcher.fail",
	"PARSE_SUCCESS":"com.icliao.parser.success",
	"PARSE_FAIL":"com.icliao.parser.fail",
	"SET_FEEDS":"com.icliao.feedmodal.set"
}

com.icliao.feedFetcher = function(){
	this.addOnSuccessListener = function(el){
		this.addEventListener(com.icliao.EVENTS.feed.FETCH_SUCCESS, el);
	},
	this.addOnFailListener = function(el){
		this.addEventListener(com.icliao.EVENTS.feed.FETCH_FAIL, el);
	},
	this.fetchSuccess = function(arg){
		this.fireEvent(com.icliao.EVENTS.feed.FETCH_SUCCESS,arg);
	},
	this.fetchFail = function(arg){
		this.fireEvent(com.icliao.EVENTS.feed.FETCH_FAIL,arg);
	},
	this.fetch = function(url){
		var h = this;
		$.get(url,{},
			function(data){
				h.fetchSuccess(data);
			});
	}
}

com.icliao.feedParser = function(){
	this.addOnSuccessListener = function(el){
		this.addEventListener(com.icliao.EVENTS.feed.PARSE_SUCCESS, el);
	},
	this.addOnFailListener = function(el){
		this.addEventListener(com.icliao.EVENTS.feed.PARSE_FAIL, el);
	},
	this.parseSuccess = function(arg){
		this.fireEvent(com.icliao.EVENTS.feed.PARSE_SUCCESS,arg);
	},
	this.parseFail = function(arg){
		this.fireEvent(com.icliao.EVENTS.feed.PARSE_FAIL,arg);
	},
	this.parse = function(data){
		var r = [];
		var $xml = $( data );
		var item = $xml.find( "item" ).each(function(){
			var o = {};
			$(this).children().each(function(){
				o[this.tagName] = $(this).text();
			});
			r.push(o);
		});
		this.parseSuccess(r);
	}
}

com.icliao.feedModel = function(){
	this.feeds = {},
	this.getFeeds = function(){
		return this.feeds;
	},
	this.setFeeds = function(fds){
		this.feeds = fds;
		this.fireEvent(com.icliao.EVENTS.feed.SET_FFEDS, fds);
	},
	this.atIndex = function(index){
		return this.feeds[index];
	},
	this.getCount = function(){
		return this.feeds.length;
	},
	this.addSetFeedsListener = function(el){
		this.addEventListener(com.icliao.EVENTS.feed.SET_FFEDS, el);
	}
}

com.icliao.feedModel.prototype = new com.icliao.abstractEventObj;
com.icliao.feedFetcher.prototype = new com.icliao.abstractEventObj;
com.icliao.feedParser.prototype = new com.icliao.abstractEventObj;