// JavaScript Document
var MyShare = function(){
	var myShareInit = function(opt){
		BaseInitClass.baseInit();//整个网站公共初始化
		buttonBindFn();
		if(opt.flag == 0){
			MasonryUtils.masonryInit({
				masonry:"masonry",
				issearch:false,
				islazy:0,
				callback:function(){
					//评论删除绑定
					//commentDel();
					if(opt.msg == 1){
						//删除记录
						messageDel();
						//私聊TA
						chatBtn({});
						//baguetteBox.run('.baguetteBoxOne');
					}
					if(opt.order == 1){
						//订单管理按钮操作
						orderActBtn();	
					}
					if(opt.cashlist == 1){
						//提现记录
						cashlist();	
					}
				}
			});//瀑布流初始化
		}else{
			MasonryUtils.masonryInit({
				masonry:"masonry_2",
				issearch:false,
				islazy:1,
				callback:function(){
					
				}
			});//瀑布流初始化	
		}
		
	};
	
	var myshareBase = function(options){
		var settings = {
			mod:""	
		};	
		if(options){
			$.extend(settings,options);		
		}
		if(settings.mod == "user_settings"){
			user_settings();
		}else if(settings.mod == "userinfo" || settings.mod == "userfollowers" || settings.mod == "userfollowing"){
			userinfo();	
		}else if(settings.mod == "mysharemoney"){
			mysharemoney();	
		}else if(settings.mod == "myorder"){
			myorder();	
		}else if(settings.mod == "myorders"){
			myorders();	
		}else if(settings.mod == "myreturn"){
			myreturn();		
		}else if(settings.mod == "get_pinlist" || settings.mod == "mylikes" || settings.mod == "usershares" || settings.mod == "user_pinlist"){
			get_pinlist();
		}else if(settings.mod == "myshares"){
			myshares();	
		}else if(settings.mod == "cash"){
			cash();	
		}else if(settings.mod == "aftersales"){
			aftersales();	
		}
	};
	//按钮绑定事件
	var buttonBindFn = function(){
		//私聊TA
		chatBtn({});
		//关注个人
		BaseInitClass.followBtn();
		//用户资料编辑
		$("#editProfile").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=profile',
				type: "GET",
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					var mynumIndex = $("#profileTipbox").attr("data-index");
					AlertUtils.centerDiv({"divId":"profileTipbox","type":1,"callback":function(){
						//头像懒加载
						$("#profileForm").find(".avatar_loading").checkImgExists();
						//上传头像
						creatWeixinGroup.upGroupAvatar({
							avatartype:'person',
							btn:$('.up_rzpic'),
							callback:function(opt){
								opt.btn.siblings(".profileImageWrapper").find("img").attr("src",opt.resin.data);	
							}	
						});
						
						$("#profileForm").checkInput({
							submitBtnFn: function (from) {
								var dataFrom = from.serializeJson();
								AjaxFunUtils.ajaxInit({
									url:"/user/setting_update.html?type=info1",
									params:dataFrom, 
									callback:function (result) {
										AlertUtils.tips({
											htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
											w:"90%",
											type:0,
											scallback:function(){
												AlertUtils.centerDivClosed({
													"indexTipDiv":$("#profileTipbox"),
													"indexNum":mynumIndex,
													"type":1
												});
												window.location.reload();
											}
										});
									}
								});
								
							}	
						});		
					}});
				}
			});
		});
		
	};
	//用户资料详细设置
	var user_settings = function(){
		$(".fancyToggle").toggleUtils({});
		$(".toc li").scrollPosition({"o":"accountBasics"});
		//头像懒加载
		$("#userSettingsForm").find(".avatar_loading").checkImgExists();
		//上传头像
		creatWeixinGroup.upGroupAvatar({
			avatartype:'person',
			btn:$('.up_rzpic'),
			callback:function(opt){
				opt.btn.find(".profileImage").attr("src",opt.resin.data);	
			}	
		});

		//密码修改
		$("#changePasswordButton").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=editPwd&ch=sns',
				type: "GET",
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({"divId":"pwdTipBox","type":1,"callback":function(){
						//忘记密码
						$(".forgotPassword").unbind("click").bind("click",function(){
							AjaxFunUtils.ajaxInit({
								"url":"/user/forgotPassword.html", 
								"params":{}, 
								"callback":function (result) {
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
										w:"90%"
									});
								}
							})	
						});
						//修改密码
						$("#pwdFrom").checkInput({
							inputs:{
								"OldPwd":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:''}
							},
							submitBtnFn: function (from) {
								var dataFrom = from.serializeJson();
								AjaxFunUtils.ajaxInit({
									"url":"/user/editpwd.html",
									"params":dataFrom, 
									"callback":function (result) {
										if(result.status){
											AlertUtils.tips({
												htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
												w:"90%",
												type:0,
												scallback:function(){
													window.location.href = '/user/setting.html';
												}
											});
										}else{
											AlertUtils.tips({
												w:"90%",
												type:0,
												htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
											});
											//console.log('data:', result);
										}
									}
								});
							}	
						});
					}});
				}
			});		
		});
		$("#userSettingsForm").checkInput({
			submitBtnFn: function (from) {
				var dataFrom = from.serializeJson();
				//console.log( dataFrom);
				AjaxFunUtils.ajaxInit({"url":"/user/setting_update.html?type=info2", "params":dataFrom, "callback":function (result) {
					if(result.status){
						AlertUtils.tips({
							w:"90%",
							type:0,
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>',
							scallback:function(){
								window.location.href = '/share/myshares.html';	
							}
						});
					}else{
						AlertUtils.tips({
							w:"90%",
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
						});
					}
                }});
			}	
		});	
	};
	
	//userinfo person关注处理
	var userinfo = function(){
		//followBtn();
	};
	
	
	//分享列表
	var get_pinlist = function(){
	};
	//分享列表
	var myshares = function(){
		//MasonryUtils.masonryInit({masonry:"masonry"});
	};
	
	//售后中心
	var aftersales = function(){
		//售后对话流程
		myreturn();
		function myreturn(){
			//订单管理按钮操作
			orderActBtn();
			$("#orderquestion").checkInput({
				button:'.btn-Save',
				submitBtnFn: function (subFrom) {
					var dataFrom = subFrom.serializeJson();
					AjaxFunUtils.ajaxInit({
						url:'/mybuys/orderquestion.html',
						params:dataFrom,
						callback:function(res){
							if(res.status){
								var txt = $("#txt").val();
								var d = new Date();
								var time = "刚刚";
								var trHtml = '<li class="line24 mt-10 mb-10"><p>时间：<span class="color-333">'+time+'</span> 操作：<span class="color-333">'+lang.js_myshare_Myself+'</span></p><p>'+txt+'</p></li>';
								$("#txt").val('');
								$("#messageList").before(trHtml);
							}else{
								AlertUtils.tips({
									htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
									w:350
								});
							}
						}
					})
				}
			});
		};	
	};
	//提现记录
	var cashlist = function(){
		$(".lxkefu_btn").unbind("click").bind("click",function(){
			customerservice({});
		});	
	};
	//提现申请
	var cash = function(){
		$(".cash_shmoney_btn").unbind("click").bind("click",function(){
			var cashid = $(this).attr("data-cashid");	
			AjaxFunUtils.ajaxInit({
				url: '/mybuys/cash.html',
				params:{act:"cancel",cash_id:cashid},
				callback:function(res){
					if(res.status == 1){
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							type:0,
							scallback:function(){
								window.location.reload();	
							}
						});	
						
					}else{
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							type:0
						});	
					}		
				}
			});
		});
		//绑定手机
		$(".sns_bindmobile").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/user/bang_cellphone.html?allways=1',
				type: "GET",
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					var mobileHtml = $(data).find("#sns_bindmobilehtml").html();
					var tipHtml = '<div id="bindmobileTipBox" class="tipbox fade loaded" data-index="0" style="position: absolute;display:none"><div class="tipbox-in" data-index="0"><h1 class="tiptop">绑定登录手机</h1><span class="ico02 tipclose closeBtnHtml"></span><div class="tipcont" style="padding:0 10px 10px">'+mobileHtml+'</div></div></div>';
					$("body").append(tipHtml);
					AlertUtils.centerDiv({"divId":"bindmobileTipBox","type":1,callback:function(){
						var actionurl = $("#sns_bindmobileform").attr("data-action");
						$("#sns_bindmobileform").checkInput({
							validatetype:0,
							button:'.btn-bintmobile',
							//验证完了，提交表单要干的事情
							submitBtnFn: function (from) {
								Loading.loadInit({status:1});
								var dataFrom = from.serializeJson();
								dataFrom.allways = 1;
								AjaxFunUtils.ajaxInit({"url": actionurl, 
									"params":dataFrom,
									"callback":function (result) {
										if(result.status){
											AlertUtils.tips({
												type:0,
												htmlmsg:'<div style="padding:30px">' + result.msg+'</div>',
												scallback:function(){
													window.location.reload();
												}
											});
										}else{
											AlertUtils.tips({
												type:0,
												htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
											});
										}
										
										Loading.loadInit({status:0});
									}
								});
							}
						});	
					}});
				}
			});
		});
		//支付账户,微信管理设置
		$(".setpayacount").unbind("click").bind("click",function(){
			var typeid = $(this).attr("data-type");
			var title = $(this).attr("data-title");
			var acturl = $(this).attr("data-acturl");
			var tiptitle = $(this).attr("data-tiptitle");
			var validate =  $(this).attr("data-validate");
			isbindacount({typeid:typeid,title:title,acturl:acturl,tiptitle:tiptitle,validate:validate});
		});
		//联系客服
		$(".lxkefu_btn").unbind("click").bind("click",function(){
			customerservice({});
		});
		//提现申请
		applycash();
		
		function applycash(){
			$("#applycashbtn").removeClass("btn-danger-gray");
			$("#cashForm").checkInput({
				button:'#applycashbtn',
				submitBtnFn: function (subFrom) {
					var actionUrl = $("#cashForm").attr("data-action");
					var dataFrom = subFrom.serializeJson();
					var thismoneyVal = $("#cash_shmoney").val();
					var weixin_isguanzhu = $("#weixin_isguanzhu").val();
					if(weixin_isguanzhu == 1){
						applycashgo();	
					}else{
						gzweixin({
							callback:function(){
								$("#gzwx_text").text("已关注.");
								applycashgo();
							},
							errcallback:function(msg){
								AlertUtils.tips({
									htmlmsg:'<div style="padding:30px">'+msg+'</div>',
									type:0
								});	
							}	
						});
					}
					function applycashgo(){
						Loading.loadInit({status:1});
						AjaxFunUtils.ajaxInit({
							url:actionUrl,
							params:dataFrom,
							callback:function(res){
								//return false;
								if(res.status == 1){
									customerservice({
										type:2,
										check_id:res.data.check_id	
									});
									Loading.loadInit({status:0});
								}else if(res.status == -1){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										type:0,
										callback:function(){
											$(".btnTipsubmit").html("关注微信公众号");	
										},
										scallback:function(){
											window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA3NTM5Mzg2NA==&mid=206134523&idx=1&sn=b052274af6c6633a2e2db14c7a10e577#rd";	
										}
									});	
									Loading.loadInit({status:0});
								}else{
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										type:0
									});	
									Loading.loadInit({status:0});
								}
								
							}
						});	
					}
					
				}
			});	
		}
		
	};
	//申请售后按钮
	var applicationBtn = function(){
		orderActBtn();
		$(".applicationBtn").unbind("click").bind("click",function(){
			var actHtml = $(this).siblings(".act-box").html();
			AlertUtils.tips({
				title:"申请售后",
				htmlmsg:'<div style="padding:30px">'+actHtml+'</div>',
				callback:function(){
					orderActBtn();	
				}
			});	
		});
	};
	//订单所有按钮绑定
	var orderActBtn = function(){
		$(".order-act-btn").unbind("click").bind("click",function(){
			closeTip($("#tipbox_0"));
			var acthref = "/mybuys/myorderedt.html";//订单接口
			var orderid = $(this).attr("data-orderid");
			var orderfid = $(this).attr("data-orderfid");
			var act = $(this).attr("data-act");
			var gdid = $(this).attr("data-gdid");
			var ogid = $(this).attr("data-ogid"); 
			var num = $(this).attr("data-num");
			var price = $(this).attr("data-price");
			var ccid = $(this).attr("data-ccid");
			var page = $(this).attr("data-page");
			var ch = $(this).attr("data-ch");
			if(ch == "aftersales"){
				//售后接口
				acthref = "/mybuys/myordercanceledt.html";	
			}
			if(act == "cancel"){
				//取消订单
				cancelOrder();	
			}else if(act == "returns" || act == "change" || act == "pmoney"){
				//申请退款，申请退货，申请补偿金
				returns();	
			}else if(act == "toreturns"){
				toreturns(act,ccid);	
			}else{
				//订单其他操作
				otherOrder();	
			}
			//申请退货
			function returns(){
				//申请退货
				AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=reqGoodsTip&ch=buy',
					type: "GET",
					isloading:true,
					dataType: 'html',
					params: {act:act},
					callback:function(data){
						$("body").append(data);	
						AlertUtils.centerDiv({"divId":"reqGoodsTip",
							"type":1,
							"callback":function(){
								$(".buynum").plus({maxNum:num});
								AjaxFunUtils.ajaxInit({
									url: '/mybuys/getresonslist.html',
									params:{type:act},
									callback:function(res){
										var resHtml = '';
										$.each(res.data,function(index,o){
											var resonid_o = '<option value="'+o.rsid+'">'+o.resontxt+'</option>';	
											resHtml +=resonid_o;
										});
										$("#resonid").html(resHtml);
									}
								});	
							}
						});
						
						$(".reqUpPic").unbind("click").bind("click",function(){
							UploadUtils.uploadInit({
								tip:true,
								uptitle:"图片凭证",
								container:'allcontainer',
								browse_button:'allpickfiles',
								drop_element:'allcontainer',
								bucket:'other_buy',
								multi_selection:false,
								typebucket:3,
								bcallback:function(arrData,odomain){
									$("#imgbox").attr("src",odomain+"/"+arrData.key).show();
									$(".reqUpPic").text(lang.js_myshare_reup);
									$("#imgUrl").val("/"+arrData.key);
									closeUpload();	
								}
							});
						});
						$("#reqGoodsFrom").checkInput({
							submitBtnFn: function (subFrom) {
								var resonidText = $("#resonid").find("option:selected").text();
								var dataFrom = subFrom.serializeJson();
								var reqGoodactUrl = $("#reqGoodsFrom").attr("data-action");
								dataFrom.resontxt = resonidText;
								dataFrom.orderid = orderid;
								dataFrom.gdid = gdid;
								dataFrom.ogid = ogid;
								AjaxFunUtils.ajaxInit({
									url:reqGoodactUrl,
									params:dataFrom,
									callback:function(res){
										if(res.status){
											window.location.href = "/mybuys/aftersales_view.html?ccid="+res.data.ccid;
										}else{
											AlertUtils.tips({
												htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
												w:350
											});
										}
									}
								});
							}
						});
					}
				});
			};
			//寄回商品提交快递单号
			function toreturns(oact,occid){
				AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=returnGoodsTip&ch=buy',
					type: "GET",
					isloading:true,
					dataType: 'html',
					params: '',
					callback: function(data){
						$("body").append(data);
						AlertUtils.centerDiv({
							"divId":"returnGoodsTip",
							"type":1,
							"w":450,
							"callback":function(){
								$("#returnGoodsFrom").checkInput({
									submitBtnFn: function (subFrom) {
										var dataFrom = subFrom.serializeJson();
										var toreturnsactUrl = $("#returnGoodsFrom").attr("data-action"); 
										dataFrom.ccid = ccid;
										dataFrom.act = act;
										dataFrom.gdid = gdid;
										dataFrom.ogid = ogid;
										dataFrom.orderid = orderid;
										dataFrom.orderfid = orderfid;
										dataFrom.shipping_bake = 1;
										AjaxFunUtils.ajaxInit({
											url:toreturnsactUrl,
											params:dataFrom,
											callback:function(res){
												if(res.status == 1){
													AlertUtils.tips({
														htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
														
														type:0,
														scallback:function(){
															var indexNum = $("#returnGoodsTip").attr("data-index");
															AlertUtils.centerDivClosed({indexNum:indexNum,
																indexTipDiv:$("#returnGoodsTip"),
																type:1
															});	
															window.location.href = '/mybuys/aftersales_view.html?ccid='+occid;
														}
													});	
												}else{
													AlertUtils.tips({
														htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
														
														type:0
													});
												}
											}
										})
									}
								});
							}
						});
					}
				});	
			};
			//订单取消订单
			function cancelOrder(){
				AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=cancelOrderTip&ch=buy',
					type: "GET",
					isloading:true,
					dataType: 'html',
					params: '',
					callback: function(data){
						$("body").append(data);
						AlertUtils.centerDiv({
							"divId":"cancelOrderTip",
							"type":1,
							"callback":function(){
								$(".notgoods").unbind("click").bind("click",function(){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">确定要执行该操作吗？</div>',
										scallback:function(){
											AjaxFunUtils.ajaxInit({
												url:'/mybuys/myorderedt.html',
												params:{act:act,orderid:orderid,orderfid:orderfid,cancelType:2,ogid:ogid},
												callback:function(res){
													if(res.status){
														closeTip($("#cancelOrderTip"));
														AlertUtils.tips({
															htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
															type:0,
															scallback:function(){
																var page = BaseInitClass.getQueryString("orderid");
																if(page){
																	window.location.reload();	
																}else{
																	window.location.href = "/mybuys/myorder.html?orderid="+orderid+"&orderfid="+orderfid+"#goodslist";
																}
															}
														});
													}else{
														AlertUtils.tips({
															htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
														});
													}
												}
											});
										}
									});
								});
								$(".hasgoods").unbind("click").bind("click",function(){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">确定要继续申请退/换货吗？如果确定，系统会将本订单置为确认收货</div>',
										scallback:function(){
											AjaxFunUtils.ajaxInit({
												url:'/mybuys/myorderedt.html',
												params:{act:'receipt',orderid:orderid,orderfid:orderfid,ogid:ogid},
												callback:function(res){
													if(res.status){
														closeTip($("#cancelOrderTip"));
														window.location.reload();
													}else{
														AlertUtils.tips({
															type:0,
															htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
														});
													}
												}
											});
											
										}
									});
									
								});
								//var href ="/mybuys/myorder.html?orderid="+orderid+"#goodslist";
								
							}
						});
					}
				});	
			}
			//订单其他操作
			function otherOrder(){
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">确定要执行该操作吗？</div>',
					scallback:function(){
						AjaxFunUtils.ajaxInit({
							url: acthref,
							params:{orderid:orderid,orderfid:orderfid,act:act,ccid:ccid,gdid:gdid,ogid:ogid},
							callback:function(res){
								if(res.status == 1)	{
									if(act=='close'){
										window.location.href="/mybuys/myorders.html";
									}else{
										window.location.reload();
									}
								}else{
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										type:0
									});
								}
							},
							errCallback:function(){}
						});	
					}
				});	
			}
				
		});
	};
	//支付账户管理设置
	var isbindacount = function(options){
		var settings = {
			typeid:1,
			title:'支付账户管理设置',
			tiptitle:'请输入支付账号',
			validate:'mailmoblie',
			acturl:'/mybuys/setpayacount.html'
		};
		if(options){
			$.extend(settings,options);	
		}
		AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=setpayacountTip&ch=buy',
			type: "GET",
			isloading:true,
			dataType: 'html',
			params: '',
			callback: function(data){
				$("body").append(data);
				AlertUtils.centerDiv({divId:"setpayacountTipBox",type:1,position:"fixed"});
				$("#setpayacountTipBox").find(".tiptop").html(settings.title);
				$("#setpayacountTipBox").find(".ui-Input").attr("placeholder",settings.tiptitle);
				$("#setpayacountTipBox").find(".ui-Input").attr("data-validate",settings.validate);
				$("#setpayacountFrom").checkInput({
					submitBtnFn: function (subFrom) {
						Loading.loadInit({status:1});
						var dataFrom = subFrom.serializeJson();
						dataFrom.type = settings.typeid;
						AjaxFunUtils.ajaxInit({
							url:settings.acturl,
							params:dataFrom,
							callback:function(res){
								Loading.loadInit({status:0});
								if(res.status == 1){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										w:"90%",
										type:0,
										scallback:function(){
											window.location.reload();
										}
									});
									var num = $("#setpayacountTipBox").attr("data-index");
									AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#setpayacountTipBox"),type:1});	
	
								}else if(res.status == 2){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										w:"90%",
										callback:function(){
											$(".btnTipsubmit").find(".buttonText").text(lang.js_base_emailyz);	
										},
										scallback:function(){
											AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#setpayacountTipBox"),type:1});	
											window.location.href = '/user/setting.html';	
										}
									});	
								}else{
									AlertUtils.tips({
										w:"90%",
										type:0,
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>'
									});	
								}	
							}	
						});		
					}
				});	
				
			}
		});	
	};
	//钱包
	var mysharemoney = function(){
		//支付账户管理设置
		$(".setpayacount").unbind("click").bind("click",function(){
			var typeid = $(this).attr("data-type");
			isbindacount({typeid:typeid});
		});
	};
	//认证中心，申请认证
	var certCenter = function(options){
		var settings = {
			defcont:''	
		};
		$.extend(settings,options);
		//提交认证按钮操作
		$("#rzform").checkInput({
			validatetype:0,
			submitBtnFn: function (from) {
				var imgflag = isimg();
				if(!imgflag){
					return false;	
				}
				var dataFrom = from.serializeJson();
				var actionurl = $("#rzform").attr("data-action");
				AjaxFunUtils.ajaxInit({url:actionurl,
					params:dataFrom,
					callback:function(res){
						if(res.status){
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0,
								scallback:function(){
									window.location = '/identify.html';	
								}
							});	
						}else{
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0
							});		
						}
					}
				})
			}
		});
				
		//默认加载模块
		loadRzCont(settings.defcont);
		//认证类型
		$("#rztypebox").find("input").change(function(){
			var rztype = $(this).attr("data-type");	
			switch(rztype){
				case "sns_desper":
					loadRzCont(rztype);
					break;
				case "sns_descom":
					loadRzCont(rztype);
					break;
				case "sns_brandper":
					loadRzCont(rztype);
					break;
				case "sns_brandcom":
					loadRzCont(rztype);
					break;
				case "sns_masterper":
					loadRzCont(rztype);
					break;
				case "sns_mastercom":
					loadRzCont(rztype);
					break;
				default:
				break;
			}
		});
		//加载认证内容
		function loadRzCont(orztype){
			AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page='+orztype+'&ch=sns',
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("#rzcont").html(data);
					bindUpheadler();
				}
			});
		};
		//设计风格分类
		function desstyle(){
			//下拉框初始化
			$(".select_box").selectUtils({});	
		}
		//是否有图片
		function isimg(){
			var isupflag = false;
			$(".uppro_pic").each(function(index, element) {
				  $(this).checkboxFn({
					checkbox:'hidden',
					scallback:function(othis){
						othis.removeClass("error_validate");	
						isupflag = true;
					},
					errorcallback:function(othis){
						othis.addClass("error_validate");	
						isupflag = false;	
					}	
				});	
				return isupflag
            });
			return isupflag;
		}
		//认证图片上传事件
		function bindUpheadler(){
			up_rzpic();
			function up_rzpic($obtn){
				var $btn = $(".up_rzpic");
				if($obtn){
					$btn = $obtn;		
				}
				$btn.unbind("click").bind("click",function(){
					var $this = $(this);
					var inputName = $(this).attr("data-name");
					var type = $this.attr("data-type");
					var title = $this.attr("data-title");	
					var $imgbox = $this.siblings(".uppro_pic_list");
					var ismult = false;
					var fileNumLimit = 1;
					if(type == 3){
						ismult = true;
						fileNumLimit = 3;	
					}
					UploadUtils.uploadInit({
						tip:true,
						uptitle:title,
						container:'allcontainer',
						browse_button:'allpickfiles',
						drop_element:'allcontainer',
						bucket:'other_sns',
						multi_selection:false,
						typebucket:3,
						bcallback:function(arrData,odomain){
							var lihtml = '<li class="li_del"><input type="hidden" class="hideimageurl" name="'+inputName+'" value="/'+arrData.key+'|0|0|0|0|0"><img src="'+odomain+"/"+arrData.key+'" /><div class="operate"><i class="ico del"></i></div></li>';
							$imgbox.find("ul").append(lihtml);
							hoverImg($imgbox,$this,type);
							closeUpload();	
							isup($imgbox,$this,type);
							delImg($imgbox,$this,type);
						}
					});
				});
			}
			//鼠标经过显示删除按钮
			function hoverImg($imgbox,$this,type){
				$imgbox.show();
				$imgbox.find("li").hover(function(){
					$(this).find(".operate").show();	
				},function(){
					$(this).find(".operate").hide();
				});	
			}
			//删除图片
			function delImg($imgbox,$this,type){
				$imgbox.find(".del").unbind("click").bind("click",function(){
					$(this).parents("li.li_del").remove();	
					var num = $imgbox.find("li").size();
					if(num <= 0){
						$imgbox.hide();	
					}
					isup($imgbox,$this,type);
				});	
			}
			//是否可以继续上传
			function isup($imgbox,$this,type){
				isimg($imgbox,$this,type);
				var num = $imgbox.find("li").size();
				var maxNum = 1;
				if(type == 3){
					maxNum = 3;	
				}
				var flg = true;
				if(num >= maxNum ){
					$this.addClass("btn-danger-gray");
					$this.unbind("click");
					flg = false;
					return flg;	
				}else{
					$this.removeClass("btn-danger-gray");
					up_rzpic();
					maxNum = maxNum - num;
					return flg;
				}
					
			}
				
		}
	};
	return {
		myShareInit:myShareInit,
		applicationBtn:applicationBtn,
		orderActBtn:orderActBtn,
		myshareBase:myshareBase,
		certCenter:certCenter
	}
}();
