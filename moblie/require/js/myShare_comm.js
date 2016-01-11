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
	};
	return init();
});

