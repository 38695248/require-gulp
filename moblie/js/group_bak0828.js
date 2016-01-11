var groupUtils = function(){
	//统一入口
	var groupInit = function(options){
		var settings = {
			mod:''	
		};
		if(options){
			$.extend(true,settings,options);
		}
		BaseInitClass.baseInit();//整个网站公共初始化
		switch(settings.mod){
			case "add":
				creatWeixinGroup.addgrouppage();//创建群
				break;	
			case "push":
				groupList();//群列表
				break;
			case "follow":
				followGroup();//关注群
				break;
			case "addGroup":
				addGroup();//加入群
				break;
			case "my":
				mygroup();//我的群列表
				break;
			case "home":
				groupHome();//群主页
				break;
		};
	};
	
	//加入群
	var addGroup = function(){
		$(".addGroupBtn").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			var act = $(this).attr("data-act");
			AjaxFunUtils.ajaxInit({
				url: '/user_group/join.html',
				params:{gpid:gpid,act:act},
				callback: function(res){
					if(res.status == 1){
						if(act != "del"){
							var imghtml = '<img id="qrcodeimg" class="qrcodeimg" src="'+res.data.qrcode[2]+'" data-original="'+res.data.qrcode[1]+'" />';
							$(imghtml).checkImgExists(function($this,oimgurl){
								var newimghtml = '<img id="qrcodeimg" class="qrcodeimg" src="'+oimgurl+'" data-original="'+res.data.qrcode[1]+'" />';
								AlertUtils.tips({
									htmlmsg:'<div style="padding:30px" class="text-center"><p>长按图片并识别二维码，进入微信群。</p><p class="blank10"></p><p class="text-center">'+newimghtml+'</p></div>',
									w:"90%",
									type:0,
									callback:function(){
										
									},
									scallback:function(){
										window.location.reload();	
									},
									closeback:function(){
										window.location.reload();	
									}
								});	
							});
						}else{
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"90%",
								type:0,
								scallback:function(){
									window.location.reload();	
								}
							});	
						}
					}else{
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							w:"90%",
							type:0
						});	
					}
				}
			});
		});	
	};
	//群列表
	var groupList = function(){
		MasonryUtils.masonryInit({
			masonry:"masonry",
			islazy:1,
			issearch:false,
			callback:function(){
				addGroup();
			}
		});	
	};
	//我的群列表
	var mygroup = function(){
		groupList();
		$("#mygroup").find(".lazy").lazyload({	
			threshold : 200,
			failurelimit:10
		});	
	};
	//解散群
	var dissolutionGrop = function(){
		$(".dissolution").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			AlertUtils.tips({
				htmlmsg:'<div style="padding:30px">'+lang.js_myshare_perform+'</div>',
				w:"90%",
				scallback:function(){
					AjaxFunUtils.ajaxInit({
						url:"/user_group/edt_do.html",
						params:{gpid:gpid,act:'del'},
						callback: function(res){
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:"90%",
								type:0,
								scallback:function(){
									window.location.href = '/user_group/my.html';
								}
							});
						}
					});	
				}
			});
			
		});
	};
	//群主页
	var groupHome = function(){
		groupList();
		addGroup();
		//编辑群资料
		$("#groupEdit").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			AjaxFunUtils.ajaxInit({url: '/user_group/edt.html?gpid='+gpid+'',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({
						"divId":"groupeditTipbox",
						"type":1,w:"96%",
						"callback":function(){
							dissolutionGrop();
							//群分类
							var catid_area = $("#select_cat_area").val();
							var catid_sex = $("#select_cat_sex").val();
							creatWeixinGroup.selectCat({catid_area:catid_area,catid_sex:catid_sex});
							//头像懒加载
							$("#groupeditForm").find(".profileImage").checkImgExists();
							//上传群二维码和头像
							creatWeixinGroup.upGroupAvatar({
								gpid:gpid,
								btn:$('.up_rzpic'),
								callback:function(opt){
									opt.btn.siblings(".profileImageWrapper").find("img").attr("src",opt.resin.data);		
								}	
							});
							$("#groupeditForm").checkInput({
								submitBtnFn: function (from) {
									var actUrlGroup = $("#groupeditForm").attr("data-action");
									var dataFrom = from.serializeJson();
									AjaxFunUtils.ajaxInit({
										url:actUrlGroup,
										params:dataFrom, 
										callback:function (result) {
											AlertUtils.tips({
												htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
												w:"90%",
												type:0,
												scallback:function(){
													closeTip($("#groupeditTipbox"));
													window.location.reload();
												}
											});
										}
									});
									
								}	
							});	
						}
					})
				}
			});
		});	
	};
	//关注群
	var followGroup = function(){
		$(".followGroupBtn").unbind("click").bind("click",function(){
			
		});	
	};
	return {groupInit:groupInit};	
}();