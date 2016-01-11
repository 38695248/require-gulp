// JavaScript Document
var Index = function(){
	var indexInit = function(options){
		var settings ={
			mod:''	
		};
		if(options){
			$.extend(settings,options);	
		}
		//图片懒加载
		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold:500,//滚动条在离目标位置还有1000的高度时就开始加载图片
			failurelimit:100,
			skip_invisible : false 	
		});
		
		MasonryUtils.masonryInit({
			masonry:"masonry_2",
			issearch:true,
			islazy:1,
			callback:function(){
			}
		});
		BaseInitClass.baseInit();//整个网站公共初始化
		if(settings.mod == 'index'){
			//导航置顶
			chooseFn.dhfixedTop({});
			//导航链接开始
			dhpjax();
			function dhpjax(){
				$("#choose_dh").find(".dhpjax").unbind("click").bind("click",function(){
					var url = $(this).attr("data-url")+"&ajax=true";
					$(this).addClass("current");	
					$(this).siblings(".dhpjax").removeClass("current");
					$.ajax({
					  url: url,
					  dataType: 'html',
					  beforeSend: function(xhr){
						
						$("#data-loading").remove();
						$('#masonry_2').html('<div class="imgloading" style="height:180px; width:100%"></div>');
						var nvnexttop = $('#masonry_2').offset().top;
						window.scrollTo(0,nvnexttop-45);
						//xhr.setRequestHeader('X-PJAX', 'true')
					  },
					  success: function(data){
						$('#masonry_2').html(data);
						$(window).unbind('.infscr');//瀑布流滚动解绑
						//history.pushState(null, $(data).filter('title').text(), url);
						MasonryUtils.masonryInit({
							masonry:"masonry_2",
							issearch:true,
							islazy:1,
							callback:function(){
							}
						});
					  }
					})
				});
				
			}
		}
	};
	return {indexInit:indexInit}
}();

