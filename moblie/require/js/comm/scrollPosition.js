// 封装滚动到指定位置的常用方法
define(['jquery','config'],function($,config){
	var scrollPosition=function(options){
		var settings = {
			divid:$("#divid"),
			time:1000,			//运动指数
			method:'click',
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);	
		};
		var $this = settings.divid;
		$this.bind(settings.method,function(){
			var indexPosition = $("#" + $(this).attr("data-op"));
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
			$("html,body").animate({scrollTop:indexPosition.offset().top - 100},settings.time);
		});
	};
	return {
		scrollPosition:scrollPosition
	}	
});