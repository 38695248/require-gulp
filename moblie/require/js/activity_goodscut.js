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
require(['jquery','config','base','ajax','activity','countdown'],function($,config,base,AjaxFunUtils,activity){
	//砍价
	var init = function(){
		activity.init();
		goodscutint();
		goodscutlist();
		//瀑布流
		if($("#masonry").length > 0){
			require(['mas'],function(mas){
				mas.masonryInit({
					masonry:"masonry",
					issearch:false,
					islazy:1,
					callback:function(){
						
					}
				});
	
			});
		}
	};
	//砍价
	var goodscutint = function(){
		//倒计时
		var thistimers = $("#crowdtimers").attr("data-time");
		$("#crowdtimers").countdownUtils({
			timers:thistimers,
			callback:function(){
				//$("#outtimebox").hide();		
			}
		});
		//砍价按钮事件绑定
		$(".goodscut_btn").unbind("click").bind("click",function(event){
			var act = $(this).attr("data-act");
			var type = $(this).attr("data-type");
			var actionurl = $(this).attr("data-url");
			var cutid = $(this).attr("data-cutid"); 
			//console.log(actionurl);
			//return false;
			if(act == 'cancel'){
				//取消砍价
				cancelgoodscut(cutid);	
			}else if(act == 'yq'){
				config.shareweinxtip({class:'wx_bg_cut'});
				event.stopPropagation();//阻止事件往上冒泡
			}else if(act == 'cy' || act == 'more'){
				window.location.href=actionurl;
			}else if(act == 'buy_cut'){
				var gdid = $(this).attr("data-gdid"),
				tagid_color = $(this).attr("data-tagid_color"),
				tagid_size = $(this).attr("data-tagid_size"),
				buynum = $(this).attr("data-buynum");
				//提货
				buy_cut({gdid:gdid,tagid_color:tagid_color,tagid_size:tagid_size,buynum:buynum});
			}else if(act == 'sub'){
				AjaxFunUtils.ajaxInit({url: actionurl,
					params:{cutid:cutid},
					callback:function(res){
						if(res.status==1){
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0,
								scallback:function(){
									window.location.reload();	
								},
								closeback:function(){
									window.location.reload();	
								}
							});	
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0
							});
						}
					}
				});
			};
			function buy_cut(opt){
				AjaxFunUtils.ajaxInit({url: '/goods/sku_ck.html',
					params:opt,
					callback:function(res){
						if(res.status==1){
							window.location.href = '/m_cut/goodscut_end.html?cutid='+cutid;		
						}else if(res.status==-1){
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								scallback:function(){
									require(['comm/sel_sku'],function(sel){
										sel.init({gdid:opt.gdid,page:'goodscut'});	
									});	
								}
							});
								
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0
							});	
						}
					}
				});
			};
			//完成取消众筹
			function cancelgoodscut(){
				config.tip.tips({
					htmlmsg:'<div style="padding:30px">'+config.base.lang.js_myshare_perform+'</div>',
					scallback:function(){
						AjaxFunUtils.ajaxInit({url: actionurl,
							params:{cutid:cutid},
							callback:function(res){
								if(res.status==1){
									config.tip.tips({
										htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
										type:0,
										scallback:function(){
											window.location.reload();	
										},
										closeback:function(){
											window.location.reload();	
										}
									});	
								}else{
									config.tip.tips({
										htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
										type:0
									});
								}
							}
						});
					}
				});	
			};
		});	
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
	return init();
});