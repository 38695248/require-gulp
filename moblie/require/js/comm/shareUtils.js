// 分享公共模块
define(['jquery','config','ajax','swiper','jquery_ui'],function($,config,AjaxFunUtils){
	//创建一个本地上传图片分享:第一步
	var addShareInit = function(oarrData,options){
		var myarrData = oarrData;
		var settings = {
			color:'',
			share:'share',
			iswebsite:'',
			isOri:false,//是否原创
			shid:'',
			ishid:'',
			boradid:'',
			opageXY:'',
			proportion:1,
			ismjx:0,
			callback:function(){}
		};
		if(options){
			$.extend(true,settings,options);
		};
		var proportion = 1;
			
		//分享其他图片操作
		if(settings.share == 'share'){
			sharePicAjax();	
		}
		function sharePicAjax(){
			AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=shareTipFirst',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: {shid:settings.shid,share:settings.share},
				callback: function(data){
					$("body").append(data);
					$("#continueBtn").remove();
					
					var imgHeight = getHeightDiv();
					var isshow = $("#slide_01tip").find(".showPicImg").size()>1?1:0;
					config.tip.centerDiv({
						divId:"shareFirstTipbox",
						type:1,
						w:"100%",
						position:"fixed",
						istop:true,
						callback:function(){
							if(options.callback){
								settings.callback();	
							}	
						}
					});
					//图片左右滚动
					var shareSwiper = new Swiper('#boxslider', {
						autoplay: false,//可选选项，自动滑动
						pagination : '.swiper-pagination-ad',
						loop : true,
						loopAdditionalSlides : 1,
						onInit: function(swiper){
						   //计算每张图片的高度及宽度
							countPicData(imgHeight);
							//图片坐标初始化
							if(settings.share == 'shere'){
								$("#showPic").find(".showPicImg").each(function(index, element) {
									$(this).setTagPos();
								});	
							}	
						}
					});
					
					//切换显示
					//switchShow(imgHeight);
					//删除图片
					//delImagShow();
					//是否下一步
					isNextFun(settings);
					//鼠标经过
					
					
				}
			});
		};
		//上传图片分享操作
		if(settings.share == 'up'){
			upPicAjax();	
		}
		function upPicAjax(){
			AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=shareTipFirst_new&ch=sns',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);					
					config.tip.centerDiv({
						divId:"shareFirstTipbox",
						type:1,
						w:"100%",
						position:"fixed",
						istop:true,
						callback:function(){
							if(options.callback){
								settings.callback();	
							}	
						}
					});
					showPicList(myarrData);
				}
			});
		};
		//获取手机图片高度容器
		function getHeightDiv(){
			var imgHeight = 0;
			var tiptopH = $("#tiptop").height();
			var tipbottomH = $("#tipbottom").height();
			if (config.base.browser.versions.ios || config.base.browser.versions.iPhone || config.base.browser.versions.iPad) {
				var bodyHeight = window.screen.availHeight;
				imgHeight = bodyHeight - tiptopH -tipbottomH-60;
			}else if (config.base.browser.versions.android) {
				var bodyHeight = config.base.getHeightBody();
				imgHeight = bodyHeight - tiptopH -tipbottomH-40;
			}else{
				var bodyHeight = config.base.getHeightBody();
				imgHeight = bodyHeight - tiptopH -tipbottomH-40;	
			}
			return imgHeight;
		}
		//图片坐标计算
		function imgTagOption($oshowDiv){
			$oshowDiv.find(".olddata").each(function(index, element) {
				var oldLeft = $(this).attr("data-left");
				var oldTop = $(this).attr("data-top");
				var newLeft = oldLeft*settings.proportion;
				var newTop = oldTop*settings.proportion;
				var p_w = $(this).parent(".showPicImg").width();
				var p_h = $(this).parent(".showPicImg").height();
				var this_w = $(this).find(".item-tag-box").width();
				var this_h = $(this).find(".item-tag-box").height();
				var box_l = (p_w - this_w)/2 - newLeft;
				var box_t = (p_h - this_h)/2 - newTop;
				$(this).find(".item-tag-box").css({"left":box_l,"top":box_t});
				var tag_form_w = $(this).find(".item-tag-show").width()+10;
				var flag_w = p_w - newLeft - tag_form_w;
				if(flag_w < 0){
					$(this).find(".item-tag-show").css({"right":24,"left":"auto"});
					$(this).find(".item-tag-show").find(".tip").addClass("tagRight");
				}
				
				settings.opageXY = {cpageX:oldLeft,cpageY:oldTop};
				$(this).css({"left":newLeft,"top":newTop});
			});	
		}
		
		//计算大图的大小
		function getImgWidth(ow,oh,omaxW,omaxH){
			var maxW = omaxW;
			var maxH = omaxH;
			var show_width = ow;
			var show_height = oh;
			//return {width:show_width,height:show_height};
			if(show_height > maxH){ 
				//高度等比缩放
				show_width = (maxH*show_width)/show_height; 
				show_height = maxH;
			};
			if(show_width > maxW){ 
				//高度等比缩放
				show_height = (maxW*show_height)/show_width; 
				show_width = maxW;
			} 	
			return {width:show_width,height:show_height};
		};
		//显示图片列表
		function showPicList(oarrData){
			var simgHtml = '';
			var bimgHtml = '';
			$.each(oarrData,function(index,o){
				var b_imgUrl = o.src;
				var s_imgUrl = o.src;
				//var b_resImg = getImgWidth(o.width,o.height,736,1000);
				//var s_resImg = getImgWidth(o.width,o.height,236,300);
				var color = '';
				var lihtml = '<li data-bimgurl="'+o.key+'" data-simgurl="'+o.key+'" data-w="'+o.width+'" data-h="'+o.height+'" data-sw="'+o.swidth+'" data-sh="'+o.sheight+'" data-index="'+index+'">'+
					'<em class="ico ico-userclose" data-index="'+index+'"></em>'+
					'<a class="imghoverMask" href="javascript:void(0);">'+
						'<span class="hoverMask"></span>'+
						'<img src="'+b_imgUrl+'" />'+
					'</a>'+
				'</li>';
				var radiohtml = '<input class="defrdio" type="radio" name="isface" id="isface_'+index+'" value="1" />';
				if(index == 0){
					radiohtml = '<input class="defrdio" type="radio" name="isface" id="isface_'+index+'" value="1" checked="checked"/>';
				}
				var showPicImgBox = '<li class="swiper-slide" data-width="'+o.width+'"><form id="form_'+index+'" method="post" action="javascript:void(0);" data-w="'+o.width+'" data-h="'+o.height+'" data-sw="'+o.swidth+'" data-sh="'+o.sheight+'" data-bimgUrl="'+o.key+'" data-simgUrl="'+o.key+'" data-color="'+color+'" data-imgrel="'+o.key+'" class="showPicImg" style="width:'+o.width+'px;height:'+o.height+'px;">'+
						'<span class="defpic">'+radiohtml+'<label for="isface_'+index+'">设为封面</label></span>'+
						'<img class="picImg" src="'+b_imgUrl+'" style="width:'+o.width+'px height:'+o.height+'px">'+
						'<input type="hidden" value="" name="relBoxSize" class="relBoxSize">'+
					'</form></li>';
				//simgHtml +=lihtml;
				bimgHtml +=showPicImgBox; 
			});
			$("#slide_01tip").html(bimgHtml);
			//$("#showPic_samll").find("ul").append(simgHtml);
			var imgHeight = getHeightDiv();
			//继续添加图片
			//showcontinueBtn();
			var isshow = $("#slide_01tip").find(".showPicImg").size()>1?1:0;

			//图片左右滚动
			var shareSwiper = new Swiper('#boxslider', {
				autoplay: false,//可选选项，自动滑动
				pagination : '.swiper-pagination-ad',
				loop : true,
				loopAdditionalSlides : 1,
				onInit: function(swiper){
				   //计算每张图片的高度及宽度
					countPicData(imgHeight);
					//图片坐标初始化
					if(settings.share == 'shere'){
						$("#showPic").find(".showPicImg").each(function(index, element) {
							$(this).setTagPos();
						});	
					}	
				}
			});
			//切换显示
			//switchShow(imgHeight);
			//删除图片
			//delImagShow();
			//是否下一步
			//isNextFun({boradid:settings.boradid,share:settings.share,shid:settings.shid,ishid:settings.ishid});
			isNextFun(settings);
		};
		function countPicData(oimgHeight){
			$("#showPic").find(".showPicImg").each(function(index, element) {
				//添加描点
				var $showDiv = $(this);
                var width = Number($showDiv.attr("data-w"));
				var height = Number($showDiv.attr("data-h"));
				var show_height = height;
				var show_width = width;
				var maxW= $("body").width();
				var maxH = oimgHeight;
				if(show_height > maxH){ 
					//高度等比缩放
					show_width = (maxH*show_width)/show_height; 
					show_height = maxH;
				};
				if(show_width > maxW){ 
					//高度等比缩放
					show_height = (maxW*show_height)/show_width; 
					show_width = maxW;
				} 	
				if(show_height < maxH){
					var margin_top = (maxH - show_height)/2;
					var h = maxH-margin_top;
					$showDiv.css({"margin-top":margin_top});
					
				}
				$("#showPic").css({"height":maxH});	
				$showDiv.parent("li").css({"width":maxW});
				$showDiv.css({"width":show_width,"height":show_height});
				$showDiv.find(".picImg").css({"width":show_width,"height":show_height});
				
				$showDiv.find(".defrdio").unbind("click").bind("click",function(){
					$("#showPic").find(".defrdio").attr("checked",false);	
					$(this).attr("checked",true);
				});
				
				var thisproportion = show_width/Number(width);
				settings.proportion = thisproportion;
				var $thisItem = $showDiv.find(".item-tag"); 
				if(settings.share == "share"){
					imgTagOption($showDiv);	
				}
				hoverAndDrag({proportion:thisproportion,
					parent:$showDiv,
					indexDiv:$thisItem,
					opageXY:settings.opageXY,
					type:'',
					shid:settings.shid,
					ishid:settings.ishid,
					share:true,
					iswebsite:settings.iswebsite,
					ismjx:settings.ismjx
				});
				$showDiv.fadeIn();
				$showDiv.siblings(".showPicImg").hide();
				$("#addTagFromBox").hide();
				//添加描点
				addTagUtils({
					tagdiv:$showDiv.find(".picImg"),
					index:index,
					isOri:settings.isOri,
					proportion:thisproportion,
					boradid:settings.boradid,
					shid:settings.shid,
					ishid:settings.ishid,
					share:settings.share,
					ismjx:settings.ismjx,
					callback:function(){}
				});
            });	
		}
		//切换显示的图片
		function showPics(index,$thisLi,oimgHeight) { //普通切换
			$thisLi.siblings("li").find(".imghoverMask").removeClass("current");
			$thisLi.find(".imghoverMask").addClass("current");
			var $showDiv = $("#showPic").find(".showPicImg").eq(index);
			var width = Number($showDiv.attr("data-w"));
			var height = Number($showDiv.attr("data-h"));
			var show_height = height;
			var show_width = width;
			var maxW= $("body").width();
			var maxH = oimgHeight;
			if(show_height > maxH){ 
				//高度等比缩放
				show_width = (maxH*show_width)/show_height; 
				show_height = maxH;
			};
			if(show_width > maxW){ 
				//高度等比缩放
				show_height = (maxW*show_height)/show_width; 
				show_width = maxW;
			} 
			
			var thisproportion = show_width/Number(width);
			settings.proportion = thisproportion;

			if(show_height < maxH){
				var margin_top = (maxH - show_height)/2;
				var h = maxH-margin_top;
				$("#showPic").css({"margin-top":margin_top,"height":h});
			}else{
				$("#showPic").css({"height":maxH});	
			}
			$showDiv.css({"width":show_width,"height":show_height});
			$showDiv.find(".picImg").css({"width":show_width,"height":show_height});
			
			
			var $thisItem = $showDiv.find(".item-tag"); 
			if(settings.share == "share"){
				imgTagOption($showDiv);	
			}
			hoverAndDrag({proportion:thisproportion,
				parent:$showDiv,
				indexDiv:$thisItem,
				opageXY:settings.opageXY,
				type:'',
				shid:settings.shid,
				ishid:settings.ishid,
				share:true,
				iswebsite:settings.iswebsite,
				ismjx:settings.ismjx
			});
			$showDiv.fadeIn();
			$showDiv.siblings(".showPicImg").hide();
			$("#addTagFromBox").hide();
			//添加描点
			addTagUtils({
				tagdiv:$showDiv.find(".picImg"),
				index:index,
				isOri:settings.isOri,
				proportion:thisproportion,
				boradid:settings.boradid,
				shid:settings.shid,
				ishid:settings.ishid,
				share:settings.share,
				ismjx:settings.ismjx,
				callback:function(){}
			});
		}
		
		
		//切换显示
		function switchShow(oimgHeight){
			var $thisLi = $("#showPic_samll").find("li").eq(0);
			$("#showPic_samll").find("li").unbind("click").bind("click",function(){
				var $thisLi = $(this);
				var index = $(this).index();
				showPics(index,$thisLi,oimgHeight);	
			});
			showPics(0,$thisLi,oimgHeight);
		};
			
	};
	//判断是否下一步
	var isNextFun = function(options){
		var settings = {
			boradid:'',
			share:'',
			ishid:'',
			shid:'',
			ismjx:0	
		};
		if(options){
			$.extend(true,settings,options);	
		}
		var isVal = $("#showPic").find(".item-tag").attr("data-val");
		//if(isVal == 1){
			$("#shareFirstTipbox").find(".btn-one").removeClass("btn-danger-gray").addClass("btn-next");
		//}else{
			//$("#shareFirstTipbox").find(".btn-one").removeClass("btn-next").addClass("btn-danger-gray");
			//$("#shareFirstTipbox").find(".btn-one").unbind("click");
		//};
		selectImg(settings.boradid);
		//图片有描点提交下一步
		function selectImg(){
			$(".btn-next").unbind("click").bind("click",function(){
				var dataList = [];
				var imgLen = $("#showPic").find(".showPicImg").size();
				$("#showPic").find(".showPicImg").each(function(index, element) {
					var $thisShow = $(element);
					var mydataFrom = $thisShow.serializeJson();
					mydataFrom.width = $thisShow.attr("data-w");
					mydataFrom.height = $thisShow.attr("data-h");
					mydataFrom.swidth = $thisShow.attr("data-sw");
					mydataFrom.sheight = $thisShow.attr("data-sh");
					mydataFrom.src = $thisShow.attr("data-bimgurl");
					mydataFrom.imgrel = $thisShow.attr("data-imgrel");
					mydataFrom.thumbpic = $thisShow.attr("data-simgurl");
					mydataFrom.color = $thisShow.attr("data-color");
					mydataFrom.shid = $thisShow.attr("data-shid");
					dataList.push(mydataFrom);
					
					if(index === imgLen - 1){
						var num = $("#shareFirstTipbox").attr("data-index");
						config.tip.centerDivClosed({indexNum:num,
							indexTipDiv:$("#shareFirstTipbox"),type:1
						});
						addShareInitTwo({dataFrom:dataList,
							boradid:settings.boradid,
							share:settings.share,
							shid:settings.shid,
							ishid:settings.ishid,
							ismjx:settings.ismjx
						});	
					}
				});
			});
		};
	};
	//创建分享:第二步
	var addShareInitTwo = function(options){
		var settings = {
			dataFrom:{},
			thumbpic:'',
			boradid:'',
			share:'',
			shid:'',
			ishid:'',
			ismjx:0,
			callback:function(){}
		};
		if(options){
			$.extend(true,settings,options);
		}

		AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=shareTip',
			isloading:true,
			type: "GET",
			dataType: 'html',
			params: {share:settings.share},
			callback: function(data){
				$("body").append(data);
				if(options.callback){
					settings.callback();	
				}
				var BodyHeight = config.base.getHeightBody()- 40;
				//console.log(BodyHeight);
				//console.log($("#shareTipbox").find(".tipbottom").height());
				$("#shareTipbox").find(".tipcont").css({"height":BodyHeight});
				$("#shareTipbox").find(".group_categoryList").css({"height":BodyHeight-213});
				config.tip.centerDiv({
					divId:"shareTipbox",
					type:1,
					w:"100%",
					position:"fixed",
					istop:true,
					callback:function(){
						shareBind(settings);
						
						//获取群列表
						//creatWeixinGroup.getGroupList();	
						//初始化创建微信群
						//creatWeixinGroup.creatWeixinGroup_share();
					}
				});
				$(".cover-img img").attr("src", settings.thumbpic);
				$("#picurlid").val(settings.thumbpic);
			}
		});	
	};
	//分享一个Share成功
	var shareSuccess = function(options){
		var settings = {
			shid:'',
			pic:'',
			title:'',
			dataFrom:{},
			share:'',
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);
		}
		var href = window.location.href;
		if(settings.share == 'caiji' || settings.share == 'jietu'){
			href = "/";
		}
		AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=shareSuccessTip',
			type: "GET",
			isloading:true,
			dataType: 'html',
			params: '',
			callback: function(data){
				$("body").append(data);
				if(options.callback){
					settings.callback();	
				}
				config.tip.centerDiv({
					"divId":"shareSuccessTipbox",
					"type":1,
					"callback":function(){
						//百度分享初始化
						var thishost = "http://" + window.location.host;
						config.baiduShare({
							bdPic:settings.pic,
							bdText:settings.title,
							url:thishost + "/share/sharepage.html?shid=" + settings.shid,
							title:settings.title,
							desc:settings.title,
							summary:settings.title
						});
						//微信分享
						$("#byshare_weixin").unbind("click").bind("click",function(){
							config.config.shareweinxtip({});	
						});
						$("#shareSuccessTipbox").find("#seeItNow").attr("href","/share/sharepage.html?shid=" + settings.shid);
					},
					closeback:function(){
						window.location = '/share/sharepage.html?shid=' + settings.shid;	
					}
				});
				
			}
		});	
	};
	//创建一个URL分享
	var addShareUrl = function(options){
		var settings = {
			callback:function(){return false}	
		};
		if(options){
			$.extend(settings,options);
		}
		AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=addWebUrl&ch=sns',
			type: "GET",
			yzlogin:true,
			isloading:true,
			dataType: 'html',
			params: '',
			callback: function(data){
				$("body").append(data);
				config.tip.centerDiv({divId:"addWebUrl",type:1,w:400});
				$(".btnTipsubmit").unbind("click").bind("click",function(){
					var url = $("#webUrlInput").val();
					if(url==''){
						$("#webUrlInput").siblings(".input_tip").show();
						return false;	
					}else{
						$("#webUrlInput").siblings(".input_tip").hide();	
						window.location.href = '/share/get_website_pics.html?websiteurl='+url;	
					}
					
				});
				
			}
		});		
		if(options.callback){
			settings.callback();	
		}
	};
	//编辑一个分享
	var editShareInit = function(options){
		var settings = {
			thisParent:'',
				shid:'',
				boradid:'',
			    callback:function(){}
		};
		if(options){
			$.extend(settings,options);
		}
		var href = window.location.href;
		AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=editShareTip&shid='+settings.shid,
			type: "GET",
			isloading:true,
			dataType: 'html',
			params: '',
			callback: function(data){
				$("body").append(data);
				if(options.callback){
					settings.callback();	
				}
				config.tip.centerDiv({divId:"editShareTipbox",type:1,callback:function(){
					$("#editShareFrom").checkInput({
						"button":'.editShareBtn',
						submitBtnFn: function (from,index) {
							config.base.loadInit({status:1});
							var act = $(index).attr("data-type");
							var dataFrom = from.serializeJson();
							dataFrom.shid = settings.shid;
							if(act == 'del'){
								var actUrl = '/share/del_pin.html';
							}
							if(act == 'edit'){
								var actUrl = '/share/edit_pin.html';
							}
							AjaxFunUtils.ajaxInit({
								"url":actUrl, 
								"params":dataFrom, 
								"callback":function (result) {
									config.base.loadInit({status:0});
									if(result.status){
										var mynumIndex = $("#editShareTipbox").attr("data-index");
										config.tip.centerDivClosed({
											"indexTipDiv":$("#editShareTipbox"),
											"indexNum":mynumIndex,
											"type":1
										});
										config.tip.tips({
											htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
											type:0,
											scallback:function(){
												window.location.href = href;
											}
										});
									}else{
										config.tip.tips({
											type:0,
											htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
										});
										config.base.loadInit({status:0});
									}
								}
							})
						}
					})
				}});
				shareBind({boradid:settings.boradid,ishid:settings.ishid,shid:settings.shid,ismjx:settings.ismjx});
			}
		});	
	};
	var shareBind = function(options){
		var settings = {
			boradid	:'',
			share:'',
			ishid:'',
			shid:'',
			ismjx:0,
			maxNum:15
		};
		if(options){
			$.extend(true,settings,options);
		};
		
		var myodataForm = settings.dataFrom;
		var myboradid = settings.boradid;
		
		//获取下拉框数据
		var getSelectData = function(){
			AjaxFunUtils.ajaxInit({
				"url":"/share/get_share_typename.html", 
				"callback":function (res){
					var lidata = res.data.rows;
					var lihtml = '';
					var deNum = 0;
					$.each(lidata,function(index,o){
						var li_html = '<li data-value="'+o.ucatid+'" class="boardprintitem">'+o.bname+'</li>';
						if(myboradid == o.ucatid){
							deNum = index;
						}
						lihtml +=li_html;
					});
					$("#shareboard").find(".board_items").empty().append(lihtml);
					//下拉框初始化
					$("#shareboard").selectUtils({"deNum":deNum,"isDef":true,"callback":function(){
						var select_analog = $(".select_box").find('.select_analog');
						config.checkInputFun.initContext(select_analog, config.checkInputFun.myIt);
						select_analog.siblings("p").show();
						config.checkInputFun.mycheckIn(select_analog);	
					}});
				}
			});
		};
		//获取下拉框数据初始化
		//getSelectData();
		//描述输入字数
		$("#description").unbind('input').bind('input',function(){
			var valLen = $(this).val().length;
			var inputLen = 300 - valLen;
			$("#descNum").text(inputLen);	
		});
		//创建分类
		$('#boardname').bind('input', function(){
			var val = $(this).val();
			if(val == ''){
				$(".creatbtn").unbind("click");
				$(this).parents(".boardnamebox").siblings("button").removeClass("creatbtn");
			}else{
				$(this).parents(".boardnamebox").siblings("button").addClass("creatbtn");
				$(".creatbtn").unbind("click").bind("click",function(){
					$this = $(this);
					var typename = $(this).siblings(".boardnamebox").find("#boardname").val();
					AjaxFunUtils.ajaxInit({"url":"/share/add_share.html", "params":{'name': typename},"callback":function (result){
						if(result.status){
							$("#shareboard").find(".select_option").hide();	
							//getSelectData();
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
							});
						}
					}
				});	
					
				});	
			};
		}); 
		//选择分类
		$("#bigcategoryBtn").unbind("click").bind("click",function(){
			var $thisparnt = $(this).parent(".select_box");
			var caNum = $("#bigcategorybox").size();
			if(caNum <= 0){
				AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=sns_category&ch=sns',
					type: "GET",
					isloading:true,
					dataType: 'html',
					params: '',
					callback:function(data){
						$("body").append(data);
						config.tip.centerDiv({
							divId:"bigcategorybox",type:1,w:"95%"
						});
						b_categoryBind();
					}
				});
			}else{
				$("#bigcategorybox").show();
				var num = $("#bigcategorybox").attr("data-index");
				$("#modalMask_" + num).show();
				b_categoryBind();	
			}
			
			function b_categoryBind(){
				$("#categorySub").unbind("click").bind("click",function(){
					var licurrentNum = $("#categoryFrom").find("li.current").size();
					if(licurrentNum<=0){
						$("#categoryText").html(lang.js_base_categorytext);	   
					}else{
						var litexthtml = '';
						$("#categoryFrom").find("li.current").each(function(index, element) {
						   var liText = ","+$(this).text();
						   if(index == 0){
							  liText = $(this).text(); 
						   }
						   litexthtml +=liText;
						});
						$("#categoryText").html(litexthtml); 
					}
					var num = $("#bigcategorybox").attr("data-index");
					config.tip.centerDivClosed({indexNum:num,indexTipDiv:$("#bigcategorybox"),type:0});
				});
				$("#categoryFrom").undelegate("li.current", "hover").delegate("li.current", "hover", function(){
					$(this).toggleClass("hover");
				});
				//取消选择
				$("#categoryFrom").undelegate(".icoCurrent", "click").delegate(".icoCurrent", "click", function(){
					var litype = $(this).attr("data-type");
					$(this).parent("li").removeClass("current");
					$(this).parent("li").attr("data-isload",0);
					if(litype == 0){
						var li_num = $(this).parent("li").index();
						$("#smallDiv_" + li_num).remove();
					};
				});
				$("#bigcategory").find("li").unbind("click").bind("click",function(){
					var $b_this = $(this);
					var tagid = $b_this.attr("data-tagid");
					var catid = $b_this.attr("data-catid");
					var attid = $b_this.attr("data-attid");
					var name = $b_this.attr("data-name");
					var isload = $b_this.attr("data-isload");
					var thisText = $b_this.text();
					var thisIndex = $b_this.index();
					var b_flag = $(this).hasClass("current");
					if(!b_flag){
						maxNumLiCurrent($b_this);
					}
					if(isload == 0){
						var $loading = $("<div class='s_loadin_bg' style='position: relative;'></div>");
						var $smallDiv = $("<div id='smallDiv_"+thisIndex+"' class='small_category' style='display:none'></div>");
						$smallDiv.html($loading);
						$("#sns_small_category").append($smallDiv);
						AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=sns_category_son&ch=sns',
							type: "GET",
							dataType: 'html',
							params: {tagid:tagid,catid:catid,attid:attid,catname:thisText},
							callback:function(data){
								$smallDiv.html(data).show();
								$b_this.attr("data-isload",1);
								$("#smallDiv_" + thisIndex).siblings(".small_category").hide();
								$(".scategory").find("li").unbind("click").bind("click",function(){
									var $s_this = $(this);
									var s_flag = $(this).hasClass("current");;
									if(!s_flag){
										maxNumLiCurrent($s_this);
									}
								});	
							},
							errCallback:function(){
								$smallDiv.html('').hide();
								$b_this.attr("data-isload",1);	
								$("#smallDiv_" + thisIndex).siblings(".small_category").hide();
							}
						});
					}else{
						$("#smallDiv_" + thisIndex).siblings(".small_category").hide();
						$("#smallDiv_" + thisIndex).show();
					}
				});	
			};
			//检查是否已到达最大的选择数量
			function maxNumLiCurrent($othis){
				var $myothis = $othis;
				var currentLINum = $("#categoryFrom").find("li.current").size();
				if(currentLINum >= settings.maxNum){
					config.tip.tips({
						htmlmsg:'<div style="padding:30px">' + lang.maxCategoryNum+'</div>',
						type:0
					});	
				}else{
					categoryBtnBind($myothis);	
				}
			};
			//选中分类添加current
			function categoryBtnBind($othis){
				var $lithis = $othis;
				var $thisUl = $lithis.parent("ul");
				$lithis.addClass("current hover");
				$lithis.find(".currentico").addClass("icoCurrent");
				var thisInputVal = '';
				$thisUl.find("li").each(function(index, element) {
                    var s_flag = $(this).hasClass("current");
					if(s_flag){
						var tagid = $(this).attr("data-tagid");
						var catid = $(this).attr("data-catid");
						var attid = $(this).attr("data-attid");
						var name = $(this).attr("data-name");
						if(catid){
							var thisVal = tagid+"|"+catid + "|" + name + "_";	
							thisInputVal +=thisVal;
						}else if(attid){
							var thisVal = tagid+"|"+attid + "|" + name + "_";	
							thisInputVal +=thisVal;
						}
					}
                });
				$lithis.siblings("input").val(thisInputVal);
			};
			
		});
		//创建分享第三步表单提交绑定
		$("#shareFrom").checkInput({
			inputs:{
				"Category":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'}
			},
			submitBtnFn: function (from) {
				config.base.loadInit({status:1});
				var js_debug = config.base.getQueryString("js_debug");
				var dataFrom = from.serializeJson();
				var categoryData = $("#categoryFrom").serializeJson();
				var resData = $.extend(true,dataFrom,categoryData);
				var special_id = $("#upcontainer").attr("data-specialid");
				var gpid = $("#upcontainer").attr("data-gpid");
				var addurl = "/share/add_pin.html";
				if(js_debug){
					addurl = "/share/add_pin.html?js_debug=1";
				}
				AjaxFunUtils.ajaxInit({
					url:addurl, 
					params:{imgdata:myodataForm,board:resData,share:settings.share,shid:settings.shid,ishid:settings.ishid,special_id:special_id,gpid:gpid,is_mjx:settings.ismjx}, 
					callback:function (result) {
						if(js_debug){
							alert(addurl);
							alert(result.status);
							alert(result.msg);	
						}
						if(result.status){
							config.base.loadInit({status:0});
							var num = $("#shareTipbox").attr("data-index");
							config.tip.centerDivClosed({indexNum:num,indexTipDiv:$("#shareTipbox"),type:1,"w":600});
							var num = $("#bigcategorybox").attr("data-index");
							config.tip.centerDivClosed({indexNum:num,indexTipDiv:$("#bigcategorybox"),type:1});
							var newshid = result.data.shid;
							var newtitle = result.data.title;
							var newpic = result.data.pic;
							shareSuccess({shid:newshid,share:settings.share,title:newtitle,pic:newpic});
							
						}else{
							config.base.loadInit({status:0});
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
							});
						}
					}
				});
			}	
		});
	};	
	//删除，鼠标经过，描点功能绑定
	var hoverAndDrag = function(options){
		var settings = {
			proportion:'',
			parent:'',
			indexDiv:'',
			iswebsite:'',
			opageXY:'',
			type:'',
			shid:'',
			ishid:'',
			share:'',
			boradid:'',
			ismjx:0
		};
		if(options){
			$.extend(true,settings,options);
		};
		//删除按钮和提交按钮热点绑定
		var delSubHotTag = function(){
			var $myparent = settings.parent;
			var $myindexDivBox = settings.indexDiv;
			var fpageXY = settings.opageXY.cpageX + '|' + settings.opageXY.cpageY;
			var myTagType = settings.type;
			customizedFrom($myindexDivBox,myTagType);
		};
		
		//提交描点绑定
		function customizedFrom($myindexDivBox,myTagType,callback){
			$myindexDivBox.find(".addTagTipBtn").unbind("click").bind("click",function(){
				var flag = config.base.isNull($myindexDivBox.find("input").val());
				if(flag){
					return false;
				}else{
					sendTagData($myindexDivBox);	
				}	
			});
			//提交描点数据
			function sendTagData($omyindexDivBox){
				//var dataFrom = subFrom.serializeJson();
				if($omyindexDivBox){
					$myindexDivBox	= $omyindexDivBox;
				}
				$myindexDivBox.attr("data-val",1);
				if(myTagType == "cus"){
					$myindexDivBox.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-sCustomized");	
				}
				if(myTagType == "tag"){
					$myindexDivBox.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-stag");	
				}
				if(myTagType == "people"){
					$myindexDivBox.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-sPeople");	
				}
				if(myTagType == "place"){
					$myindexDivBox.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-sPlace");	
				}
				
				var indexTitle = $myindexDivBox.find(".byshareInputName").val();
				$myindexDivBox.attr("data-type",myTagType);
				$myindexDivBox.find(".cilckItem").attr("data-type",myTagType);
				$myindexDivBox.find(".tip").html('<span>'+indexTitle+'</span>');
				$myindexDivBox.addClass("loaded");
				$myindexDivBox.find(".item-tag-show").removeClass("hide");
				$myindexDivBox.find(".item-tag-box").addClass("hide").hide();
				$myindexDivBox.find(".tag_itembox").removeClass("show");
				$myindexDivBox.removeClass("redy-tag").addClass("item-hover");
				if(callback){
					callback();
				}
				isNextFun(settings);	
				//拖拽,鼠标经过描点功能绑定
				dargTag($myindexDivBox);	
				mdHover();	
			}
		};
		//搜索标签
		function searchAllTag(){
			if(settings.type == "tag"){
				$('.searchTag').inputSearch({
					url:'/search/search_liketag.html',
					callback:function(index,o){
						var lihtml='<li class="userFlag" data-uid="1">'+o.tagtxt+'</li>';
						return lihtml;
					},
					bcallback:function($thisIput,$creatDiv,$creatUl,$tosuid){
						$creatUl.find(".userFlag").on('click',function(){
							var value=$(this).text();
							var value_val=$(this).attr('data-value')?$(this).attr('data-value'):$(this).val();
							var tosuidVal = $(this).attr("data-uid");
							$thisIput.attr('value',value);
							$tosuid.attr('value',tosuidVal);
							$(this).parents(".userCircleSelect").hide();
						});	
					}
				});
			}else if(settings.type == "people"){
				//搜索人名
				$('.people').inputSearch({
					url:'/search/search_user_byname.html',
					callback:function(index,o){
						var avatar = o.avatar;		
						var lihtml='<li class="userFlag" data-uid="'+o.suid+'">'+
							'<a class="userCircleAvatar">'+
								'<div class="fl mr-10">'+
									'<img class="avatar avatar_loading" src="'+avatar[2]+'" data-original="'+avatar[1]+'">'+
								'</div>'+
								'<div class="fl">'+
									'<h4 class="title">'+o.allname+'</h4>'+
								'</div>'+
							'</a>'+
						'</li>';
						return lihtml;
					},
					bcallback:function($thisIput,$creatDiv,$creatUl,$tosuid){
						$creatUl.find(".userFlag").on('click',function(){
							var value=$(this).find("h4").text();
							var value_val=$(this).attr('data-value')?$(this).attr('data-value'):$(this).val();
							var tosuidVal = $(this).attr("data-uid");
							$thisIput.attr('value',value);
							$tosuid.attr('value',tosuidVal);
							$(this).parents(".userCircleSelect").hide();
						});	
					}
				});	
			}else if(settings.type == "place"){
				//搜索地点
				$('.place_bak').inputSearch({
					url:'/search/search_likepalce.html',
					callback:function(index,o){		
						var lihtml='<li class="userFlag" data-uid="1">'+o.CityName+'</li>';
						return lihtml;
					},
					bcallback:function($thisIput,$creatDiv,$creatUl,$tosuid){
						$creatUl.find(".userFlag").on('click',function(){
							var value=$(this).text();
							var value_val=$(this).attr('data-value')?$(this).attr('data-value'):$(this).val();
							var tosuidVal = $(this).attr("data-uid");
							$thisIput.attr('value',value);
							$tosuid.attr('value',tosuidVal);
							$(this).parents(".userCircleSelect").hide();
						});	
					}
				});	
			}else if(settings.type == "cus"){
				//分类数据初始化
				AjaxFunUtils.ajaxInit({
					url: '/goods/goodscats.html',
					callback:function(res){
						var resData = res.data;
						$.each(resData,function(index,o){
							var li_o = '<li value="'+o.catid+'">'+o.catname+'</li>';	
							$(".CategoryList").append(li_o);
						});
						//下拉框初始化
						$(".select_box").selectUtils({"callback":function(){
							var select_analog = $(".select_box").find('input');
							config.checkInputFun.initContext(select_analog, config.checkInputFun.myIt);
							select_analog.siblings("p").show();
							config.checkInputFun.mycheckIn(select_analog);	
						}});
					}	
				});
			};
		};
		
		//拖拽功能绑定
		var dargTag = function($omyindexDivBox){
			var $cilckItem = $omyindexDivBox.find(".cilckItem");
			//var $cilckItem = $omyindexDivBox;
			var $thisparents = $cilckItem.parents(".showPicImg");
			$cilckItem.draggable({
				containment:$thisparents,
				start:function(){
				},
				stop: function(event, ui) {
					var $thisui = $(this);
					var $thisuiParent = $thisui.parent(".item-tag");
					var $showPicImg = $thisui.parents(".showPicImg");
					var pLeft = $thisuiParent.position().left;
					var pTop = $thisuiParent.position().top;
					var Left = pLeft + $thisui.position().left;
					var Top = pTop + $thisui.position().top;
					var l = Left/settings.proportion;
					var t = Top/settings.proportion;
					$thisuiParent.find(".Coordinate").val(l + '|' + t);
					$thisuiParent.attr("data-left",l);
					$thisuiParent.attr("data-top",t);
					var img_w = $showPicImg.width();
					//var p_w = $thisuiParent.width();
					var this_w = $thisuiParent.find(".item-tag-form").width()+12;
					var isleft = (Left + this_w)-img_w>0?1:0;
					var isright = (this_w - Left )>0?1:0;
					var tag_form_w = $thisuiParent.find(".item-tag-form").width()+10;
					if(isleft){
						$thisuiParent.find(".item-tag-form").css({"right":24,"left":"auto"});
						$thisuiParent.find(".item-tag-form").find(".tip").addClass("tagRight");
					}
					if(isright){
						$thisuiParent.find(".item-tag-form").css({"left":24,"right":"auto"});
						$thisuiParent.find(".item-tag-form").find(".tip").removeClass("tagRight");	
					}
				}
			});
		};
		//删除描点功能绑定
		$(".delTipBtn").unbind("click").bind("click",function(){
			$(this).parents(".item-tag").remove();
			settings.indexDiv.find(".item-tag").each(function(index, element){
				var myIndex = index;
				$(this).attr("id","addTagDiv_" + myIndex);
			});
			isNextFun(settings);
		});	
		//鼠标经过描点效果
		var mdHover = function(){
			$(".cilckItem").unbind("click").bind("click",function(){
				//return false;
				var tagType = $(this).attr("data-type");
				var $thissib = $(this).siblings(".item-tag-box");
				var $thisp = $(this).parents(".item-hover");
				config.tip.tips({
					w:"80%",
					htmlmsg:'<div style="padding:30px">'+config.base.lang.js_base_deltag+'</div>',
					scallback:function(){
						$thisp.remove();
						isNextFun(settings);
					}
				});
				
			});
		};
		//初始化
		//searchAllTag();
		delSubHotTag();	
		if(settings.share){
			mdHover();
			dargTag(settings.indexDiv);	
		}
	};
	var addTagUtils = function(options){
		var settings = {
			tagdiv:'',
			index:0,
			isOri:false,
			maxNum:3,
			proportion:1,//等比缩放
			boradid:'',
			shid:'',
			ishid:'',
			share:'',
			callback:function(){}	
		};
		if(options){
			$.extend(settings,options);
		}
		var $thisImg = settings.tagdiv;
		var $thisShade = $("#addTagFromBox");
		
		//点击图片添加热点
		$thisImg.unbind("click").bind("click",function(e){
			var ev = e;
			oneAddHot(ev,$(this));
			//if(num<=settings.maxNum){}
		});
		if(!settings.isOri){
			$("#isOri").remove();	
		};
		//添加热点第一步：添加选择选项
		var oneAddHot = function(evt,$othis){
			var $myothis = $othis;
			var $this = $myothis.parents(".showPicImg");
			$thisShade.fadeIn();
			$this.find(".redy-tag").remove();
			var myEvt = evt;
			var $dataTag = $this.find(".item-tag");
			var num = $dataTag.size();
			var $thisHeight = $this.height();
			var $thisAddTag = $thisShade.find(".addTagList");
			var addTagTop = ($thisHeight - $thisAddTag.height())/2;
			$dataTag.find(".item-tag-box").addClass("hide");
			$dataTag.find(".item-tag-box").parents(".item-tag").css({"z-index":0});
			$thisAddTag.css({"top":addTagTop});
			$thisAddTag.find(".addTagBtn").unbind("click").bind("click",function(){
				var tagType = $(this).attr("data-type");
				$thisShade.fadeOut(function(){
					createTagCont(myEvt,num,tagType,$this);	
				});
			});
			$("#addTagFromBox").unbind("click").bind("click",function(){
				$thisShade.fadeOut();	
			})
		};
		//添加热点第一步:添加内容
		var createTagCont = function(e,num,type,$othis){
			var $this = $othis;
			var addTagDiv = document.createElement('div');
			var myTagType = type;
			var xx = e.pageX; 
			var yy = e.pageY; 
			var l_left = xx - $this.offset().left;
			var t_top = yy - $this.offset().top;
			var cpageX = parseInt(l_left/settings.proportion);
			var cpageY = parseInt(t_top/settings.proportion);
			var cpageXY = {cpageX:cpageX,cpageY:cpageY};
			addTagDiv.id = "addTagDiv_" + settings.index + '_'+ num;
			addTagDiv.className = "item-tag redy-tag darg-tag";
			$this.append(addTagDiv);
			var $indexAddDiv = $("#addTagDiv_" + settings.index + '_'+ num);
			$indexAddDiv.attr("data-val",0);
			var htmlUrl = "/common/gettpl.html?name=tagTip&ch=sns";
			if(myTagType == "cus"){
				htmlUrl = "/common/gettpl.html?name=customizedTip&ch=buy";
			}else if(myTagType == "place"){
				htmlUrl = "/common/gettpl.html?name=placeTip&ch=sns";
			}else if(myTagType == "people"){
				htmlUrl = "/common/gettpl.html?name=peopleTip&ch=sns";
			};
			AjaxFunUtils.ajaxInit({url: htmlUrl,type: "GET",dataType: 'html',params: '',callback: function(data){
				$indexAddDiv.append(data).css({"left":l_left,"top":t_top}).fadeIn();
				setTagZb($indexAddDiv);
				hoverAndDrag({proportion:settings.proportion,
					parent:$this,
					indexDiv:$indexAddDiv,
					opageXY:cpageXY,
					type:myTagType,
					shid:settings.shid,
					ishid:settings.ishid,
					boradid:settings.boradid,
					share:settings.share,
					ismjx:settings.ismjx
				});
			}});
			
			//给标签原始坐标
			function setTagZb($ODIV){
				$ODIV.find(".Coordinate").val(cpageX+'|'+cpageY);
				$ODIV.attr("data-left",cpageX);
				$ODIV.attr("data-top",cpageY);	
				var p_w = $indexAddDiv.parent(".showPicImg").width();
				var p_h = $indexAddDiv.parent(".showPicImg").height();
				var this_w = $indexAddDiv.find(".item-tag-box").width();
				var this_h = $indexAddDiv.find(".item-tag-box").height();
				var box_l = (p_w - this_w)/2 - l_left;
				var box_t = (p_h - this_h)/2 - t_top;
				$indexAddDiv.find(".item-tag-box").css({"left":box_l,"top":box_t});
				var tag_form_w = $indexAddDiv.find(".item-tag-show").width()+10;
				var flag_w = p_w - l_left - tag_form_w;
				if(flag_w < 0){
					$indexAddDiv.find(".item-tag-show").css({"right":24,"left":"auto"});
					$indexAddDiv.find(".item-tag-show").find(".tip").addClass("tagRight");
				}
			}
			if(options.callback){
				settings.callback();	
			};
		};
	};
	return {
		addShareInit:addShareInit	
	}
});