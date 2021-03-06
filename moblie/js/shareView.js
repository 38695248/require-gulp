// JavaScript Document
var ShareView = function(){
	var shareViewInit = function(opt){
		
		//用户追随,follow,用户like,按钮绑定事件
		MasonryUtils.shareAndLike();
		//编辑分享
		MasonryUtils.editBtn();
		//getCommentListNew();//获取评论列表
		getCommentViewList();//获取评论列表
		//商品初始化
		if($("#goods").val()==1){
			//图片滚动初始化
			sliderboxInt();
			goods();
			//产品详情，产品推荐
			tjcp_list();
		}else{
			//图片坐标初始化
			$("#sharePicImgBox").find(".mod_01").setTagPos();
			$("#sharedescbox").find(".imgtag").each(function(index, element) {
				$(this).setTagPos();
			});	
		}
		//share初始化
		if($("#masonry-tj").size()>0){
			MasonryUtils.masonryInit({
				masonry:"masonry-tj",
				islazy:1,
				callback:function(){
				}
			});//瀑布流初始化
		}
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	//产品详情，产品推荐
	var tjcp_list = function(){
		var geturl = $("#tjcp_list").attr("data-url");
		AjaxFunUtils.ajaxInit({
			url: geturl,
			type: "GET",
			dataType: 'html',
			params: {ajax:1},
			callback: function(data){
				if(!data){
					$("#tjcp_list_box").hide();
					return false;	
				}
				$("#tjcp_list").append(data);
				$("#tjcp_list").find("img.lazy-mas").lazyload({	
					effect: "fadeIn",
					threshold : 100,	
					failurelimit:20
				});
			}
		});
	};
	//图片滚动初始化
	var sliderboxInt = function(){
		//设置图片框高度
		setImgHeight();
		function setImgHeight(){
			var bodyH = getHeightBody();
			var setH = bodyH*0.7;
			//$("#sliderbox_view").find("img").css({"height":setH});
			$("#sliderbox_view").css({"height":setH});
			return setH;	
		}
		$("#sliderbox_view").slidepic({
			autoPlay:false,
			scrollContId:'slide_01_view',
			slide_01_dot:'slide_01_dot_view',
			imgwcallback:function(){
				var sliderboxH = $("#sliderbox_view").height();
				var sliderboxW = $("#sliderbox_view").width();
				$("#sliderbox_view").find("img").each(function(index, element) {
					$(this).addClass("img_"+index);
					var ImgObj = new Image(); //判断图片是否存在  
					ImgObj.src = $(this).attr("src"); 
					ImgObj.onload = function() {
						var thisModH = ImgObj.height;
						var thisModW = ImgObj.width;
						var bili = thisModW/thisModH;
						var left = 0;
						//var top = 0;
						if(bili>=1){ 
							//高度等比缩放
							thisModH = sliderboxH;
							thisModW = thisModH*bili; 
							left = -(thisModW - sliderboxW)/2;
						}else{
							thisModW = sliderboxW;
							thisModH = thisModW/bili;
							//top = -(thisModH - sliderboxH)/2;	
						};
						$(".img_"+index).css({"height":thisModH,"width":thisModW,"margin-left":left});	 
					};
				});
				//图片坐标初始化
				$("#viewPicImgBox").find(".mod_01").each(function(index, element) {
					$(this).setTagPos();
				});	
				
			}
		});
		baguetteBox.run('.baguetteBoxOne');
	};
	

	//商品
	var goods = function(){
		
		//选择数量
		getNum();
		var price_stock = [];
		//选择颜色,选择尺码,其他定制,众筹数据
		selectColor();
		function selectColor(){
			$(".viewSub").find("li").unbind("click").bind("click",function(){
				var subVal = $(this).attr("data-sub");
				var thistype = $(this).attr("data-type");
				var tagid = $(this).attr("data-tagid");
				var isbuy = $(this).attr("data-isbuy");
				var iscurrent = $(this).hasClass("current");
				if(iscurrent){
					if(thistype == "color" || thistype == "size" || thistype =="crowd"){
						
					}else{
						$(this).removeClass("current");	
						$(this).siblings(".thisval").val('');
						$(this).siblings(".thisval").attr("data-tagid",'');
					}
				}else{
					$(this).addClass("current");
					$(this).siblings("li").removeClass("current");
					$(this).siblings(".thisval").val(subVal);
					$(this).siblings(".thisval").attr("data-tagid",tagid);
				}	
				if(thistype == "color" || thistype == "size" || thistype =="crowd" ){
					var $thisviewColor = $(this).parent(".viewSub");
					$thisviewColor.checkboxFn({
						checkbox:'hidden'	
					});
				}
				//计算总价格
				calculateprice();
				//打赏金额列表
				if(thistype !="crowd"){
					crowlist();
				}
			});
		}
		//打赏金额列表
		function crowlist(){
			var thisprice = Math.ceil($("#thisprice").attr("data-price"));
			var val_2 = Math.ceil(thisprice *0.4);
			var val_3 = Math.ceil(thisprice *0.5);
			var val_4 = Math.ceil(thisprice *0.6);
			var crowli = '<li data-type="crowd" data-sub="2">'+val_2+'元</li>'+
				'<li data-type="crowd" data-sub="3">'+val_3+'元</li>'+
				'<li data-type="crowd" data-sub="4">'+val_4+'元</li>'+
				'<input class="thisval" name="reward_rate" type="hidden" value="">'+
				'<p class="blank0"></p>';	
			$("#crowd-list").html(crowli);
			selectColor();
		}
		//计算价格
		function calculateprice(){
			
			//其他定制项价格计算
			var thisAddprice = 0;
			var currentNum = $("#other_attributes").find(".current").size();
			if(currentNum > 0){
				$("#goods_infor_text").show();
				$("#goods_infor_numbox").hide();
			}else{
				$("#goods_infor_text").hide();
				$("#goods_infor_numbox").show();	
			}
			$("#other_attributes").find(".current").each(function(index, element) {
				thisAddprice += Number($(this).attr("data-addprice"));
			});
			var combinationId = $("#viewColor-list").find(".thisval").attr("data-tagid")+"_"+$("#viewSize-list").find(".thisval").attr("data-tagid");
			
			if(price_stock[combinationId]){
				thisAddprice +=Number(price_stock[combinationId][0]);
				$("#thisprice").html(exrtitle+thisAddprice.toFixed(2));
				$("#thisprice").attr("data-price",thisAddprice.toFixed(2));
				$("#goods_infor_num").html(price_stock[combinationId][1]);
				$("#maxNum").attr("data-max",price_stock[combinationId][1]);
				//选择数量
				getNum();
				//检测是否可以购买
				if(price_stock[combinationId][1]<=0){
					$("#add-zc-btn").addClass("btn-pri-gray");
					$("#add-dz-btn").addClass("btn-pri-gray");
					$("#isbuy").val(0);
				}else{
					$("#add-zc-btn").removeClass("btn-pri-gray");
					$("#add-dz-btn").removeClass("btn-pri-gray");
					$("#isbuy").val(1);	
				}
			}else{
				var defprice = $("#thisprice").attr("data-defprice");
				thisAddprice +=Number(defprice);
				$("#thisprice").html(exrtitle+thisAddprice.toFixed(2));
				$("#thisprice").attr("data-price",thisAddprice.toFixed(2));
				//选择数量
				//getNum();	
			}
			
			
		};
		//选择自定义身体数据
		var selectCustomBodydata = function(opt){
			var actionurl = $("#privateForm").attr("data-action");
			if(opt.type == 'crowd'){
				actionurl = '/m_raise/goodsraise_adddo.html';
			}
			var gdid = $("#privateForm").attr("data-gdid");
			//获取身体数据弹窗
			getBodyDataTip();
			function getBodyDataTip(){
				AjaxFunUtils.ajaxInit({
					url: '/common/gettpl.html?name=b_bodydata&ch=buy',
					type: "GET",
					yzlogin:true,
					dataType: 'html',
					params: {gdid:gdid},
					callback: function(data){
						$("body").append(data);
						getBodyData({gdid:gdid});
						addBodyData();
						
						//提交私人数据加入购物车操作
						$("#b_privateFrom").checkInput({
							buttonDiv:'#button_submit',
							validatetype:0,
							submitBtnFn: function (subfrom) {
								var subdataFrom = subfrom.serializeJson();
								var pindata = $.extend(true,opt.dataFrom,subdataFrom);
								
								AjaxFunUtils.ajaxInit({url: actionurl,
									params:pindata,
									callback:function(res){
										if(res.status){
											var locationurl = '/myorder/mycart.html';
											if(opt.type == 'crowd'){
												locationurl = '/myorder/uni2pay.html?type=wxh5&orderid='+res.data.orderid;
											}
											window.location=locationurl;	
										}else{
											AlertUtils.tips({
												htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
												type:0
											});	
										};
									}
								})
							}	
						});	
					}
				});	
			}
			//关闭编辑身体数据窗口
			function closeBodydata(){
				var num = $("#b_bodydata_info").attr("data-index");
				AlertUtils.centerDivClosed({
					indexNum:num,
					indexTipDiv:$("#b_bodydata_info"),
					type:1
				});	
			}
			//刷新身体数据列表
			function getBodyData(options){
				var settings = {
					bdid:'',
					dataFrom:'',
					otype:''
				};
				if(options){
					$.extend(settings,options);	
				}
				
				AjaxFunUtils.ajaxInit({
					url:'/myorder/body_data.html',
					params:{act:"list"},
					callback:function(res){
						if(res.status == 1){
							var ophtml = '';
							var defhtml = '<option value="">新增定制人</option>';
							$.each(res.data,function(index,o){
								var op = '<option value="'+o.bdid+'" selected="selected">'+o.title+'</option>';	
								ophtml +=op;
							});
							$("#datanamelist").html(defhtml + ophtml);
							var thisobdid = $("#datanamelist").val();
							getBodyDatainfo({bdid:thisobdid,dataFrom:settings.dataFrom,otype:settings.otype});
							selectBody();
						}else{
							AlertUtils.tips({
								type:0,
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								scallback:function(){
									closeBodydata({closeDiv:'b_private'});
								}
							});	
						}
						
					}
				});
			}
			//获取身体数据信息
			function getBodyDatainfo(options){
				var settings = {
					bdid:'',
					otype:'',
					dataFrom:''	
				};
				if(options){
					$.extend(settings,options);	
				}
				var dataUrl = '/myorder/body_data.html';
				var gdid = $("#privateForm").attr("data-gdid");
				AjaxFunUtils.ajaxInit({
					url: dataUrl,
					yzlogin:true,
					isloading:true,
					params: {gdid:gdid,act:"get",bdid:settings.bdid},
					callback: function(res){
						if(res.status){
							$("#bodydatainfo").html(res.data).show();
							$("#button_submit").show();	
						}else{
							AlertUtils.tips({
								w:350,
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0,
								scallback:function(){
									$("#button_submit").hide();	
								}
							});	
						}
						
						var isbodyid = $("#bodyid").val();
						if(!isbodyid){
							$("#delbodydataBtn").hide();	
						}
						getbodyTX();
						$("#delbodydataBtn").unbind("click").bind("click",function(){
							var actionurl = "/myorder/body_data.html";
							var deltype = $(this).attr("data-type");
							var bdid = $(this).attr("data-bdid");
							AjaxFunUtils.ajaxInit({url: actionurl,
								params:{bdid:bdid,act:deltype},
								callback:function(res){
									if(res.status == 1){
										getBodyData({bdid:res.data.bdid,otype:1});
									}else{
										AlertUtils.tips({
											w:350,
											htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
										});	
									}
								}
							});
						});
						$("#txlist").find("dd").unbind("click").bind("click",function(){
							$(this).addClass("current");
							$(this).siblings("dd").removeClass("current");
							var thisVal = $(this).attr("data-val");	
							$(this).siblings("input").val(thisVal);
						});
						if(!settings.otype){
							AlertUtils.centerDiv({
								"divId":"b_private",
								"type":1,
								callback:function(){}
							});
						}
					}
				});	
			}
			//编辑身体数据体型选择
			function getbodyTX(){
				$("#txlist").find("dd").each(function(index, element) {
				   var thisval = $(this).attr("data-val"); 
				   var thiinval = $(this).siblings("input").val();
				   if(thisval == thiinval){
						$(this).addClass("current");
						$(this).siblings("dd").removeClass("current");   
				   }
				   
				});	
			}
			//选择身体数据显示身体数据信息
			function selectBody(){
				$("#datanamelist").change(function(){
					var thisobdid = $(this).val();
					getBodyDatainfo({bdid:thisobdid,otype:1});
				});	
			}
			//新增编辑身体数据
			function addBodyData(){
				$(".bodydataBtn").unbind("click").bind("click",function(){
					var type = $(this).attr("data-type");	
					var thisval = '';
					var gdid = $(this).attr("data-gdid");
					if(type == 'edt'){
						thisval = $("#datanamelist").val();
					}
					$("#datanamelist").val("");
					getBodyDatainfo({otype:1});
				});
			};
		};
		//倒计时
		var timers = $("#timerbox").attr("data-times");
		$("#timerbox").countdownUtils({
			timers:timers,
			callback:function(){
				//alert(1);	
			}
		});
		//选择数量
		function getNum(){
			var maxNum = $("#maxNum").attr("data-max");
			if(!maxNum){
				maxNum = 99999;	
			}
			$(".buynum").plus({maxNum:maxNum});	
		}
		//检查是否有身体数据
		function isbodydata(){
			var opval = $("#datanamelist").find("option").size();	
			if(opval<=0){
				$("#edtbodydataBtn").hide();
			}else{
				$("#edtbodydataBtn").show();	
			}
		}
		//初始化选择数据
		function dataInt(){
			$("#privateForm").find(".thisval").val('');	
			$(".color-list").find("li").removeClass('current');
			$("#privateForm").find(".viewSub").removeClass('error_validate');
		};
		
		//点击立刻定制按钮及选择定制项处理
		$(".btn-cuscom").unbind("click").bind("click",function(){
			dataInt();
			var type = $(this).attr("data-type");
			var price_stock_str = $("#price_stock").val();
			var price_stock_arr = price_stock_str.split("|");
			var iszc = $(this).attr("data-iszc");
			$.each(price_stock_arr,function(index,oooo){
				if(oooo!=''){
					var oooo_arr=oooo.split("_");
					price_stock[oooo_arr[0]+"_"+oooo_arr[1]]= [oooo_arr[2],oooo_arr[3]]; 
				}  
			});
			//初始化
			$("#crowd-box").hide();
			$("#crowd-box-btn").hide();
			$("#bargain-box").hide();
			$("#bargain-box-btn").hide();
			$("#buy-box-btn").hide();
			$("#buy-box").hide();
			
			if(type=='buy' || type=='addcart'){
				$("#buy-box-btn").show();
				$("#buy-box").show();
			}
			if(type=='crowd'){
				$("#crowd-box").show();
				$("#crowd-box-btn").show();
				//var texthtml = '';
				//var crowinputhtml = '';
				//$("#crowd-textarea").html(texthtml);
				//$("#crow-input-box").html(crowinputhtml).show();
				//打赏金额列表
				crowlist();				
				//打赏描述
				$("#crow-des").unbind("click").bind("click",function(){
					$(this).blur();
					AlertUtils.centerDiv({
						divId:'des_crowdtip',
						position:'fixed',
						istop:1,
						w:'100%',
						touchmove:1,
						callback:function(){
							var thiscrowVal = $("#sub-des").val();
							var thismobileVal = $("#sub-mobile").val();
							$("#crow-des-tip").val(thiscrowVal);
							$("#crow-des-mobile").val(thismobileVal);
							//$("#crow-des-tip").focus();
							$("#des_crowdform").checkInput({
								validatetype:0,
								button:'#des-tip-btn',
								submitBtnFn: function (from) {
									var thiscrowVal = $("#crow-des-tip").val();
									var thismobileVal = $("#crow-des-mobile").val();
									$("#crow-des").val(thiscrowVal);
									$("#sub-des").val(thiscrowVal);
									$("#sub-mobile").val(thismobileVal);
									$("#crowd-textarea").checkboxFn({
										checkbox:'text',
										chird:1
									});
									closeTip($("#des_crowdtip"),2);
								}
							});
						}
					});					
				});
			}
			if(type=='bargain'){
				$("#bargain-box").show();
				$("#bargain-box-btn").show();
				//var texthtml = '';
				//var crowinputhtml = '';
				//$("#crowd-textarea").html(texthtml);
				//$("#crow-input-box").html(crowinputhtml).show();
		
				//砍价描述
				$("#bargain-des").unbind("click").bind("click",function(){
					$(this).blur();
					AlertUtils.centerDiv({
						divId:'des_bargaintip',
						position:'fixed',
						istop:1,
						w:'100%',
						touchmove:1,
						callback:function(){
							var thiscrowVal = $("#sub-des").val();
							var thismobileVal = $("#sub-mobile").val();
							$("#bargain-des-tip").val(thiscrowVal);
							$("#bargain-des-mobile").val(thismobileVal);
							//$("#crow-des-tip").focus();
							$("#des_bargainform").checkInput({
								validatetype:0,
								button:'#des-bargain-btn',
								submitBtnFn: function (from) {
									var thiscrowVal = $("#bargain-des-tip").val();
									var thismobileVal = $("#bargain-des-mobile").val();
									$("#bargain-des").val(thiscrowVal);
									$("#sub-des").val(thiscrowVal);
									$("#sub-mobile").val(thismobileVal);
									$("#bargaind-textarea").checkboxFn({
										checkbox:'text',
										chird:1
									});
									closeTip($("#des_bargaintip"),2);
								}
							});
						}
					});					
				});
			}
			$("#custom-list-modalMask").show();
			$("#custom-list").show();
			document.body.style.overflow='hidden';
			//加入购物车
			addCartFun({type:type});
			//禁止浏览滚动条	
			$('#custom-list-modalMask').bind("touchmove",function(e){  
                e.preventDefault();  
       		});
			//nobrowser({tag:false});
			event.stopPropagation();//阻止事件往上冒泡
			var bodyH = getHeightBody()-110;
			$("#custom-cont").css({"height":bodyH});
			$("#custom-list-modalMask,.custom-close").unbind("click").bind("click",function(){
				$("#custom-list").hide();
				$("#custom-list-modalMask").hide();	
				document.body.style.overflow='auto';
			});
		});
		//加入购物车处理
		function addCartFun(opt){
			$("#privateForm").checkInput({
				validatetype:0,
				button:'.add-submit-btn',
				submitBtnFn: function (from) {
					var isbuy = $("#isbuy").val();
					if(isbuy < 1){
						return false;	
					}
					var addflag = $("#viewColor-list").checkboxFn({
						checkbox:'hidden'	
					});
					var sizeFlag = $("#viewSize-list").checkboxFn({
						checkbox:'hidden'	
					});
					if(opt.type=='crowd'){
						var crowdflag = $("#crowd-list").checkboxFn({
							checkbox:'hidden'
						});
						var crowdflag_des = $("#crowd-textarea").checkboxFn({
							checkbox:'text',
							chird:1
						});
						if(!crowdflag){
							return false;	
						}
						if(!crowdflag_des){
							return false;	
						}	
					}
					if(opt.type=='bargain'){
						var bargainflag_des = $("#bargain-textarea").checkboxFn({
							checkbox:'text',
							chird:1
						});
						if(!bargainflag_des){
							return false;	
						}	
					}
					if(!addflag){
						return false;	
					}
					if(!sizeFlag){
						return false;	
					}
					
					var thissize = $("#viewSize-list").find(".thisval").val();
					var subdataFrom = from.serializeJson();
					if(thissize == "bodydata"){
						selectCustomBodydata({dataFrom:subdataFrom,type:opt.type});	
						return;	
					}
					var actionurl = $("#privateForm").attr("data-action");
					if(opt.type == 'crowd'){
						actionurl = '/m_raise/goodsraise_adddo.html';
					}
					if(opt.type=='bargain'){
						actionurl = '/m_cut/goodscut_adddo.html';	
					}
					var pindata = subdataFrom;
					Loading.loadInit({status:1});
					AjaxFunUtils.ajaxInit({url: actionurl,
						params:pindata,
						callback:function(res){
							if(res.status){
								var locationurl = '/myorder/mycart.html';
								if(opt.type == 'crowd'){
									locationurl = '/m_raise/goodsraise.html?id='+res.data.id+'&js_first=1';
								}
								if(opt.type == 'bargain'){
									locationurl = '/m_cut/goodscut.html?id='+res.data.id+'&js_first=1';
								}
								if(opt.type == 'addcart'){
									//获取头部购物车数据
									if($("#cartItemnum").size() > 0){
										GetCartTop.getCartInit();
									}
									$("#custom-list-modalMask,#custom-list").hide();
									Loading.loadInit({status:0});
								}else{
									window.location=locationurl;
								}
							}else{
								AlertUtils.tips({
									htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
									type:0
								});	
								Loading.loadInit({status:0});
							};
							
						}
					})
				}	
			});		
		}
	};
	return {shareViewInit:shareViewInit}
}();
