// 封装滚动到指定位置的常用方法
define(['jquery','config'],function($,config){
	var toggleUtils = function(options){
		
		var settings = {
			divid:$("#divid"),
			isOpen:false,
			callback:function(){}	
		};
		if(options){
			$.extend(settings,options);	
		};
		var $this = settings.divid;
		if(settings.isOpen){
			$this.addClass("on");
			$this.children(".ui-Checkbox").val("1");
		}
		$this.unbind("click").bind("click",function(){
			var flag = $(this).hasClass("on");
			if(!flag){
				$(this).addClass("on");
				$(this).children(".ui-Checkbox").val("1");
				if(options.callback){
					settings.callback(flag);	
				}
			}else{
				$(this).removeClass("on");
				$(this).children(".ui-Checkbox").val("3");
				if(options.callback){
					settings.callback(flag);	
				}
			}
		});
	};
	return {
		toggleUtils:toggleUtils
	}	
});