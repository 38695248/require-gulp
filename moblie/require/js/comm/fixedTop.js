define(['jquery','fixedTop'],function($){
	var init = function(opt){
		var settings = {
			masdiv:$("#masonry_2"),
			choose_dh:$("#choose_dh"),
			class:'masonry_dh_fixed',
			defclass:'masonry_dh_fixed',
			topHeight:80
		};
		$.extend(true,settings,opt);
		var $mas = settings.masdiv,
		$choose = settings.choose_dh,
		thisclass = settings.class,
		defclass = settings.defclass;
		$mas.fixedTop({
			isdiv:true,
			topHeight:settings.topHeight,
			scallback:function(){
				if($(".headerbox").length>0){
					$choose.addClass(thisclass);
					$mas.css({"padding-top":0});
				}else{
					$choose.addClass(defclass);	
				}
			},
			ecallback:function(){
				if($(".headerbox").length>0){
					$choose.removeClass(thisclass);
					$mas.css({"padding-top":0});
				}else{
					$choose.removeClass(defclass);	
				}
			}	
		});	
	};
	return {init:init}
});