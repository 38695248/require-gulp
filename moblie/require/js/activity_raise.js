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
require(['jquery','config','base','ajax','countdown','checkInput','serializeJson'],function($,config,base,AjaxFunUtils){
		//抢现金红包、享0元众筹
	var init = function(){
		//第一次
		var js_first = config.base.getQueryString("js_first");
		if(js_first == 1){
			config.shareweinxtip({
				isclose:0,
				callback:function(objtip,objbg){
					var bodyH = config.base.getHeightBody()-150;
					var sharehtml = '<span class="custom-close" style="right:15px; top:15px"></span><div style="width:330px;margin:0 auto;" class="sharehtml line24">'+
							'<p><img src="http://static.byshare.com/moblie/images/activity/zc_bg_01.png?v=33" /></p>'+
							'<p  id="zc_share_btn"><img src="http://static.byshare.com/moblie/images/activity/zc_bg_02.png?v=12" /></p>'+
							'<p><img src="http://static.byshare.com/moblie/images/activity/zc_bg_03.png?v=33" /></p>'+
							'<p id="zc_lq_btn" ><img src="http://static.byshare.com/moblie/images/activity/zc_bg_04.png?v=33" /></p>'+
					   '</div> ';
					objtip.append(sharehtml).css({"background":"none"});	
					//关闭
					$(".custom-close").unbind("click").bind("click",function(){
						objtip.remove();
						objbg.remove();	
					});
					//邀请好友分钱
					$("#zc_share_btn").unbind("click").bind("click",function(event){
						//apiweixin();
						config.shareweinxtip({class:'share_tip_zc'});
						event.stopPropagation();//阻止事件往上冒泡
					});
					//马上领取护肤四件套
					$("#zc_lq_btn").unbind("click").bind("click",function(){
						if(iswxshare == 1){
							window.location.href = '/activity/from3part.html?act=dhcsub';
						}else{
							config.shareweinxtip({class:'share_tip_zc'});
							return false;
						}	
						event.stopPropagation();//阻止事件往上冒泡	
					});
				}	
			});	
		}
		//众筹列表
		//crowlist();
		base.init();
		//页面初始化设置
		pageInt();
		
		$(".share_yq_btn").unbind("click").bind("click",function(){
			config.shareweinxtip({class:'share_tip_inv'});
		});
		function pageInt(){
			//倒计时
			var thistimers = $("#crowdtimers").attr("data-time");
			$("#crowdtimers").countdownUtils({
				timers:thistimers,
				callback:function(){
					//$("#outtimebox").hide();		
				}
			});
		};
		//提货按钮
		$(".take-btn").unbind("click").bind("click",function(){
			var raiseid = $(this).attr("data-raiseid");
			var rewardtotal = $(this).attr("data-rewardtotal");
			var totalleft = $(this).attr("data-totalleft");
			var type = $(this).attr("data-type");
			var totalleft_html='';
			htmltip = '<div style="padding:30px" class="text-center"><p class="mb-5 f22 color-red">现在打赏，全国包邮</p><p class="mb-10 f16">支持百享赏金:<span class="color-red">¥'+rewardtotal+'</span></p><p class="mb-10"><a href="/m_raise/goodsraise_end.html?raiseid='+raiseid+'&reward_afpay=2"><button type="button" class="btn btn-red w220">立即打赏</button></a></p></div>';
			config.tip.tips({
				htmlmsg:htmltip,
				callback:function(){
					$("#tipbottom").hide();	
				}
			});	
		});
		//分享按钮
		$(".btn-share-i").unbind("click").bind("click",function(){
			config.shareweinxtip({class:'share_tip_crowd'});
		});
		//现金,享金,完成，取消，我要按钮
		$(".crowd-btn").unbind("click").bind("click",function(){
			var act = $(this).attr("data-act");
			var type = $(this).attr("data-type");
			var raiseid = $(this).attr("data-raiseid");
			var actionurl = $(this).attr("data-url");
			var israised = $(this).attr("data-israised");	
						
			if(act == 'cash' || act == 'gold'){
				//支付弹窗
				payTip();
			}else if(act == 'want'){
				//我也要众筹
				wantchips();	
			}else if(act == 'complete' || act == 'cancel'){
				//完成众筹，取消众筹
				completeancancel();	
			}
			//完成取消众筹
			function completeancancel(){
				config.tip.tips({
					htmlmsg:'<div style="padding:30px">'+config.base.lang.js_myshare_perform+'</div>',
					scallback:function(){
						AjaxFunUtils.ajaxInit({url: actionurl,
							params:{raiseid:raiseid},
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
			//现金，享金支持弹窗
			function payTip(flag){
				$("#raise_money").val('');	
				$("#pay_f_m_input").val('');
				config.tip.centerDiv({
					divId:'sns_crowdtip',
					position:'fixed',
					type:2,
					istop:1,
					w:'100%',
					touchmove:1,
					callback:function(){
						//支持说明
						if(type == 1 || flag == 1){	
							type = 1;
							$("#pay_title").html("现金支持");
							$("#xianj_box").show();
							$("#xiangj_box").hide();	
							$("#sharemony_box").hide();			
						}else{
							$("#pay_title").html("享金支持");
							$("#sharemony_box").show();
							$("#xianj_box").hide();
							$("#xiangj_box").show();	
							$("#xiangj_box").find("li").unbind("click").bind("click",function(){
								var thisval = $(this).attr("data-val");
								$(this).addClass("current");
								$(this).siblings("li").removeClass("current");
								$("#raise_money").val(thisval);	
							});
						}
						$("#pay_f_m_input").unbind("click").bind("click",function(){
							var html = '<textarea name="textarea" id="zc-textarea-text" maxlength="50" style="height:50px" placeholder="您想对您朋友说的话"></textarea>';
							var $this = $(this);
							var text_i = $(this).val();
							config.tip.tips({
								title:'支持说明',
								htmlmsg:'<div style="padding:10px">'+html+'</div>',
								callback:function(){
									$("#zc-textarea-text").val(text_i);	
								},
								scallback:function(){
									var thisInpVal = $("#zc-textarea-text").val();
									$this.val(thisInpVal);
								}
							});	
						});
						//现金,享金支付提交
						$("#sns_crowdform").checkInput({
							validatetype:0,
							button:'#crowd-submit-btn',
							submitBtnFn: function (from) {
								config.base.loadInit({status:1});
								var subdataFrom = from.serializeJson();
								subdataFrom.type = type;
								subdataFrom.raiseid = raiseid;
								AjaxFunUtils.ajaxInit({url: actionurl,
									params:subdataFrom,
									callback:function(res){
										config.base.loadInit({status:0});
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
										}else if(res.status==-8){
											window.location.href='/myorder/uni2pay.html?type=wxh5&orderid='+res.data.orderid;
										}else{
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
										};
									}
								})
							}
						});
					}
				});
			};
			
		});
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
	}
	return init();
});