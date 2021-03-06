var Searchtils = function(){
	var baseInit = function(options){
		var settings = {
			mod:''	
		};
		if(options){
			$.extend(settings,options);		
		}
		if(settings.mod =='search_content'){
			search_content();	
		}
	};
	//搜索
	var searchInit = function(opt){
		//头部搜索
		allsearch();
		//搜索选择分类
		selectsearchType();
		function selectsearchType(){
			$("#s-input-tab-jieguo").unbind("click").bind("click",function(){
				var isshow = $("#J_TabNav_jieguo").is(":hidden");	
				if(isshow){
					$("#J_TabNav_jieguo").show();	
				}else{
					$("#J_TabNav_jieguo").hide();	
				}
			});
			$("#s-input-tab-jieguo").find("li").unbind("click").bind("click",function(){
				//var thisval = $(this).text();
				//var thisval_type = $(this).attr("data-val");
				var url = $(this).attr("data-url");
				window.location.href=url;
				//$("#s-input-val").text(thisval);
				//$("#searchtyleval").val(thisval_type);	
			});
		};
		//整个网站公共初始化
		BaseInitClass.baseInit();
		MasonryUtils.masonryInit({masonry:opt.masonry,issearch:opt.issearch,islazy:opt.islazy});//瀑布流初始化
		
		$("#choose_dh").find(".dhpjax").unbind("click").bind("click",function(){
			var type = $(this).attr("data-type");
			$(this).addClass("current");	
			$(this).siblings(".dhpjax").removeClass("current");
			var url = $(this).attr("data-url")+"&ajax=true";
			if(type == 'price'){
				var orders = $(this).attr("data-orders");	
				if(orders == "price_asc"){
					$(this).attr("data-orders","price_desc");
					$(this).find(".def_icon").removeClass("up_icon").addClass('down_icon');	
				}else{
					$(this).attr("data-orders","price_asc");
					$(this).find(".def_icon").removeClass("down_icon").addClass('up_icon');			
				}
				url = $(this).attr("data-url")+"&orders="+orders+"&ajax=true";
			}
			
			$.ajax({
			  url: url,
			  dataType: 'html',
			  beforeSend: function(xhr){
				$("#data-loading").remove();
				$('#masonry_2').html('<div class="imgloading" style="height:300px; width:100%"></div>');
				var nvnexttop = $('#masonry_2').offset().top;
				window.scrollTo(0,nvnexttop-46);
				//xhr.setRequestHeader('X-PJAX', 'true')
			  },
			  success: function(data){
				$('#masonry_2').html(data);
				$(window).unbind('.infscr');//瀑布流滚动解绑
				//history.pushState(null, $(data).filter('title').text(), url);
				MasonryUtils.masonryInit({
					masonry:"masonry_2",
					issearch:true,
					islazy:1,
					callback:function(){
					}
				});
			  }
			})
		});
		$("#choose_btn").unbind("click").bind("click",function(){
			chooseFn.chooseInt({});	
		});
		//导航置顶
		if($("#choose_btn").size() > 0){
			chooseFn.dhfixedTop({
				dhfixedTop:90	
			});
		}
		
	};
	var search_content = function(){
		$("#taglist").find(".img_bg").checkImgExists(function(obj,imgurl){
			var $myopj = obj;
			var myimgurl = imgurl;
			var $thisp = $myopj.parent("a");
			$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
		});	
	};
	return {searchInit:searchInit,baseInit:baseInit};	
}();
