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
require(['jquery','config','base','ajax','comm/customerservice','comm/gzweixin','checkInput','serializeJson'],function($,config,base,AjaxFunUtils,customerservice,gz){
	//提现申请
	var init = function(){
		base.init();
		$(".cash_shmoney_btn").unbind("click").bind("click",function(){
			var cashid = $(this).attr("data-cashid");	
			AjaxFunUtils.ajaxInit({
				url: '/mybuys/cash.html',
				params:{act:"cancel",cash_id:cashid},
				callback:function(res){
					if(res.status == 1){
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							type:0,
							scallback:function(){
								window.location.reload();	
							}
						});	
						
					}else{
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							type:0
						});	
					}		
				}
			});
		});
		//绑定手机
		$(".sns_bindmobile").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/user/bang_cellphone.html?allways=1',
				type: "GET",
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					var mobileHtml = $(data).find("#sns_bindmobilehtml").html();
					var tipHtml = '<div id="bindmobileTipBox" class="tipbox fade loaded" data-index="0" style="position: absolute;display:none"><div class="tipbox-in" data-index="0"><h1 class="tiptop">绑定登录手机</h1><span class="ico02 tipclose closeBtnHtml"></span><div class="tipcont" style="padding:0 10px 10px">'+mobileHtml+'</div></div></div>';
					$("body").append(tipHtml);
					config.tip.centerDiv({"divId":"bindmobileTipBox","type":1,callback:function(){
						var actionurl = $("#sns_bindmobileform").attr("data-action");
						$("#sns_bindmobileform").checkInput({
							validatetype:0,
							button:'.btn-bintmobile',
							//验证完了，提交表单要干的事情
							submitBtnFn: function (from) {
								config.base.loadInit({status:1});
								var dataFrom = from.serializeJson();
								dataFrom.allways = 1;
								AjaxFunUtils.ajaxInit({"url": actionurl, 
									"params":dataFrom,
									"callback":function (result) {
										if(result.status){
											config.tip.tips({
												type:0,
												htmlmsg:'<div style="padding:30px">' + result.msg+'</div>',
												scallback:function(){
													window.location.reload();
												}
											});
										}else{
											config.tip.tips({
												type:0,
												htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
											});
										}
										
										config.base.loadInit({status:0});
									}
								});
							}
						});	
					}});
				}
			});
		});
		//支付账户,微信管理设置
		$(".setpayacount").unbind("click").bind("click",function(){
			var typeid = $(this).attr("data-type");
			var title = $(this).attr("data-title");
			var acturl = $(this).attr("data-acturl");
			var tiptitle = $(this).attr("data-tiptitle");
			var validate =  $(this).attr("data-validate");
			isbindacount({typeid:typeid,title:title,acturl:acturl,tiptitle:tiptitle,validate:validate});
		});
		//联系客服
		$(".lxkefu_btn").unbind("click").bind("click",function(){
			customerservice.customerservice({});
		});
		//提现申请
		applycash();
		
		function applycash(){
			$("#applycashbtn").removeClass("btn-danger-gray");
			$("#cashForm").checkInput({
				button:'#applycashbtn',
				submitBtnFn: function (subFrom) {
					var actionUrl = $("#cashForm").attr("data-action");
					var dataFrom = subFrom.serializeJson();
					var thismoneyVal = $("#cash_shmoney").val();
					var weixin_isguanzhu = $("#weixin_isguanzhu").val();
					if(weixin_isguanzhu == 1){
						applycashgo();	
					}else{
						gz.gzweixin({
							callback:function(){
								$("#gzwx_text").text("已关注.");
								applycashgo();
							},
							errcallback:function(msg){
								config.tip.tips({
									htmlmsg:'<div style="padding:30px">'+msg+'</div>',
									type:0
								});	
							}	
						});
					}
					function applycashgo(){
						config.base.loadInit({status:1});
						AjaxFunUtils.ajaxInit({
							url:actionUrl,
							params:dataFrom,
							callback:function(res){
								//return false;
								if(res.status == 1){
									customerservice.customerservice({
										type:2,
										check_id:res.data.check_id	
									});
									config.base.loadInit({status:0});
								}else if(res.status == -1){
									config.tip.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										type:0,
										callback:function(){
											$(".btnTipsubmit").html("关注微信公众号");	
										},
										scallback:function(){
											window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA3NTM5Mzg2NA==&mid=206134523&idx=1&sn=b052274af6c6633a2e2db14c7a10e577#rd";	
										}
									});	
									config.base.loadInit({status:0});
								}else{
									config.tip.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										type:0
									});	
									config.base.loadInit({status:0});
								}
								
							}
						});	
					}
					
				}
			});	
		}
		
	};
	return init();
});

