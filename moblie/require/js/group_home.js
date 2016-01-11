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
require(['jquery','config','base','ajax','mas','group','checkInput','serializeJson'],function($,config,base,AjaxFunUtils,mas,group){
	var init = function(){
		//公共JS
		base.init();
		mas.init({});
		addGroup();
		eitgroup();
	};
	//加入群
	var addGroup = function(){
		$(".addGroupBtn").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			var act = $(this).attr("data-act");
			AjaxFunUtils.ajaxInit({
				url: '/user_group/join.html',
				params:{gpid:gpid,act:act},
				callback: function(res){
					if(res.status == 1){
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							w:"90%",
							type:0,
							scallback:function(){
								window.location.reload();	
							}
						});	
					}else{
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							w:"90%",
							type:0
						});	
					}
				}
			});
		});	
	};
	//群资料编辑
	var eitgroup = function(){
		//编辑群资料
		$("#groupEdit").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			var ref = $(this).attr("data-ref");
			AjaxFunUtils.ajaxInit({url: '/user_group/edt.html?gpid='+gpid+'&ref='+ref,
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					config.tip.centerDiv({
						"divId":"groupeditTipbox",
						"type":1,w:"96%",
						"callback":function(){
							dissolutionGrop();
							
							//群分类
							var catid_type = $("#select_cat_type").val();
							var catid_area = $("#select_cat_area").val();
							var catid_sex = $("#select_cat_sex").val();
							group.selectCat({catid_type:catid_type,catid_area:catid_area,catid_sex:catid_sex});
							//头像懒加载
							$("#groupeditForm").find(".profileImage").checkImgExists();
							$("#groupeditForm").checkInput({
								submitBtnFn: function (from) {
									var actUrlGroup = $("#groupeditForm").attr("data-action");
									var dataFrom = from.serializeJson();
									AjaxFunUtils.ajaxInit({
										url:actUrlGroup,
										params:dataFrom, 
										callback:function (result) {
											config.tip.tips({
												htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
												w:"90%",
												type:0,
												scallback:function(){
													config.closeTip($("#groupeditTipbox"));
													window.location.reload();
												}
											});
										}
									});
									
								}	
							});	
						}
					})
				}
			});
		});	
	};
		//解散群
	var dissolutionGrop = function(){
		$(".dissolution").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			config.tip.tips({
				htmlmsg:'<div style="padding:30px">'+config.base.lang.js_myshare_perform+'</div>',
				w:"90%",
				scallback:function(){
					AjaxFunUtils.ajaxInit({
						url:"/user_group/edt_do.html",
						params:{gpid:gpid,act:'del'},
						callback: function(res){
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"90%",
								type:0,
								scallback:function(){
									window.location.href = '/user_group/my.html';
								}
							});
						}
					});	
				}
			});
			
		});
	};

	return init();
});