// 砍价
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
require(['jquery','ajax','base','ui/scroll','swiper','ui/textIn','baguettebox'],function($,ajax,base,s){
	//显示隐藏表情
	$("#expression-toggle").unbind("click").bind("click",function(){
		var isv = $("#control").is(":visible");
		//alert(isv);
		if(isv){
			$("#control").hide();	
		}else{
			$("#control").show();
			require(['ui/expression'],function(e){
				$(document).unbind("click").bind('click',function(e){
					  var target = $(e.target);
					  if(target.closest($("#footer_kf")).length == 0){
						$("#control").hide();	
					  };
				});	
			});	
		}
		
	});
	base.init();
	//回到底部
	s.scrollToEnd();
	//上传图片按钮
	$("#tool-toggle").unbind("click").bind("click",function(){
		//上传按钮
		require(['up',"ui/message"],function(up,m){
			up.uploadInit({
				tip:true,
				uptitle:'请选择图片上传',
				yzlogin:true,
				container:'allcontainer',
				browse_button:'allpickfiles',
				drop_element:'allcontainer',
				bucket:'other_sns',
				isarray:true,
				multi_selection:false,
				auto_start:true,
				fileNumLimit:1,
				callback:function(oimgdata){
					//console.log(oimgdata);
					m.appendMsg(oimgdata[0].key,1,oimgdata[0].src);	
				},
				bcallback:function(){}
			});	
		});
	});
	var refreshpage = function(){
		function getdatapage(){
			var suid = $("#send").attr("data-suid");
			var tosuid = $("#send").attr("data-tosuid"); 
			var admin = $("#send").attr("data-admin"); 
			var gdid = $("#send").attr("data-gdid"); 
			ajax.ajaxInit({
				url: '/message/getmsglist.html?suid='+suid+'&tosuid='+tosuid+'&admin='+admin+'&gdid='+gdid,
				params:{},
				callback:function(res){
					if(res.status == 1){
						var lihtml = '';
						$.each(res.data,function(index,o){
							lihtml += '<li class="'+o.rorl+' animated fadeInUp item">'+
								'<i class="avatar '+o.rorl+'">'+
									'<img src="'+o.avatar[2]+'" data-original="'+o.avatar[1]+'" class="avatar_lazy userThumb">'+
								'</i>'+
								'<div class="msg-content">'+o.msg+'</div>'+
							  '</li>';	
						});
						$("#masonry").html(lihtml);	
						require(['baguettebox'],function(){
							baguetteBox.run('.baguetteBoxOne');
						});
						//头像图片懒加载
						$("img.avatar_lazy").checkImgExists(function(obj,imgurl){});
						//回到底部
						s.scrollToEnd();
					}
				}
			});
		}
		setInterval(getdatapage, 10000); 
	};
	return refreshpage(),baguetteBox.run('.baguetteBoxOne');
});
