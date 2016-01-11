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
require(['jquery','config','ajax','activity','comm/customerservice','mas','comm/chooseFn','base',],function($,config,AjaxFunUtils,activity,customerservice,mas,choose){
	//抢红包
	var grabredenvelope = function(){
		//分享按钮
		$(".btn-share-btn").unbind("click").bind("click",function(){
			config.shareweinxtip({class:'share_tip_crowd'});
		});
		$("#money_01_img").unbind("click").bind("click",function(){
			config.shareweinxtip({class:'share_tip_inv'});
		});
		//产品列表
		foryouList();
		activity.init();
		//众筹列表
		activity.crowlist();
		//红包列表
		activity.redmoneylist();
		//抢红包按钮
		$(".money_btn_act").unbind("click").bind("click",function(){
			var $this = $(this);
			var action = $(this).attr("data-url");
			var skey = $(this).attr("data-skey");
			var fsuid = $(this).attr("data-fsuid"); 
			var type = $(this).attr("data-type"); 
			var params = {};
			params.skey = skey;
			params.fsuid = fsuid;
			if(type == 'Invitation'){
				config.shareweinxtip({class:'share_tip_grab'});	
			}else{
				$this.attr("disabled",true);
				AjaxFunUtils.ajaxInit({
					url:action, 
					params:params, 
					callback:function (res) {
						if(res.status == 1){
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								type:0,
								scallback:function(){
									$this.removeAttr("disabled");	
									window.location.reload();	
								},
								closeback:function(){
									$this.removeAttr("disabled");	
									window.location.reload();
								}
							});
						}else if(res.status == -2){
							var js_debug = BaseInitClass.getQueryString("js_debug");
							if(js_debug){
								alert(res.status);	
							}
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								type:0,
								scallback:function(){
									$this.removeAttr("disabled");	
									window.location.reload();	
								},
								closeback:function(){
									$this.removeAttr("disabled");	
									window.location.reload();
								}
							});	
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								type:0,
								scallback:function(){
									$this.removeAttr("disabled");	
								},
								closeback:function(){
									$this.removeAttr("disabled");	
								}
							});	
						}						
					}
				});
			}
		});

		//联系客服
		$(".lxkefu_btn").unbind("click").bind("click",function(){
			customerservice.customerservice({});
		});
		//我也要众筹
		$(".want_crowd_btn").unbind("click").bind("click",function(){
			activity.wantchips();
		});
		
		//请求产品列表
		function foryouList(){		
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
			
			$.ajax({
			  url: '/m_buy/public_c_show.html?h_name=超级筹&catids=15&activity=2&ajax=true',
			  dataType: 'html',
			  beforeSend: function(xhr){
				var nvnexttop = $('#masonry_2').offset().top;
				//$("#data-loading").remove();
				$('#masonry_2').html('<div class="imgloading" style="height:180px; width:100%"></div>');
				//window.scrollTo(0,nvnexttop-45);
				//xhr.setRequestHeader('X-PJAX', 'true')
			  },
			  success: function(data){
				$('#masonry_2').html(data);
				//$(window).unbind('.infscr');//瀑布流滚动解绑
				//history.pushState(null, $(data).filter('title').text(), url);
				mas.masonryInit({
					masonry:"masonry_2",
					issearch:true,
					islazy:1,
					callback:function(){
						//alert(1);
					}
				});
			  }
			})
			
		};
	};
	return grabredenvelope();
});