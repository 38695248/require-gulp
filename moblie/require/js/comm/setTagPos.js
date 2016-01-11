// 设定标签位置
define(['jquery','config'],function($,config){
	//设定标签位置
	var setTagPos = function(opt){
		var $this = opt.divid;
		var d_imgW = $this.width();
		var y_imgW = $this.attr("data-width");
		var proportion = d_imgW / y_imgW;
		$this.find(".item-tag").each(function(index, element) {
			var oldLeft = $(this).attr("data-left");
			var oldTop = $(this).attr("data-top");
			var newLeft = oldLeft*proportion;
			var newTop = oldTop*proportion;
			var p_w = d_imgW;
			var tag_form_w = $(this).find(".item-tag-form").width()+10;
			var flag_w = p_w - newLeft - tag_form_w;
			if(flag_w < 0){
				$(this).find(".item-tag-form").css({"right":24,"left":"auto"});
				$(this).find(".item-tag-form").find(".tip").addClass("tagRight");
			}
			$(this).css({"left":newLeft,"top":newTop}).addClass("loaded");
			
		});	
	};
	return {
		setTagPos:setTagPos
	}	
});