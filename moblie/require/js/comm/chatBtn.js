// 私聊TA按钮绑定
define(['jquery','config'],function($,config){
	var chatBtn = function(options){
		var settings = {
			uid:'',
			username:''	
		};
		if(options){
			$.extend(settings,options);	
		}
		$(".chatBtn").unbind("click").bind("click",function(){
			var uid = settings.uid;
			var username = settings.username;
			if(!uid){
				uid = $(this).attr("data-uid");
			}
			if(!username){
				username = $(this).attr("data-username");
			}
			if(uid == suid ){
				config.tip.tips({
					type:0,
					htmlmsg:'<div style="padding:30px">' + lang.js_base_yourself+'</div>'
				});
				return false;
			}
			config.closeTip($("#sns_more"));
	
			AjaxFunUtils.ajaxInit({url:'/common/gettpl.html?name=sns_chat&ch=sns',
				type: "GET",
				yzlogin:true,
				isloading:true,
				dataType: 'html',
				params:{},
				callback: function(data){
					$("body").append(data);
					$("#title_username").html('<a href="/share/myshares.html?fsuid='+uid+'&ukey='+ukey+'">'+username+'</a>');
					
					config.tip.centerDiv({divId:"chatbox",
						type:1,
						w:'95%',
						position: 'absolute',
						p_new:1,
						callback:function(){
							var contHeight = config.base.getHeightBody() - 230;
							$("#msgListBox").css({"height":contHeight});
							//$('body').addClass('noScroll');
							MsgMod.msgInit({
								uid:uid	
							});	
						},
						closeback:function(){
							//$('body').removeClass('noScroll');	
						}
					});
				}
			});
		});	
	};
	return {
		chatBtn:chatBtn
	}	
});