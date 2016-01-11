define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
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
			params:{},
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
						checkInputFun.initContext(select_analog, checkInputFun.myIt);
						select_analog.siblings("p").show();
						checkInputFun.mycheckIn(select_analog);	
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
					params:{},
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
				var js_debug = BaseInitClass.getQueryString("js_debug");
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
	return {editShareInit:editShareInit};	
});