//头部公共搜索
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	var allsearch = function(){
		$(".searchstart").unbind("focus").bind("focus",function(){
			var placeholder = $(this).attr("data-placeholder");
			var searchtype = $(this).attr("data-searchtype");
			searchInt({placeholder:placeholder,searchtype:searchtype});	
		});
		$(".searchtop").unbind("click").bind("click",function(){
			var placeholder = $(this).attr("data-placeholder");
			var searchtype = $(this).attr("data-searchtype");
			searchInt({placeholder:placeholder,searchtype:searchtype});	
		});
		function searchInt(opt){
			var $searchbox = $('<div id="search-modalMask" class="modalMask" style="z-index:9996;display: block"></div>');
			
			$('body').append($searchbox);
				
			var searchUrl = '/common/gettpl.html?name=sns_searchinput&ch=sns';
			if(opt.searchtype == "weixingroup"){
				searchUrl = '/common/gettpl.html?name=sns_searchgroup&ch=sns';
			}
			AjaxFunUtils.ajaxInit({url: searchUrl,
				type: "GET",
				dataType: 'html',
				params:{},
				callback: function(data){
					$("body").append(data);
					var searchtyleval = "goods";
					$("#searchinput").addClass("loaded");
					$("#newsearchInt").focus();
					$("#searchtyleval").val(searchtyleval);
					//搜索选择分类
					selectsearchType();
					//搜索关键字
					searchTagbox();
					//关闭搜索
					closeSearch();
					//清空历史搜索
					$("#qingkong_btn").unbind("click").bind("click",function(){
						AjaxFunUtils.ajaxInit({
							url:'/m_search/clearwords.html',	
							params:'',
							callback:function(res){
								if(res.status == 1){
									$("#searchTagbox").html('');
									$("#qingkong_btn").hide();
								}
							}
						});
					});
				}
			});	
		};
		//搜索选择分类
		function selectsearchType(){
			$("#s-input-tab-txt").unbind("click").bind("click",function(){
				var isshow = $("#J_TabNav").is(":hidden");	
				if(isshow){
					$("#J_TabNav").show();	
				}else{
					$("#J_TabNav").hide();	
				}
			});
			$("#s-input-tab-txt").find("li").unbind("click").bind("click",function(){
				var thisval = $(this).text();
				var thisval_type = $(this).attr("data-val");
				$("#s-input-val").text(thisval);
				$("#s-input-val").attr("data-type",thisval_type);
				$("#searchtyleval").val(thisval_type);	
				searchTagbox();
			});
		};
		function closeSearch(){
			$('#closeSearch,#search-modalMask').unbind("click").bind('click',function(){
				$("#searchinput").remove();
				$("#search-modalMask").remove();	
			});	
		}
		function searchTagbox(osearchtype){
			var thisT = $("#searchtyleval").val();
			var val = '';
			$("#newsearchInt").unbind('input').bind('input', function(){
				var $thisIput = $(this);
				thisT = $("#s-input-val").attr("data-type");
				val = $.trim($thisIput.val());
				ajaxSearch();
			});
			ajaxSearch();
			function ajaxSearch(){
				AjaxFunUtils.ajaxInit({
					url:'/m_search/getwordlists.html?t='+thisT+'&s='+val+'',	
					params:{},
					callback:function(res){
						if(res.status){
							$("#searchTagbox").show();
							var resSearchData = res.data.keyword;
							var lihtml ='<li class="li-title">历史记录</li>';
							if(val==''){
								lihtml ='<li class="li-title">历史记录</li>';
								$("#qingkong_btn").show();
							}
							$.each(resSearchData,function(index,keyword){
								lihtml+='<li><a href="/m_search/search.html?t='+thisT+'&s='+encodeURIComponent(keyword.val)+'" data-val='+keyword.val+'>'+keyword.val+'</a></li>';	
							});
							$("#searchTagbox").html(lihtml);
						}else{
							$("#searchTagbox").hide();
							$("#qingkong_btn").hide();
						}
					}
				});	
			}
		};
		
	};	
	return allsearch();
});