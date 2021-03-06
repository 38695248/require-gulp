var Needarea = function(){
	var needareaInt = function(opt){
		if(opt.page == 'toask'){
			//发布需求
			toask();
		}else if(opt.page == 'myasks'){
			//需求列表
			myasks();	
		}else if(opt.page == 'viewask'){
			//需求浏览
			viewask();	
		}
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	//发布需求	
	var toask = function(){
		$("#need-up-btn").unbind("click").bind("click",function(){
			UploadUtils.uploadInit({
				tip:true,
				uptitle:'请选择图片',
				container:'allcontainer',
				browse_button:'allpickfiles',
				drop_element:'allcontainer',
				bucket:'share',
				auto_start:true,
				isarray:true,
				multi_selection:false,
				callback:function(oimgdata){
					var imglist = oimgdata;
					var simgHtml = '';
					$.each(imglist,function(index,o){
						var lihtml = '<li><div class="needimg"><input type="hidden" class="hideimageurl" name="pics" value="'+o.key+'|'+o.width+'|'+o.height+'|'+o.swidth+'|'+o.sheight+'|" isarray="true"><img src="'+o.src+'" style="width:90px" /></div><button type="button" class="del_file_btn btn btn-s">删除</button></li>';
						simgHtml +=lihtml;
					});
					$("#uploadTable").append(simgHtml);
					//根据文件id删除此文件，并且在table中删除此文件的信息 
					$(".del_file_btn").unbind("click").bind("click",function(){
						$(this).parent("li").remove();	
						//检测上传图片张数
						checkPicNum();
					});
					//检测上传图片张数
					checkPicNum();
				}
			});	
		});
			
		//检测上传图片张数
		function checkPicNum(){
			//是否有图片
			isimg();
			var picNum = $("#uploadTable").find("li").size();
			if(picNum >=3){
				$("#need-up-btn").hide();	
			}else{
				$("#need-up-btn").show();	
			}
		};
		//是否有图片
		function isimg(){
			$("#uploadTable").checkboxFn({
				checkbox:'hidden',
				scallback:function(othis){
					othis.removeClass("error_validate");	
				},
				errorcallback:function(othis){
					othis.addClass("error_validate");		
				}	
			});	
		}
		//提交需求
		$("#needareaFrom").checkInput({
			button:'#needsub_Btn',
			submitBtnFn: function (subFrom) {
				var imgflag = $("#uploadTable").checkboxFn({checkbox:'hidden'});
				if(!imgflag ){
					return false;	
				}
				var actUrl = $("#needareaFrom").attr("action");
				var dataFrom = subFrom.serializeJson();
				AjaxFunUtils.ajaxInit({
					url:actUrl,
					params:dataFrom,
					callback:function(res){
						if(res.status){
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:'96%',
								type:0,
								scallback:function(){
									window.location.href = '/ask/myasks.html';	
								}
							});
						}else{
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
								w:350
							});	
						}
					}
				});
			}
		});	
	};
	//需求列表
	var myasks = function(){
		MasonryUtils.masonryInit({
			masonry:"masonry",
			issearch:false,
			islazy:0,
			callback:function(){
				needActBtn();	
			}
		});
		function needActBtn(){
			$(".order-act-btn").unbind("click").bind("click",function(){
				var acturl = $(this).attr("data-url");
				var act = $(this).attr("data-act");
				var askid = $(this).attr("data-askid");
				var istip = $(this).attr("data-tip");
				if(istip){
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">确定要执行该操作吗？</div>',
						scallback:function(){
							AjaxFunUtils.ajaxInit({
								url:acturl,
								params:{act:act,askid:askid},
								callback:function(res){
									if(res.status){
										AlertUtils.tips({
											htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
											type:0,
											scallback:function(){
												window.location.reload();	
											}
										});		
									}else{
										AlertUtils.tips({
											htmlmsg:'<div style="padding:30px">'+res.msg+'</div>'
										});		
									}
								}
							});
						}
					});
				} 	
			});	
		}
	};
	//需求详情
	var viewask = function(){
		//图片滚动初始化
		sliderboxInt();
		function sliderboxInt(){
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
				}
			});
		};
		//选中设计师
		$(".sel_server").unbind("click").bind("click",function(){
			var askid = $(this).attr("data-askid");
			var svrid = $(this).attr("data-svrid");
			var act = $(this).attr("data-act");
			var url = $(this).attr("data-url");
			var url2 = $(this).attr("data-url2");
			AlertUtils.tips({
				htmlmsg:'<div style="padding:30px">'+lang.js_myshare_perform+'</div>',
				scallback:function(){
					AjaxFunUtils.ajaxInit({
						url:url,
						params:{askid:askid,svrid:svrid,act:act},
						callback:function(res){
							if(res.status){
								window.location.href = url2;	
							}else{
								AlertUtils.tips({
									htmlmsg:'<div style="padding:30px">'+res.msg+'</div>'
								});		
							}
						}
					});	
				}
			});
		});	
		//图片懒加载
		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold:500,//滚动条在离目标位置还有1000的高度时就开始加载图片
			failurelimit:100,
			skip_invisible : false 	
		});
	};
	return {needareaInt:needareaInt};
}();