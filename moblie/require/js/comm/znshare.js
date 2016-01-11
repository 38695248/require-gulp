// 站内分享
define(['jquery','config','comm/shareUtils'],function($,config,shareUtils){
	var znshare = function(options){
		var settings = {
			ishid:'',
			shid:'',
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);	
		}
		$(".btn-share").unbind("click").bind("click", function () {
			if(options.callback){
				settings.callback();	
			}
			var website = $(this).attr("data-iswebsite");
			var shid = $(this).parents(".byshid").attr("data-shid");
			var ishid = $(this).parents(".byshid").attr("data-ishid");
			if(!shid){
				shid = settings.shid;	
			}
			if(!ishid){
				ishid = settings.ishid;	
			}
			var imgW = "";
			var imgH = "";
			var websiteData = "";
			
			if(website){
				var screenImage = $(this).attr("data-bigimgurl");
				var maxW= 600;
				var maxH = 500;
				var theImage = new Image();
				theImage.src = screenImage;
				imgW = theImage.width;
				imgH = theImage.height;
				if(imgW > maxW){ 
					//高度等比缩放
					imgH = (maxW*imgH)/imgW; 
					imgW = maxW;
				} 
				if(imgH > maxH){ 
					//高度等比缩放
					imgW = (maxH*imgW)/imgH; 
					imgH = maxH;
				} 
				websiteData = {imgUrl:screenImage,w:imgW,h:imgH};
			}
			var dataiswebsite = website==1?website:0;
			shareUtils.addShareInit(websiteData,{iswebsite:dataiswebsite,shid:shid,ishid:ishid,share:'share'});
		});
	};
	return {
		znshare:znshare
	}	
});