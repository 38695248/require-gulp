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
require(['jquery','config','base','ajax','checkInput','plus','serializeJson'],function($,config,base,AjaxFunUtils){
	var init = function(){
		getCartListInfo({});//获取购物车列表信息
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
						config.tip.tips({
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
			config.tip.tips({
				htmlmsg:'<div style="padding:30px"><span class="ico ico-war mr-10"></span>'+config.base.lang.js_myshare_perform+'</div>',
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
								config.tip.tips({
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
							config.tip.tips({
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
					config.tip.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						w:"90%",
						type:0
					});
				}
			}
		});		
	};
	return init();	
});