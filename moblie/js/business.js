// JavaScript Document
var Business = function(){
	var basesBusiness= function(){
		BaseInitClass.baseInit();//整个网站公共初始化
		buttonBindFn();
	};
	var businessInit = function(options){
		var settings = {
			mod:''	
		};
		$.extend(settings,options);
		basesBusiness();
		switch(settings.mod){
			case 'goods_add':
				goods_add();
				break;
			case 'goods_list':
				goods_list();
				break;
			case 'goods_tuan_list':
				goods_tuan_list();
				break;
			default:
				break;
		}
	};
	//按钮绑定事件
	var buttonBindFn = function(){
		//关注按钮初始化
		BaseInitClass.followBtn();
		//私聊TA
		$(".chatBtn").unbind("click").bind("click",function(){
			var uid = $(this).attr("data-fsuid");
			MsgMod.msgInit({
				uid:uid	
			});	
		});
		//关注个人
		$("#followBtn").unbind("click").bind("click",function(){
			var $thisF = $(this);
			var fsuid = $thisF.attr("data-fsuid");
			var followvalue = $thisF.attr("data-follow");
			AjaxFunUtils.ajaxInit({
				"url":"/share/follow_person.html", 
				"params":{'fsuid':fsuid,'followvalue':followvalue}, 
				"callback":function (result) {
					if(result.status){
						if(followvalue == 1){
							$thisF.text('Follow').removeClass("btn-danger").addClass("btn-border");	
							$thisF.attr("data-follow",0);
						}else{
							$thisF.text('Unfollow').removeClass("btn-border").addClass("btn-danger");	
							$thisF.text('Unfollow');
							$thisF.attr("data-follow",1);	
						}
					}else{
						AlertUtils.tips({
							w:"90%",
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
						});
					}
				}
			});		
		});
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
					AlertUtils.centerDiv({"divId":"profileTipbox","type":1,"w":570,"callback":function(){
						$("#profileForm").find(".avatar_loading").checkImgExists();
						$("#upUserPicBtn").unbind("click").bind("click",function(){
							UploadUtils.uploadInit({"uploadUrl":"/upload/upavatar.html","uptitle":lang.js_upavatartitle,"upType":"avatar","callback":function(jsonData){
									if(jsonData.status == 1){
										var num = $("#uploadid").attr("data-index");
										AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#uploadid"),type:1,callback:function(){
											
											$("#profileImage").attr("src",jsonData.src);	
											$("#avatarid").attr("value",jsonData.thumbpic);	
										}});
									}
								}
							});
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
		//用户设置按钮绑定
		$("#userSetBtn").unbind("click").bind("click",function(event){
			//取消事件冒泡  
            event.stopPropagation();
			$('.positionShow:not(".userSetMenu")').hide();
			$(this).siblings('#userSetMenu').toggle();
			$(document).bind('click',function(e){
				  var target = $(e.target);
				  if(target.closest("#userSetMenu").length == 0){
					$('#userSetMenu').hide();
				  };
			});	
		});
	};
	//图片上传编辑
	var goods_add = function(){
		//获取分类
		getBigCatList();
		//上传样板图片初始化
		upProPic();
		
		//上传编辑样板图片
		function upProPic(){
			var maxNum = 4;
			$("#pro_btn").unbind("click").bind("click",function(){
				var flag = isup();
				if(flag){
					UploadUtils.uploadInit({
						uploadUrl:"/upload/index.html",
						ismult:true,
						uptitle:lang.js_upproimg,
						fileNumLimit:maxNum,
						callback:function(arrData){
							var imglist = arrData;
							var simgHtml = '';
							$.each(imglist,function(index,o){
								var lihtml = '<li><input type="hidden" class="hideimageurl" name="pics" value="'+o.imgname_db+'|'+o.width+'|'+o.height+'|'+o.swidth+'|'+o.sheight+'|'+o.color+'" isarray="true"><img src="'+o.thumbpic+'" /><div class="operate"><i class="ico del"></i></div></li>';
								simgHtml +=lihtml;
							});
							$("#uppro_pic_list ul").append(simgHtml);
							$("#uppro_pic_list").show();
							closeUpload();
							hoverimg();
							isup();
							delImg();
							isimg();
						}
					});	
				}
			});
			
			//产品图片鼠标经过
			hoverimg();
			//是否可以继续上传图片
			isup();
			//删除图片绑定
			delImg();
			//鼠标经过图片
			function hoverimg(){
				$("#uppro_pic_list").find("li").hover(function(){
					$(this).find(".operate").show();	
				},function(){
					$(this).find(".operate").hide();
				});	
			}
			
			//删除图片
			function delImg(){
				$("#uppro_pic_list").find(".del").unbind("click").bind("click",function(){
					$(this).parents("li").remove();	
					var num = $("#uppro_pic_list").find("li").size();
					if(num <= 0){
						$("#uppro_pic_list").hide();	
					}
					isup();
					isimg();
				});
			}
			//是否有图片
			function isimg(){
				$("#uppro_pic").checkboxFn({
					checkbox:'hidden',
					scallback:function(othis){
						othis.removeClass("error_validate");	
					},
					errorcallback:function(){
						othis.addClass("error_validate");		
					}	
				});	
			}
			//是否可以继续上传
			function isup(){
				var num = $("#uppro_pic_list").find("li").size();
				var flg = true;
				if(num >= 4 ){
					$("#pro_btn").addClass("btn-danger-gray");
					flg = false;
					return flg;	
				}else{
					$("#pro_btn").removeClass("btn-danger-gray");
					maxNum = 4 - num;
					return flg;
				}
			}	
		};
		//获取顶级分类
		function getBigCatList(){
			AjaxFunUtils.ajaxInit({
				url: '/b_category/categoryson.html?ch=goods',
				callback:function(res){
					var resData = res.data;
					var lihtml = '';
					$.each(resData,function(index,o){
						var li_o = '<li data-tagid="'+o.tagid+'" value="'+o.catid+'">'+o.catname+'</li>';
						lihtml +=li_o;	
					});
					$("#cat_b").find(".CategoryList").html(lihtml);
					//下拉框初始化
					$("#cat_b").selectUtils({
						callback:function(j,i){
							var select_analog = $("#cat_b").find('input');
							checkInputFun.initContext(select_analog, checkInputFun.myIt);
							select_analog.siblings("p").show();
							checkInputFun.mycheckIn(select_analog);	
							$("#cat_b").siblings(".select_box").find('span').html('选择分类').removeClass('active');
							$("#cat_b").siblings(".select_box").find('.select_analog ').val('');
							//获取二级分类
							getSmalCat(i);
						}
					});
				}	
			});			
		};
		//获取二级分类
		function getSmalCat(oi){
			AjaxFunUtils.ajaxInit({
				url: '/b_category/categoryson.html?catid='+oi+'&ch=goods',
				callback:function(res){
					var resData = res.data;
					var lihtml = '';
					$.each(resData,function(index,o){
						var li_o = '<li data-tagid="'+o.tagid+'" value="'+o.catid+'">'+o.catname+'</li>';	
						lihtml +=li_o;
					});
					$("#cat_m").find(".CategoryList").html(lihtml);
					//下拉框初始化
					$("#cat_m").selectUtils({"callback":function(j,i){
						var select_analog = $("#cat_m").find('input');
						checkInputFun.initContext(select_analog, checkInputFun.myIt);
						select_analog.siblings("p").show();
						checkInputFun.mycheckIn(select_analog);	
						//获取三级分类
						getSmalCat3(i);
					}});
				}	
			});	
		};
		//获取三级分类
		function getSmalCat3(oi){
			AjaxFunUtils.ajaxInit({
				url: '/b_category/categoryson.html?catid='+oi+'&ch=goods',
				callback:function(res){
					var resData = res.data;
					var lihtml = '';
					$.each(resData,function(index,o){
						var li_o = '<li data-tagid="'+o.tagid+'" value="'+o.catid+'">'+o.catname+'</li>';	
						lihtml +=li_o;
					});
					$("#cat_s").find(".CategoryList").html(lihtml);
					//下拉框初始化
					$("#cat_s").selectUtils({"callback":function(j,i){
						var select_analog = $("#cat_s").find('input');
						checkInputFun.initContext(select_analog, checkInputFun.myIt);
						select_analog.siblings("p").show();
						checkInputFun.mycheckIn(select_analog);	
					}});
				}	
			});	
		};
		//选择颜色
		$("#color_validate").unbind("click").bind("click",function(){
			$(this).checkboxFn({
				scallback:function(){
					$(this).removeClass("error_validate");	
				},
				errorcallback:function(){
					$(this).addClass("error_validate");		
				}	
			});	
		});
		//选择尺码
		$("#cc_validate").unbind("click").bind("click",function(){
			$(this).checkboxFn({
				scallback:function(){
					$(this).removeClass("error_validate");	
				},
				errorcallback:function(){
					$(this).addClass("error_validate");		
				}	
			});	
		});
		//checkColor($("#cc_validate"));
		//提交发布样板操作
		$("#upSampleBoxFrom").checkInput({
			validatetype:0,
			submitBtnFn: function (from) {
				var colorflag = $("#color_validate").checkboxFn({});
				var ccflag = $("#cc_validate").checkboxFn({});
				var imgflag = $("#uppro_pic").checkboxFn({checkbox:'hidden'});
				if(!colorflag || !ccflag || !imgflag){
					return false;	
				}
				var dataFrom = from.serializeJson();
				var actionurl = $("#upSampleBoxFrom").attr("data-action");
				AjaxFunUtils.ajaxInit({url:actionurl,
					params:dataFrom,
					callback:function(res){
						if(res.status){
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								callback:function(){
									$(".btnTipsubmit").html("继续上传样板");
									$(".btnCancel").html("返回样板列表");
								},
								scallback:function(){
									window.location = '/b_goods/goods_add.html';	
								},
								closeback:function(){
									window.location = '/b_goods/goods_list.html';	
								}
							});
						}else{
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0
							});	
						};
						Loading.loadInit({status:0});
					},
					errCallback:function(){
						Loading.loadInit({status:0});	
					}
				})
			}	
		});
	};
	//样板列表
	var goods_list = function(){
		$("#goods_list").find(".btn-act").unbind("click").bind("click",function(){
			var act = $(this).attr("data-act");	
			var url = $(this).attr("data-url");	
			switch(act){
				case "edt":
					window.location = url+"#goodlist";//重新开团
					break;
				case "notautonew":
					retautonew(url);//取消自动开团
					break;
				case "autonew":
					retautonew(url);//取消自动开团
					break;
				case "success":
					retautonew(url);//取消自动开团
					break;
				case "fail":
					retautonew(url);//取消自动开团
					break;
				default:
					break;	
			};
		});	
	};
	//团列表
	var goods_tuan_list = function(){
		$("#goods_tuan_list").find(".btn-act").unbind("click").bind("click",function(){
			var act = $(this).attr("data-act");	
			var url = $(this).attr("data-url");	
			switch(act){
				case "edt":
					window.location = url+"#goodlist";//重新开团
					break;
				case "notautonew":
					retautonew(url);//取消自动开团
					break;
				case "autonew":
					retautonew(url);//自动开团
					break;
				case "success":
					retautonew(url);//成团
					break;
				case "fail":
					retautonew(url);//不成团
					break;
				default:
					break;	
			};
		});		
	};
	//重新开团方法
	var retautonew = function(ourl){
		AjaxFunUtils.ajaxInit({
			url:ourl,
			isloading:true,
			callback:function(res){
				if(res.status){
					AlertUtils.tips({
						w:"90%",
						htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
						type:0,
						scallback:function(){
							window.location.reload();
							$("html,body").animate({scrollTop:$("#goodlist").offset().top - 100},1);
						}
					});
				}else{
					AlertUtils.tips({
						w:"90%",
						htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
						type:0
					});	
				};
			}
		});
	};
	
	return {businessInit:businessInit}
}();

