// 聊天功能模块JS
define(['jquery','config','comm/shareUtils'],function($,config,shareUtils){
	var msgInit = function(options){
		var settings = {
			uid:'',
			shid:'',
			boradid:'',
			message:''
		};
		if(options){
			$.extend(settings,options);
		};
		if(settings.uid == suid && suid !== ""){
			config.tip.tips({
				type:0,
				htmlmsg:'<div style="padding:30px">'+lang.js_base_yourself+'</div>',
				scallback:function(){
					config.closeTip($("#chatbox"));	
				}
			});
			return false;	
		}
		var msgUserNum = $("#msgUserList").find(".msgUser").size();
		if(msgUserNum > 5){
			$("#msgUserList").find(".msgUser").eq(0).remove();
		};
		$("#btn-sendmsg").attr("data-uid",settings.uid);
		//按钮绑定
		var btnmsgbind = function(){
			$("#msgBox").find(".msgclose").unbind("click").bind("click",function(){
				$("#msgListBox").hide();
				$("#msgUserList").find(".msgimgbox").attr("data-isclick",0);	
			});	
			$("#massegeBox").find(".masseg-heard").hover(function(){
				$(this).find(".ico-reportMsgBtn").show();	
			},function(){
				$(this).find(".ico-reportMsgBtn").hide();	
			});
			//MSG发送表单绑定
			msgSendFrom();
			//投诉
			snsReport();
			$("#msgBox").find(".msgimgbox").unbind("click").bind("click",function(e){
				var $this = $(this);
				var $msgListBox = $("#msgListBox");
				var isclick = $this.attr("data-isclick");
				var isopen = $msgListBox.attr("data-isopen");
				var uid = $this.attr("data-uid");
				var msgid = $this.attr("data-msgid");
				$("#btn-sendmsg").attr("data-uid",uid);
				$("#msgListBox").show();
				getlightGray($this);
				if(isclick == 0){
					$("#msgUserList").find(".msgimgbox").attr("data-isclick",0);
					//请求当前MSG
					$this.attr("data-isclick",1);
					$msgListBox.show(function(){
						getMsgList(uid);
					});
					return false;
				}else{
					$("#msgUserList").find(".msgimgbox").attr("data-isclick",0);
					$this.attr("data-isclick",1);
					if(isopen == 1){
						$msgListBox.attr("data-isopen",0);
						$msgListBox.hide();
						return false;
					}else{
						$msgListBox.attr("data-isopen",1);
						$msgListBox.show();
						return false;	
					};
				}
			});	
		};
		//msg数据提取
		var getMsgList = function(ouid){
			var $loading = $("<div class='lazy loadin_bg'></div>");
			$("#massegeBox").append($loading);
			var myouid = ouid;
			var geturl = '/share/show_f_page.html?page=snsmsg&uid='+settings.uid+'&shid='+settings.shid+'&ucatid='+settings.boradid+'&message='+settings.message;
			if(myouid){
				geturl = '/share/show_f_page.html?page=snsmsg&uid='+myouid+'';
			}
			AjaxFunUtils.ajaxInit({
				url: geturl,
				type: "GET",
				dataType: 'html',
				params:{},
				callback: function(data){
					$("#massegeBox").html(data);	
					var $messagesContent = $("#massegeBox").find(".messagesContent");
					$messagesContent.scrollTop( $messagesContent[0].scrollHeight );
					btnmsgbind();
					$("#massegeBox").find(".avatar_loading").each(function(index, element) {
                        $(this).checkImgExists();
                    });
				}
			});	
		};
		
		//获取当前箭头的位置
		var getlightGray = function(thisObj){
			var $thisObj;
			if(thisObj){
				var $thisObj = thisObj;
			}else{
				$("#msgUserList").find(".msgimgbox").each(function(index, element) {
					var isclick = $(this).attr("data-isclick");
					if(isclick == 1){
						$thisObj = $(this);	
					}
				});
			}
			var $msgListBox = $("#msgListBox");
			var msgBoxtop = $("#msgBox").offset().top; 
			var msgListBoxtHeight = $msgListBox.height();
			var msgBoxHeight = $("#msgBox").height();
			var thisTop = $thisObj.offset().top - msgBoxtop;
			var usertop = msgListBoxtHeight - msgBoxHeight + thisTop - 5;
			$msgListBox.find(".ico-lightGray").css({"top":usertop});
			$msgListBox.show();	
		};
		//获取USER数据
		var getUserData = function(){
			AjaxFunUtils.ajaxInit({
				url:'/user/getuserbaseinfo.html',
				yzlogin:true,
				params:{suid:settings.uid},
				callback:function(res){
					if(res.status == 1){
						var user = '<div class="msgUser" data-uid="'+res.data.suid+'">'+
						  '<div class="msgUserImg">'+
							'<div class="msgimgbox" data-uid="'+res.data.suid+'"  data-isclick="1"> '+
								'<img class="head avatar_loading" src="'+res.data.avatar[2]+'" data-original="'+res.data.avatar[1]+'"> '+
							'</div>'+
							'<em class="ico ico-userclose" data-uid="'+res.data.suid+'"></em> '+
						  '</div>'+
						'</div>';	
						$("#msgUserList").find(".msgimgbox").attr("data-isclick",0);
						$("#msgUserList").find(".msgUser").each(function(index, element) {
							var usrId = $(this).attr("data-uid");
							if(usrId == settings.uid){
								$(this).remove();	
							}
						});
						$("#msgUserList").append(user);	
						var userNum = $("#msgUserList").find(".msgUser").size();
						if(userNum > 5){
							$("#msgUserList").find(".msgUser").first().detach();	
						}
						$("#msgBox").fadeIn();
						$("#msgUserList").find(".avatar_loading").each(function(index, element) {
							$(this).checkImgExists();
						});
						//获取箭头位置
						getlightGray();
					}else{
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
						});	
						return false;
					};
					$("#msgBox").find(".msgUserImg").hover(function(){
						$(this).find(".ico-userclose").show();	
					},function(){
						$(this).find(".ico-userclose").hide();	
					});
					$("#msgBox").find(".ico-userclose").unbind("click").bind("click",function(){
						var $msgUser = $(this).parents(".msgUser");
						var isclick = $(this).siblings(".msgimgbox").attr("data-isclick");
						if(isclick == 1){
							$("#msgListBox").hide();
						};
						$msgUser.remove();
					});
				}	
			});
		};
		//获取当前user信息
		//getUserData();
		
		//请求当前MSG
		getMsgList();
	};
	var msgSendFrom = function(){
		$("#msgsendForm").checkInput({
			button:"#btn-sendmsg",
			submitBtnFn: function (subFrom,obj) {
				var $thisForm = $("#msgsendForm");
				var $msginput = $thisForm.find(".msg-input");
				var $msglist = $("#massegeBox").find(".msg-list");
				var msgText = $thisForm.find(".content-input").val();
				var myuid = $("#btn-sendmsg").attr("data-uid");
				AjaxFunUtils.ajaxInit({url: '/message/sendmsg.html',//即时保存
					params: {content:msgText,tosuid:myuid},
					callback:function(res){
							if(res.status == 1){
								var msgHtml = '<li class="messageWrapper"><div class="cmmMessage isOwnMessage"> <em class="ico ico-caret"></em><p>'+msgText+'</p></div></li>';	
								$msglist.append(msgHtml);
								$thisForm.find(".content-input").val('');
								var $messagesContent = $("#massegeBox").find(".messagesContent");
								$messagesContent.scrollTop( $messagesContent[0].scrollHeight );
							}else{
								config.tip.tips({
									htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
								});
							}
					}
				});
				
			}
		});	
	};
	return {
		msgInit:msgInit
	}	
});