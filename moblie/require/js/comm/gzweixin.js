// 关注微信
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	//关注微信检测
	var gzweixin = function(opt){
		if(isweixin != 1){
			return false;
		}
		var settings = {
			callback:null,
			errcallback:null	
		};
		$.extend(true,settings,opt);
		AjaxFunUtils.ajaxInit({
			"url":'/user/weixin_isguanzhu.html', 
			"params":{}, 
			"callback":function (res) {
				isback = 1;
				$("#testStatus").text(res.status);
				if(res.status == 1){
					//$(".btn-bysharedz").addClass("btn-bysharedz").removeClass("btn-danger-gray");
					isgzweixin = 1;	
					//$("#btn-gzbysharewx").addClass("current").removeClass("btn-danger");
					if(opt.callback){
						settings.callback();	
					}
				}else if(res.status == -1){
					if(islogin == 0){
						window.location.href = '/index/reg.html';
					}
					config.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						type:0,
						scallback:function(){
							window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA3NTM5Mzg2NA==&mid=206134523&idx=1&sn=b052274af6c6633a2e2db14c7a10e577#rd";	
						}
					});
				}else{
					var top = 0;
					if($(".headerbox").length>0){
						top = $(".headerbox").height();	
					}
					$("#gzweixin").css({"top":top}).show();
					$("#gzclose").unbind("click").bind("click",function(){
						$("#gzweixin").hide();	
					});	
					if(opt.errcallback){
						settings.errcallback(res.msg);	
					}	
				}
			}
		});
	};
	return {
		gzweixin:gzweixin
	}	
});