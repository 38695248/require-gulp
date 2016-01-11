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
require(['jquery','config','mas','base','comm/fixedTop','swiper'],function($,config,mas,base,fixedTop){
	//搜索
	var searchInit = function(opt){
		//公共JS
		base.init();
		//瀑布流
		mas.init({});
		
		//广告切换图片
		var seacrchSwiper = new Swiper('#swiper-container-ad', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.swiper-pagination-ad',
			loop : true,
			loopAdditionalSlides : 1,
			onInit: function(swiper){
			  
			}
		})
		var act_comm = $("#act_comm").val();
		if(act_comm != 'cut'){
			fixedTop.init({});
		}
		typedh();
		choose_dh();
		if($("#s-input-tab-jieguo").length>0){
			selectsearchType();
		}
	};
	var choose_dh = function(){
		if($("#choose_dh").size() > 0){
			require(['comm/chooseFn'],function(choose){
				$("#choose_btn").unbind("click").bind("click",function(){
					var catids = $(this).attr("catids");
					var price = $(this).attr("price");
					choose.chooseInt({op:0,catids:catids,price:price});
				});	
			});
			$("#choose_dh").find(".dhpjax").unbind("click").bind("click",function(){
				var type = $(this).attr("data-type");
				$(this).addClass("current");	
				$(this).siblings(".dhpjax").removeClass("current");
				var url = $(this).attr("data-url")+"&ajax=true";
				if(type == 'price'){
					var orders = $(this).attr("data-orders");	
					if(orders == "price_asc"){
						$(this).attr("data-orders","price_desc");
						$(this).find(".def_icon").removeClass("up_icon").addClass('down_icon');	
					}else{
						$(this).attr("data-orders","price_asc");
						$(this).find(".def_icon").removeClass("down_icon").addClass('up_icon');			
					}
					url = $(this).attr("data-url")+"&orders="+orders+"&ajax=true";
				}
				
				$.ajax({
				  url: url,
				  dataType: 'html',
				  beforeSend: function(xhr){
					$(window).unbind('.infscr');//瀑布流滚动解绑
					$("#data-loading").remove();
					$('#masonry_2').html('<div class="imgloading" style="height:300px; width:100%"></div>');
					var nvnexttop = $('#masonry_2').offset().top;
					//window.scrollTo(0,nvnexttop-46);
					//xhr.setRequestHeader('X-PJAX', 'true')
				  },
				  success: function(data){
					$('#masonry_2').html(data);
					
					//history.pushState(null, $(data).filter('title').text(), url);
					/**/
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
		}	
	};
	var typedh = function(){
		if($("#zq_dh").size() > 0){
			$("#zq_dh").find(".dhpjax").unbind("click").bind("click",function(){
				var type = $(this).attr("data-type");
				$(this).addClass("current");	
				$(this).siblings(".dhpjax").removeClass("current");
				var url = $(this).attr("data-url")+"&top_pjax=1";
				$.ajax({
				  url: url,
				  dataType: 'html',
				  beforeSend: function(xhr){
					$(window).unbind('.infscr');//瀑布流滚动解绑
					$("#data-loading").remove();
					$('#contentbox').html('<div class="imgloading" style="height:300px; width:100%"></div>');
					//xhr.setRequestHeader('X-PJAX', 'true')
				  },
				  success: function(data){
					
					$('#contentbox').html(data);
					//history.pushState(null, $(data).filter('title').text(), url);
					mas.masonryInit({
						masonry:"masonry_2",
						issearch:true,
						islazy:1,
						callback:function(){
						}
					});
					choose_dh();
					$("#choose-list,#choose-list-modalMask").remove();
					//图片懒加载
					$("img.lazy,img.avatar_lazy").lazyload({
						effect: "fadeIn",
						threshold:500,//滚动条在离目标位置还有1000的高度时就开始加载图片
						failurelimit:100,
						skip_invisible : false 	
					});
				  }
				})
			});
		}
	};
	//搜索结果
	var selectsearchType = function(){
		$("#s-input-tab-jieguo").unbind("click").bind("click",function(){
			var isshow = $("#J_TabNav_jieguo").is(":hidden");	
			if(isshow){
				$("#J_TabNav_jieguo").show();	
			}else{
				$("#J_TabNav_jieguo").hide();	
			}
		});
		$("#s-input-tab-jieguo").find("li").unbind("click").bind("click",function(){
			//var thisval = $(this).text();
			//var thisval_type = $(this).attr("data-val");
			var url = $(this).attr("data-url");
			window.location.href=url;
			//$("#s-input-val").text(thisval);
			//$("#searchtyleval").val(thisval_type);	
		});
	};
	return searchInit();
});

