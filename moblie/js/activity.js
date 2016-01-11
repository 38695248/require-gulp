// JavaScript Document
var ActivityClass = function(){
	var baseactivity = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	var activityInit = function(){
		if(i_timers > 0){
			$("#outtimebox").show();	
			//倒计时
			$("#timebox").countdownUtils({
				timers:i_timers,
				callback:function(){
					//$("#outtimebox").hide();		
				}
			});
		}else{
			$("#outtimebox").hide();	
		}
		
		
		$(".btn-bysshare-wx").unbind("click").bind("click",function(){
			shareweinxtip({});		
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
	//砍价
	var goodscut = function(){
		//公共
		baseactivity();
		//砍价列表
		goodscutlist();
		//倒计时
		var thistimers = $("#crowdtimers").attr("data-time");
		$("#crowdtimers").countdownUtils({
			timers:thistimers,
			callback:function(){
				//$("#outtimebox").hide();		
			}
		});
		//邀请好友帮忙砍价
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
				shareweinxtip({class:'wx_bg_cut'});
				event.stopPropagation();//阻止事件往上冒泡
			}else if(act == 'cy' || act == 'more' || act == 'buy_cut'){
				window.location.href=actionurl;
			}else if(act == 'sub'){
				AjaxFunUtils.ajaxInit({url: actionurl,
					params:{cutid:cutid},
					callback:function(res){
						if(res.status==1){
							AlertUtils.tips({
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
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0
							});
						}
					}
				});
			};
			//完成取消众筹
			function cancelgoodscut(){
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">'+lang.js_myshare_perform+'</div>',
					scallback:function(){
						AjaxFunUtils.ajaxInit({url: actionurl,
							params:{cutid:cutid},
							callback:function(res){
								if(res.status==1){
									AlertUtils.tips({
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
									AlertUtils.tips({
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
	//抢现金红包、享0元众筹
	var crowdfunding = function(){
		//第一次
		var js_first = BaseInitClass.getQueryString("js_first");
		if(js_first == 1){
			shareweinxtip({
				isclose:0,
				callback:function(objtip,objbg){
					var bodyH = getHeightBody()-150;
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
						shareweinxtip({class:'share_tip_zc'});
						event.stopPropagation();//阻止事件往上冒泡
					});
					//马上领取护肤四件套
					$("#zc_lq_btn").unbind("click").bind("click",function(){
						if(iswxshare == 1){
							window.location.href = '/activity/from3part.html?act=dhcsub';
						}else{
							shareweinxtip({class:'share_tip_zc'});
							return false;
						}	
						event.stopPropagation();//阻止事件往上冒泡	
					});
				}	
			});	
		}
		//众筹列表
		//crowlist();
		baseactivity();
		//页面初始化设置
		pageInt();
		
		$(".share_yq_btn").unbind("click").bind("click",function(){
			shareweinxtip({class:'share_tip_inv'});
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
			AlertUtils.tips({
				htmlmsg:htmltip,
				callback:function(){
					$("#tipbottom").hide();	
				}
			});	
		});
		//分享按钮
		$(".btn-share-i").unbind("click").bind("click",function(){
			shareweinxtip({class:'share_tip_crowd'});
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
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">'+lang.js_myshare_perform+'</div>',
					scallback:function(){
						AjaxFunUtils.ajaxInit({url: actionurl,
							params:{raiseid:raiseid},
							callback:function(res){
								if(res.status==1){
									AlertUtils.tips({
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
									AlertUtils.tips({
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
				AlertUtils.centerDiv({
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
							AlertUtils.tips({
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
								Loading.loadInit({status:1});
								var subdataFrom = from.serializeJson();
								subdataFrom.type = type;
								subdataFrom.raiseid = raiseid;
								AjaxFunUtils.ajaxInit({url: actionurl,
									params:subdataFrom,
									callback:function(res){
										Loading.loadInit({status:0});
										if(res.status==1){
											AlertUtils.tips({
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
											AlertUtils.tips({
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
		shareweinxtip({
			callback:function(obj){
				var bodyH = getHeightBody()-150;
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
	//点我领码
	var dotmycollar = function(){
		MasonryUtils.masonryInit({
			masonry:"masonry_2",
			issearch:true,
			islazy:1,
			callback:function(){
			}
		});
		$("#btn-dwlm").unbind("click").bind("click",function(){
			var action = $(this).attr("data-action");
			var params = JSON.parse($(this).attr("data-params"));
			AjaxFunUtils.ajaxInit({
				url:action, 
				params:params, 
				callback:function (res) {
					if(res.status == 1){
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							callback:function(){
								$(".btnTipsubmit").find(".buttonText").text('查看优惠券');	
							},
							scallback:function(){
								window.location.href = '/mybuys/mycoupons.html';
							}
						});	
					}else{
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>'
						});	
					}
				}
			});	
		});	
	};
	//抢红包
	var grabredenvelope = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
		//分享按钮
		$(".btn-share-btn").unbind("click").bind("click",function(){
			shareweinxtip({class:'share_tip_crowd'});
		});
		$("#money_01_img").unbind("click").bind("click",function(){
			shareweinxtip({class:'share_tip_inv'});
		});
		//举报
		report_hongbao();
		//产品列表
		foryouList();
		//众筹列表
		crowlist();
		//红包列表
		redmoneylist();
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
				shareweinxtip({class:'share_tip_grab'});	
			}else{
				$this.attr("disabled",true);
				AjaxFunUtils.ajaxInit({
					url:action, 
					params:params, 
					callback:function (res) {
						if(res.status == 1){
							AlertUtils.tips({
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
							AlertUtils.tips({
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
							AlertUtils.tips({
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
		function report_hongbao(){
			$("#reportbox_form").checkInput({
				submitBtnFn: function (from) {
					var dataFrom = from.serializeJson();
					AjaxFunUtils.ajaxInit({
						url:'/mk_market/report_do.html', 
						params:dataFrom, 
						callback:function (res) {
							$("#reportbox_start").hide();
							$("#reportbox_end").show();		
						}
					});
				}
			});
		};
		//联系客服
		$(".lxkefu_btn").unbind("click").bind("click",function(){
			customerservice({});
		});
		//我也要众筹
		$(".want_crowd_btn").unbind("click").bind("click",function(){
			wantchips();
		});
		
		//请求产品列表
		function foryouList(){
			//导航置顶
			chooseFn.dhfixedTop({});
			
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
				MasonryUtils.masonryInit({
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
	//DHC活动
	var dhcact = function(){
		baseactivity();
		//发起众筹
		$("#btn-fqzc").unbind("click").bind("click",function(){
			wantchips();	
		});
		//分享给好友
		$("#btn-bysshare-wx").unbind("click").bind("click",function(){			
			shareweinxtip({class:'share_tip_zc'});		
		});
		$("#btn-lingqu").unbind("click").bind("click",function(){
			var iszc = $(this).attr("data-iszc");
			if(iszc >= 1){
				window.location.href = '/activity/from3part.html?act=dhcsub';
			}else{
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px"><p>亲，你还没有发众筹，发起众筹才能领取哦！</p></div>',
					type:0,
					callback:function(){
						$(".btnTipsubmit").text('我要众筹');	
					},
					scallback:function(){
						wantchips();
					}
				});	
				return false;
			}	
		});
	};
	//调用微信接口
	var apiweixin = function(opt){
		AjaxFunUtils.ajaxInit({
			url:'/m_raise/goodsraise_add_reward.html', 
			params:{}, 
			callback:function (res) {
				if(res.status == 1){
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px"><p>'+res.msg+'</p></div>',
						scallback:function(){
							
						}
					});
				}else if(res.status == -2){
					AlertUtils.tips({
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
	return {activityInit:activityInit,baseactivity:baseactivity,dotmycollar:dotmycollar,grabredenvelope:grabredenvelope,crowdfunding:crowdfunding,dhcact:dhcact,apiweixin:apiweixin,goodscut:goodscut}
}();

