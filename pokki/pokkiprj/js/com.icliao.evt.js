/**
 * The event classes
 * @author jeff liu, jebberwocky@gmail.com
 */

com={};
if(!com.icliao){com.icliao={};}

com.icliao.EVENTS = {};
com.icliao.CONST = {};

com.icliao.abstractEventObj = function(){
	eventListeners = {},
	this.addEventListener= function(eventType, el){
		var els = eventListeners[eventType];
		if(!els)els=[];
		els.push(el);
		eventListeners[eventType] = els;
	},
	this.fireEvent = function(eventType, eventArg){
		var els = eventListeners[eventType];
		if(els){
			var i = els.length;
			while(i--)els[i].fire(eventArg);
		}
	}
}