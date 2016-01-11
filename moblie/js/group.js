var groupUtils = function(){
	//统一入口
	var groupInit = function(options){
		var settings = {
			mod:'',
			issearch:false
		};
		if(options){
			$.extend(true,settings,options);
		}
		switch(settings.mod){
			case "add":
				creatWeixinGroup.addgrouppage();//创建群
				break;	
			case "push":
				groupList({issearch:settings.issearch,larger:1,letterlist:settings.letterlist});//群列表
				break;
			case "sharelist":
				sharelist();//同款，分享列表
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
		BaseInitClass.baseInit();//整个网站公共初始化
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
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							w:"90%",
							type:0,
							scallback:function(){
								window.location.reload();	
							}
						});	
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
	var groupList = function(opt){
		var issearch = false;
		var larger = 1;
		if(opt.issearch){
			issearch = opt.issearch;	
		}
		MasonryUtils.masonryInit({
			masonry:"masonry",
			islazy:0,
			issearch:issearch,
			callback:function(){
				addGroup();
			}
		});
		//图片懒加载
		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold:500,//滚动条在离目标位置还有1000的高度时就开始加载图片
			failurelimit:100,
			skip_invisible : false 	
		});
		if(opt.letterlist==1){
			letterlist();	
		}
	};
	//字母排列
	var letterlist = function(){
		var b_h = getHeightBody();	
		var h = parseInt(b_h/26);
		$("#letterlist").find("a").css({"height":h});
		$("#letterlist").show();
	};
	//同款，分享列表
	var sharelist = function(){
		MasonryUtils.masonryInit({
			masonry:"masonry_2",
			islazy:1,
			callback:function(){
				
			}
		});	
	};
	//我的群列表
	var mygroup = function(){
		groupList({});
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
		addGroup();
		MasonryUtils.masonryInit({
			masonry:"masonry_2",
			islazy:1,
			issearch:false,
			callback:function(){
				addGroup();
			}
		});
		//编辑群资料
		$("#groupEdit").unbind("click").bind("click",function(){
			var gpid = $(this).attr("data-gpid");
			var ref = $(this).attr("data-ref");
			AjaxFunUtils.ajaxInit({url: '/user_group/edt.html?gpid='+gpid+'&ref='+ref,
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
							var catid_type = $("#select_cat_type").val();
							var catid_area = $("#select_cat_area").val();
							var catid_sex = $("#select_cat_sex").val();
							creatWeixinGroup.selectCat({catid_type:catid_type,catid_area:catid_area,catid_sex:catid_sex});
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