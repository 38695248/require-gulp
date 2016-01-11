define(['jquery','config','base','ajax','comm/sel_sku','comm/zan','comm/followBtn','swiper','baguettebox','lazyload','checkInput','checkboxFn','serializeJson','setTagPos'],function($,config,base,AjaxFunUtils,goods,zan,followBtn){
	var shareViewcomm = function(opt){
		//公共JS
		base.init();
		
		var gdid = $("#gdid").val();
		if(gdid){
			//商品评论
			getcommt();
		}else{
			//分享评论
			require(['comm/comments'],function(comments){
				comments.init();
			});
		}
		//商品初始化
		if($("#goods").val()==1){
			//图片滚动初始化
			sliderboxInt();
			//商品初始化
			var gdid = $("#gdid").val();
			goods.init({gdid:gdid});
			//产品详情，产品推荐
			tjcp_list();
		}else{
			//图片坐标初始化
			$("#sharePicImgBox").find(".mod_01").setTagPos();
			$("#sharedescbox").find(".imgtag").each(function(index, element) {
				$(this).setTagPos();
			});	
		}
		//share初始化
		if($("#masonry-tj").size()>0){
			MasonryUtils.masonryInit({
				masonry:"masonry-tj",
				islazy:1,
				callback:function(){
				}
			});//瀑布流初始化
		}
		//头像图片懒加载
		$("img.avatar_lazy").checkImgExists(function(obj,imgurl){
			var $myopj = obj;
			var myimgurl = imgurl;
			var $thisp = $myopj.parent(".useravatar_bg");
			$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
		});
		//赞，分享
		zan.zanint();
		followBtn.followBtn();
	};
	//产品详情，产品推荐
	var tjcp_list = function(){
		var geturl = $("#tjcp_list").attr("data-url");
		AjaxFunUtils.ajaxInit({
			url: geturl,
			type: "GET",
			dataType: 'html',
			params: {ajax:1},
			callback: function(data){
				if(!data){
					$("#tjcp_list_box").hide();
					return false;	
				}
				$("#tjcp_list").append(data);
				$("#tjcp_list").find("img.lazy-mas").lazyload({	
					effect: "fadeIn",
					threshold : 100,	
					failurelimit:20
				});
			}
		});
	};
	//图片滚动初始化
	var sliderboxInt = function(){
		//设置图片框高度
		setImgHeight();
		function setImgHeight(){
			var bodyH = config.base.getHeightBody();
			var setH = bodyH*0.7;
			//$("#sliderbox_view").find("img").css({"height":setH});
			$("#sliderbox_view").css({"height":setH});
			return setH;	
		}
		
		//广告切换图片
		var mySwiper = new Swiper('#sliderbox_view', {
			autoplay: false,//可选选项，自动滑动
			pagination : '.slide_01_dot_view',
			loop : true,
			loopAdditionalSlides : 1,
			onInit: function(swiper){
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
						//var top = 0;
						if(bili>=1){ 
							//高度等比缩放
							thisModH = sliderboxH;
							thisModW = thisModH*bili; 
							//left = -(thisModW - sliderboxW)/2;
						}else{
							thisModW = sliderboxW;
							thisModH = thisModW/bili;
							//top = -(thisModH - sliderboxH)/2;	
						};
						$(".img_"+index).css({"height":thisModH,"width":thisModW});	 
					};
				});
				//图片坐标初始化
				$("#viewPicImgBox").find(".mod_01").each(function(index, element) {
					$(this).setTagPos();
				});
			}
		})
		baguetteBox.run('.baguetteBoxOne');
	};
	//商品评论
	var getcommt = function(ogdid){
		AjaxFunUtils.ajaxInit({url: '/b_goods/gdcomment_tbk.html',
			params:{gdid:ogdid},
			callback:function(res){}
		});
	};
	return {shareViewcomm:shareViewcomm};		
});
