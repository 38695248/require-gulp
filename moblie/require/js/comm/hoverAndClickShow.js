// 封装一些onClick selected切换调用的常用方法
define(['jquery','config'],function($,config){
	var hoverAndClickShow = function(options){
		var settings = {
			divid:$("#divid"),
			method:"hover",
			autoClose:true,
			callback:function(){},
			bcallback:function(){}	
		};
		if(options){
			$.extend(settings,options);
		};
		var $this = settings.divid;
		if(settings.method =="hover"){
			$this.hover(function(){
				$(this).find(".hide").addClass("show");
				$(this).find(".addover").addClass("hover");
				$(this).css({"z-index":99}).addClass("loadedShow");
				$(this).find(".hideclose").unbind("click").bind("click",function(){
					$(this).parents($this).removeClass("show");	
				});
				if(options.callback){
					settings.callback($(this));	
				}	
			},function(){
				$(this).find(".hide").removeClass("show");
				$(this).find(".addover").removeClass("hover");
				$(this).css({"z-index":0}).removeClass("loadedShow");
			});
		};
		if(settings.method =="click"){
			var $thisClick = $this.find(".cilckItem");
			$thisClick.unbind("click").bind("click",function(){
				var $cthis = $(this);
				event.stopPropagation();
				var $thisSibling = $(this).siblings(".hide");
				if($thisSibling.is(":hidden")){
					$thisSibling.addClass("show");
					$thisSibling.parents($this).css({"z-index":99}).addClass("loadedShow");
					$(this).find(".ico-add").addClass("ico-del");
					if(options.callback){
						settings.bcallback($cthis);	
					}
				}else{
					$thisSibling.removeClass("show");
					$thisSibling.parents($this).css({"z-index":0}).removeClass("loadedShow");	
					$(this).find(".ico-add").removeClass("ico-del");
				}
				if(settings.autoClose){
					$thisSibling.find(".hideclose").unbind("click").bind("click",function(){
						$(this).parents($thisSibling).removeClass("show");	
						$(this).parents($thisSibling).parents($this).removeClass("loadedShow");
					});
					$(document).bind('click',function(e){
						  var target = $(e.target);
						  if(target.closest($thisSibling).length == 0){
							$thisSibling.removeClass("show");	
							$thisSibling.parents($this).css({"z-index":0}).removeClass("loadedShow");
						  };
						  
					});
				};
				
				if(options.callback){
					settings.callback($this);	
				};
					
			});	
		};
	};
	return {
		hoverAndClickShow:hoverAndClickShow
	}	
});