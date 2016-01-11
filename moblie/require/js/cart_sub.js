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
require(['jquery','config','base','ajax','address','checkInput','plus','serializeJson','hoverclick'],function($,config,base,AjaxFunUtils,address){
	var init = function(){
		base.init();
		address.init();//获取 收货地址
		getCartList();//获取购物车信息列表初始化息
		submitOrders();//提交订单
		//giftandMassage();//礼物订单和留言
	};
	//获取购车页面信息
	var getCartList = function(justMoney){
		//使用优惠卷，享金，余额支付列表初始化
		var total = '';
		var availshmoney = $("#availshmoney").attr("data-availshmoney");
		var statusshmoney = '';
		var msgshmoney = '';
		getPayList(total,availshmoney,statusshmoney,msgshmoney);
		//显示应付总额
		//countTotal();
	};
	
	
	//使用优惠卷，享金，余额支付列表
	var getPayList = function(optotal,opavailshmoney,ostatus,omsg){
		var myoptotal = Number(optotal);
		var myopavailshmoney = opavailshmoney;
		var myostatus = ostatus;
		
		$(".cartCoupons").hoverAndClickShow({
			"method":"click",
			"autoClose":false,
			"bcallback":function(mythis){
				var $mythis = mythis;
				var status = $mythis.attr("data-status");
				if(myostatus == 0 && status){
					$mythis.siblings(".cartCouponList").html("<p class='color-red' style='padding-top:5px'>" + omsg + "</p>");
				};
				var mythistype = mythis.attr("data-type");
				if(mythistype == 'couponMoney'){
					//检测是否选中优惠劵
					selectCupon();
					function selectCupon(){
						var falg = 0; 
						var thisqcode = '';
						$("#couponList").find(".inputcheckbox").each(function(index, element) {
						   var ischecked = $(this).attr("checked");
						   if(ischecked){
							 falg += 1; 
							 thisqcode = $(this).attr("data-val");
						   }
						});
						if (falg > 0){ 
							$("#couponsInput").attr("readonly",true);
							$("#couponsInput").val(thisqcode);  
							return true; 
						}else {
							$("#couponsInput").attr("readonly",false);
							$("#couponsInput").val('');
							return false; 
						} 
					}
					$("#couponList").find(".inputcheckbox").unbind("click").bind("click",function(){
						var ischecked = $(this).attr("checked"); 
						if(ischecked){
							$(this).parent(".checkbox-parent").siblings(".checkbox-parent").find(".inputcheckbox").attr("checked",false);
						}
						selectCupon();	
					});
				}
			},
			"callback":function(optthis){
				var subtotalCont = parseInt($("#subtotalCont").attr("data-total"));
				
				//验证通过提交支付
				$(".cartCoupon-Btn").unbind("click").bind("click",function(){
					var $this = $(this);
					var $thisinupt = $(this).parents(".startbox").find("input");
					var typepay = $this.attr("data-type");
					var urlpay = '';
					var params = '';
					if(typepay == 'couponMoney'){
						var istotaldiscount = $("#totaldiscount").attr("data-totaldiscount");
						if(istotaldiscount > 0){
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">您已享受“1元包邮”优惠，不能同时使用该优惠卷。</div>',
								type:0,
								scallback:function(){
									$this.siblings("#couponsInput").val('');	
								}
							});
							return false;	
						}
						
						var qcode = $("#couponsInput").val();
						if(!qcode){
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">请输入优惠劵码</div>',
								type:0
							});	
							return false;
						}
						urlpay = '/myorder/ckcashcoupon.html';
						params = {"qcode":qcode};
					}
					
					payAjax($this,$thisinupt,typepay,urlpay,params);
					
				});
				function payAjax($this,$thisinupt,typepay,urlpay,params){
					if(typepay == 'shareMoney' || typepay == 'scoreMoney'){
						//余额，享金支付
						sharemoney({div:$this,input:$thisinupt,typepay:typepay});
					}else{
						AjaxFunUtils.ajaxInit({"url": urlpay,
							"params":params,
							"callback":function(res){
								if(res.status == 1){
									if(res.data.money > 0){
										//获取当前应付的金额
										$("#couponMoney").parents("li").show();
										var ccode = $("#couponsInput").val();
										var $thisParetsib = $this.parents(".startbox").siblings(".endbox");
										$thisParetsib.find(".ccode").html("【"+ccode+"】");
										$thisParetsib.find(".money").html(exrtitle+ '' + res.data.money + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
										$this.parents(".startbox").addClass("hide");
										$thisParetsib.removeClass("hide");
										countTotal({act:'use',type:typepay,val:ccode});
									}else{
										$("#couponMoney").parents("li").hide();	
									};
								}else{
									config.tip.tips({
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
										w:"96%",
										type:0
									});
									if(typepay == 'couponMoney'){
										$("#shareMoney").parents("li").hide();	
									}else if(typepay == 'scoreMoney'){
										$("#scoreMoney").parents("li").hide();	
									}
								}
							}
						});	
					}
					
					canceluseHeader();
				};
				//余额支付
				function sharemoney(opt){
					var $$this = opt.input;
					var mysharemoney = $$this.val();
					
					var flag = regInut($$this,mysharemoney,1);
					if(!flag){
						return false;	
					}else{
						$$this.removeClass('error_validate');	
					};	
					mysharemoney = Number($$this.val()).toFixed(2);		
					//console.log(mysharemoney);
					$$this.val(mysharemoney);
					var $thisParetsib = opt.div.parents(".startbox").siblings(".endbox");
					
					countTotal({
						act:'use',
						type:opt.typepay,
						val:mysharemoney,
						callback:function(res){
							//opt.div.parents(".startbox").addClass("hide");
							//$thisParetsib.removeClass("hide");
						},
						errcallback:function(){
							$$this.val('');	
						}
					});
				};
				//取消使用
				function canceluseHeader(){
					$(".canceluseBtn").unbind("click").bind("click",function(){
						var $this = $(this);
						var type = $(this).attr("data-type");
						$this.parents(".endbox").addClass("hide");
						$this.parents(".endbox").siblings(".startbox").removeClass("hide");	
						$this.parents(".endbox").siblings(".startbox").find("input.textbox").val("");
						var $thisParetsib = $this.parents(".endbox").siblings(".startbox");
						if(type == 'scoreMoney'){
							$("#scoreMoney").parents("li").hide();
						}else if(type == 'couponMoney'){
							$("#couponMoney").parents("li").hide();
							//检测是否选中优惠劵
							selectCupon();
							function selectCupon(){
								var falg = 0; 
								var thisqcode = '';
								$("#couponList").find(".inputcheckbox").each(function(index, element) {
								   var ischecked = $(this).attr("checked");
								   if(ischecked){
									 falg += 1; 
									 thisqcode = $(this).attr("data-val");
								   }
								});
								if (falg > 0){ 
									$("#couponsInput").attr("readonly",true);
									$("#couponsInput").val(thisqcode);  
									return true; 
								}else {
									$("#couponsInput").attr("readonly",false);
									$("#couponsInput").val('');
									return false; 
								} 
							}
							
						}else if(type == 'shareMoney'){
							$("#shareMoney").parents("li").hide();
						};
						countTotal({act:'notuse',type:type,val:''});
					});
				};
				//正则验证
				function regInut($scoretomoney,scoretomoney,type){
					var flag = false;
					if(type == 1){
						var reg = [/^\d+$|^\d+\.\d+$/g,''];
					}else{
						var reg = [/^(\d+)$/,''];
					};
					if (reg[0].test(scoretomoney) && scoretomoney > 0) {
						$scoretomoney.removeClass('error_validate');
						flag = true;
						return flag;
					} else {
						$scoretomoney.addClass('error_validate');
						flag = false;
						return flag;
					}	
				};
			}
		});
	};
	//计算应付总额
	var countTotal = function(opt){
		var type = opt.type;
		AjaxFunUtils.ajaxInit({
			url:'/myorder/count_pay.html',
			params:{act:opt.act,type:opt.type,val:opt.val},
			callback:function(res){
				if(res.status == 1){
					$("#pay_shmoney").html(res.data.pay_shmoney);
					$("#pay_score").html(res.data.pay_score);
					$("#couponMoney").html(exrtitle+ '' + res.data.pay_couponmoney + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
					$("#scoreMoney").html(exrtitle+ '' + res.data.pay_score + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
					$("#shareMoney").html(exrtitle+ '' + res.data.pay_shmoney + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
					$("#availscore").html(res.data.availscore);
					$("#availshmoney").html(res.data.availshmoney);	
					$("#topaytotal").html(res.data.topaytotal);
					if(type == 'shareMoney'){
						if(res.data.pay_shmoney > 0){
							$("#shareMoney").parents("li").show();
							//$("#shmoneyInt").parents(".startbox").addClass("hide");
							//$("#shmoneyInt").parents(".startbox").siblings(".endbox").removeClass("hide");
						}else{
							$("#shareMoney").parents("li").hide();
							//$("#shmoneyInt").parents(".startbox").removeClass("hide");	
							//$("#shmoneyInt").parents(".startbox").siblings(".endbox").addClass("hide");
						}
					}else if(type == 'scoreMoney'){
						if(res.data.pay_score > 0){
							$("#scoreMoney").parents("li").show();	
						}else{
							$("#scoreMoney").parents("li").hide();	
						}
					}
					if(res.data.pay_shmoney > 0){
						$("#shmoneyInt").parents(".startbox").addClass("hide");
						$("#shmoneyInt").parents(".startbox").siblings(".endbox").removeClass("hide");
					}else{
						$("#shmoneyInt").parents(".startbox").removeClass("hide");	
						$("#shmoneyInt").parents(".startbox").siblings(".endbox").addClass("hide");
					}
					if(res.data.pay_score > 0){
						$("#scoreInt").parents(".startbox").addClass("hide");
						$("#scoreInt").parents(".startbox").siblings(".endbox").removeClass("hide");
					}else{
						$("#scoreInt").parents(".startbox").removeClass("hide");
						$("#scoreInt").parents(".startbox").siblings(".endbox").addClass("hide");
					}
					if(opt.callback){
						opt.callback(res);
					}
				}else if(res.status == -1){
					$("#couponList-d").removeClass("show").addClass("hide");	
					$("#couponList").addClass("show");
					config.tip.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						w:"90%",
						type:0,
						scallback:function(){
									
						}
					});
					
				}else{
					config.tip.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						w:"90%",
						type:0
					});
					if(opt.errcallback){
						opt.errcallback();
					}
					return false;	
				}
				
			}
		});		
	};
	var defaultAddr = 0;
	//配送方式，支付方式，可用享金，余额
	var getAddAndWayAndPay = function(){
		AjaxFunUtils.ajaxInit({url:"/myorder/getcartmore.html","params":{'ajax': 1 },"callback":function(res){
			var shippinglist = res.data.shippinglist;
			var paymentlist = res.data.paymentlist;
			defaultAddr=res.data.myaddressid;
			$.each(shippinglist,function(index,o){
				var shipingVal = '<div class="rowbox"><input data-role="none" name="shippingid" type="radio" value="'+o.id+'" id="'+o.id+'"><label for="'+o.id+'">'+o.name+'</label></div>';
				if(index == 0){
					var shipingVal = '<div class="rowbox"><input data-role="none" name="shippingid" type="radio" value="'+o.id+'" checked="checked" id="'+o.id+'"><label for="'+o.id+'">'+o.name+'</label></div>';
				};
				$("#shippinglist").append(shipingVal);	
			});
			var jjj=0;
			$.each(paymentlist,function(index,o){
				jjj++;
				var payVal = '<div class="rowbox"><input data-role="none" name="paymentid" type="radio" value="'+o.id+'" checked="checked" id="'+o.id+'"><label for="'+o.id+'">'+o.name+'</label></div>';
				
				if(jjj == 0){
					var payVal = '<div class="rowbox">33<input data-role="none" name="paymentid" type="radio" value="'+o.id+'" checked="checked" id="'+o.id+'"><label for="'+o.id+'">'+o.name+'</label></div>';	
				};
				$("#paymentlist").append(payVal);
			});
				
		}});	
	};
	//提交订单
	var submitOrders = function(){
		$("#paymentForm2").checkInput({
			submitBtnFn: function (from,index) {
				var isaddress = $("#newaddress").length;
				if(isaddress>0){
					$("#newaddress").addClass("error_validate");
					config.tip.tips({
						htmlmsg:'<div style="padding:30px">请填写收货人信息</div>',
						w:"90%",
						type:0
					});
					return false;	
				}
				config.base.loadInit({status:1});
				var payUrl = $("#paymentForm2").attr("action");
				var subDataFrom = from.serializeJson();
				AjaxFunUtils.ajaxInit({url: payUrl,
					params: subDataFrom,
					callback: function(res){
						if(res.status == 1){
							window.location = '/myorder/payorder.html?orderid='+res.data.orderid;	
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"90%",
								type:0
							});	
						}
						config.base.loadInit({status:0});
					}
				})
			}
		});	
	};
	return init();	
});