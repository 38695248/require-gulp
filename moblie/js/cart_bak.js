// JavaScript Document
var ShareCart = function(){
	var baseshareCart = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	var shareCartInit = function(){
		getCartList();//获取购物车信息列表初始化
		giftandMassage();//礼物订单和留言
		$(".qtySelect").change(function(){
			var thisQty = $(this).val();
			var thisPrice = $(this).attr("data-price");
			var thisTotal = thisQty * thisPrice;
			var $thisTotal = $(this).parent("td").siblings(".total"); 
			$thisTotal.html(thisTotal);
				
		});
		//增加地址,编辑地址绑定
		addAddressBtn();
	};
	//确认提交购物车
	var cartBoxForm = function(oflg){
		$("#cartBoxForm").checkInput({
			button:".btn-cartNext",
			submitBtnFn: function (subFrom) {
				if(oflg == "false"){
					return false;
				}
				var subDataFrom = subFrom.serializeJson();
				AjaxFunUtils.ajaxInit({url: '/myorder/submitcart.html',
					params: subDataFrom,
					callback:function(res){
						if(res.status == 1){
							location.href = "/myorder/payment.html";
						}else{
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"90%",
								type:0
							});
						}
					}
				});		
			}
		});
	};
	//增加地址,编辑地址绑定
	var addAddressBtn = function(){
		$(".addAddressBtn").unbind("click").bind("click",function(){
			var typeId = $(this).attr("data-address");
			var thisaddrid = $(this).attr("data-addrid");
			if(thisaddrid || typeId==0){
				addressAddEdit({addrid:thisaddrid,type:typeId});
			}
		});
		//获取微信地址
		$(".wxAddressBtn").unbind("click").bind("click",function(){
			var thisaddrid = $(this).attr("data-addrid");
			AjaxFunUtils.ajaxInit({
				"url":"/myorder/address.html?act=weixin_sign", 
				"params":{}, 
				"callback":function (result) {
					if(result.status == 1){
						var sign_info = result.data.sign_info;
						get_addres();
						//获取微信地址
						function get_addresinfo(){ 
							WeixinJSBridge.invoke(
								'editAddress',
								sign_info,
								function(res){
									var resData = {};
									resData.act = "add";
									resData.nickname = res.username;
									resData.cellphone = res.telNumber;
									resData.zip = res.addressPostalCode;
									resData.address1 = res.addressCitySecondStageName +" "+res.addressCountiesThirdStageName+" "+res.addressDetailInfo;
									AjaxFunUtils.ajaxInit({
										"url":"/myorder/address.html", 
										"params":resData, 
										"callback":function (res3) {
											if(res3.status == 1){
												if($("#sedefault").attr("checked")){
													defaultAddr = thisaddrid;
												}
												getAddress();//添加，编辑完成刷新地址列表
											}else{
												AlertUtils.tips({
													htmlmsg:'<div style="padding:30px">'+res3.msg+'</div>',
													w:"96%",
													type:0
												});	
											}
										}
									});	
								}
							);
						};
						function get_addres(){
							if (typeof WeixinJSBridge == "undefined"){
							if( document.addEventListener ){
								document.addEventListener('WeixinJSBridgeReady', get_addresinfo, false);
							}else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', get_addresinfo); 
								document.attachEvent('onWeixinJSBridgeReady', get_addresinfo);
							}
							}else{
								get_addresinfo();
							}
						};
					}
				}
			});
		});
	};
	
	//增加，编辑 ，删除送货地址单
	var addressAddEdit = function(options){
		var settings = {
			type:0,
			addrid:''
		};
		if(options){
			$.extend(settings,options);	
		}
		AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=addAddress&ch=buy',
			type: "GET",
			dataType: 'html',
			params: '',
			callback:function(data){
				$("body").append(data);	
				AlertUtils.centerDiv({"divId":"addAddressTipbox","type":1});
				var mynumIndex = $("#addAddressTipbox").attr("data-index");
				//提示弹窗
				var tipaddAddress = function(msg){
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">'+msg+'</div>',
						w:"96%",
						type:0
					});
					AlertUtils.centerDivClosed({
						"indexTipDiv":$("#addAddressTipbox"),
						"indexNum":mynumIndex,
						"type":1
					});	
				};
				
				if(settings.type == 1){
					//删除地址
					$("#delBtn").show().unbind("click").bind("click",function(){
						AjaxFunUtils.ajaxInit({
							"url":"/myorder/address.html", 
							"params":{"ajax":1,"act":"del","addrid":settings.addrid}, 
							"callback":function (result) {
								if(result.status == 1){
									getAddress();//删除完成刷新地址列表
									tipaddAddress(result.msg);
								}else{
									tipaddAddress(result.msg);
								}
							}
						});	
					});
					//编辑状态，获取编辑数据
					AjaxFunUtils.ajaxInit({
						url:"/myorder/address.html",
						params:{"addrid":settings.addrid,"act":"get"},
						callback:function(resdata){
							var oo = resdata.data;
							if(oo.addrid == settings.addrid){
								$("#nickname").val(oo.nickname);
								$("#addressee").val(oo.addressee);
								$("#address1").val(oo.address1);
								$("#country").val(oo.country);
								$("#city").val(oo.city);	
								$("#state").val(oo.state);
								$("#zip").val(oo.zip);
								$("#cellphone").val(oo.cellphone);
								if(oo.addrid == defaultAddr){
									$("#sedefault").attr("checked","checked");	
								}
							}	
						}
					});
					
				}
				$("#addAddressForm").checkInput({
					inputs:{
						"nickname":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'},
						"addressee":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'},
						"city":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'},
						"state":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'},
						"zip":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'},
						"cellphone":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'}
					},
					submitBtnFn: function (from) {
						var dataFrom = from.serializeJson();
						var param = {"ajax":1};
						var resData = $.extend(dataFrom,param);
						if(settings.type == 1){
							resData.addrid = settings.addrid;	
							resData.act = "edt";
						}else{
							resData.act = "add";	
						}
						AjaxFunUtils.ajaxInit({
							"url":"/myorder/address.html", 
							"params":resData, 
							"callback":function (result) {
								if(result.status == 1){
									if($("#sedefault").attr("checked")){
										defaultAddr = settings.addrid;
									}
									getAddress();//添加，编辑完成刷新地址列表
									tipaddAddress(result.msg);
								}else{
									tipaddAddress(result.msg);
								}
							}
						});
					}	
				});	
			}
		});		
	};
	//获取购车页面信息
	var getCartList = function(justMoney){
		var partdata="all";
		if(justMoney == 2){
			partdata="money";	
		};
		AjaxFunUtils.ajaxInit({url:"/myorder/getcart.html","params":{'partdata': partdata },"callback":function(res){
			var totaldiscount = res.data.totaldiscount;//活动优惠
			var statusshmoney = res.data.statusshmoney;
			var msgshmoney = res.data.msgshmoney;
			var total = res.data.total;
			var availshmoney = res.data.availshmoney;
			var activity = res.data.activity;
			var shippingtotal = exrtitle + res.data.shippingtotal + ' ' + '<span class="f12 color-999">' + exrcode + '</span>';
			
			if(activity && $("#activityurl")){
				$("#activityurl").html("继续定制");
				$("#activityurl").attr("href","/activity/index.html?act="+activity+"&ukey="+ukey+"");
			}
			
			$("#totaldiscount").attr("data-totaldiscount",totaldiscount);
			$("#totaldiscount").html(exrtitle+ ' '  + totaldiscount+ '<span class="f12 color-999">' + exrcode + '</span>');
			if(totaldiscount > 0){
				$("#totaldiscount").parents("li").show();	
			}else{
				$("#totaldiscount").parents("li").hide();	
			}
			if(res.data.shippingtotal == '0.00'){
				$("#shipping_ico").html("("+lang.js_shippingtotal+")");	
			}
			res.data.rows=res.data.goods;
			if(res.data.itemnum == 0){
				$("#cartBonIn").remove();
				$("#carfooter").remove();
				$("#cart-empty").show();
				return false;	
			}
			//使用优惠卷，享金，余额支付列表初始化
			getPayList(total,availshmoney,statusshmoney,msgshmoney);
			if(justMoney == 2){
				$("#totalscore").html(res.data.totalscore);
				$("#availscore").html(res.data.availscore);
				$("#availscore").attr("data-availscore",res.data.availscore);
				$("#goodstotal").html(exrtitle+ '' + res.data.goodstotal + '<span class="f12 color-999">' + exrcode + '</span>');
				$("#goodstotal").attr("data-goodstotal",res.data.goodstotal);
				$("#shippingtotal").html(shippingtotal);
				$("#shippingtotal").attr("data-shippingtotal",res.data.shippingtotal);
				//显示应付总额
				countTotal(total);
				//使用优惠卷，享金，余额支付列表初始化
				getPayList(total,availshmoney,statusshmoney,msgshmoney);
			}else{
				
				$("#taxtotal").html(exrtitle+ '' + res.data.tax + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
				$("#taxtotal").attr("data-taxtotal",res.data.tax);
				$("#shippingtotal").html(shippingtotal);
				$("#shippingtotal").attr("data-shippingtotal",res.data.shippingtotal);
				$("#goodstotal").html(exrtitle+ '' + res.data.goodstotal + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
				$("#goodstotal").attr("data-goodstotal",res.data.goodstotal);
				$("#totalshmoney").html(res.data.totalshmoney + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
				$("#availshmoney").html(availshmoney + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
				$("#totalscore").html(res.data.totalscore);
				$("#availscore").html(res.data.availscore);
				$("#availscore").attr("data-availscore",res.data.availscore);
				//显示应付总额
				countTotal(total);
				//获取购物车信息列表
				getCartListInfo(res);
				
				//获取支付，享金
				getAddAndWayAndPay();
			}
		}});
	};
	//选择商品购买操作
	var selectGoods = function(){
		$("#allselect").unbind("click").bind("click",function(){
			var ischecked = $(this).attr("checked");
			if(ischecked){
				$("#cartList").find(".inputcheckbox").attr("checked",true);	
			}else{
				$("#cartList").find(".inputcheckbox").attr("checked",false);		
			}
			isallselect();
		});
		$("#cartList").find(".inputcheckbox").unbind("click").bind("click",function(){
			isallselect();	
		});	
		//检查是否选了,是否可以去结算
		function isallselect(){
			var flag = true;
			$("#cartList").find(".inputcheckbox").each(function(index, element) {
				var ischecked = $(this).attr("checked");
				if(!ischecked){
					flag = false;	
				}
				if(ischecked){
					cartBoxForm("true");
				}else{
					cartBoxForm("false");
				}
			});
			if(flag){
				$("#allselect").attr("checked",true);	
			}else{
				$("#allselect").attr("checked",false);	
			}
		}
	};
	//获取购物车列表信息
	var getCartListInfo = function(res){
		$.each(res,function(index,o){
			var cartHtml = '<ul class="jsbox jsbox-pd">'+
				'<li class="rowbox">'+
					'<div class="w40">'+
						'<input class="inputcheckbox" type="checkbox" value="1">'+
						'<label class="label_g ml-5">&nbsp;</label>'+
					'</div>'+
					'<div class="row-flex1">设计师：<span class="color-red">haha121</span>'+
					'</div>'+
				'</li>'+
				'<li class="rowbox">'+
					'<div class="w40 line60 pt-10">'+
						'<input class="inputcheckbox" type="checkbox" value="1" checked="checked">'+
						'<label class="label_g ml-5">&nbsp;</label>'+
					'</div>'+
					'<div class="w60 cartimg goodsImg mr-10">'+
						'<img src="../moblie/images/temp/01.jpg" />'+
					'</div>'+
					'<div class="cartinfo row-flex1">'+
						'<h3 class="color-333">'+
							'<span class="fr color-red goodsPrice">¥ 268.00</span>'+
							'<span class="goodsTitle">夏天一个小蛮腰</span>'+
						'</h3>'+
						'<div class="color-777 goodsotherinfo"><span class="mr-10">颜色：红色</span><span>尺寸：M</span></div>'+
						'<ul class="num-list mt-5 plusbox" style="padding-left:0">'+
							'<li class="l-rad minus">-</li>'+
							'<li class="num-input number">'+
								'<input data-role="none" type="text" value="1" class="w40 buynumber" disabled>'+
							'</li>'+
							'<li class="r-rad plus">+</li>'+
						'</ul>'+
						'<a href="javascript:void(0);" class="delBtn color-blue">'+
						'<span class="fr ico ico-delete"></span>'+
						'</a>'+
					'</div>'+
				'</li>'+
			'</ul>';	
		});
		
		
		
		
		//console.log(res);
		//获取购车列表初始化
		$("#cartList").loadDataUtils({"resData":res,"getDataHtmlCallback":function(index,o){
			var $row = $("#template").clone();
			var rowColors = o.colors;
			//定制元素
			var rowbuyattrs = o.buyattr;
			//定制身体数据
			var rowbddata = o.bddata;
			var istuan = o.tuanid == 0?false:true;
			var order_typetile = lang.js_order_type_t;
			var attrsVal = '';
			if(rowbuyattrs){
				$.each(rowbuyattrs,function(ooindex,ooo){
					var thisAttrVal = ooo[3];
					if(ooo[4]){
						thisAttrVal += "("+ooo[4]+")";
					}
					if(ooindex == 0){
						attrsVal +=thisAttrVal;
					}else{
						attrsVal +='、'+thisAttrVal;	
					}
					
				});
			}
			if(attrsVal){
				attrsVal = '&nbsp;&nbsp;&nbsp;&nbsp;定制元素：'+attrsVal;	
			}
			var sizeVal = o.buysize[1];
			var colorVal = o.buycolor[1];
			if(o.buysize[2]){
				sizeVal +=	"("+o.buysize[2]+")";
			}else if(o.buysize[0] == 'bodydata'){
				sizeVal +=	"("+rowbddata.title+")";	
			}
			if(o.buycolor[2]){
				colorVal +=	"("+o.buycolor[2]+")";
			}
			var goodsotherinfo = ''+lang.js_order_sizes+'： '+sizeVal+' &nbsp;&nbsp;&nbsp;&nbsp;'+lang.js_order_color+'：'+colorVal+attrsVal;
			if(!istuan){
				//order_typetile = lang.js_order_type_p;
				//goodsotherinfo = ''+lang.js_order_color+'：<span class="colorsize" style="background:#'+o.buycolor+'"></span>'+o.buycolorname+' &nbsp;&nbsp;&nbsp;&nbsp;'+lang.js_order_for+'： '+o.bodyData_name+'';
			}
			var userimg = o.pic;
			if(o.userimg_face != "emptypic" && o.userimg_face !=''){
				 userimg = o.userimg_face;	
			}
			$row.find(".goodsotherinfo").html(goodsotherinfo);
			$row.find(".p_checkbox").html('<input id="checkbox_'+index+'" class="inputcheckbox" type="checkbox" value="1"><label for="checkbox_'+index+'" class="label_g ml-5">&nbsp;</label>');
			$row.find(".goodsId").attr("data-goodsId",o.gdid);
			$row.find(".goodsId").attr("data-buycolor",o.buycolor);
			$row.find(".goodsId").attr("data-buysize",o.buysize);	
			$row.find(".goodsId").attr("data-key_goods",o.key_goods);
			$row.find(".goodsImg").html('<a href="/share/sharepage.html?gdid='+o.gdid+'"><img src="'+userimg+'" class="cartp_img"></a>');
			$row.find(".goodsTitle").html("<a data-role='none' rel='external' href='/share/sharepage.html?gdid="+o.gdid+"' class='color-blue'>" + o.gdname + "</a>");
			$row.find(".goodsPrice").html(exrtitle + " " + o.price + '<span class="f12 color-999">' + exrcode + '</span>');
			$row.find(".buynumber").attr("value",o.buynum);
			return $row.html();
		},"callback":function(){
			//选择商品购买操作
			selectGoods();
			$(".plusbox").plus({"callback":function(num,obj,obuynummax){
				var goodNum = num;
				var goodid = obj.parents(".goodsId").attr("data-goodsId");
				var buysize = obj.parents(".goodsId").attr("data-buysize");
				var buycolor = obj.parents(".goodsId").attr("data-buycolor");
				var key_goods = obj.parents(".goodsId").attr("data-key_goods");
				AjaxFunUtils.ajaxInit({
					"url":"/myorder/edttocart.html",
					"params":{"ajax":1,gdid:goodid,buynum:goodNum,key_goods:key_goods},
					"callback":function(res){
						if(res.status == 1){
							GetCartTop.getCartInit();
							getCartList(2);	
						}else{
							obj.siblings(".number").find(".buynumber").val(obuynummax);
							AlertUtils.tips({
								w:"96%",
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>'
							});
						}
				},"errCallback":function(msg){
					//console.log(msg);	
				}});	
			}});
			$(".delBtn").unbind("click").bind("click",function(){
				var $goodsId = $(this).parents(".goodsId");
				var goodid = $goodsId.attr("data-goodsId");
				var buycolor = $goodsId.attr("data-buycolor");
				var buysize = $goodsId.attr("data-buysize");
				var key_goods = $goodsId.attr("data-key_goods");
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px"><span class="ico ico-war mr-10"></span>'+lang.js_myshare_perform+'</div>',
					scallback:function(){
						AjaxFunUtils.ajaxInit({
							"url":"/myorder/edttocart.html",
							"params":{gdid:goodid,buynum:0,key_goods:key_goods},
							"callback":function(res){
								if(res.status == 1){
									GetCartTop.getCartInit();
									getCartList(2);	
									$goodsId.remove();
								}else{
									AlertUtils.tips({
										w:"96%",
										htmlmsg:'<div style="padding:30px">'+res.msg+'</div>'
									});	
								}
							},"errCallback":function(msg){
								//console.log(msg);	
							}
						});	
					}
				});
					
			});	
		}});
	};
	//礼物订单，留言
	var giftandMassage = function(){
		$(".fancyToggle").toggleUtils({callback:function(flag){
			var myflag = flag;
			if(!myflag){
				$("#ico-gift").addClass("check");
				$("#gift-text-a").removeClass("show").addClass("hide");	
				$("#gift-text-b").removeClass("hide").addClass("show");
				$("#gift_message").addClass("show").removeClass("hide");
			}else{
				$("#ico-gift").removeClass("check");
				$("#gift-text-a").removeClass("hide").addClass("show");	
				$("#gift-text-b").removeClass("show").addClass("hide");
				$("#gift_message").addClass("hide").removeClass("show");	
			}
		}});	
	};
	//使用优惠卷，享金，余额支付列表
	var getPayList = function(optotal,opavailshmoney,ostatus,omsg){
		var myoptotal = Number(optotal);
		var myopavailshmoney = opavailshmoney;
		var myostatus = ostatus;
		
		$(".cartCoupons").hoverAndClickShow({"method":"click","autoClose":false,"bcallback":function(mythis){
				var $mythis = mythis;
				var status = $mythis.attr("data-status");
				
				if(myostatus == 0 && status){
					$mythis.siblings(".cartCouponList").html("<p class='color-red' style='padding-top:5px'>" + omsg + "</p>");
				};
			},"callback":function(index){
			var subtotalCont = parseInt($("#subtotalCont").attr("data-total"));
			//验证通过提交支付
			$(".cartCoupon-Btn").unbind("click").bind("click",function(){
				var $this = $(this);
				var typepay = $this.attr("data-type");
				var urlpay = '';
				var params = '';
				if(typepay == 'coupons'){
					var istotaldiscount = $("#totaldiscount").attr("data-totaldiscount");
					if(istotaldiscount > 0){
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">您已享受“1元包邮”优惠，不能同时使用该优惠卷。</div>',
							type:0,
							scallback:function(){
								$this.siblings("#couponsInput").val('');	
							}
						});
						return false;	
					}
					var qcode = $this.siblings("#couponsInput").val();
					urlpay = '/myorder/ckcashcoupon.html';
					params = {"qcode":qcode};
				}else if(typepay == 'integral'){
					
					//获取当前应付的金额
					var thistotalCont = $("#subtotalCont").attr("data-vitotal");
					
					var $scoretomoney = $("#scoretomoney");
					//输入的享金
					var scoretomoney = $scoretomoney.val();
					//获取当前可用享金
					var myavailscore = Number($("#availscore").attr("data-availscore"));
					
					var flag = regInut($scoretomoney,scoretomoney);
					if(!flag){
						return false;	
					}else{
						$scoretomoney.removeClass('error_validate');	
					};
					
					if(scoretomoney > myavailscore){
						scoretomoney = myavailscore;
					};
					
					
					$scoretomoney.attr("data-num",scoretomoney);
					urlpay = '/myorder/scoretomoney.html';
					params = {"score":scoretomoney,"topaytotal":thistotalCont};
					
				};
				
				payAjax($this,typepay,urlpay,params);
				
			});
			function payAjax($this,typepay,urlpay,params){
				if(typepay == 'sharemoney'){
					sharemoney($this,typepay);
				}else{
					AjaxFunUtils.ajaxInit({"url": urlpay,
						"params":params,
						"callback":function(res){
							if(res.status == 1){
								if(typepay == 'coupons'){
									if(res.data.money > 0){
										//获取当前应付的金额
										var ajaxtotalCont = Number(res.data.money); 
										var thistotalCont = Number($("#subtotalCont").attr("data-vitotal"));
										
										if(ajaxtotalCont > thistotalCont){
											ajaxtotalCont = thistotalCont;
										}
										
										if(ajaxtotalCont > myoptotal){
											ajaxtotalCont = myoptotal;
										}
										
										$("#couponMoney").html(ajaxtotalCont + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
										$("#couponMoney").attr("data-couponMoney",ajaxtotalCont);
										$("#couponMoney").parents("li").show();
										var ccode = $("#couponsInput").val();
										var $thisParetsib = $this.parents(".startbox").siblings(".endbox");
										$thisParetsib.find(".ccode").html("【"+ccode+"】");
										$thisParetsib.find(".money").html(exrtitle + ' ' + res.data.money);
										$this.parents(".startbox").addClass("hide");
										$thisParetsib.removeClass("hide");
										countTotal(myoptotal);
									}else{
										$("#couponMoney").parents("li").hide();	
									};
								}else if(typepay == 'integral'){
									$("#scoretomoney").val(res.data.score);
									$("#scoreMoney").html(exrtitle+ '' + res.data.money + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
									$("#scoreMoney").attr("data-scoreMoney",res.data.money);
									$("#scoreMoney").parents("li").show();
									var ccode = res.data.score;
									var $thisParetsib = $this.parents(".startbox").siblings(".endbox");
									$thisParetsib.find(".ccode").html(ccode);
									$thisParetsib.find(".money").html(exrtitle + ' ' + res.data.money);
									$this.parents(".startbox").addClass("hide");
									$thisParetsib.removeClass("hide");
									countTotal(myoptotal);
								}
							}else{
								AlertUtils.tips({
									htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
									w:"96%",
									type:0
								});
								if(typepay == 'coupons'){
									$("#shareMoney").parents("li").hide();	
								}else if(typepay == 'integral'){
									$("#scoreMoney").parents("li").hide();	
								}
							}
						}
					});	
				}
				
				canceluseHeader();
			};
			//余额支付
			function sharemoney($this){
				var $$this = $("#shmoneyInt");
				var mysharemoney = Number($$this.val());
				//获取当前应付的金额
				var thistotalCont = Number($("#subtotalCont").attr("data-vitotal"));
				
				var flag = regInut($$this,mysharemoney,1);
				if(!flag){
					return false;	
				}else{
					$$this.removeClass('error_validate');	
				};
				/**/
				if(mysharemoney > thistotalCont){
					mysharemoney = thistotalCont;	
				};
				//console.log(mysharemoney);
				
				if(mysharemoney > myopavailshmoney){
					mysharemoney = myopavailshmoney;
				};
				
				//console.log(mysharemoney);
				$$this.val(mysharemoney);
				$$this.attr("data-num",mysharemoney);
				$("#shareMoney").html(exrtitle+ '' + mysharemoney + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');
				$("#shareMoney").attr("data-shareMoney",mysharemoney);
				
				var $thisParetsib = $this.parents(".startbox").siblings(".endbox");
				$thisParetsib.find(".ccode").html(exrtitle + ' ' + mysharemoney);
				$this.parents(".startbox").addClass("hide");
				$thisParetsib.removeClass("hide");
				$("#shareMoney").parents("li").show();
				countTotal(myoptotal);
			};
			//取消使用
			function canceluseHeader(){
				$(".canceluseBtn").unbind("click").bind("click",function(){
					var $this = $(this);
					var type = $(this).attr("data-type");
					$this.parents(".endbox").addClass("hide");
					$this.parents(".endbox").siblings(".startbox").removeClass("hide");	
					$this.parents(".endbox").siblings(".startbox").find("input").val("");
					if(type == 'integral'){
						$("#scoreMoney").attr("data-scoreMoney",0);
						$("#scoreMoney").parents("li").hide();
					}else if(type == 'coupons'){
						$("#couponMoney").attr("data-couponMoney",0);
						$("#couponMoney").parents("li").hide();
					}else if(type == 'sharemoney'){
						$("#shareMoney").attr("data-shareMoney",0);	
						$("#shareMoney").parents("li").hide();	
					};
					countTotal(myoptotal);
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
				if (reg[0].test(scoretomoney)) {
					$scoretomoney.removeClass('error_validate');
					flag = true;
					return flag;
				} else {
					$scoretomoney.addClass('error_validate');
					flag = false;
					return flag;
				}	
			};
		}});
	};
	//计算应付总额
	var countTotal = function(ototal){
		//var mytotal = ototal;
		var mytotal = Number($("#goodstotal").attr("data-goodstotal"));
		var couponMoney = Number($("#couponMoney").attr("data-couponMoney"));
		var scoreMoney = Number($("#scoreMoney").attr("data-scoreMoney"));
		var shareMoney = Number($("#shareMoney").attr("data-shareMoney"));
		var taxtotal = Number($("#taxtotal").attr("data-taxtotal"));
		var totaldiscount = Number($("#totaldiscount").attr("data-totaldiscount")); 
		if(couponMoney){
			var mycouponMoney = couponMoney;
		}else{
			var mycouponMoney = 0;	
		}
		if(scoreMoney){
			var myscoreMoney = scoreMoney;
		}else{
			var myscoreMoney = 0;	
		}
		if(shareMoney){
			var myshareMoney = shareMoney;
		}else{
			var myshareMoney = 0;	
		}
		//console.log("mytotal:" + mytotal + "taxtotal:" + taxtotal + "- mycouponMoney:"+ mycouponMoney +"- myscoreMoney:"+ myscoreMoney +"- myscoreMoney:"+ myshareMoney);
		var paysubtotalCont = mycouponMoney + myscoreMoney + myshareMoney;
		var newsubtotalCont = (mytotal + taxtotal - paysubtotalCont - totaldiscount).toFixed(2);
		$("#subtotalCont").attr("data-vitotal",newsubtotalCont);
		$("#subtotalCont").html(exrtitle+ ' ' + newsubtotalCont + ' ' + '<span class="f12 color-999">' + exrcode + '</span>');	
	};
	//获取送货地址
	var getAddress = function(odz){
		AjaxFunUtils.ajaxInit({
			url:"/myorder/address.html",
			"params":{'ajax': 1,'act':'list' },
			"callback":function(res){
				var addresslist = res.data;
				var html = '';
				$.each(addresslist,function(index,o){
					var addVal = '<li class="rowbox mt-10"><div class="row-flex1 rowbox"><input data-role="none" name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'"><label for="'+o.addrid+'">'+o.address1+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-role="none">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
					if(odz==o.addrid){
						addVal = '<li class="rowbox mt-10"><div class="row-flex1 rowbox"><input data-role="none" name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'" checked="checked"><label for="'+o.addrid+'">'+o.address1+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-role="none">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
					}else if(!odz){
						if(index == 0){
						addVal = '<li class="rowbox mt-10"><div class="row-flex1 rowbox"><input data-role="none" name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'" checked="checked"><label for="'+o.addrid+'">'+o.address1+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-role="none">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
						}
					}
					html +=addVal;
				});
				$("#addrid").empty().append(html);	
				addAddressBtn();
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
			//获取 收货地址
			getAddress(defaultAddr);	
		}});	
	};
	//确认提交订单支付
	var payTip = function(){
		$("#frm_payment_now").submit();
		$("#pay_bttn").unbind("click").bind("click",function(){
			submitData(1);	
		});
		function submitData(flag){
			AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=payTip&ch=buy',
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({"divId":"payTipbox","type":1,"w":500});
					if(!flag){
						//$("#frm_payment_now").submit();
					}
				}
			});		
		};
				
	};
	return {shareCartInit:shareCartInit,payTip:payTip,baseshareCart:baseshareCart}
}();

