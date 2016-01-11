define(['jquery','config','base','ajax','checkInput','serializeJson'],function($,config,base,AjaxFunUtils){
	var defaultAddr = '';
	var init = function(){
		getAddress(defaultAddr);	
	};
	//加载模板
	var loadhtml = function(){
		var telhtml = '<div id="addressbox" class="addressbox">'+
			'<form id="addressform" method="post">'+
			  '<div id="add_headerbox" class="headerbox">'+
				'<div class="rowbox searchbox">'+
				  '<div class="top_l"> <a href="javascript:void(0);" id="back-address" class="back-address rel" data-level="0"> <span class="b_ico ico-back-h"></span> </a> </div>'+
				  '<div class="row-flex1 text-center h2_title">收货地址管理</div>'+
				'</div>'+
				'<div id="address_cont" class="address_cont">'+
					'<ul id="addressedit" class="jsbox f16 color-333 jsbox_mt0" style="display:none">'+
						'<li id="address_row" class="rowbox">'+
							'<div class="row-flex1">'+
								'<p id="add_str_text">广东省广州市天河区</p>'+
								'<p class="f12 color-999 edit_text">所在地区</p>'+
								'<input id="add_str" name="add_str" type="hidden" />'+
								'<input id="add_ids" name="add_ids" type="hidden" />'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
						'<li id="townSelRow" class="rowbox">'+
							'<div class="row-flex1">'+
								'<input id="add_str_2" class="noborder edit_input" name="add_str_2" type="text" placeholder="请选择街道" style="padding-left:0" readonly />'+
								'<p class="f12 color-999 edit_text">街道</p>'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
						'<li class="rowbox li_edit">'+
							'<div class="row-flex1">'+
								'<input id="add_more" name="add_more" type="text" value="" placeholder="请输入详细地址" class="noborder edit_input" style="padding-left:0" data-validate="isempty" />'+
								'<p class="f12 color-999 edit_text">详细地址</p>'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
						'<li class="rowbox li_edit">'+
							'<div class="row-flex1">'+
								'<input id="addressee" name="addressee" type="text" value="" placeholder="请输入收货人姓名" class="noborder edit_input" style="padding-left:0" data-validate="isempty" />'+
								'<p class="f12 color-999 edit_text">收货人姓名</p>'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
						'<li class="rowbox li_edit">'+
							'<div class="row-flex1">'+
								'<input type="text" id="cellphone" name="cellphone" value="" placeholder="请输入收货人手机号码" class="noborder edit_input" style="padding-left:0" data-validate="Mobile" />'+
								'<p class="f12 color-999 edit_text">收货人手机号码</p>'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
						'<li class="rowbox li_edit">'+
							'<div class="row-flex1">'+
								'<input type="text" id="zip" name="zip" value="" placeholder="请输入邮编" class="noborder edit_input" style="padding-left:0" />'+
								'<p class="f12 color-999 edit_text">邮编</p>'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
						'<li class="rowbox" for="sedefault">'+
							'<div class="row-flex1">'+
								'<label><input type="checkbox" name="sedefault" id="sedefault" style="width:20px;padding:0; margin-bottom:-10px"/>设置为默认收货地址</label>'+
								'<p class="f12 color-999 edit_text">默认收货地址</p>'+
							'</div>'+
							'<div class="ico ico-jt mt-10"></div>'+
						'</li>'+
					'</ul>'+
					'<ul id="townSelRow_list" class="jsbox jsbox_mt0" style="display:none"></ul>'+
					'<div id="divsionSelect" style="display:none">'+
						'<ul id="selected" class="jsbox jsbox_mt0" style="display:none"></ul>'+
						'<ul id="forselect" class="jsbox jsbox_mt0"></ul>'+
					'</div>'+
				  '</div>'+
			  '</div>'+
			  '<div class="footerbox rowbox" style="padding:10px 0;z-index:99999">'+
			    '<input id="addrid_edt" name="addrid" type="hidden" />'+
				'<div class="row-flex1 text-left">'+
					'<button id="delBtn" type="button" class="btn w150">删除</button>'+
				'</div>'+
				'<div class="row-flex1 text-right">'+
					'<button type="button" class="btn btn-danger w150 address_sub_btn">保存</button>'+
				'</div>'+
			  '</div>'+
			'</form>'+
		  '</div>';
		 
		  $("body").append(telhtml);
		  var bodyh=config.base.getHeightBody();
		  $("#add_headerbox").css({"height":bodyh,"z-index":99998});
		  $("#address_cont").css({"height":bodyh-60});	
	};
	//添加，编辑，删除收货地址
	var addedtAddress = function(opt){
		//加载模板
		loadhtml();
		//加载，编辑地址
		if(opt.act == 'add'){
		  $("#add_headerbox").addClass("address_add");
		  //省级地址获取
		  siondatalist();
		  //提交绑定
		  subaddress({act:opt.act});
		}else{
			 $("#add_headerbox").addClass("address_edt");
			 //编辑提取数据
			 edtaddress({
				act:opt.act,
				addrid:opt.addrid,
				callback:function(res3){
					//提交绑定
					subaddress({act:'edt'});	
				}
			}); 
		}
		//被选中li
		selectedclik();
		//所在地区行click
		address_row();
		//街道选择
		townSelRow();
		//详细地址，收货人姓名等
		$("#addressedit").on("click",".li_edit",function(){
			$(this).addClass("li_edit_current");
			$(this).siblings(".li_edit").removeClass("li_edit_current");
			$(this).find(".edit_input").focus();
		});
		//关闭地址弹框
		$("#back-address").on("click",function(){
			var level = $(this).attr("data-level");
			var stateid = $(this).attr("data-state");
			var cityid = $(this).attr("data-city");
			if(level == 0 || level == 3){
				$("#addressbox").remove();
			}else if(level == 1){
				if(opt.act == 'add'){
					//省级地址获取
					siondatalist();	
					$(this).attr("data-level",0);
					$("#selected").html('').hide();
				}else{
					$(this).attr("data-level",0);
					$("#addressedit").show();
					$("#divsionSelect").hide();
				}
			}else if(level == 2){
				$(this).attr("data-level",1);
				$("#selected").find(".li_click").each(function(index, element) {
                    var li_level = $(this).attr("data-level");
					if(li_level == 2){
						$(this).remove();	
					}
                });
				//市级地址获取
				getcityaddress({thisId:stateid});
			}
		});
	};
	var selectedclik = function(){
		//被选中li
		$("#selected").on("click",'.li_click',function(){
		  var parentid = $(this).attr("data-parentid");
		  var level = $(this).attr("data-level");
		  $("#back-address").attr("data-level",level-1);
		  if(parentid > 0){
			 getcityaddress({thisId:parentid});
			 $(this).remove(); 
		  }else{
			siondatalist();
			$("#selected").html('').hide();
		  }
		  $("#add_str_2").attr("data-id",'');
		  $("#add_str_2").val('');
		  
		  $("#townSelRow_list").hide();
		  $("#divsionSelect").show();
		  $("#addressedit").hide(); 
		})	
	};
	//所在地区行click
	var address_row = function(){
		//所在地区行click
		$("#address_row").off("click").on("click",function(){
		  var state = $(this).attr("data-state");
		  var city = $(this).attr("data-city");
		  var county = $(this).attr("data-county");
		  $("#back-address").attr("data-level",2);
		  if(state > 0){
			 $("#selected").html(''); 
			 getdataaddress({
				callback:function(res3){
					$.each(res3.data,function(index,ooo){
						if(ooo.id == state){
							var lihtml3 = '<li class="li_click" data-level="'+ooo.level+'" data-name="'+ooo.name+'" data-id="'+ooo.id+'" data-parentid="0">'+ooo.name+'</li>'
							$("#selected").append(lihtml3);
							return;	
						}
					});	
					getdataaddress({
						upid:state,
						callback:function(res3){
							$.each(res3.data,function(index,ooo){
								if(ooo.id == city){
									var lihtml3 = '<li class="li_click" data-level="'+ooo.level+'" data-name="'+ooo.name+'" data-id="'+ooo.id+'" data-parentid="'+state+'">'+ooo.name+'</li>'
									$("#selected").append(lihtml3);
									return;	
								}
							});	
							getdataaddress({
								upid:city,
								callback:function(res3){
									if(res3.data.length<=0){
										$("#forselect").hide();	
									}else{
										$("#forselect").show();		
									}
									var lihtml3 = '';
									$.each(res3.data,function(index,ooo){
										lihtml3 += '<li class="li_click" data-level="'+ooo.level+'" data-name="'+ooo.name+'" data-id="'+ooo.id+'" data-parentid="'+city+'">'+ooo.name+'</li>'
									});	
									$("#forselect").html(lihtml3);
								}
							});
						}
					});
				}
			})
			$("#divsionSelect,#selected").show(); 
			$("#addressedit").hide(); 
			forselectclick();
		  }else{
			//省级地址获取
			siondatalist(); 
			//提交绑定
			subaddress({act:'edt'}); 
		  }
		})	
	};
	//街道选择
	var townSelRow = function(){
		//街道click
		$("#townSelRow").off("click").on("click",function(e){
			var upid = $(this).attr("data-townid");
			if(upid<=0){
				return false;	
			}
			getdataaddress({
				upid:upid,
				callback:function(res){
					var lihtml = '';
					$.each(res.data,function(index,o){
						lihtml += '<li class="li_click" data-level="'+o.level+'" data-name="'+o.name+'" data-id="'+o.id+'" data-isleaf="0">'+o.name+'</li>';	
					});
					$("#townSelRow_list").html(lihtml).show();
					$("#divsionSelect").hide();
					$("#addressedit").hide();
					
					$("#townSelRow_list").off("click").on("click",'.li_click',function(){
						var thisname = $(this).attr("data-name");
						var thisid = $(this).attr("data-id");	
						$("#add_str_2").attr("data-id",thisid);
						$("#add_str_2").val(thisname);
						
						var newadd_ids = $("#address_row").attr("data-state")+"_"+$("#address_row").attr("data-city")+"_"+$("#address_row").attr("data-county")+"_"+thisid;
						$("#add_ids").val(newadd_ids);
						$("#townSelRow_list").hide();
						$("#divsionSelect").hide();
						$("#addressedit").show();
					});	
				}	
			});  
		});
	};
	//准备选择li
	var forselectclick = function(){
	  $("#forselect").off("click").on('click','.li_click',function(){
		var thisId = $(this).attr("data-id");
		var thislevel = $(this).attr("data-level");
		var thisname = $(this).attr("data-name");
		var $this = $(this);
		$("#back-address").attr("data-level",thislevel);
		
		if(thislevel == 1){
			$("#address_row,#back-address").attr("data-state",thisId);
		}else if(thislevel == 2){
			$("#address_row,#back-address").attr("data-city",thisId);
		}else if(thislevel == 3){
			$("#address_row,#back-address").attr("data-county",thisId);
			$("#add_str_2").val('');
			$("#add_str_2").attr("data-id",'');
		}
		getcityaddress({
			thisId:thisId,
			thislevel:thislevel,
			callback:function(resin){
				if(resin.data.length <=0 || thislevel>2){
					$("#divsionSelect").hide();
					$("#addressedit").show();
					var add_str_text = '';
					var add_str_id = '';
					$("#selected").find("li").each(function(index, element) {
						var thisinname = $(this).attr("data-name");
						var thisinid = $(this).attr("data-id");
						
						add_str_text += thisinname;
						add_str_id += thisinid+'_';
						
					});
					add_str_text += thisname;
					add_str_id += thisId+'_'
					$("#townSelRow").attr("data-townid",thisId);
					$("#add_ids").val(add_str_id);
					$("#add_str_text,#add_str").text(add_str_text);	
					$("#add_str").val(add_str_text);
					if(resin.data.length <=0){
						$("#forselect").hide();	
						$("#townSelRow").hide();	
					}else{
						$("#forselect").show();	
						$("#townSelRow").show();	
					}
				}else{
					$("#selected").append($this).show();	
				}
			}
		});	
	});
	}
	//获取省级数据
	var siondatalist = function(opt){
	 getdataaddress({
		callback:function(res){
			if(res.status == 1){
				var lihtml = '';
				$.each(res.data,function(index,o){
					lihtml += '<li class="li_click" data-level="'+o.level+'" data-name="'+o.name+'" data-id="'+o.id+'" data-parentid="0" data-isleaf="0">'+o.name+'</li>';	
				});	
				$("#forselect").html(lihtml).show();
				$("#divsionSelect").show();
				$("#addressedit").hide();
				forselectclick();
			}else{
				config.tip.tips({
					htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
					w:"96%",
					type:0
				});	
			}	
		}
	  }); 
	};
	//获取省级以下数据列表
	var getcityaddress = function(opt){
		getdataaddress({
			upid:opt.thisId,
			callback:function(res){
				var lihtml = '';
				$.each(res.data,function(index,o){
					lihtml += '<li class="li_click" data-level="'+o.level+'" data-name="'+o.name+'" data-id="'+o.id+'" data-parentid="'+opt.thisId+'"  data-isleaf="0">'+o.name+'</li>';	
				});
				$("#forselect").html(lihtml).show();
				if(opt.callback){
					opt.callback(res);	
				}			
			}	
		});
	 };
    //统一获取地址
	var getdataaddress = function(opt){
	 AjaxFunUtils.ajaxInit({
		"url":"/common/district_son.html", 
		"params":{upid:opt.upid}, 
		"callback":function (res) {
			if(opt.callback){
				opt.callback(res);	
			}
		}
				
	  }); 
	};
	//编辑地址，获取当前编辑地址数据
	var edtaddress = function(optin){
	 AjaxFunUtils.ajaxInit({
		url:"/myorder/address.html",
		params:{act:"get",addrid:optin.addrid}, 
		callback:function(resin){
			if(resin.status == 1){
				$("#addressedit").show();
				$("#addrid_edt").val(optin.addrid);
				$("#addressee").val(resin.data.addressee);
				$("#add_str_text").text(resin.data.address1);
				$("#add_str").val(resin.data.address1);
				$("#add_ids").val(resin.data.state+'_'+resin.data.city+'_'+resin.data.county+'_'+resin.data.town);
			
				$("#add_more").val(resin.data.more);	
				$("#zip").val(resin.data.zip);
				$("#cellphone").val(resin.data.cellphone);
				if(resin.data.town){
					$("#add_str_2").val(resin.data.address2);
				}else{
					$("#townSelRow").hide();	
				}
				if(resin.data.addrid == defaultAddr){
					$("#sedefault").attr("checked","checked");	
				}
				
				$("#address_row").attr("data-state",resin.data.state);
				$("#address_row").attr("data-city",resin.data.city);
				$("#address_row").attr("data-county",resin.data.county);
				
				$("#townSelRow").attr("data-townid",resin.data.county);
				
				//删除地址
				$("#delBtn").show().unbind("click").bind("click",function(){
					AjaxFunUtils.ajaxInit({
						url:"/myorder/address.html", 
						params:{act:"del",addrid:optin.addrid}, 
						callback:function (result) {
							if(result.status == 1){
								getAddress();//删除完成刷新地址列表
								config.tip.tips({
									htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
									w:"96%",
									type:0
								});	
								$("#addressbox").remove();
							}else{
								config.tip.tips({
									htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
									w:"96%",
									type:0
								});	
							}
						}
					});	
				});	
				if(optin.callback){
					optin.callback(resin);
				}
			}
		}
	 });
	};
	//获取送货地址
	var getAddress = function(odz){
		AjaxFunUtils.ajaxInit({
			url:"/myorder/address.html",
			params:{act:'list' },
			callback:function(res){
				var addresslist = res.data;
				if(addresslist.length<=0){
					$("#addrid").html('<p id="newaddress" class="addAddressBtn" data-address="0" data-act="add" style="padding:0 5px; margin:5px 0">请填写收货人信息</p>');
					addAddressBtn();
					return false;	
				}
				var html = '';
				$.each(addresslist,function(index,o){
					var newaddress = o.address1+' '+o.address2 + ' ' + o.more + ' ' + o.addressee + ' ' + o.cellphone;
					var checked = '';
					if(o.default == 1){
						checked = 'checked="checked"';
						defaultAddr = o.addrid;
					}
					var addVal = '<li class="rowbox mt-5"><div class="row-flex1 rowbox"><input name="addrid" id="'+o.addrid+'" type="radio" value="'+o.addrid+'" '+checked+'><label style="line-height:20px" for="'+o.addrid+'">'+newaddress+'</label></div><div class="w100 text-right"><a href="javascript:void(0);" class="addAddressBtn"  data-address="1" data-addrid="'+o.addrid+'" data-act="edt">编辑<div class="ico ico-jt ml-5"></div></a></div></li>';
					html +=addVal;
				});
				$("#addrid").html(html);
				addAddressBtn();	
			}
		});
	};
	//提交添加，编辑地址
	var subaddress = function(opt){
		$("#addressform").checkInput({
			button:'.address_sub_btn',
			submitBtnFn: function (from) {
				var dataFrom = from.serializeJson();
				dataFrom.act = opt.act;
				AjaxFunUtils.ajaxInit({
					"url":"/myorder/address.html", 
					"params":dataFrom, 
					"callback":function (res) {
						if(res.status == 1){
							
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"96%",
								type:0,
								callback:function(){
									getAddress();//添加，编辑完成刷新地址列表
									$("#addressbox").remove(); 	
								}
							});
							
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"96%",
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
			var act = $(this).attr("data-act");
			addedtAddress({act:act,addrid:thisaddrid});
		});
		//获取微信地址
		$(".wxAddressBtn").unbind("click").bind("click",function(){
			var thisaddrid = $(this).attr("data-addrid");
			AjaxFunUtils.ajaxInit({
				"url":"/myorder/address.html?act=weixin_sign", 
				"params":{}, 
				"callback":function (res) {
					if(res.status == 1){
						var sign_info = res.data.sign_info;
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
													//defaultAddr = thisaddrid;
												}
												//address.getAddress();//添加，编辑完成刷新地址s列表
											}else{
												config.tip.tips({
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
	return {init:init,getAddress:getAddress};	
});