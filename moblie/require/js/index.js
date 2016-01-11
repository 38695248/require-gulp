// 首页
require.config({
	 paths: {//模块（modules）的相对目录。
        jquery: [
            //'http://static.byshare.com/moblie/app/js/libs/jquery-1.8.3.min',
            'libs/jquery-1.8.3.min'
        ],
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
require(['jquery','config','base','mas','comm/fixedTop','comm/chooseFn','comm/cats','swiper','scrollToEnd'],function($,config,base,mas,fixedTop,choose,cats){
	var indexInit = function(options){
		//公共JS
		base.init();
		cats.init();
		//广告切换图片
		var mySwiper = new Swiper('#swiper-container-ad', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.swiper-pagination-ad',
			loop : true,
			loopAdditionalSlides : 1,
			onInit: function(swiper){
			  
			}
		})
		fixedTop.init({});
		//瀑布流
		mas.masonryInit({
			masonry:"masonry_2",
			issearch:true,
			islazy:1,
			callback:function(){
			}
		});
	},
	//导航链接开始
	dhpjax = function(){
		$("#choose_dh").find(".dhpjax").unbind("click").bind("click",function(){
			var url = $(this).attr("data-url")+"&ajax=true";
			$(this).addClass("current");	
			$(this).siblings(".dhpjax").removeClass("current");
			$.ajax({
			  url: url,
			  dataType: 'html',
			  beforeSend: function(xhr){
				$(window).unbind('.infscr');//瀑布流滚动解绑
				$("#data-loading").remove();
				$('#masonry_2').html('<div class="imgloading" style="height:180px; width:100%"></div>');
				//var nvnexttop = $('#masonry_2').offset().top;
				//$('#masonry_2').scrollToEnd({type:'end'});
				//window.scrollTo(0,nvnexttop);
				//xhr.setRequestHeader('X-PJAX', 'true')
			  },
			  success: function(data){
				$('#masonry_2').html(data);
				//history.pushState(null, $(data).filter('title').text(), url);
				mas.masonryInit({
					masonry:"masonry_2",
					issearch:true,
					islazy:1,
					callback:function(){
					}
				});
			  }
			})
		});
	};
	return indexInit(),dhpjax();
});

