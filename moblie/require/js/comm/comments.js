define(['jquery','config','base','ajax','mas'],function($,config,base,AjaxFunUtils,mas){
	var init = function(){
		getCommentViewList();
		commentfoot();
	};
	//获取评论列表
	var getCommentViewList = function(){
		var shareid = $("#commentslist").attr("data-shareid");
		AjaxFunUtils.ajaxInit({url: '/comment/read.html',
			params:{page: 1,pagenum:5,ajax:1 ,shid:shareid},
			callback:function(res){
				if(res.status == 1){
				  var plhtmls = getdatajson({datalist:res.data.rows});
				  var pagehml = '<div class="pager" style="display: none;">'+
						'<span class="pager-next"><a href="/comment/read.html?page=2&shid='+shareid+'&ajax=1&pagenum=10"></a></span> '+
					'</div>';
				  $("#commentslist").append(plhtmls);
				  $("#commentslist").after(pagehml);
				  //瀑布流
				  mas.init({
					div:'commentslist',
					dataType:'json',
					appendjsonback:function(resin){
					  var jsonhtmls = getdatajson({datalist:resin.data.rows});
					  $("#commentslist").append(jsonhtmls);
					  $("#commentslist").find("img.lazy-mas").lazyload({});	
					},
					callback:function(){
						commentDel();
						commentBtnBind();	
					}
				  });
				}
			}
		});
		
	};
	var getdatajson = function(opt){
		var jsonhtml = '';
		$.each(opt.datalist,function(oindex,o){
			var reportAndDel = '<span class="fr shareBtn reportComment reportBtn" data-type="comment" data-cmmid="'+o.cmmid+'" data-shid="'+o.shid+'"><em class="ico ico-reportComment"></em></span>';
			var recommtbtn = 'recommtbtn';
			if(o.isme){
				reportAndDel = '<span class="fr shareBtn reportComment delCommentBtn" data-cmmid="'+o.cmmid+'" data-shid="'+o.shid+'"><em class="ico ico-delComment"></em></span>';
				recommtbtn = '';	
			}
			jsonhtml += '<li class="line20 item '+recommtbtn+'" data-fsuid="'+o.fsuid+'" data-fuid_uname="'+o.fuid_uname+'">'+
				'<div class="pl_t mb-5 rowbox">'+
				  '<div class="avatar w30 mr-5">'+
					'<img src="'+o.avatar[2]+'" data-original="'+o.avatar[1]+'" class="lazy-mas userThumb" style="display: block;">'+
				  '</div>'+
				  '<div class="row-flex1 line30">'+reportAndDel+o.fname+'<span class="color-999"> • '+o.edttime+'</span></div>'+
				'</div>'+
				'<div class="pl_cont mb-10">'+
				  '<div class="pl_cont_text mb-10">'+o.comment+'</div>'+
				'</div>'+
			  '</li>';  
	  });
	  return jsonhtml;	
	};
	var commentfoot = function(){
		var commhtml = '<div id="footer_comment" class="footer footerbox commfooter">'+
			'<div class="send-wrapper" style="border:none"> '+
			  '<span>'+
				'<button id="expression-toggle" class="btn-kf btn-exp"></button>'+
			  '</span> '+
			  '<span class="cell-full">'+
				'<input type="text" id="text-in" class="input input-send" maxlength="150" placeholder="亲，请输入您的评论内容" autocomplete="off">'+
			  '</span>'+
			  '<span>'+
			  '<button id="send" class="btn btn-send" data-type="share">评论</button>'+
			  '</span>'+
			'</div>'+
			'<div id="control" class="question-control" style="display:none">'+
				'<div id="expression" class="ui-slider swiper-container">'+
					'<div id="swiper-wrapper" class="ui-slider-group swiper-wrapper">'+
						'<div class="imgloading" style="height:100px; width:100%"></div>'+
					'</div>'+
					'<div class="swiper-pagination-kf text-center"></div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		$("body").append(commhtml);
		require(['ui/textIn'],function(e){});
		//显示隐藏表情
		$("#expression-toggle").unbind("click").bind("click",function(){
			var isv = $("#control").is(":visible");
			if(isv){
				$("#control").hide();	
			}else{
				$("#control").show();
			}
			require(['ui/expression'],function(e){
				$(document).unbind("click").bind('click',function(e){
					  var target = $(e.target);
					  if(target.closest($("#footer_comment")).length == 0){
						$("#control").hide();	
					  };
				});	
			});
		});	
	};
	//评论按钮绑定
	var commentBtnBind = function(){
		$("#commentslist").find(".recommtbtn").unbind("click").bind("click", function () {
			event.stopPropagation();//阻止事件往上冒泡
			var title = $(this).attr("data-fuid_uname");
			if(title){
				title = '回复 '+$(this).attr("data-fuid_uname")+' ';	
			}
			$("#text-in").val(title).focus();
		});
		$(".btn-addpl").unbind("click").bind("click",function(){
			$("#text-in").focus();	
		});
	};
	//添加评论
	var addComment = function(msg,isimg,src){
		if(!msg){
			return;
		}
		var submsg = msg;
		
		require(["ui/expression"],function(e){
			if(!isimg){
				submsg = e.getImgNum(submsg);
				msg = e.replace(msg);
			}else{
				msg = '<a href="'+src+'"><img class="up-img" src="'+src+'" /></a>';	
				type = 3;
			}
			var datasub = {};
			datasub.shareid = $("#commentslist").attr("data-shareid");
			datasub.comment = submsg;
			datasub.fsuid = '';
			AjaxFunUtils.ajaxInit({
				url:"/comment/add_comment.html", 
				yzlogin:true,
				params:datasub, 
				callback:function (result) {
					if(result.status==1){
						var useravatar = $("#useravatar").attr("src"),
						username = $("#useravatar").attr("data-username");
						var sedhtml = '<li class="line20 item">'+
							'<div class="pl_t mb-5 rowbox">'+
							  '<div class="avatar w30 mr-5">'+
								'<img src="'+useravatar+'" class="userThumb" style="display: block;">'+
							  '</div>'+
							  '<div class="row-flex1 line30">'+username+'<span class="color-999"> • 刚刚</span></div>'+
							'</div>'+
							'<div class="pl_cont mb-10">'+
							  '<div class="pl_cont_text mb-10">'+msg+'</div>'+
							'</div>'+
						  '</li>';
						$("#firstitem").after(sedhtml);
						//window.location.reload();
						$("#control").hide();
					}else{
						config.tip.tips({
							w:"96%",
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
						});
					}
				}
			});	
		});
	};
	//删除评论
	var commentDel = function(){
		$(".delCommentBtn").unbind("click").bind("click",function(e){
			event.stopPropagation();//阻止事件往上冒泡
			var cmmid = $(this).attr("data-cmmid");
			var shid = $(this).attr("data-shid");
			var $thispitem = $(this).parents(".item");
			
			config.tip.tips({
				w:"90%",
				htmlmsg:'<div style="padding:30px">' + config.base.lang.js_base_del_text+'</div>',
				scallback:function(){
					AjaxFunUtils.ajaxInit({
						"url":"/comment/del_comment.html", 
						"params":{cmmid:cmmid,shid:shid}, 
						"callback":function (result) {
							if(result.status){
								$thispitem.remove();
							}else{
								config.tip.tips({
									w:"90%",
									htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
								});
							}
						}
					});			
				}
			});
			
		});
	};
	return {
		init:init,
		addComment:addComment	
	};
});

