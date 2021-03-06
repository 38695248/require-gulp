var RegUtils = function(){
	//注册初始化
	var regInit = function(){
		regFirst();
		forgotPwd();
	};
	//第一步注册
	var regFirst = function(){
		$("#loginBtn").unbind("click").bind("click",function(){
			$("#reg_bg").removeClass("loaded");
			$("#regbox").removeClass("loaded");
			Loading.loadInit({status:1});
			location.href = "/user/login.html";
		});
		$("#ajaxRegFirstFrom").checkInput({
			validatetype:0,
            //验证完了，提交表单要干的事情
            submitBtnFn: function (from) {
				Loading.loadInit({status:1});
				var dataFrom = from.serializeJson();
				dataFrom.ajax = 1;
				AjaxFunUtils.ajaxInit({"url": "/user/login.html", "params":dataFrom,
					"callback":function (result) {
						if(result.status==1){
							var thisUrl = BaseInitClass.getQueryString("loginurl");
							if(result.data.tourl){
								thisUrl = result.data.tourl;	
							}
							if(thisUrl){
								window.location.href = thisUrl;
							}else{
								window.location.href = '/index/index.html';
							}
						}else if(result.status==0){
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
							});
							Loading.loadInit({status:0});
						}else{
							$("#regFirst").fadeOut(function(){
								$("#loginBtn").hide();
								$("#regSecond").fadeIn();	
								regSecond(dataFrom);
							});										
						}
                	}
				});
				
            }	
		});	
	};
	//第二步注册
	var regSecond = function(data){
		Loading.loadInit({status:0});
		$("#ajaxRegSecondFrom").checkInput({
			validatetype:0,
            //验证完了，提交表单要干的事情
            submitBtnFn: function (from) {
				Loading.loadInit({status:1});
                var dataFrom = from.serializeJson();
                var result=$.extend(dataFrom,data);
                var isoutside = 0;
				if(isoutside){
					$.getJSON(ucenter_url+"user/reg.html?isoutside=1&callback=?",dataFrom,function(res){
						if(res.status == 1 && res.suid && res.touken){
							dataFrom.suid = res.suid;
							dataFrom.touken = res.touken;
							AjaxFunUtils.ajaxInit({"url":"/user/regoutside.html", "params":dataFrom, 
								"callback":function (result) {
									if(result.status){
										window.location.href = '/user/regfollow.html';
									}else{
										Loading.loadInit({status:0});
										AlertUtils.tips({
											w:"90%",
											htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
										});
									}
								}
							});
						}else{
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
							});	
							Loading.loadInit({status:0});
						}  
					});   
					return false;
				}else{
					AjaxFunUtils.ajaxInit({"url":"/user/reg.html", "params":dataFrom, 
						"callback":function (result) {
							if(result.status){
								window.location.href = '/user/regfollow.html';
							}else{
								Loading.loadInit({status:0});
								AlertUtils.tips({
									w:"90%",
									htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
								});
							}
	                	}
					});
				}
            }	
		});	
	};
	//第三步注册
	var regThree = function(options){
		var settings = {
			maxNum:10,
			minNum:1,
			maxMsg:lang.js_reg_maxMsg,
			callback:function(){return false}	
		};
		if(options){
			$.extend(settings,options);	
		}
		$(".footer-bg").hide();
		$("#regsucessBox").find("li").unbind("click").bind("click",function(){
			var $this = $(this);
			var $thisbar = $(".bar");
			var flag = $this.attr("data-flag");
			var $selectCheck = $(this).find(".selectCheck");
			var size = $("#regsucessBox").find(".checked").size();
			var categoryid = $this.attr("data-categoryid");
			var inp = '<input type="hidden" name="categoryid" value="'+categoryid+'" isarray="true">';
			if(flag == 0){
				if(size < settings.maxNum){
					$this.attr("data-flag",1);
					$selectCheck.addClass("checked").append(inp);
					size = $("#regsucessBox").find(".checked").size();
					if(size+1 > settings.minNum){
						$("#regsucessBtn").addClass('btn-next').removeClass('btn-danger-gray');
						regsucessFrom();	
					}
					$thisbar.find("li").each(function(index, element){
						if(index < size){
							$thisbar.find("li:eq("+index+")").addClass("active");	
						}	
					});
				}else{
					AlertUtils.tips({
						type:0,
						w:"90%",
						htmlmsg:'<div style="padding:20px 30px 30px">' + settings.maxMsg +'</div>'
					});
				}
			}else{
				$this.attr("data-flag",0);
				$selectCheck.removeClass("checked").html('');
				size = $("#regsucessBox").find(".checked").size();
				if(size < settings.minNum){
					$("#regsucessBtn").removeClass('btn-next').addClass('btn-danger-gray');	
				}
				$thisbar.find("li").each(function(index, element){
					if(index >= size){
						$thisbar.find("li:eq("+index+")").removeClass("active");	
					}	
				});
			}		
		});
		function regsucessFrom(){
			$("#regsucessFrom").checkInput({
					button:".btn-next",
					submitBtnFn: function (subFrom) {
						Loading.loadInit({status:1});
						var subFrom = subFrom.serializeJson();
						AjaxFunUtils.ajaxInit({"url":"/user/follow_category.html", "params":subFrom, 
							"callback":function (result) {
								if(result.status){
									window.location.href = '/';
								}else{
									Loading.loadInit({status:0});
									AlertUtils.tips({
										w:"90%",
										htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
									});
								}
							}
						});
					}
			});
		}
	};
	//登录
	var loginInit = function(){
		forgotPwd();
		var _top = -($("#loginbox").height()/2);
		var _left = -$("#loginbox").width()/2;
		$("#loginbox").addClass("loaded").css({"top":"50%","left":"50%","margin-left":_left,"margin-top":_top,"z-index":980});
		$("#closeBtn").unbind("click").bind("click",function(){
			$("#loginbox").removeClass("loaded");
			Loading.loadInit({status:1});
			location.href = "/";
		});
		$("#ajaxLoginFrom").checkInput({
            //验证完了，提交表单要干的事情
            submitBtnFn: function (from) {
				Loading.loadInit({status:1});
                var dataFrom = from.serializeJson();
                AjaxFunUtils.ajaxInit({
					"url":"/user/login.html", 
					"params":dataFrom, 
					"callback":function (result) {
						if(result.status){
							window.location.href = '/user/mycenter.html';
						}else{
							AlertUtils.tips({
								w:"90%",
								htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
							});	
							Loading.loadInit({status:0});
						}
					}
				});
            }	
		});	
		//邀请
		var invitatioInit = function(){
			var _top = -($("#invitationbox").height()/2);
			var _left = -$("#invitationbox").width()/2;
			$("#invitationbox").addClass("loaded").css({"top":"50%","left":"50%","margin-left":_left,"margin-top":_top,"z-index":980});
			$("#closeBtn").unbind("click").bind("click",function(){
				$("#invitationbox").removeClass("loaded");
				Loading.loadInit({status:1});
				location.href = "/";
			});	
		};
		
	};
	//忘记密码
	var forgotPwd = function(){
		$("#forgotPwd").unbind("click").bind("click",function(){
			AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=forgotPwd&ch=sns',
				position:'absolute',
				type: "GET",
				dataType: 'html',
				params: '',
				yzlogin:false,
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({
						"divId":"forgotPwdTip",
						"type":1,
						"callback":function(){
							$("#forgotPwdTip").addClass("loaded");
							$("#forgotPwdForm").checkInput({
								validatetype:0,
								submitBtnFn: function (subFrom) {
									var dataFrom = subFrom.serializeJson();
									AjaxFunUtils.ajaxInit({
										url:'/mybuys/myorderedt.html',
										params:dataFrom,
										callback:function(res){}
									})
								}
							});
						}
					});
				}
			});
		});
	};
	return {regInit:regInit,regThree:regThree,loginInit:loginInit};	
}();