// 封装一些倒计时调用的常用方法
define(['jquery','config'],function($,config){
	var timeShow = function(options){
		var settings = {
			divid:$("#timebox"),
			loadTime:3000,
			waitTime:5000,
			callback:function(){}	
		};
		var $this = settings.divid;
		var $thisShow = $this.find(".item-tag");
		var startTime = null;
		var flag = false;
		var stopflag = false;
		if(options){
			$.extend(settings,options);
		};
		var startInit = function(){
			stopTime();	
			startShow();
			//$(this).toggle();
			$this.toggle(function(){
				$thisShow.addClass("loaded");
				stopflag = true;
			},function(){
				$thisShow.removeClass("loaded");
				stopflag = false;
			});
		};
		var startShow = function(){
			if(!stopflag){
				if(flag == false){
					flag = true;
					$thisShow.addClass("loaded");
				}else{
					$thisShow.removeClass("loaded");	
					flag = false;
				}
			};
			startTime = setTimeout(startShow,settings.loadTime);    // 运动循
		};
		var stopTime = function(){
			clearInterval(startTime);
		};
		startInit(); 
	};
	return {
		timeShow:timeShow
	}	
});