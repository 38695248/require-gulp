// 检查图片是否存在
;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    $.fn.checkImgExists = function(callback) {  
		$(this).each(function(index, element) {
			var $this = $(this);
			var imgurl = $this.attr("data-original");
			var odimgurl = $this.attr("src");
			var ImgObj = new Image(); //判断图片是否存在  
			ImgObj.src = imgurl; 
			ImgObj.onload = function() {
				$this.attr("src",imgurl);
				if(callback){
					var opt = {w:ImgObj.width,h:ImgObj.height};
					callback($this,imgurl,opt);	
				} 
			};
			// 为Image对象添加图片加载失败的处理方法
			ImgObj.onerror = function() {
				if(callback){
					callback($this,odimgurl);	
				} 
			};
		});
	};
}));