com.icliao.EVENTS.color  = {
	"FETCH_SUCCESS":"com.icliao.color.success",
	"FETCH_FAIL":"com.icliao.color.fail"
}

com.icliao.CONST.color = {
	"HOST":"http://yulookbooksvr-ftpfvuhmpa.elasticbeanstalk.com",
	"COLOR_SORT_VLET":"SafeColor216vlet"
}

com.icliao.colorBucketSort = function(){
	this.addOnSuccessListener = function(el){
		this.addEventListener(com.icliao.EVENTS.color.FETCH_SUCCESS, el);
	},
	this.addOnFailListener = function(el){
		this.addEventListener(com.icliao.EVENTS.color.FETCH_FAIL, el);
	},
	this.requestSuccess = function(arg){
		this.fireEvent(com.icliao.EVENTS.color.FETCH_SUCCESS,arg);
	},
	this.requestFail = function(arg){
		this.fireEvent(com.icliao.EVENTS.color.FETCH_FAIL,arg);
	},
	this.request = function(url){
		var h = this, 
			rurl = com.icliao.CONST.color.HOST +"/" +
			com.icliao.CONST.color.COLOR_SORT_VLET;
		
		var query = {
			"url":url,
			"format":"gson"
		};
		
		$.get(rurl,query,
			function(data){
				h.requestSuccess(data);
			});
	}
}

com.icliao.colorBucketSort.prototype = new com.icliao.abstractEventObj;