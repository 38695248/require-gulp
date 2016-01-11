// 首页
require.config({
	 paths: {//模块（modules）的相对目录。
        jquery: 'libs/jquery-1.8.3.min',
        config: 'comm/config',
        base: 'comm/base',
		ajax: 'comm/ajax',
		up:'comm/uploadUtils',
		pjax:'comm/pjax',
		mas:'comm/masonry',
		share:'comm/shareViewcomm',
		swiper:'libs/swiper.min',
		jquery_ui:'jqui/jquery-ui.min',
		infinitescroll: 'plugin/jquery.infinitescroll.min',
		lazyload: 'plugin/jquery.lazyload.min',
		jquerypjax:'plugin/jquery.pjax',
		baguettebox:'plugin/baguettebox.min',
		checkInput:'plugin/checkInput.min',
		checkImgExists:'plugin/checkImgExists',
		checkboxFn:'plugin/checkboxFn.min',
		serializeJson:'plugin/serializeJson.min',
		setTagPos:'plugin/setTagPos.min',
		stopscroll:'plugin/stopscroll.min',
		plus:'plugin/plus.min',
		countdown:'plugin/countdown.min',
		scrollToEnd:'plugin/scroll.min',
		fixedTop:'plugin/fixedTop.min',
		hoverclick:'plugin/hoverclick.min',
		jcrop:'jcrop/jquery.Jcrop.min'
    }	
});
define(['jquery','config','base','ajax','comm/followBtn','checkInput'],function($,config,base,AjaxFunUtils,followBtn){
	
	//按钮绑定事件
	var buttonBindFn = function(){
		followBtn.followBtn();
		//头像图片懒加载
		$("img.avatar_lazy").checkImgExists(function(obj,imgurl){
			var $myopj = obj;
			var myimgurl = imgurl;
			var $thisp = $myopj.parent(".useravatar_bg");
			$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
		});
		//用户资料编辑
		$("#editProfile").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=profile',
				type: "GET",
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					var mynumIndex = $("#profileTipbox").attr("data-index");
					config.tip.centerDiv({"divId":"profileTipbox","type":1,"callback":function(){
						//头像懒加载
						$("#profileForm").find(".avatar_loading").checkImgExists();
						
						$("#profileForm").checkInput({
							submitBtnFn: function (from) {
								var dataFrom = from.serializeJson();
								AjaxFunUtils.ajaxInit({
									url:"/user/setting_update.html?type=info1",
									params:dataFrom, 
									callback:function (result) {
										config.tip.tips({
											htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
											w:"90%",
											type:0,
											scallback:function(){
												config.tip.centerDivClosed({
													"indexTipDiv":$("#profileTipbox"),
													"indexNum":mynumIndex,
													"type":1
												});
												window.location.reload();
											}
										});
									}
								});
								
							}	
						});		
					}});
				}
			});
		});
		
	};

	//用户资料详细设置
	var user_settings = function(){
		$(".fancyToggle").toggleUtils({});
		$(".toc li").scrollPosition({"o":"accountBasics"});
		//头像懒加载
		$("#userSettingsForm").find(".avatar_loading").checkImgExists();


		//密码修改
		$("#changePasswordButton").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=editPwd&ch=sns',
				type: "GET",
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					config.tip.centerDiv({"divId":"pwdTipBox","type":1,"callback":function(){
						//忘记密码
						$(".forgotPassword").unbind("click").bind("click",function(){
							AjaxFunUtils.ajaxInit({
								"url":"/user/forgotPassword.html", 
								"params":{}, 
								"callback":function (result) {
									config.tip.tips({
										htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
										w:"90%"
									});
								}
							})	
						});
						//修改密码
						$("#pwdFrom").checkInput({
							inputs:{
								"OldPwd":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:''}
							},
							submitBtnFn: function (from) {
								var dataFrom = from.serializeJson();
								AjaxFunUtils.ajaxInit({
									"url":"/user/editpwd.html",
									"params":dataFrom, 
									"callback":function (result) {
										if(result.status){
											config.tip.tips({
												htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
												w:"90%",
												type:0,
												scallback:function(){
													window.location.href = '/user/setting.html';
												}
											});
										}else{
											config.tip.tips({
												w:"90%",
												type:0,
												htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
											});
											//console.log('data:', result);
										}
									}
								});
							}	
						});
					}});
				}
			});		
		});
		$("#userSettingsForm").checkInput({
			submitBtnFn: function (from) {
				var dataFrom = from.serializeJson();
				//console.log( dataFrom);
				AjaxFunUtils.ajaxInit({"url":"/user/setting_update.html?type=info2", "params":dataFrom, "callback":function (result) {
					if(result.status){
						config.tip.tips({
							w:"90%",
							type:0,
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>',
							scallback:function(){
								window.location.href = '/share/myshares.html';	
							}
						});
					}else{
						config.tip.tips({
							w:"90%",
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
						});
					}
                }});
			}	
		});	
	};
	
	return buttonBindFn();
});

