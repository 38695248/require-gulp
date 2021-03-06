// 检查颜色 尺寸是否被选中
define(['jquery','config'],function($,config){
	var checkboxFn = function(options){
		var settings = {
			divid:$("#divid"),
			checkbox:"checkbox",
			val:5,
			chird:0,
			scallback:function(){},
			errorcallback:function(){}
		};
		if(options){
			$.extend(settings,options);	
		}
		var $this = settings.divid;
		var falg = 0; 
		$this.find("input[type="+settings.checkbox+"],textarea").each(function () { 
			if ($(this).attr("checked")) { 
				falg += 1; 
			}
			if($(this).val() !== '' && settings.checkbox=='hidden'){
				falg += 1;	
			}
			if($(this).val() !== '' && $(this).attr("readonly")=='readonly'){
				falg += 1;	
			}
			if($(this).val() >= settings.val){
				falg += 1;	
			}
		});
		//alert(falg);
		if (falg > 0){ 
			if(settings.chird == 1){
				$this.find("input[type="+settings.checkbox+"],textarea").removeClass("error_validate");
			}else{
				$this.removeClass("error_validate");
			}
			if(options.scallback){
				settings.scallback($this);
			}
			return true; 
		}else{ 
			if(settings.chird == 1){
				$this.find("input[type="+settings.checkbox+"],textarea").addClass("error_validate");
			}else{
				$this.addClass("error_validate");
			}
			if(options.errorcallback){
				settings.errorcallback($this);
			}
			return false;
		}
	};
	return {
		checkboxFn:checkboxFn
	}	
});