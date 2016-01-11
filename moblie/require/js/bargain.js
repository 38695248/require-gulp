// 砍价
require.config({
	 paths: {//模块（modules）的相对目录。
        jquery: 'http://static.byshare.com/moblie/js/jquery-1.8.3.min',
        config: 'comm/config',
        base: 'comm/base',
		ajax: 'comm/ajax',
		up:'comm/uploadUtils',
		swiper:'libs/swiper.min',
		jquery_ui:'jqui/jquery-ui.min'
    }
});
require(['jquery','config','base'],function($,config,base){
	//上传按钮
	//上传图片绑定
	$(".shareUpload").unbind("click").bind("click",function(){
		$("#addbox").addClass("show");
		$('body').addClass("noScroll");
		$("#addbox_bg,#addbox_btn").unbind("click").bind("click",function(){
			$("#addbox").removeClass("show");
			$('body').removeClass("noScroll");	
		});	
	});
	
	$(".add-share").unbind("click").bind("click",function(){
		var ismjx = $(this).attr("data-ismjx");
		var ischecklogin = config.loginCheck();
		if(!ischecklogin){
			return false;	
		}
		require(['up'],function(up){
			up.uploadInit({
				tip:true,
				uptitle:'请选择1~5张图片上传',
				yzlogin:true,
				container:'allcontainer',
				browse_button:'allpickfiles',
				drop_element:'allcontainer',
				isarray:true,
				bucket:'share',
				isarray:true,
				multi_selection:true,
				auto_start:true,
				fileNumLimit:5,
				callback:function(oimgdata){
					var myoimgdata = oimgdata;
					up.successFun(myoimgdata,{ismjx:ismjx});	
				},
				bcallback:function(){}
			});	
		});
	});
	//按钮操作
	btnAct();
	//base.loadInit();
	function btnAct(){
		$(".money_btn_act").unbind("click").bind("click",function(){
			var url = $(this).attr("data-url");
			var start = new Date().getTime();//起始时间
			config.tip.tips({
				htmlmsg:'<div style="padding:20px 20px">'+url+'</div>'
			});
			var end = new Date().getTime();//接受时间
			console.log((end - start)+"ms");
		});	
	}	
});
