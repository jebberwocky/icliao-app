/**
 * The event classes
 * @author jeff liu, jebberwocky@gmail.com
 * @date 
 */

com={};
if(!com.icliao){com.icliao={};}

com.icliao.EVENTS = {};
com.icliao.CONST = {};

com.icliao.abstractEventObj = function(){
	this.eventListeners = {},
	this.addEventListener= function(eventType, el){
		var els = this.eventListeners[eventType];
		if(!els)els=[];
		els.push(el);
		this.eventListeners[eventType] = els;
	},
	this.fireEvent = function(eventType, eventArg){
		var els = this.eventListeners[eventType];
		if(els){
			var i = els.length;
			while(i--)els[i].fire(eventArg);
		}
	}
}