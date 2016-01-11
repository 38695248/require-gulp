// 获取评论
define(['jquery','config'],function($,config){
	//评论按钮绑定
	var commentBtnBind = function(){
		$(".btn-addpl").unbind("click").bind("click", function () {
			event.stopPropagation();//阻止事件往上冒泡
			var fsuid = $(this).attr("data-fsuid");
			var shareid = $(this).parents(".byshid").attr("data-shid");
			var $pl_box = $(this).parents(".byshid");
			var $pl_list = $pl_box.find(".pl-list");
			var $plnum = $pl_box.find(".plnum");
			var pl_num = Number($plnum.attr("data-plnum"));
			var title = $(this).attr("data-fuid_uname");
			if(title){
				title = '回复'+$(this).attr("data-fuid_uname");	
			}else{
				title = '亲，请输入您的评论内容';	
			}
			$("#sns_pltip").show();
			$("#sns_pltip").find(".closeBtnHtml").unbind("click").bind("click",function(){
				$("#sns_pltip").hide();
			});
			config.upcontainer({
				callback:function(){
					$("#sns_pltip").hide();
					//$("#modalMask_"+opt.num).remove()	
				}	
			});
			if($("#myeditable").size() <=0){
				editorInit(title);
			}
			$("#myeditable").contents().find("#message").focus();
			//$("#myeditable").contents().find("#message").focus();
			var $thisForm = $("#sns_plform");
	
			addComment({addCommentForm:$thisForm,
				fsuid:fsuid,
				shid:shareid,
				callback:function(){
					$("#sns_pltip").hide();
					$("#meditortxt").val('');
					$("#myeditable").contents().find("#message").html('&nbsp;');
					pl_num = pl_num + 1;
					getcommentlist({shareid:shareid,pl_list:$pl_list,pl_box:$pl_box,plnum:$plnum,pl_num:pl_num});
				}
			});
			$(document).unbind("click").bind('click',function(e){
				  var target = $(e.target);
				  if(target.closest("#sns_pltip").length == 0){
					$("#sns_pltip").hide();
					//$("#modalMask_"+opt.num).remove()
				  };
				  
			});
		});	
	};
	//添加评论
	var addComment = function(options){
		var settings = {
			addCommentForm:'.addCommentForm',
			commentBtn:'.commentBtn',
			shid:'',
			fsuid:'',
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);
		}
		
		var $addCommentForm = $(settings.addCommentForm);
		$addCommentForm.checkInput({
			button:settings.commentBtn,
			inputs:{
				"comment":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'}
			},
			submitBtnFn: function (from) {
				var dataFrom = from.serializeJson();
				dataFrom.shid = settings.shid;
				dataFrom.shareid = settings.shid;
				dataFrom.fsuid = settings.fsuid;
				$addCommentForm.find(".btn-danger").removeClass("commentBtn").addClass("btn-danger-gray");
				AjaxFunUtils.ajaxInit({
					"url":"/comment/add_comment.html", 
					"yzlogin":true,
					"params":dataFrom, "callback":function (result) {
						$addCommentForm.find(".btn-danger").addClass("commentBtn").removeClass("btn-danger-gray");
						if(result.status){
							$addCommentForm.find("textarea").val("");
							if(options.callback){
								settings.callback();	
							}
						}else{
							config.tip.tips({
								w:"96%",
								htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
							});
						}
					}
				});
				
			}	
		});	
	};
	var getcommentlist = function(options){
		var settings = {
			shareid:'',
			plnum:'',
			pl_num:'',
			num:2,
			pl_list:'',
			pl_box:$(".test"),
			type:''
	
		};
		if(options){
			$.extend(settings,options);	
		}
		if(shareView){
			settings.num = 4;		
		}
		AjaxFunUtils.ajaxInit({url:"/comment/read.html",//请求的数据地址
			params: { 'page': 1, 'pagenum':settings.num,"ajax":1 ,'shid':settings.shareid},//请求数据的参数
			callback:function(res){
				var li_html = '';
				var li_more = '<li class="text-right mt-15"><p class="blank5"></p><a href="/share/sharepage.html?shid='+settings.shareid+'" class="color-blue">查看所有更多评论</a></li>';
				if(shareView){
					li_more = '';
				}
				
				$.each(res.data.rows,function(index,o){
					if(o.isme){
						var reportAndDel = '<span class="fr shareBtn reportComment delCommentBtn" data-cmmid="'+o.cmmid+'" data-shid="'+o.shid+'"><em class="ico ico-delComment"></em></span>';	
					}else{
						var reportAndDel = '<span class="fr shareBtn reportComment reportBtn" data-type="comment" data-cmmid="'+o.cmmid+'" data-shid="'+o.shid+'"><em class="ico ico-reportComment"></em></span>';	
					}
					var reuser = '';
					if(o.fsuid > 0){
						reuser = ' 回复 <span class="color-blue btn-addpl" data-fsuid="'+o.fsuid+'" data-fuid_uname="'+o.fuid_uname+'">'+o.fuid_uname+'</span>';
					}
					var commentTem = '<li class="rowbox">'+
						'<a href="/share/myshares.html?fsuid='+o.suid+'&ukey='+ukey+'"><div class="rowbox avatar useravatar_bg w30 mr-5 mt-5">'+
							'<img class="userThumb avatar_loading" src="'+o.avatar[2]+'" data-original="'+o.avatar[1]+'">'+
							'</div></a>'+
							'<div class="row-flex1 avatar-text">'+
								'<div class="commenterWrapper">'+
									'<span class="color-blue btn-addpl" data-fsuid="'+o.suid+'" data-fuid_uname="'+o.fname+'">'+o.fname+'</span>'+
									''+reuser+'<span class="color-999"> • '+o.edttime+'</span>'+
									''+reportAndDel+''+
								'</div>'+
								'<div class="shareDesc color-555">'+o.comment+'</div>'+
							'</div>'+
					'</div>';
					li_html +=commentTem;
				});
				settings.pl_list.html(li_html+li_more);
				settings.plnum.text(settings.pl_num).attr("data-plnum",settings.pl_num);
				//头像图片懒加载
				settings.pl_list.find("img.avatar_loading").checkImgExists(function(obj,imgurl){
					var $myopj = obj;
					var myimgurl = imgurl;
					var $thisp = $myopj.parent(".useravatar_bg");
					$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
				});
				//添加按钮绑定
				commentBtnBind();
				//绑定删除按钮
				commentDel();
			}
		});		
	};
	return {
		getcommentlist:getcommentlist
	}	
});