// JavaScript Document
var ShareCart = function(){
	var baseshareCart = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	var shareCartInit = function(){
		getCartListInfo({});//获取购物车列表信息
	};
	var submitCartInit = function(){
		
		getAddress();//获取 收货地址
		getCartList();//获取购物车信息列表初始化息
		submitOrders();//提交订单
		//giftandMassage();//礼物订单和留言
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
						if(res.status == 1 && res.data.submit_num > 0){
							var spm = $("#cartBoxForm").attr("data-spm");
							location.href = "/myorder/confirm_order.html?spm="+spm;
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
	//合计价格和选中商品
	var totalprice = function(){
		var subDataFrom = $("#cartBoxForm").serializeJson();
		AjaxFunUtils.ajaxInit({url: '/myorder/submitcart.html',
			params: subDataFrom,
			callback:function(res){
				if(res.status == 1){
					var goodstotal_checked = res.data.goodstotal_checked;
					$("#goodstotal").html(exrtitle+ ' ' + goodstotal_checked);
					$("#js_num").html("("+res.data.submit_num+")");
				}else{
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						w:"90%",
						type:0
					});
				}
			}
		});		
	};
	//选择商品购买操作
	var selectGoods = function(myfirst){
		isallselect(myfirst);
		//大项所有
		$("#allselect").unbind("click").bind("click",function(){
			var ischecked = $(this).attr("checked");
			if(ischecked){
				$("#goodslist").find(".inputcheckbox").attr("checked",true);	
			}else{
				$("#goodslist").find(".inputcheckbox").attr("checked",false);		
			}
			isallselect();
		});
		//小项所有
		$("#goodslist").find(".inputcheckbox").unbind("click").bind("click",function(){
			var type = $(this).attr("data-type");
			var ischecked = $(this).attr("checked");
			var $jsbox = $(this).parents(".jsbox-pd");
			if(type == "b"){
				if(ischecked){
					$jsbox.find(".inputcheckbox").attr("checked",true);	
				}else{
					$jsbox.find(".inputcheckbox").attr("checked",false);		
				}
			}else if(type == "s"){
				smallSelect($jsbox);	
			}
			isallselect();	
		});
		//检查小项是否选了
		function smallSelect($ojsbox){
			var flag = true;
			$ojsbox.find(".s_checkbox").each(function(index, element) {
				var ischecked = $(this).attr("checked");
				if(!ischecked){
					flag = false;	
				}
			});
			//console.log(flag);
			if(flag){
				$ojsbox.find(".b_checkbox").attr("checked",true);	
			}else{
				$ojsbox.find(".b_checkbox").attr("checked",false);	
			}	
		}
		//检查是否选了,是否可以去结算
		function isallselect(ofirst){
			var flag = true;
			var flag1 = false;
			//检查小项是否选了
			$(".jsbox-pd").each(function(index, element) {
               smallSelect($(this)); 
            });
			
			$("#goodslist").find(".inputcheckbox").each(function(index, element) {
				var ischecked = $(this).attr("checked");
				if(!ischecked){
					flag = false;	
				}
				if(ischecked){
					flag1 = true;
				}
			});
			if(flag1){
				cartBoxForm("true");
			}else{
				cartBoxForm("false");
			}
			if(flag){
				$("#allselect").attr("checked",true);	
			}else{
				$("#allselect").attr("checked",false);	
			}
			//合计价格
			if(!ofirst){
				totalprice();
			}
		}
		
	};
	//购物车相关按钮操作，删除
	var relevantBtn = function(){
		$(".plusbox").plus({"callback":function(num,obj,obuynummax){
			var goodNum = num;
			var goodid = obj.parents(".goodsId").attr("data-goodsId");
			var buysize = obj.parents(".goodsId").attr("data-buysize");
			var buycolor = obj.parents(".goodsId").attr("data-buycolor");
			var key_goods = obj.parents(".goodsId").attr("data-key_goods");
			AjaxFunUtils.ajaxInit({
				"url":"/myorder/edttocart.html",
				"params":{gdid:goodid,buynum:goodNum,key_goods:key_goods},
				"callback":function(res){
					if(res.status == 1){
						getCartListInfo({type:'add'});	
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
			var $jsbox = $(this).parents(".jsbox-pd");
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
								window.location.reload();
								//合计价格
								totalprice();
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
	};
	//获取购物车列表信息
	var getCartListInfo = function(opt){
		AjaxFunUtils.ajaxInit({
			url:"/myorder/getcart.html",
			params:{'partdata': '' },
			callback:function(res){
				var order_son = res.data.order_son;
				var goodstotal_checked = res.data.goodstotal_checked;
				$("#goodstotal").html(exrtitle+ ' ' + goodstotal_checked);
				$("#js_num").html("("+res.data.submit_num+")");
				if(opt.type == 'add'){
					return false;
				}
				if(res.data.itemnum > 0){
					eachcartList();	
				}else{
					$("#cart-empty").show();
					$("#carfooter").hide();	
				}
				function eachcartList(){
					var cartHtml = '';
					$.each(order_son,function(index,order_i){
						cartHtml += '<ul class="jsbox jsbox-pd">'+
								'<li class="rowbox line30" style="padding-bottom:5px">'+
									'<div class="w35">'+
										'<input id="b_'+index+'" class="inputcheckbox b_checkbox" type="checkbox" value="" data-type="b">'+
										'<label for="b_'+index+'" class="label_g mt-3"><i>&nbsp;</i></label>'+
									'</div>'+
									'<div class="row-flex1 f16">设计师：<a href="/share/myshares.html?fsuid='+order_i.shop_suid+'"><span class="color-red">'+order_i.shopname+'</span></a>'+
									'</div>'+
								'</li>';
						$.each(order_i.cart_goods_key,function(index2,goods_key){
							
							//console.log(res.data.goods[goods_key]);
							//商品KEY
							var goodsInfo = res.data.goods[goods_key];
							//定制元素
							var rowbuyattrs = goodsInfo.buyattr;
							var attrsVal = '';
							var activity_bsh = goodsInfo.activity_bsh;
							var money_back = '';
							if(activity_bsh == 4){
								money_back = '<span class="f12">返现：<span class="color-red">¥'+Number(goodsInfo.money_back*goodsInfo.buynum).toFixed(2)+'</span></span>';	
							}
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
							cartHtml += '<li class="rowbox goodsId" data-goodsId="'+goodsInfo.gdid+'" data-buysize="'+goodsInfo.buysize[1]+'" data-buycolor="'+goodsInfo.buycolor[1]+'" data-key_goods="'+goodsInfo.key_goods+'">'+
									'<div class="w35 line60 pt-10">';
							if(goodsInfo.checked == 1){
								cartHtml += '<input id="s_'+index+'_'+index2+'" class="inputcheckbox s_checkbox" type="checkbox" value="'+goods_key+'" name="goods_keys" data-type="s" data-price="'+goodsInfo.price+'" isarray="true" checked="checked">';
							}else{
								cartHtml += '<input id="s_'+index+'_'+index2+'" class="inputcheckbox s_checkbox" type="checkbox" value="'+goods_key+'" name="goods_keys" data-type="s" data-price="'+goodsInfo.price+'" isarray="true">';	
							}
								var bodyData_name = '';
								if(goodsInfo.bodyData_name){
									bodyData_name = '（量身人：'+goodsInfo.bodyData_name+'）';	
								}	
								cartHtml += '<label for="s_'+index+'_'+index2+'" class="label_g"><i>&nbsp;</i></label>'+
									'</div>'+
									'<div class="w60 cartimg goodsImg mr-10">'+
										'<img src="'+goodsInfo.pic+'" />'+
									'</div>'+
									'<div class="cartinfo row-flex1">'+
										'<a class="rowbox" href="/share/sharepage.html?gdid='+goodsInfo.gdid+'&ukey='+ukey+'">'+
											'<div class="goodsTitle ohidden row-flex1">'+goodsInfo.gdname+'</div>'+
											'<div class="goodsPrice text-right">'+res.data.currency_exrtitle+' '+goodsInfo.price+'</div>'+
										'</a>'+
										'<div class="rowbox">'+
											'<div class="color-777 goodsotherinfo f12 line16 row-flex1"><span class="mr-10">颜色：'+goodsInfo.buycolor[1]+'</span><span>尺寸：'+goodsInfo.buysize[1]+bodyData_name+'</span><span>'+attrsVal+'</span></div>'+
											'<div>'+money_back+'</div>'+
										'</div>'+
										'<div class="num-list mt-5 plusbox" style="padding-left:0">'+
											'<span class="l-rad minus inlineblock">-</span>'+
											'<span class="num-input number">'+
												'<input data-role="none" type="text" value="'+goodsInfo.buynum+'" class="w40 buynumber" disabled>'+
											'</span>'+
											'<span class="r-rad plus inlineblock">+</span>'+
											'<span class="fr ico delBtn ico-delete"></span>'+
										'</div>'+
									'</div>'+
								'</li>';
						});
						cartHtml +='</ul>';	
					});
					$("#goodslist").html(cartHtml);
					//选择商品购买操作
					selectGoods(1);
					//相关按钮操作，比如：删除
					relevantBtn();
				}
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
							AlertUtils.tips({
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
							AlertUtils.tips({
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
									AlertUtils.tips({
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
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						w:"90%",
						type:0,
						scallback:function(){
									
						}
					});
					
				}else{
					AlertUtils.tips({
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
	//获取送货地址
	var getAddress = function(odz){
		AjaxFunUtils.ajaxInit({
			url:"/myorder/address.html",
			"params":{'ajax': 1,'act':'list' },
			"callback":function(res){
				var addresslist = res.data;
				if(addresslist.length<=0){
					$("#addrid").html('<p id="newaddress" class="addAddressBtn" data-address="0" style="padding:0 5px; margin:5px 0">请填写收货人信息</p>');
					addAddressBtn();
					return false;	
				}
				var html = '';
				$.each(addresslist,function(index,o){
					var addVal = '<li class="rowbox mt-5"><div class="row-flex1 rowbox"><input data-role="none" name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'"><label for="'+o.addrid+'">'+o.address1+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-role="none">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
					if(odz==o.addrid){
						addVal = '<li class="rowbox mt-5"><div class="row-flex1 rowbox"><input data-role="none" name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'" checked="checked"><label for="'+o.addrid+'">'+o.address1+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-role="none">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
					}else if(!odz){
						if(index == 0){
						addVal = '<li class="rowbox mt-5"><div class="row-flex1 rowbox"><input data-role="none" name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'" checked="checked"><label for="'+o.addrid+'">'+o.address1+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-role="none">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
						}
					}
					html +=addVal;
				});
				$("#addrid").html(html);	
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
				
		}});	
	};
	//提交订单
	var submitOrders = function(){
		$("#paymentForm2").checkInput({
			submitBtnFn: function (from,index) {
				var isaddress = $("#newaddress").length;
				if(isaddress>0){
					$("#newaddress").addClass("error_validate");
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">请填写收货人信息</div>',
						w:"90%",
						type:0
					});
					return false;	
				}
				Loading.loadInit({status:1});
				var payUrl = $("#paymentForm2").attr("action");
				var subDataFrom = from.serializeJson();
				AjaxFunUtils.ajaxInit({url: payUrl,
					params: subDataFrom,
					callback: function(res){
						Loading.loadInit({status:0});
						if(res.status == 1){
							window.location = '/myorder/payorder.html?orderid='+res.data.orderid;	
						}else{
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"90%",
								type:0
							});	
						}
					}
				})
			}
		});	
	};
	//确认支付
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
	return {shareCartInit:shareCartInit,payTip:payTip,baseshareCart:baseshareCart,submitCartInit:submitCartInit,submitOrders:submitOrders}
}();

