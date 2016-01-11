define(['jquery','config','base','ajax','swiper'],function($,config,base,AjaxFunUtils){
	var init = function(){
		//公共JS
		base.init();
		//广告切换图片
		var activitySwiper = new Swiper('#swiper-container-ad', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.swiper-pagination-ad',
			loop : true,
			loopAdditionalSlides : 1
		})
		
		$(".btn-bysshare-wx").unbind("click").bind("click",function(){
			config.shareweinxtip({});		
		});
		
	};
	//众筹列表
	var crowlist = function(){
		var url = $("#crowlist").attr("data-url");	
		$.ajax({
		  url: url,
		  data: {ajax:1},
		  dataType: 'json',
		  beforeSend: function(xhr){
			$('#crowlist').html('<div class="imgloading" style="height:180px; width:100%"></div>');
		  },
		  success: function(res){
			$('#crowlist').html(res.data.html);
		  }
		})	
	};	
	//红包列表
	var redmoneylist = function(){
		var url = $("#redmoneylist").attr("data-url");
		$.ajax({
		  url: url,
		  data: {ajax:1},
		  dataType: 'json',
		  beforeSend: function(xhr){
			$('#redmoneylist').html('<div class="imgloading" style="height:180px; width:100%"></div>');
		  },
		  success: function(res){
			$('#redmoneylist').html(res.data.html);
			//头像图片懒加载
			$('#redmoneylist').find("img.avatar_lazy").checkImgExists(function(obj,imgurl){
				var $myopj = obj;
				var myimgurl = imgurl;
				var $thisp = $myopj.parent(".useravatar_bg");
				$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
			});
		  }
		})	
	};
	//砍价列表
	var goodscutlist = function(){
		var url = $("#goodscutlist").attr("data-url");
		$.ajax({
		  url: url,
		  data: {ajax:1},
		  dataType: 'json',
		  beforeSend: function(xhr){
			$('#goodscutlist').html('<div class="imgloading" style="height:180px; width:100%"></div>');
		  },
		  success: function(res){
			$('#goodscutlist').html(res.data.html);
			//头像图片懒加载
			$('#goodscutlist').find("img.avatar_lazy").checkImgExists(function(obj,imgurl){
				var $myopj = obj;
				var myimgurl = imgurl;
				var $thisp = $myopj.parent(".useravatar_bg");
				$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
			});
		  }
		})	
	};
	
	//我也要众筹
	var wantchips = function(){
		config.shareweinxtip({
			callback:function(obj){
				var bodyH = config.base.getHeightBody()-150;
				var sharehtml = '<div style="max-width:720px;margin:0 auto;" class="sharehtml line24">'+
						'<img src="http://static.byshare.com/moblie/images/zc-info.png?v=33" style="height:'+bodyH+'px;width:auto;max-widht:none; margin:0 auto" />'+
						'<p class="text-center add-crowd-in"><a href="/m_buy/public_c_show.html?h_name=%E8%B6%85%E7%BA%A7%E7%AD%B9&activity=2&nt_show_attr=1"><button class="btn btn-ff9402 line30  w200" style="font-size:21px">立刻发起众筹</button></a></p>'+
				   '</div> ';
				obj.append(sharehtml).css({"background":"none"});	
			}	
		});
		//禁止浏览滚动条	
		$('#share_tip').bind("touchmove",function(e){  
			e.preventDefault();  
		});
	};
	//调用微信接口
	var apiweixin = function(opt){
		AjaxFunUtils.ajaxInit({
			url:'/m_raise/goodsraise_add_reward.html', 
			params:{}, 
			callback:function (res) {
				if(res.status == 1){
					config.tip.tips({
						htmlmsg:'<div style="padding:30px"><p>'+res.msg+'</p></div>',
						scallback:function(){
							
						}
					});
				}else if(res.status == -2){
					config.tip.tips({
						htmlmsg:'<div style="padding:30px"><p>'+res.msg+'</p></div>',
						callback:function(){
							$(".btnTipsubmit").text('我要众筹');	
						},
						scallback:function(){
							wantchips();
						}
					});
				}else{
					
				}	
			}
		});	
	};
	return {
		init:init,
		redmoneylist:redmoneylist,
		crowlist:crowlist,
		goodscutlist:goodscutlist,
		apiweixin:apiweixin,
		wantchips:wantchips
	}
});