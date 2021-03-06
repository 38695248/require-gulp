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
require(['jquery','config','base','ajax','mas','swiper'],function($,config,base,AjaxFunUtils,mas){
	var init = function(){
		//公共JS
		base.init();
		//广告切换图片
		var mySwiper = new Swiper('#swiper-container-ad', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.swiper-pagination-ad',
			loop : true,
			loopAdditionalSlides : 1,
			onInit: function(swiper){
			  
			}
		})
		//瀑布流
		mas.masonryInit({
			masonry:"masonry",
			issearch:false,
			islazy:1,
			callback:function(){
			}
		});	
	};
	return init();
});