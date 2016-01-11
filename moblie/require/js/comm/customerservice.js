// 客服接口
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	var customerservice = function(options){
		var settings = {
			type:1,
			check_id:'',
			callback:null
		};
		$.extend(settings,options);
		
		AjaxFunUtils.ajaxInit({
			url: '/user/get_svr_weixin.html',
			params:{},
			callback:function(res){
				if(res.status==1){
					if(options.callback){
						settings.callback(res.data.url);
						return false;	
					}
					var htmlmsg = '<div class="text-center line24 f16"><p>（长按下图3秒加我们客服微信）</p><p class="text-center"><img class="w300" style="margin:0 auto" src="'+res.data.url+'" /></p></div>';
					if(settings.type == 2){
						htmlmsg = '<div class="text-center f28 color-333 line40"><p>长按复制提现码:</p><p class="b f28 color-333 line40">'+settings.check_id+'</p><p class="f21 b color-red line30">请长按下图</br>识别图中二维码加客服</br>粘贴发送提现码给客服<p class="text-center"><img class="w200" style="margin:0 auto" src="'+res.data.url+'" /></p></div>';	
					}
					var ImgObj = new Image(); //判断图片是否存在  
					ImgObj.src = res.data.url; 
					ImgObj.onload = function() {
						config.tip.tips({
							htmlmsg:'<div style="padding:10px 10px">'+htmlmsg+'</div>',
							type:0,
							title:'联系客服',
							callback:function(){
								$(".tipbottom").hide();	
							},
							closeback:function(){
								window.location.reload();	
							}
						});
					};
				}
			}
		});	
	};
	return {
		customerservice:customerservice
	}	
});