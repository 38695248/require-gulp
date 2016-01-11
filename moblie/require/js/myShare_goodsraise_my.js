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
require(['jquery','config','base','mas'],function($,config,base,mas){
	var init = function(){
		//整个网站公共初始化
		base.init();
		var pagecol = $("#pagecol").val();
		var issearch = $("#isseacrch").val();
		if(pagecol){
			if(issearch==1){
				mas.masonryInit({masonry:'masonry',issearch:true,islazy:0});	
			}else{
				mas.masonryInit({masonry:'masonry',issearch:false,islazy:0});	
			}	
		}else{
			if(issearch==1){
				mas.masonryInit({masonry:'masonry_2',issearch:true,islazy:1});	
			}else{
				mas.masonryInit({masonry:'masonry_2',issearch:false,islazy:1});	
			}	
		}
		//我也要众筹
		$(".want_crowd_btn").unbind("click").bind("click",function(){
			config.shareweinxtip({
				callback:function(obj){
					var bodyH = config.base.getHeightBody()-150;
					var sharehtml = '<div style="max-width:720px;margin:0 auto;" class="sharehtml line24">'+
							'<img src="http://static.byshare.com/moblie/images/zc-info.png" style="height:'+bodyH+'px;width:auto;max-widht:none; margin:0 auto" />'+
							'<p class="text-center add-crowd-in"><a href="/m_buy/public_c_show.html?h_name=%E8%B6%85%E7%BA%A7%E7%AD%B9&activity=2&nt_show_attr=1"><button class="btn btn-ff9402 line30  w200" style="font-size:21px">立刻发起众筹</button></a></p>'+
					   '</div> ';
					obj.append(sharehtml).css({"background":"none"});	
				}	
			});	
		});
	};
	return init();
});

