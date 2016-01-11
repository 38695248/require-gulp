//点赞
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	var followBtn = function(){
		$(".followBtn").unbind("click").bind("click",function(){
			var $thisF = $(this);
			var ishome = $(this).attr("data-ishome");
			var istext = $(this).attr("data-text"); 
			var followType = $thisF.attr("data-type");
			var follow = $thisF.attr("data-follow");
			$thisF.addClass("btn-loading");
			var followUrl = '/share/follow_'+followType+'.html';
			if(followType == "board"){
				var ucatid = $thisF.attr("data-ucatid");
				var followparams ={ucatid:ucatid,followvalue:follow};
			}else if(followType == "person"){
				var fsuid = $thisF.attr("data-fsuid");
				var followparams ={fsuid:fsuid,followvalue:follow};
			}else if(followType == "category"){
				var categoryid = $thisF.attr("data-categoryid");
				var followparams ={categoryid:categoryid,followvalue:follow};
			}else if(followType == "interests"){
				followUrl = '/share/follow_category.html';
				var categoryid = $thisF.attr("data-categoryid");
				var followparams ={categoryid:categoryid,followvalue:follow};
			}else if(followType == "want"){
				followUrl = '/share/want.html';
				var shid = $thisF.parents(".byshid").attr("data-shid");
				var followparams ={shid:shid,wantvalue:follow};
			}else if(followType == "group"){
				followUrl = '/user_group/follow.html';
				var gpid = $thisF.attr("data-gpid");
				var followparams ={gpid:gpid,wantvalue:follow};
			}
			AjaxFunUtils.ajaxInit({
				"url":followUrl, 
				"yzlogin":true,
				"params":followparams, 
				"callback":function (result) {
					$thisF.removeClass("btn-loading");
					if(result.status){
						if(follow == 1){
							$thisF.removeClass("current");
							if(!ishome){
								if(followType == "want"){
									$thisF.text(config.base.lang.js_shareView_want);
								}else if(istext){
									$thisF.find(".text").text(config.base.lang.js_shareView_follow);	
								}else{
									$thisF.text(config.base.lang.js_shareView_follow);	
								}
							}
							$thisF.attr("data-follow",0);
						}else{
							$thisF.addClass("current");
							if(!ishome){
								if(followType == "want"){
									$thisF.text(config.base.lang.js_shareView_unwant);
								}else if(istext){
									$thisF.find(".text").text(config.base.lang.js_shareView_unfollow);
								}else{
									$thisF.text(config.base.lang.js_shareView_unfollow);	
								}
							}
							$thisF.attr("data-follow",1);	
						}
					}else{
						config.tip.tips({
							type:0,
							w:"96%",
							htmlmsg:'<div style="padding:20px 30px 20px">' + result.msg+'</div>'
						});
					}
				},
				"errCallback":function(){
					$thisF.removeClass("btn-loading");	
				}
			});		
		});		
	}; 
	return {followBtn:followBtn};
});