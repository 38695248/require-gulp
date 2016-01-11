/** 
 @description 封装ajax数据调用及数据列表和分页的常用方法
 @Name: AjaxFunUtils's js
 @Date: 2014.07.09
 @Author: king
 **/
var AjaxFunUtils = function(){
	var ajaxInit = function(options){
		var settings = {
			url: '',
			type: "post",
            dataType: 'json',
			params: {ajax:1},
			yzlogin:false,
			isloading:false,
			callback: function(){},
			errCallback: function(){}
		};	
		if(options){
			$.extend(true,settings,options);
		};
		if(settings.yzlogin){
			var loginflag = BaseInitClass.loginCheck();
			if(!loginflag){
				return false;
			}
		};
		if(settings.isloading == true){
			Loading.loadInit({status:1});
		}
		
		$.ajax({
			url:settings.url,
            type:settings.type,
			dataType: settings.dataType,
			data: settings.params ,
            success: function(result) {
				if(settings.isloading == true){
					Loading.loadInit({status:0});
				}
				if(result.status == 900){
					$(".loadingMask").remove();
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">'+lang.js_base_login_tip+'</div>',
						callback:function(){
							$(".btnTipsubmit").find(".buttonText").text(lang.js_base_login_btn);	
						},
						scallback:function(){
							var loginhref = window.location.href;
							window.location.href = '/index/reg.html?loginurl='+loginhref+'';
						}
					});	
					return false;
				}else{
					if(options.callback){
						settings.callback(result)
					}
				}
				
			},
			error: function(msg) {
				Loading.loadInit({status:0});
				if (options.errCallback) {
					settings.errCallback(msg)
				}
			}
        });
    };
	return {ajaxInit:ajaxInit};
}();

/** 
 @description 封装ajax数据列表和分页的常用方法
 @Name: loadDataUtils's js
 @Date: 2014.07.09
 @Author: king
 **/
$.fn.loadDataUtils = function(options){
	var container = this;
	var settings = {
		url:"",//请求的数据地址
		isPage:true,
		isOuto:false,
		isEmpty:true,
		isdz:false,//是否地指定DIV分页
		resData:false,//是否已经传数据进了
		prev_text:lang.js_base_prev,
		next_text:lang.js_base_next,
		num_edge: 0, //边缘页数
		num_display: 3, //主体页数
		prev_show:true,
		params: { 'page': 1, 'pagenum': 20},//请求数据的参数
		loadCallback:function(){return 1},//数据加载中提示
		getDataHtmlCallback:null,//处理有数据时的方法
		getNoDataHtmlCallback:null,//处理没有数据时的方法
        callback:null
	};
	if (options) {
       $.extend(settings, options);
    };
	
	//预先加载页的数据
    PageCallback(settings.params.page);
			
	function PageCallback(page_index){
		if(settings.loadCallback() == 1){
			var loadingHtml = '<div class="loading">Data loading...<div class="blank0"></div></div>';	
			container.append(loadingHtml);
		}else{
			settings.loadCallback();
		};
		settings.params.page = page_index;
		if(settings.resData == false){
			AjaxFunUtils.ajaxInit({
				url: settings.url,
				params:settings.params,
				callback: loadDataCallBack,
				errCallback: settings.getNoDataHtmlCallback	
			});	
		}else{
			loadDataCallBack(settings.resData);	
		};
	};
	function loadDataCallBack(result){
		var mystatus = result.status;
		var totalCount = result.data.pagetotal;
		var logData = result.data.rows;
		var exrtitle = result.data.currency_exrtitle;
		var htmlStr='';
		if(mystatus > 0 || !mystatus){
			$.each(logData, function(index, o){
				htmlStr += settings.getDataHtmlCallback(index,o,exrtitle);
			});
			if(settings.isEmpty){
				container.empty().append(htmlStr);
			}else{
				container.append(htmlStr);	
				if(settings.loadCallback == 1){
					container.find(".loading").remove();	
				}
			};
			if(totalCount > 1 && settings.isPage){
				ShowPageing(settings.params.page,totalCount);
			};
			
			if (options.callback) {
				settings.callback();
			};
		}else{
			if(settings.loadCallback == 1){
				container.find(".loading").remove();	
			};
		};
	};
	function ShowPageing(index_page,oTotal){
		//添加分页DIV
		if(settings.isPage && settings.isOuto){
			var pagination = container.attr("id") + "_page";
			var pageHtml = '<div class="blank0"></div><div class="pagination text-center" id="'+pagination+'"></div>';
			if($("#" + pagination).size() <= 0){
				container.after(pageHtml);
			};
			var opagedivId = $('#' + pagination);
			opagedivId.empty();
		}else if(settings.isPage && !settings.isdz){
			var opagedivId = container.siblings('.pagination');	
			container.siblings('.pagination').empty().show();
		}else{
			var opagedivId = $('#pagination');	
			$('#pagination').empty().show();	
		};
		if(opagedivId.html() == ''){
			opagedivId.pagination(oTotal,
			{
				num_edge_entries: settings.num_edge, //边缘页数
				num_display_entries: settings.num_display, //主体页数
				prev_show_always:settings.prev_show,
				current_page:index_page-1,//当前页
				prev_text:settings.prev_text,
				next_text:settings.next_text,
				callback: function (page_index, jq) {
					PageCallback(page_index+1);
				},
				items_per_page: 1,//每页显示1项
				link_to: 'javascript:void(0);'
			});
		};
	};
};
//分页处理
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:10,
		current_page:0,
		num_edge_entries:0,
		link_to:"#",
		prev_text:"Prev",
		next_text:"Next",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback: function () { return false; },
        IsFirst:true
	},opts||{});
	
	return this.each(function() {
		/**
		 * 计算最大分页显示数目
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		};	
		/**
		 * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
		 * @返回 {数组(Array)}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		};
		
		/**
		 * 分页链接事件处理函数
		 * @参数 {int} page_id 为新页码
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			};
			return continuePropagation;
		};
		
		/**
		 * 此函数将分页链接插入到容器元素中
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			};
			//辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // 规范page id值
				appendopts = jQuery.extend({text:page_id+1, classes:"btn-border btn"}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
				}else{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));		
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			};
			// 产生"Previous"-链接
			if(opts.prev_text && (current_page > 0 && opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:'btn-border btn'});
			};
			// 产生起始点
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			};
			// 产生内部的些链接
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			};

			// 产生结束点
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			};
			// 产生 "Next"-链接
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:'btn-border btn'});
			};
		};
		
		//从选项中提取current_page
		var current_page = opts.current_page;
		//创建一个显示条数和每页显示条数值
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		//存储DOM元素，以方便从所有的内部结构中获取
		var panel = jQuery(this);
		// 获得附加功能的元素
		this.selectPage = function(page_id){ pageSelected(page_id);};
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		};
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		};
		// 所有初始化完成，绘制链接
		drawLinks();
	    // 回调函数
		if (!opts.IsFirst) {
		    opts.IsFirst = false;
		    opts.callback(current_page, this);
		};
	});
};
/** 
 @description 弹窗的常用方法
 @Name: AlertUtils's js
 @Date: 2014.07.10
 @Author: king
**/
var AlertUtils = function(){
	var tips = function(options){
		var settings = {
			htmlmsg:'',
			title:lang.js_base_tip,
			type:1,
			position:"fixed",
			isShade:true,
			callback:function(){},
			scallback:function(){},
			closeback:function(){},
			w:"96%"
		};
		if(options){
			$.extend(settings,options);
		};
		var tipHtml ='<div class="tipbox-in" data-index="0">'+
				'<h1 class="tiptop">'+lang.js_base_tip+'</h1>'+
				'<span class="ico02 tipclose closeBtn"></span>'+
				'<form class="tipForm"><div class="tipcont">'+
					'<div class="contbox">sdfdsfdsf</div>'+
				'</div>'+
				'<div class="tipbottom">'+
					'<div class="fr formFooterButtons">'+
						'<button class="btn-border btn rounded mr-5 btnCancel closeBtn" type="button">'+
							'<span class="buttonText">'+lang.js_base_cancel+'</span>'+
						'</button>'+
						'<button type="button" class="btn btn-danger btnTipsubmit">'+
							'<span class="buttonText">'+lang.js_base_confirm+'</span>'+
						'</button>'+
					'</div>'+
					'<div class="blank0"></div>'+
				'</div></form>'+
		'</div>';
		var tipDiv = document.createElement('div');
		var num = $(".modalMask").size();
		var myTipId = "tipbox_" + num;
		tipDiv.id = myTipId;
		tipDiv.className = "tipbox fade";
		$("body").append(tipDiv);
		$("#" + myTipId).attr("data-index",num);
		$("#" + myTipId).append(tipHtml);
		$("#" + myTipId).find(".tiptop").html(settings.title);
		$("#" + myTipId).find(".tipcont").html(settings.htmlmsg);
		$("#" + myTipId).css("width", settings.w);
		if(settings.type == 0){
			$("#" + myTipId).find(".btnCancel").remove();
			$("#" + myTipId).find(".closeBtn").remove();
		};
		currentPosition(myTipId,num,settings.isShade,settings.position);
		if(options.callback){
			settings.callback();	
		};
		$("#" + myTipId).find(".closeBtn").unbind("click").bind("click",function(){
			var numIndex = $(this).parents(".tipbox").attr("data-index");
			var myIndeTipDiv = $(this).parents(".tipbox");
			tipsClosed(myIndeTipDiv,numIndex);	
			if(options.closeback){
				settings.closeback();	
			};
		});
		$("#" + myTipId).find(".btnTipsubmit").unbind("click").bind("click",function(){
			var numIndex = $(this).parents(".tipbox").attr("data-index");
			var myIndeTipDiv = $(this).parents(".tipbox");
			if(options.scallback){
				settings.scallback();	
			};
			tipsClosed(myIndeTipDiv,numIndex);	
			
		});
	};	
	var currentPosition = function(divId,num,shade,position,callback,istop) {
		var mypos = position;
		if(mypos == "absolute"){
			var c_left = getPageOffset().x + ($("body").width() - $("#" + divId).width()) / 2;
        	var c_top = getPageOffset().y + (getHeightBody() - $("#" + divId).height()) / 2;
		}else{
			var c_left = ($("body").width() - $("#" + divId).width()) / 2;
        	var c_top = (getHeightBody() - $("#" + divId).height()) / 2;
		};
        
		var len = $(".modalMask").size() *90 + 9999;
		var shodenum = num;
		if(shade){
			addShade(shodenum);	
		};
		if (c_top <= 0 && !istop) {
            c_top = 20;
        }else if(istop){
			c_top = 0;	
		};
        if (c_left <= 0 && !istop) {
            c_left = 20;
        }else if(istop){
			c_left = 0;	
		};
        $("#" + divId).css({
            "left": c_left,
            "top": c_top,
			"position":mypos,
			"z-index":len + 1
        }).show().addClass("loaded");
		if(callback){
			callback();	
		};
    };
	var centerDiv = function(options){
		var settings = {
			divId:'',
			isShade:true,
			w:"96%",
			type:0,
			istop:false,
			position:"absolute",
			callback:function(){},
			zcallback:function(){},
			closeback:function(){}
		};
		if(options){
			$.extend(settings,options);
		};
		var num = $(".modalMask").size();
		$("#" + settings.divId).attr("data-index",num);
		$("#" + settings.divId).css({"width":settings.w});
		currentPosition(settings.divId,num,settings.isShade,settings.position,settings.zcallback,settings.istop);
		$(".closeBtnHtml").unbind("click").bind("click",function(){
			var mynumIndex = $(this).parents(".tipbox").attr("data-index");
			var myIndeTipDiv = $(this).parents(".tipbox");
			centerDivClosed({"indexTipDiv":myIndeTipDiv,"indexNum":mynumIndex,"type":settings.type});
			var num = $("#bigcategorybox").attr("data-index");
			AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#bigcategorybox"),type:1});	
			if(options.closeback){
				settings.closeback();
			}
		});
		if(options.callback){
			settings.callback();	
		};
		
	};
	var tipsClosed = function(indeTipDiv,indexNum,callback){
		var myIndeNum = indexNum;
		var myIndeTipDiv = indeTipDiv;
		myIndeTipDiv.remove();		
		$("#modalMask_" + myIndeNum).remove();
		if(callback){
			callback();	
		};
	};
	var centerDivClosed = function(options){
		var settings = {
			indexNum:'',
			indexTipDiv:'',
			type:0,
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);
		};
		if(settings.type == 1){
			settings.indexTipDiv.remove();	
			$("#modalMask_" + settings.indexNum).remove();	
		}else{
			settings.indexTipDiv.hide();	
			$("#modalMask_" + settings.indexNum).hide();
		};
		
		if(options.callback){
			settings.callback();	
		};
	};
	var addShade = function(num){
		var myIndex = num;
		var len = num *90 + 9998;
		var shadDiv = document.createElement('div');
		shadDiv.id = "modalMask_" + myIndex;
		shadDiv.className = "modalMask";
		$("body").append(shadDiv);
		$("#modalMask_" + myIndex).show().css({"z-index":len});
	};
	var getPageOffset = function() {
        var pageOffset = {};
        if (window.innerWidth) {
            pageOffset.x = window.pageXOffset;
            pageOffset.y = window.pageYOffset;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            pageOffset.x = document.documentElement.scrollLeft;
            pageOffset.y = document.documentElement.scrollTop;
        } else if (document.body.clientWidth) {
            pageOffset.x = document.body.scrollLeft;
            pageOffset.y = document.body.scrollTop;
        };
        return pageOffset;
    };

	return {tips:tips,
			centerDiv:centerDiv,
			tipsClosed:tipsClosed,
			centerDivClosed:centerDivClosed
	};
}();
/** 
 @description 封装验证表单的常用方法
 @Name: checkInputFun's js
 @Date: 2014.07.10
 @Author: king
 
**/
var checkInputFun = {
	validatetype:0,
	myIt:{},
    regulars: {
        "email": [/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/, lang.js_base_email],
        "password": [/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/, lang.js_base_password],
        "mobile": [/^((134[0-8]{1})|(13[0,1,2,3,5,6,7,8,9]\d)|(15[0,1,2,3,5,6,7,8,9]\d)|(18[0|1|2|3|(5-9)]\d)|(14[5,7]\d))\d{7}$/, lang.js_base_mb],
        "code": [/^[A-Za-z0-9]{4}$/, lang.js_base_code],
		"money" : [/^\d+(\.\d{1,2})?$/,lang.js_base_money],
		"num" : [/^(\d+){1,13}$/,''],
		"everyone": [/^(\w+)$/, lang.js_everyone],
		"mailmoblie":[/^(1[34578]\d{9})|(([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2}))$/, lang.js_base_mb]
    },
	inputs:{
		"isempty":{isempty: [0],focusMsg: '',rightMsg: "",errorMsg:'valid'},
		"Email":{type: "email",focusMsg: '',rightMsg: ""},
		"Pwd":{type: 'password',focusMsg: '',rightMsg: ""}, 
		"Pwd1":{type: 'eq',focusMsg: '',rightMsg: "",errorMsg: "",eqto: 'Pwd'},
		"Code":{type: "code",focusMsg: '',rightMsg: ""},
		"Money":{type: "money",focusMsg: '',rightMsg: ""},
		"num":{type: "num",focusMsg: '',rightMsg: ""},
		"Mobile":{type: "mobile",focusMsg: '',rightMsg: ""},
		"mailmoblie":{type: "mailmoblie",focusMsg: '',rightMsg: ""}
	},
    tipStatu: function (type, inp, msg) {
		if(inp.data("tip")){
			if(checkInputFun.validatetype == 0){
				inp.removeClass('right_validate error_validate').addClass(type + "_validate");	
				inp.parents(".validatebox").removeClass('right_validate error_validate').addClass(type + "_validate");
			}else{
				inp.data("tip").removeClass("focus_tip right_tip error_tip ajax_checking_tip").addClass(type + "_tip").html(msg ? msg : "").css({
						"top": -2,
						"right":5
					});
			}
		}
    },
    /*相等匹配*/
    checkEq: function (set, inp, thiz) {
        if (set.type == "eq" && set.eqto) {
            if (inp.val() !== "" && (inp.val() == inp.parents("form").find("[data-validate='" + set.eqto + "']").val())) {
                checkInputFun.tipStatu("right", inp, set.rightMsg);
                return true;
            } else {
                checkInputFun.tipStatu("error", inp, set.errorMsg);
                return false;
            }
        } else { return true; }
    },
	/*是否为空检查*/
	isempty: function (set, inp) {
		var vlen = inp.val().length;
        if (set.isempty) {
            if (vlen > 0) {
                checkInputFun.tipStatu("right", inp, set.rightMsg);
                return true;
            } else {
                checkInputFun.tipStatu("error", inp, set.errorMsg);
                return false;
            }
        } else {
            return true;
        }

    },
    /*length检查*/
    checkLength: function (set, inp) {
        var vlen = inp.val().length;
        if (set.length) {
            var len = set.length;
            if (vlen >= set.length[0] && vlen <= set.length[1]) {
                checkInputFun.tipStatu("right", inp, set.rightMsg);
                return true;
            } else {
                checkInputFun.tipStatu("error", inp, set.errorMsg);
                return false;
            }
        } else { return true; }
    },
    /*between检查*/
    checkBet: function (set, inp) {
        if (set.between) {
            var bet = set.between;
            if (inp.val() >= set.between[0] && inp.val() <= set.between[1]) {
                checkInputFun.tipStatu("right", inp, set.rightMsg);
                return true;
            } else {
                checkInputFun.tipStatu("error", inp, set.errorMsg);
                return false;
            }
        } else { return true; }
    },
    /*正则匹配*/
    checkReg: function (set, inp,callback,mycallback) {
        if (checkInputFun.regulars[set.type]) {
			if(set.type=='mailmoblie'){
				var reg = checkInputFun.regulars['email'];
			}else{
				var reg = checkInputFun.regulars[set.type];
			}
            if (reg[0].test(inp.val())) {
				$(inp).removeClass("err_border");
                checkInputFun.tipStatu("right", inp, set.rightMsg);
                if (mycallback) {
                   mycallback(); 
                }
                return true;
            } else {
				if(set.type=='mailmoblie'){
					var reg = checkInputFun.regulars['mobile'];
					if (reg[0].test(inp.val())) {
						$(inp).removeClass("err_border");
						checkInputFun.tipStatu("right", inp, set.rightMsg);
						if (mycallback) {
						   mycallback(); 
						}
						return true;
					} 
				}
				$(inp).addClass("err_border");
                checkInputFun.tipStatu("error", inp, reg[1]);
                return false;
            }
        } else { return true; }
    },
    /*检查ajax参数验证*/
    ajaxCheck: function (set, inp,callback) {
        if (set.ajaxCheck) {
            var ajaxCheck = set.ajaxCheck,result = false;
			for(var i in ajaxCheck.data){
				ajaxCheck.data[i] = $("#" + i).val();	
			}
            $.ajax({
                url: ajaxCheck.url,
                type: "post",
                dataType: 'json',
				timeout:5000,
				async:false,
                data: ajaxCheck.data,
                success: function (d) {
                    if (d.status == 1) {
						if (callback) {
							callback();
						}
                        checkInputFun.tipStatu("right", inp, d.Msg);
                        result = true;
                    }
                    else if (d.State == 0) {
                        checkInputFun.tipStatu("error", inp, d.Msg);
                        result = false;
                    }else {
                        result = false;
                    }
                },
                error: function () {
                    checkInputFun.tipStatu("error", inp, "Network Error");
                    result = false;
                }
            });
            return result;
        } else {
            return true;
        }
    },
    /*初始化（每个input的）验证环境*/
    initContext: function (inp, it) {
        if (!inp.data("tip") && inp.attr("data-validate") && it[inp.attr("data-validate")]) {
            var tip = $("<p class='input_tip'></p>");
            inp.data("tip", tip).data("set", it[inp.attr("data-validate")]);
            inp.after(tip);
        }
    },
    /*检查输入*/
    mycheckIn: function (inp, form, callback, mycallback) {
        if (inp.data("tip")) {
            var set = inp.data("set");
            return (checkInputFun.checkReg(set, inp, callback, mycallback) && checkInputFun.checkEq(set, inp, form) && checkInputFun.checkBet(set, inp) && checkInputFun.checkLength(set, inp) && checkInputFun.ajaxCheck(set, inp, callback)&& checkInputFun.isempty(set, inp));
        } else {
            return true;
        }
    },
	/*检查输入*/
    smycheckIn: function (inp, form, callback, mycallback) {
        if (inp.data("tip")) {
            var set = inp.data("set");
            return (checkInputFun.checkReg(set, inp, callback, mycallback) && checkInputFun.checkEq(set, inp, form) && checkInputFun.checkBet(set, inp) && checkInputFun.checkLength(set, inp)&& checkInputFun.isempty(set, inp));
        } else {
            return true;
        }
    }
	
};

$.fn.checkInput = function (settings) {
    if (!settings.inputs) {
        settings.inputs = checkInputFun.inputs;
    };
    var dfs = {
		validatetype:0,
        inputs: {},
        regulars: {},
        button: "",
		buttonDiv: "",
        onButtonClick: $.noop,
        beforeSubmit: $.noop,
        submitBtnFn: $.noop,
		mycallback: $.noop,
        checkAll: $.noop
    };
    var sets = $.extend(true, dfs, settings);
	checkInputFun.inputs = $.extend(true, checkInputFun.inputs, sets.inputs);
    var it = checkInputFun.inputs;
	checkInputFun.validatetype = sets.validatetype;
	checkInputFun.myIt = it ;
    checkInputFun.regulars = $.extend(true, checkInputFun.regulars, sets.regulars);
    var thiz = $(this);
    /*失焦提示*/
    this.delegate("input,textarea,select", "blur", function () {
		var isCallback = $(this).attr('data-callback');
		var myismust = $(this).attr('data-ismust');
		var myVal = $(this).val();
		if(!myismust || myVal!=''){
		    if (isCallback == 1) {
				checkInputFun.mycheckIn($(this), thiz,'',sets.mycallback);	
			}else{
				checkInputFun.mycheckIn($(this), thiz);
			}	
		}else{
			$(this).data("tip").hide();	
		}
        checkInputFun.inputs;
    });

    /*聚焦提示*/
    this.delegate("input,textarea,select", "focus", function () {
        checkInputFun.initContext($(this), it);
		$(this).siblings(".input_tip").show();
        var set = $(this).data("set");
		if ($(this).data("tip") && set.focusMsg) {
			checkInputFun.tipStatu("focus", $(this), set.focusMsg);
		}
        
    });

    /*提交表单*/
    this.submit(function (e) {
        var result = true;
        var form = $(e.target);
        $.each(form.find("input,textarea,select"), function (i, n) {
			var myismust = $(this).attr('data-ismust');
			var myVal = $(this).val();
			if(!myismust || myVal!=''){
				checkInputFun.initContext($(n), it);
				$(n).siblings(".input_tip").show();
            	result = (checkInputFun.smycheckIn($(n), thiz) && result);	
			}
            
        });
        if (result) {
			e.preventDefault();
            sets.submitBtnFn(thiz);
			return false;
        } else {
			e.preventDefault();
            sets.beforeSubmit(e, result, form);
            return false;
        }
    });
    /*如果指定了一个响应事件的元素，则在该元素被点击时执行此方法*/
    if (sets.button) {
        this.find(sets.button).unbind("click").bind("click", function (e) {
			var $mythis = $(this);
            var result = true;
			var form = $(e.target);
			$.each(thiz.find("input,textarea,select"), function (i, n) {
				var myismust = $(this).attr('data-ismust');
				var myVal = $(this).val();
				if(!myismust || myVal!=''){
					checkInputFun.initContext($(n), it);
					$(n).siblings(".input_tip").show();
					result = (checkInputFun.smycheckIn($(n), thiz) && result);	
				};
				
			});
			if (result) {
				e.preventDefault();

				sets.submitBtnFn(thiz,$mythis);
				return false;
			} else {
				e.preventDefault();
				sets.beforeSubmit(e, result, form);
				return false;
			};        });
    };
	/*如果指定了一个不是From的响应事件的元素则在该元素被点击时执行此方法*/
    if (sets.buttonDiv) {
        $("body").delegate(sets.buttonDiv, "click", function (e) {
            var result = true;
			var form = $(e.target);
			$.each(thiz.find("input,textarea,select"), function (i, n) {
				var myismust = $(this).attr('data-ismust');
				var myVal = $(this).val();
				if(!myismust || myVal!=''){
					checkInputFun.initContext($(n), it);
					$(n).siblings(".input_tip").show();
					result = (checkInputFun.smycheckIn($(n), thiz) && result);	
				};
				
			});
			if (result) {
				e.preventDefault();
				sets.submitBtnFn(thiz);
				return false;
			} else {
				e.preventDefault();
				sets.beforeSubmit(e, result, form);
				return false;
			};
        });
    };

    return this;
};

/** 
 @description 下拉框的常用方法
 @Name: AlertUtils's js
 @Date: 2014.07.10
 @Author: king
**/
$.fn.selectUtils = function(options){
    var settings = {
        id: '',
		deNum:0,
		isDef:false,
        callback: null
    };
	if (options) {
       $.extend(settings, options);
    }
	var tag_select = this;
	var div_show = tag_select.find('.select_option');
	var ul_option = div_show.find('ul');
	var select_showbox = tag_select.find('.select_showbox');
	var select_analog = tag_select.find('.select_analog');
	var li_option = ul_option.find('li');
	var thisW = tag_select.width();
	div_show.css({"width":thisW-20});
	
	
	if(settings.isDef == true){
		var li_def = ul_option.find("li:eq("+settings.deNum+")");
		var val_def = li_def.text();
		var index_def=li_def.attr('data-value')?li_def.attr('data-value'):li_def.val();
		li_def.addClass("active");
		select_showbox.find('span').text(val_def).addClass("active");
		select_showbox.find('span').siblings('em').addClass("active");
		tag_select.find('.select_showbox .select_analog').val(index_def);
	};
	
	var toggleFun = function(){
		select_showbox.toggle(function(){
			$(this).css({"z-index":99});
			div_show.show().css({"z-index":99});
		},function(){
			$(this).css({"z-index":0});
			div_show.hide().css({"z-index":0});
		});		
	};
	toggleFun();
	$(document).bind('click',function(e){
	  var target = $(e.target);
	  if(target.closest(tag_select).length == 0){
		div_show.hide();
		toggleFun();
	  };
	});
	li_option.on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var value=$(this).text();
		var value_val=$(this).attr('data-value')?$(this).attr('data-value'):$(this).val();
		select_showbox.attr('data-value',value_val);
		select_showbox.find('span').text(value).addClass("active");
		select_showbox.find('span').siblings('em').addClass("active");
		tag_select.find('.select_showbox .select_analog').val(value_val);
		div_show.hide();
		toggleFun();
		if(settings.callback){
			settings.callback(value,value_val);	
		};
	});
	li_option.hover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	},function(){
		$(this).removeClass('hover');
	});	
};
/** 
 @description 封装一些onClick selected切换调用的常用方法
 @Name: onClickselected's js
 @Date: 2014.07.09
 @Author: king
**/
(function(){
	$.fn.onClickselected = function(options){
		var $this = $(this).find(".onClickselected");
		var settings = {
			method:"click",
			callback:function(){}	
		};
		if(options){
			$.extend(settings,options);
		};
		$this.bind(settings.method,function(){
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
			if(options.callback){
				settings.callback();	
			}	
		});
	};
})();
/** 
 @description 封装一些定时显示调用的常用方法
 @Name: timeShow's js
 @Date: 2014.07.09
 @Author: king
**/
(function(){
	$.fn.timeShow = function(options){
		var $this = this;
		var $thisShow = $this.find(".item-tag");
		var settings = {
			loadTime:3000,
			waitTime:5000,
			callback:function(){}	
		};
		var startTime = null;
		var flag = false;
		var stopflag = false;
		if(options){
			$.extend(settings,options);
		};
		var startInit = function(){
			stopTime();	
			startShow();
			//$(this).toggle();
			$this.toggle(function(){
				$thisShow.addClass("loaded");
				stopflag = true;
			},function(){
				$thisShow.removeClass("loaded");
				stopflag = false;
			});
		};
		var startShow = function(){
			if(!stopflag){
				if(flag == false){
					flag = true;
					$thisShow.addClass("loaded");
				}else{
					$thisShow.removeClass("loaded");	
					flag = false;
				}
			};
			startTime = setTimeout(startShow,settings.loadTime);    // 运动循
		};
		var stopTime = function(){
			clearInterval(startTime);
		};
		startInit(); 
	};
})();
/** 
 @description 封装一些倒计时调用的常用方法
 @Name: countdownUtils's js
 @Date: 2014.07.09
 @Author: king
 
**/
$.fn.countdownUtils = function(options){
	var container = this;
	var settings = {
		timers:60,
		callback:function(){},
		beforecall:function(){},
		type:0	
	};
	var timerHtml = '<span class="day_show">00 天 </span><span class="hour_show">00 时 </span><span class="minute_show">00 分 </span><span class="second_show">00 秒 </span>';
	if(options){
		$.extend(settings,options);	
	};
	var intDiff = parseInt(settings.timers);
	var fday=0,
		fhour=0,
		fminute=0,
		fsecond=0;//时间默认值
	$(container).html(timerHtml);
	if(options.beforecall){
		settings.beforecall();
	}
	switch(settings.type){
		case 1:
			container.find('.second_show').hide();
			break;
		case 2:
			container.find('.second_show').hide();
			container.find('.minute_show').hide();	
			break;
		case 3:
			container.find('.second_show').hide();
			container.find('.minute_show').hide();
			container.find('.hour_show').hide();
			break;
		case 4:
			container.find('.day_show').hide();
			container.find('.minute_show').hide();
			container.find('.hour_show').hide();
		default:
			break;
	}
	function timerInt(){
		var day=0,
		hour=0,
		minute=0,
		second=0;//时间默认值	
		if(intDiff > 0){
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		}else{
			window.clearInterval(int);
			if(options.callback){
				settings.callback(container);
			}
				
		};
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		container.find('.day_show').html(day+" 天 ");
		container.find('.hour_show').html(hour+' 时 ');
		container.find('.minute_show').html(minute+' 分 ');
		container.find('.second_show').html(second+' 秒 ');
		intDiff--;
	};
	var int=window.setInterval(timerInt,1000);
};
/** 
 @description 封装一些固定顶部fixedTop调用的常用方法
 @Name: fixedTop's js
 @Date: 2014.07.09
 @Author: king
**/
(function(){
	$.fn.fixedTop = function(options){
		var $this = this;
		var settings = {
			showDiv:"",
			topHeight:55,
			maxHeight:999999,
			scallback:function(){},
			ecallback:function(){}
		};
		if(options){
			$.extend(settings,options);
		};
		
		if(options.showDiv){
			var $thisDiv = settings.showDiv;
			settings.maxHeight = $thisDiv.height();
		}
		var fixedTop = function(){
			var nvnexttop = document.body.scrollTop-100 || document.documentElement.scrollTop-100;
			var dofixed = nvnexttop >= settings.topHeight && nvnexttop <= settings.maxHeight && document.documentElement.clientHeight >= 500;
			if(dofixed){
				//$("#" + settings.showDiv).show();
				//$this.addClass("shadow");
				if(options.scallback){
					settings.scallback($this);	
				}
			}else{
				if(options.ecallback){
					settings.ecallback($this);	
				}
				//$("#" + settings.showDiv).hide();
				//$this.removeClass("shadow");	
			};
		};
		var attachEvent = function(obj, evt, func, eventobj) {
			eventobj = !eventobj ? obj : eventobj;
			if(obj.addEventListener) {
				obj.addEventListener(evt, func, false);
			} else if(eventobj.attachEvent) {
				obj.attachEvent('on' + evt, func);
			}
		};
		attachEvent(window, 'scroll', fixedTop);
	};
})();
/** 
 @description 封装一些onClick selected切换调用的常用方法
 @Name: hoverAndClickShow's js
 @Date: 2014.07.09
 @Author: king
**/
(function(){
	$.fn.hoverAndClickShow = function(options){
		var $this = this;
		var settings = {
			method:"hover",
			autoClose:true,
			callback:function(){},
			bcallback:function(){}	
		};
		if(options){
			$.extend(settings,options);
		};
		if(settings.method =="hover"){
			$this.hover(function(){
				$(this).find(".hide").addClass("show");
				$(this).find(".addover").addClass("hover");
				$(this).css({"z-index":99}).addClass("loadedShow");
				$(this).find(".hideclose").unbind("click").bind("click",function(){
					$(this).parents($this).removeClass("show");	
				});
				if(options.callback){
					settings.callback($(this));	
				}	
			},function(){
				$(this).find(".hide").removeClass("show");
				$(this).find(".addover").removeClass("hover");
				$(this).css({"z-index":0}).removeClass("loadedShow");
			});
		};
		if(settings.method =="click"){
			var $thisClick = $this.find(".cilckItem");
			$thisClick.unbind("click").bind("click",function(){
				var $cthis = $(this);
				event.stopPropagation();
				var $thisSibling = $(this).siblings(".hide");
				if($thisSibling.is(":hidden")){
					$thisSibling.addClass("show");
					$thisSibling.parents($this).css({"z-index":99}).addClass("loadedShow");
					$(this).find(".ico-add").addClass("ico-del");
					if(options.callback){
						settings.bcallback($cthis);	
					}
				}else{
					$thisSibling.removeClass("show");
					$thisSibling.parents($this).css({"z-index":0}).removeClass("loadedShow");	
					$(this).find(".ico-add").removeClass("ico-del");
				}
				if(settings.autoClose){
					$thisSibling.find(".hideclose").unbind("click").bind("click",function(){
						$(this).parents($thisSibling).removeClass("show");	
						$(this).parents($thisSibling).parents($this).removeClass("loadedShow");
					});
					$(document).bind('click',function(e){
						  var target = $(e.target);
						  if(target.closest($thisSibling).length == 0){
							$thisSibling.removeClass("show");	
							$thisSibling.parents($this).css({"z-index":0}).removeClass("loadedShow");
						  };
						  
					});
				};
				
				if(options.callback){
					settings.callback($this);	
				};
					
			});	
		};
	};
})();

/** 
 @description 封装一些plus切换调用的常用方法
 @Name: plus's js
 @Date: 2014.07.09
 @Author: king
**/
(function(){
	$.fn.plus = function(options){
		var $this = this;
		var settings = {
			defaultNum 	: 0,
			gradation 	: 1,
			isInt		: true,
			decimal 	: 2,
			minNum  	: 1,
			maxNum		: 1000000000000,
			callback:function(){return false;}
		};
		if (options) {
		   $.extend(settings, options);
		}
		var $plus = $this.find(".plus");
		var $minus = $this.find(".minus");
		var $number = $this.find(".number");
		var tempNum =settings.defaultNum;
		init();
		function init(){
			settings.decimal=settings.isInt?0:settings.decimal;
			//$number.val(settings.defaultNum.toFixed(settings.decimal));
		};
		
		$plus.unbind("click").bind("click",function(){
			var $thisNumber = $(this).siblings(".number").find("input");
			var ynum=num = Number($thisNumber.val());
			num=num+settings.gradation;
			num=checkBoundary(settings.maxNum,settings.minNum,num).toFixed(settings.decimal);
			$thisNumber.val(num);
			if(options.callback){
				settings.callback(num,$(this),ynum);
			}
		});
		
		$minus.unbind("click").bind("click",function(){
			var $thisNumber = $(this).siblings(".number").find("input");
			var ynum=num = Number($thisNumber.val());
			num = num-settings.gradation;
			num = checkBoundary(settings.maxNum,settings.minNum,num).toFixed(settings.decimal);
			$thisNumber.val(num);
			if(options.callback){
				settings.callback(num,$(this),ynum);
			}
		});
		
		$number.unbind("click").bind("keyup",function(){
			var num=$(this).val();
			if(num==""){
				tempNum=settings.defaultNum;
				return false;
			}else if(!checkNum(num,settings.isInt)||!checkMax(settings.maxNum,parseInt(num))){
				$(this).val(tempNum);
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">The number you entered exceeds the maximum value or not in the correct format</div>'
				});
				return false;
			};
			tempNum=Number(num).toFixed(settings.decimal);
			if(options.callback){
				settings.callback(num,$(this));
			}
		});
		$number.change(function(){
			var num=$(this).val();
			if(num==""){
				tempNum=settings.defaultNum;
				return false;
			}else if(!checkNum(num,settings.isInt)||!checkMax(settings.maxNum,parseInt(num))){
				$(this).val(tempNum);
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">The number you entered exceeds the maximum value or not in the correct format</div>'
				});
				return false;
			};
			tempNum=Number(num).toFixed(settings.decimal);
			if(options.callback){
				settings.callback(num,$(this));
			}
		});
		$number.on("blur",function(){
			if($(this).val()==""){
				$(this).val(settings.defaultNum);
				return false;
			};
			$(this).val(Number($(this).val()).toFixed(settings.decimal));
		});
		function checkBoundary(maxNum,minNum,value){
			value=value > maxNum ? maxNum : value;
			value=value < minNum ? minNum : value;
			return value;
		};
		function checkNum (value,isInt){
			if(isInt){
				var reg=/^-?[1-9]\d*$/;
				return reg.test(value);	
			}else{
				return !isNaN(value);
			}
		};
		function checkMax(maxNum,value){
			return maxNum > value;
		};
	};
})();
/** 
 @description 封装一些tab切换调用的常用方法
 @Name: tabSliderUtils's js
 @Date: 2014.07.09
 @Author: king
**/
$.fn.tabSliderUtils = function(options){
	var container = this.selector;
    //默认参数
    var settings = {
        method: 'click',
		type:1,
        callback: function(){return false},
		bcallback: function(){return false}
    };
	var n = 0;
	if (options) {
       $.extend(settings, options);
    }
	$(container + "> .tab li").unbind(settings.method).bind(settings.method, function(event) {
		$(this).addClass("current").siblings().removeClass("current"); 
		var index = $(container + " .tab li").index(this); 
		var dataurl = $(this).attr('data-url');
		var listurl =  $(this).attr('list-url');
		var dataNane = $(this).attr("data-name");
		var dataTemplate = $(this).attr('data-template');
		$(container + " > .content-main > .content").eq(index).show().siblings(".content").hide(); 
		var contDiv = $(container + " > .content-main > .content").eq(index);
		contDiv.attr("id",$(this).attr('id') + '_cont');
		var getDataLiNum = contDiv.find(".loading").size();
		n = index;
		if(dataurl && options.callback){
			settings.callback(dataurl,contDiv,dataTemplate);
		}
		if(options.bcallback){
			settings.bcallback(listurl,dataNane,contDiv);
		}
	});
};
/** 
 @description 封装滚动到指定位置的常用方法
 @Name: scrollPosition's js
 @Date: 2014.11.12
 @Author: king
**/
$.fn.scrollPosition=function(options){
	var $this = this;
	var settings = {
		time:1000,			//运动指数
		method:'click',
		callback:function(){}
	};
	if(options){
		$.extend(settings,options);	
	};
	$this.bind(settings.method,function(){
		var indexPosition = $("#" + $(this).attr("data-op"));
		$(this).siblings().removeClass("selected");
		$(this).addClass("selected");
		$("html,body").animate({scrollTop:indexPosition.offset().top - 100},settings.time);
	});
};
/** 
 @description 封装回到顶部的常用方法
 @Name: scrollPosition's js
 @Date: 2014.11.12
 @Author: king
**/
/*回到顶部*/
$.fn.goTopExUtils = function(){
	var $this = this;
	$this.bind("click",function(){
		$("html,body").animate({scrollTop:0},100);
		$this.hide();
	});
	var getScrollTop = function(){
		return (document.body.scrollTop+document.documentElement.scrollTop);
	};
	var setScrollTop = function(value){
		if(navigator.appName=="Netscape" && navigator.userAgent.toUpperCase().indexOf("CHROME")>0){
			document.body.scrollTop=value;
		}else{
			document.documentElement.scrollTop=value;
		}
	};    
	window.onscroll=function(){getScrollTop()>0?$this.fadeIn():$this.fadeOut();};
};
/** 
 @description 封装开关按钮的常用方法
 @Name: toggleUtils's js
 @Date: 2014.11.12
 @Author: king
**/
$.fn.toggleUtils = function(options){
	var $this = this;
	var settings = {
		isOpen:false,
		callback:function(){}	
	};
	if(options){
		$.extend(settings,options);	
	};
	if(settings.isOpen){
		$this.addClass("on");
		$this.children(".ui-Checkbox").val("1");
	}
	$this.unbind("click").bind("click",function(){
		var flag = $(this).hasClass("on");
		if(!flag){
			$(this).addClass("on");
			$(this).children(".ui-Checkbox").val("1");
			if(options.callback){
				settings.callback(flag);	
			}
		}else{
			$(this).removeClass("on");
			$(this).children(".ui-Checkbox").val("3");
			if(options.callback){
				settings.callback(flag);	
			}
		}
	});
};
/** 
 @description 封装公共弹层的常用方法
 @Name: positionUtils's js
 @Date: 2014.11.12
 @Author: king
**/
$.fn.positionUtils = function(options){
	var $this = this;
	var settings = {
		callback:function(){}	
	};
	if(options){
		$.extend(settings,options);	
	}
	$this.unbind("click").bind("click",function(event){
		var $indexDiv = $(this).siblings('.positionShow');
		var indexDivId = $(this).siblings('.positionShow').attr("id");
		event.stopPropagation();
		$('.positionShow:not(.'+indexDivId+')').hide();
		$indexDiv.toggle();
		
		$(document).bind('click',function(e){
			  var target = $(e.target);
			  if(target.closest("#" + indexDivId).length == 0){
				$('#' + indexDivId).hide();
			  };
			  
		});	
		if(options.callback && !$indexDiv.is(":hidden")){
			settings.callback();	
		}
	});
};
//表单序列化数据
(function($){  
	$.fn.serializeJson=function(){  
		var serializeObj={};  
		var array=this.serializeArray(); 
		var str=this.serialize(); 
		$(array).each(function(){  
			if(serializeObj[this.name]){  
				if($.isArray(serializeObj[this.name])){  
					serializeObj[this.name].push(this.value);  
				}else{ 
					serializeObj[this.name]=[serializeObj[this.name],this.value];  
				}  
			}else{
				if($("input[name="+this.name+"]").attr("isarray") == "true"){
					serializeObj[this.name]=new Array();	
					serializeObj[this.name].push(this.value);
				}else {
					serializeObj[this.name]=this.value;  
				}
				 
			}  
		});  
		return serializeObj;  
	};  
})(jQuery); 
//瀑布流初始化绑定
var MasonryUtils = function(){
	var masonryInit = function(options){
		var settings = {
			masonry:'masonry',
			navSelector:'.pager',
			nextSelector:'.pager .pager-next a',
			itemSelector:'.rowitem',
			resize:true,//是否窗口大小改变
			islazy:true,//是否懒加载
			ispage:true,//是否有分页
			threshold:150,//滚动条在离目标位置还有1000的高度时就开始加载图片
			failurelimit:10,
			issearch:false,//是否为搜索特殊需求
			pathParse:'',//默认分页地址
			w:8,
			h:7,
			callback:null
		};
		/**/
		if(options){
			$.extend(settings,options);	
		}
		var $container = $('#' + settings.masonry),sTimer;
		var $itemSelector =$container.find(".rowitem");
		var itemlen = $itemSelector.length;
		//分享，点赞按钮初始化入口	
		shareAndLike();
		if(itemlen <= 0){
			return false;	
		}
		
		var w = $container.find(".item").width();
		var desturl = $container.find(".item").attr("data-page");
		if(settings.islazy == 1){
			lazyaAndmasonry(1);		
		}else if(settings.islazy ==2){
			lazyaAndmasonry(2);		
		}else{
			lazyaAndmasonry(0);		
		}
		//懒加载及瀑布流加载函数
		function lazyaAndmasonry(fa){
			if(fa == 1){
				$container.find("img.lazy").lazyload({	
					threshold : settings.threshold,	
					failurelimit:settings.failurelimit,
					load:function(){
						var col = Math.floor($container.width()/w);
						$container.BlocksIt({
							blockElement:'.item',
							numOfCol:col,
							offsetX: settings.w,
							offsetY: settings.h
						});
					}
				});
			}else if(fa == 2){
				$container.find("img.lazy").lazyload({	
					threshold : settings.threshold,
					failurelimit:settings.failurelimit
				});	
			}else{
				var col = Math.floor($container.width()/w);
				$container.BlocksIt({
					blockElement:'.item',
					numOfCol:col,
					offsetX: settings.w,
					offsetY: settings.h
				});	
				$container.find("img.lazy").lazyload({	
					threshold : settings.threshold,
					failurelimit:settings.failurelimit
				});
			}
		};
		if(settings.ispage){
			var searchflag = false;
			if(settings.issearch){
				searchflag = true;	
			}
			$container.infinitescroll({
					navSelector: settings.navSelector,    // 在分页导航器
					nextSelector: settings.nextSelector,  // 下一个链接的选择器（2页） 
					itemSelector: settings.itemSelector,     // 您将检索的所有项目的选择器
					donetext: '<p style="padding-top:15px">No more pages to load.</p>',
					loadingImg: static_url + '/images/loading.gif',
					//debug:true,
					bufferPx     : 40,//提示语展现的时长，数字越大，展现时间越短
					pixelsFromNavToBottom:1200,//滚动条到底部距离触发下一页
					searchflag:searchflag,
					pathParse:settings.pathParse,
					errorCallback: function () {//当出错的时候，比如404页面的时候执行的函数
						// fade out the error message after 2 seconds
						jQuery('#infscr-loading').animate({opacity: .8}, 2000).fadeOut('normal');
					}
				},
				function(){
					if(options.callback){
						settings.callback();	
					}
					//显示隐藏购买按钮
					showhideDiv();
					//编辑按钮初始化入口
					editBtn();
					//分享，点赞按钮初始化入口	
					shareAndLike();	
					//头像图片懒加载
					$("img.avatar_lazy").checkImgExists(function(obj,imgurl){
						var $myopj = obj;
						var myimgurl = imgurl;
						var $thisp = $myopj.parent(".useravatar_bg");
						$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
					});
					if(settings.islazy != 2){
						var col = Math.floor($container.width()/w);
						$container.BlocksIt({
							blockElement:'.item',
							numOfCol:col,
							offsetX: settings.w,
							offsetY: settings.h
						});
					}	
					$container.find("img.lazy").lazyload({threshold : settings.threshold});
				}
			);
		}
		if(settings.resize && settings.islazy != 2){	
			$(window).resize(function() {
				var col = Math.floor($container.width()/w);
				$container.BlocksIt({
					numOfCol: col,
					offsetX: settings.w,
					offsetY: settings.h
				});
			});
		}
		//显示隐藏标签，购买按钮
		function showhideDiv(){
			$(".rowitemTag").each(function(index, element) {
                $(this).setTagPos();
            });

			$(".rowitemTag").find("img").unbind("click").bind("click",function(){
				var $thisShow = $(this).siblings(".item-tag");
				var $thisShowpro = $(this).parent(".rowitemTag").siblings(".dz_btn");
				$thisShow.toggleClass("loaded");
				$thisShowpro.toggleClass("loaded");
			});	
			
		}
		//获取浏览器的大小
		function getWinWidth(){
			var winWidth = $(window).width();
			var col;
			if(winWidth < 492) {
				col = 1;
			} else if(winWidth < 492) {
				col = 2;
			}
			return col;
		};
		if(options.callback){
			settings.callback();	
		}
		//显示隐藏购买按钮
		showhideDiv();
		//编辑按钮初始化入口
		editBtn();
		//改变图片底色初始化入口	
		//changePicBgColor();
		
	};
	//编辑按钮绑定
	var editBtn = function(){
		$(".btn-edit").unbind("click").bind("click",function(){
			var $thisParent = $(this).parents(".rowitem");
			var shid = $(this).attr("data-shid");
			var boradid = $(this).attr("data-boradid");
			ShareUtils.editShareInit({shid:shid,thisParent:$thisParent,boradid:boradid});	
		});	
	};
	//公共分享，点赞方法
	var shareAndLike = function(){
		BaseInitClass.followBtn();//绑定功能按钮
		commentBtnBind();//评论按钮绑定
	
		$(".btn-send").unbind("click").bind( "click", function () {
			var shid = $(this).parents(".byshid").attr("data-shid");
			var boradid = $(this).attr("data-typeid");
			AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=sendMessage',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({"divId":"SendFrinedTipbox","type":1,w:"96%","callback":function(){
						clickUserSelect();
						var flag = 1;
						$('.sendInput').bind('input', function(){
							var $thisIput = $(this);
							var val = $thisIput.val();
							//获取数据
							if(val && flag){
								flag = 0;
								AjaxFunUtils.ajaxInit({
									url:"/search/search_user_byname.html",	
									params:{name:val},
									callback:function(res){
										flag = 1;
										if(res.status){
											var resUser = res.data;
											var htmlUser = '';
											$.each(resUser,function(index,o){
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
												htmlUser +=lihtml;
											});
											$("#sendList").html(htmlUser);
											$("#sendList").find(".avatar_loading").each(function(index, element) {
                                                $(this).checkImgExists();
                                            });;
											clickUserSelect();
										}	
									}
								})
							}
						});
						//点击人名选择
						function clickUserSelect(){
							var messageText='';
							$("#sendList").find(".userFlag").on('click',function(){
								messageText = $("#message").val();
								var uid = $(this).attr("data-uid");
								var mynumIndex = $("#SendFrinedTipbox").attr("data-index");
								AlertUtils.centerDivClosed({
									"indexTipDiv":$("#SendFrinedTipbox"),
									"indexNum":mynumIndex,
									"type":1
								});
								MsgMod.msgInit({shid:shid,boradid:boradid,uid:uid,message:messageText});
							});		
						};
					}});
				}
			});
		});	
		//转发，分享
		$(".btn-repeat").unbind("click").bind("click", function () {
			var shid = $(this).parents(".byshid").attr("data-shid");
			var ishid = $(this).parents(".byshid").attr("data-ishid");
			
			var bigimgurl = $(this).attr("data-bigimgurl");
			var title = $(this).attr("data-title");
			var url = $(this).attr("data-url");
			AjaxFunUtils.ajaxInit({
				url: '/common/gettpl.html?name=sns_repeat&ch=sns',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({
						divId:"sns_repeat",
						type:1,
						callback:function(){
							//百度分享初始化
							var thishost = "http://" + window.location.host;
							baiduShare({
								bdPic:bigimgurl,
								bdText:title,
								url:thishost + "/share/sharepage.html?shid=" + shid + "&ukey="+ukey+"",
								title:title,
								desc:title,
								summary:title
							});
							znshare({
								shid:shid,
								ishid:ishid,
								callback:function(){
									var mynumIndex = $("#sns_repeat").attr("data-index");
									AlertUtils.centerDivClosed({indexNum:mynumIndex,
										indexTipDiv:$("#sns_repeat"),type:1
									});
								}
							});
						}
					})
				}
			});	
		});
		//更多功能
		$(".btn-more").unbind("click").bind("click", function () {
			var username = $(this).attr("data-username");
			var uid = $(this).attr("data-fsuid");
			var shid = $(this).parents(".byshid").attr("data-shid");
			var imgurl = $(this).parents(".rowitem-b").siblings(".rowitem-c").find("img").attr("src");
			AjaxFunUtils.ajaxInit({
				url: '/common/gettpl.html?name=sns_more&ch=sns',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					AlertUtils.centerDiv({
						divId:"sns_more",
						type:1,
						callback:function(){
							$("#viewshare").attr("href",'/share/sharepage.html?shid='+shid);
							$(".reportBtn").attr("data-shid",shid);
							//投诉
							snsReport();
							//私聊TA
							chatBtn({username:username,uid:uid});
						}
					})
				}
			});	
		});
		//点赞按钮
		$(".btn-praise").unbind("click").bind("click", function () {
			var islike = $(this).attr("data-like");
			var shid = $(this).parents(".byshid").attr("data-shid");
			var $this = $(this);
			var $rowitem_zhan = $(this).parents(".byshid").find(".rowitem-zhan");
			var $zhannum = $(this).parents(".byshid").find(".zhannum");
			var zhannum = Number($zhannum.attr("data-zhannum"));
			var $avatar_list = $(this).parents(".byshid").find(".avatar-list");
			AjaxFunUtils.ajaxInit({url:"/share/like.html", 
				yzlogin:true,
				params:{shid:shid,likevalue:islike}, 
				callback:function (result) {
					if(result.status){
						if(islike==1){
							$this.removeClass("current");
							$this.attr("data-like","0");
							$this.find(".btn-praise-text").text(lang.js_shareView_like);
							if(zhannum <= 0){
								zhannum = 0;	
							}else{
								zhannum = zhannum - 1;
							}
							$zhannum.text(zhannum).attr("data-zhannum",zhannum);
						}else{
							$this.addClass("current");
							$this.attr("data-like","1");
							$this.find(".btn-praise-text").text(lang.js_shareView_unlike);
							zhannum = zhannum + 1;
							$zhannum.text(zhannum).attr("data-zhannum",zhannum);
							
						}
						getlikelist(zhannum);
					}
				},
				errCallback:function(){
					$this.removeClass("btn-loading");	
				}
			});
			function getlikelist(ozhannum){
				AjaxFunUtils.ajaxInit({url: '/share/sharelikes.html?shid=' + shid,
					type: "GET",
					yzlogin:true,
					dataType: 'html',
					params: '',
					callback: function(data){
						$avatar_list.html(data);
						if(ozhannum > 0){
							$rowitem_zhan.show();
							//头像图片懒加载
							$avatar_list.find("img.avatar_lazy").checkImgExists(function(obj,imgurl){
								var $myopj = obj;
								var myimgurl = imgurl;
								var $thisp = $myopj.parent(".useravatar_bg");
								$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
							});
						}else{
							$rowitem_zhan.hide();	
						}
					}
				});
			};
		});	
	};
	return {masonryInit:masonryInit,shareAndLike:shareAndLike,editBtn:editBtn};
}();


//@description input 输入搜索
$.fn.inputSearch = function(options){
	var $this = this;
	var settings = {
		url:'',
		callback:function(){},
		bcallback:function(){}
	};
	if(options){
		$.extend(settings,options);	
	};
	var flag = 1;
	$this.unbind('input').bind('input', function(){
		var $thisIput = $(this);
		var val = $.trim($thisIput.val());
		var $tosuid = $thisIput.siblings('.tosuid');
		$tosuid.val('');
		
		//$thisIput.siblings(".userCircleSelect").remove();
		//获取数据
		//flag = 0;
		var flagNull = isNull(val);
		if(flagNull){
			$thisIput.siblings(".userCircleSelect").hide();	
			return false;
		}
		ajaxSearch();
		function ajaxSearch(){
			AjaxFunUtils.ajaxInit({
				url:settings.url,	
				params:{name:val},
				callback:function(res){
					//flag = 1;
					if(res.status){
						var resUserData = res.data;
						var num = $thisIput.siblings(".userCircleSelect").size();
						if(num <= 0){
							var $creatDiv = $('<div class="userCircleSelect ui-Typeahead sendfried"></div>');
							$thisIput.after($creatDiv);
						}
						var boxhtml='';
						$.each(resUserData,function(index,o){
							if(options.callback){
								boxhtml +=settings.callback(index,o);		
							};
						});
						var $creatUl = $('<ul class="userList results">'+boxhtml+'</ul>');
						$creatUl.html(boxhtml);
						$thisIput.siblings(".userCircleSelect").html($creatUl).show();
						if(options.bcallback){
							settings.bcallback($thisIput,$creatDiv,$creatUl,$tosuid);	
						}
					}else{
						var $creatUl = $('<ul class="userList results"><li class="userFlag"><h4 class="title">'+val+'</h4></li></ul>');
						$thisIput.siblings(".userCircleSelect").html($creatUl);	
						if(options.bcallback){
							settings.bcallback($thisIput,$creatDiv,$creatUl,$tosuid);	
						}
					}
				}
			});	
		}
	}); 
};

//@description 图片描点的常用方法
$.fn.addTagUtils = function(options){
	var $thisImg = this;
	var $thisShade = $("#addTagFromBox");
	var settings = {
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
				share:settings.share
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
//删除，鼠标经过，拖拽描点功能绑定
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
		boradid:''
	};
	if(options){
		$.extend(settings,options);
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
			var flag = isNull($myindexDivBox.find("input").val());
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
			ShareUtils.isNextFun({boradid:settings.boradid,share:settings.share,shid:settings.shid,ishid:settings.ishid});	
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
						checkInputFun.initContext(select_analog, checkInputFun.myIt);
						select_analog.siblings("p").show();
						checkInputFun.mycheckIn(select_analog);	
					}});
				}	
			});
		};
	};
	
	//拖拽功能绑定
	var dargTag = function($omyindexDivBox){
		var $cilckItem = $omyindexDivBox.find(".cilckItem");
		var $thisparents = $cilckItem.parents(".showPicImg");
		$cilckItem.draggable({
			containment:$thisparents,
			start:function(){
			},
			stop: function(event, ui) {
				var $thisui = $(ui.helper.context);
				var $thisuiParent = $(ui).parent("item-tag");
				var $showPicImg = $thisui.parents(".showPicImg");
				console.log($(ui));
				console.log($thisuiParent);
				var Left = $thisuiParent.position.left;
				var Top = $thisuiParent.position.top;
				console.log("Left:"+Left);
				console.log("Top:"+Top);
				var l = Left/settings.proportion;
				var t = Top/settings.proportion;
				$thisuiParent.find(".Coordinate").val(l + '|' + t);
				$thisuiParent.attr("data-left",l);
				$thisuiParent.attr("data-top",t);
				var img_w = $showPicImg.width();
				var p_w = $thisuiParent.width();
				var this_w = $thisuiParent.find(".item-tag-box").width();
				var zW = p_w + this_w + Left;
				var tag_form_w = $thisuiParent.find(".item-tag-form").width()+10;
				var flag_w = zW - img_w;
				console.log(flag_w);
				if(zW > img_w){
					$thisuiParent.find(".item-tag-form").css({"right":24,"left":"auto"});
					$thisuiParent.find(".item-tag-form").find(".tip").addClass("tagRight");
				}else{
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
		ShareUtils.isNextFun({boradid:'',share:settings.share,shid:settings.shid,ishid:settings.ishid});
	});	
	//鼠标经过描点效果
	var mdHover = function(){
		$(".cilckItem").unbind("click").bind("click",function(){
			var tagType = $(this).attr("data-type");
			var $thissib = $(this).siblings(".item-tag-box");
			var $thisp = $(this).parents(".item-hover");
			AlertUtils.tips({
				w:"80%",
				htmlmsg:'<div style="padding:30px">'+lang.js_base_deltag+'</div>',
				scallback:function(){
					$thisp.remove();
					ShareUtils.isNextFun({boradid:settings.boradid,share:settings.share,shid:settings.shid,ishid:settings.ishid});
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
//关闭上传框
var closeUpload = function(){
	var $thisDiv = $("#uploadid");
	var mynumIndex = $thisDiv.attr("data-index");
	AlertUtils.centerDivClosed({indexNum:mynumIndex,
		indexTipDiv:$thisDiv,type:1
	});		
};
//检测是android还是ios系统
var browser = {
	versions: function() {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//移动终端浏览器版本信息 
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
//@description 图片上传的常用方法
var UploadUtils = function(){
	//七牛上传图片接口
	var uploaderQiNiu = function(options){
		var settings = {
			token:'',
			domain:'',
			bucket:'',
			typebucket:'',
			container:'upcontainer',
			browse_button:'uppickfiles',
			drop_element:'upcontainer',
			multi_selection:'',
			auto_start:true,
			picname:'',
			imgw:736,
			imgh:100,
			callback:null,
			bcallback:null
		};
		if(options){
			$.extend(true,settings,options);
		}
		var imgListArr = [];//上传成功图片数组
		//alert(settings.multi_selection);
		var sets = {
			runtimes: 'html5,flash,html4',    //上传模式,依次退化
			browse_button: settings.browse_button,       //上传选择的点选按钮，**必需**
			//uptoken_url: '/qiniu/uptoken.html?bucket=test',
			//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
			uptoken : settings.token,
				//若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
			unique_names: false,
				// 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
			// save_key: true,
				// 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
			domain: settings.domain,
			multi_selection:settings.multi_selection,//是否可选择多张图
			bucket:settings.bucket, //域名，下载资源时用到，**必需**
			container: settings.container,           //上传区域DOM ID，默认是browser_button的父元素，
			resize : {width :settings.imgw, height : settings.imgh, quality : 100},
			filters : [
				{title : "Image files", extensions : "jpg,gif,png"}
			],
			max_file_size: '5mb',           //最大文件体积限制
			flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
			max_retries: 1,                   //上传失败最大重试次数
			dragdrop: true,                   //开启可拖曳上传
			drop_element: settings.container,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
			chunk_size: '4mb',                //分块上传时，每片的体积
			auto_start: settings.auto_start,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
			init: {
				'FilesAdded': function(up, files) {
					plupload.each(files, function(file) {
						// 文件添加进队列后,处理相关的事情
						var progress = new FileProgress(file, 'fsUploadProgress');
						progress.setStatus("等待...");
					});
				},
				'BeforeUpload': function(up, file) {
					   // 每个文件上传前,处理相关的事情
					var progress = new FileProgress(file, 'fsUploadProgress');
					var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					if (up.runtime === 'html5' && chunk_size) {
						progress.setChunkProgess(chunk_size);
					}
					AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=progress&ch=sns',
						type: "GET",
						yzlogin:true,
						isloading:true,
						dataType: 'html',
						params: '',
						callback: function(data){
							$("body").append(data);
							AlertUtils.centerDiv({divId:"dzuploadid",type:1});
						}
					});
				},
				'UploadProgress': function(up, file) {
					   // 每个文件上传时,处理相关的事情
					var progress = new FileProgress(file, 'fsUploadProgress');
					var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					progress.setProgress(file.percent + "%", up.total.bytesPerSec, chunk_size);
					$("#progress").find(".text").html(file.percent + "%");
					$("#progress").find(".percentage").css({"width":file.percent+"%"});
				},
				'FileUploaded': function(up, file, info) {
					   // 每个文件上传成功后,处理相关的事情
					   // 其中 info 是文件上传成功后，服务端返回的json，形式如
					   // {
					   //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
					   //    "key": "gogopher.jpg"
					   //  }
					   // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
					 
					 //var domain = up.getOption('http://7xjrtd.com1.z0.glb.clouddn.com/');
					 var num = $('#dzuploadid').attr("data-index");
					 AlertUtils.centerDivClosed({indexTipDiv:$('#dzuploadid'),type:1,indexNum:num});
					 var res = $.parseJSON(info);
					 if(settings.isarray){
						 alert(1);
						 var imageInfoObj = Qiniu.imageInfo(res.key);
						 console.log(imageInfoObj);
						 res.key = "/"+ res.key;
						 res.src = settings.domain + "/" + res.key;
						 var res_new = $.extend(true,res,imageInfoObj);
						 imgListArr.push(res_new);
					 }
					 if(options.bcallback){
						 settings.bcallback(res,settings.domain);
					 }
					
					 //key = res.key;
				},
				'Error': function(up, err, errTip) {
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">'+errTip+'</div>',
						type:0,
						scallback:function(){
							var num = $('#dzuploadid').attr("data-index");
					 		AlertUtils.centerDivClosed({indexTipDiv:$('#dzuploadid'),type:1,indexNum:num});	
						}
					});
					//上传出错时,处理相关的事情
				},
				'UploadComplete': function() {
					if(options.callback){
						//console.log(imgListArr);
						settings.callback(imgListArr);	
					}
					//alert('UploadComplete');
					   //队列文件处理完毕后,处理相关的事情
				},
				'Key': function(up, file) {
					//alert('Key');
					// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
					// 该配置必须要在 unique_names: false , save_key: false 时才生效
					var d = new Date();
					var vYear = d.getFullYear();
					var vMon = d.getMonth() + 1;
					var vDay = d.getDate();
					var h = d.getHours(); 
					var m = d.getMinutes(); 
					var s = d.getSeconds();
					if(h<=9){
						h = "0"+h;	
					}
					if(m<=9){
						m = "0"+m;	
					}
					if(s<=9){
						s = "0"+s;	
					}
					if(vMon<=9){
						vMon = "0"+vMon;	
					}
					if(vDay<=9){
						vDay = "0"+vDay;	
					}
					var datatime = vYear+""+vMon+""+vDay;
					var randomNum = String(Math.floor(Math.random()*100000000+1));
					if(randomNum.length < 4){
						randomNum = randomNum + "0000";	
					}
					randomNum = randomNum.substr(0,4);
					var key = datatime + "/"+suid+"/"+h+""+m+""+s+""+randomNum+".jpg";
					if(settings.bucket == "byshare-avatar"){
						
						key = settings.picname;	
					}
					//var key = "a.jpg";
					// do something with key here
					return key
				}
			}
		};
		//初始化上传按钮
		
		
		if(settings.typebucket == 1){
			//认证图片上传
			var Qiniu1 = new QiniuJsSDK();
			var uploader1 = Qiniu1.uploader(sets);	
		}else if(settings.typebucket == 2){
			//图片上传
			var Qiniu2 = new QiniuJsSDK();
			var uploader2 = Qiniu2.uploader(sets);	
		}else if(settings.typebucket == 3){
			//图片上传
			var Qiniu3 = new QiniuJsSDK();
			var uploader3 = Qiniu3.uploader(sets);	
		}else if(settings.typebucket == 4){
			//图片上传
			var Qiniu4 = new QiniuJsSDK();
			var uploader4 = Qiniu4.uploader(sets);	
		}else{
			var Qiniu = new QiniuJsSDK();
			var uploader = Qiniu.uploader(sets);	
		}
		
	};
	
	var uploadInit = function(options){
		var settings = {
			yzlogin:true,
			bucket:'share',
			typebucket:'',
			container:'upcontainer',
			browse_button:'uppickfiles',
			drop_element:'upcontainer',
			multi_selection:true,
			auto_start:true,
			picname:'',
			tip:false,
			isarray:false,
			imgw:736,
			imgh:1000,
			startcallback:function(){},
			callback:function(){},
			bcallback:function(){}
		};
		if(options){
			$.extend(settings,options);
		}
		//是否要登录
		if(settings.yzlogin){
			var loginflag = BaseInitClass.loginCheck();
			if(!loginflag){
				$("#up_input").hide();
				return false;
			}else if(settings.tip){
				allUp();
				return true;	
			}else{
				$("#up_input").show();
				//获取token
				getuptoken();	
			}
		}
		function allUp(){
			AjaxFunUtils.ajaxInit({url: "/common/gettpl.html?name=uppic&ch=sns",//default/upload/index.html
				type: "GET",
				yzlogin:true,
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					$("#uppic_title").html(settings.uptitle);
					AlertUtils.centerDiv({
						divId:"uploadid",
						type:1,
						callback:function(){
							getuptoken();
						},
						closeback:function(){
						//location.reload();
					}});
				}
			})	
		}
		function getuptoken(){
			AjaxFunUtils.ajaxInit({
				"url":"/qiniu/uptoken.html", 
				"params":{bucket:settings.bucket,picname:settings.picname}, 
				"callback":function (res) {
					if(res.status == 1){
						if(options.startcallback){
							settings.startcallback(res);
						}
						settings.token=res.data.token;
						settings.domain=res.data.domain;
						settings.bucket=res.data.bucket;
						uploaderQiNiu(settings);
					}
				}
			});	
		}
	};
	//上传完成下一步处理方法
	var successFun = function(oarrData,options){
		var settings= {
			share:'up',
			isOri:'true',
			boradid:'',
			fileNumLimit:10
		};
		if(options){
			$.extend(settings,options);	
		}
		ShareUtils.addShareInit(oarrData,{share:settings.share,isOri:settings.isOri,boradid:settings.boradid});
	};
	return {uploadInit:uploadInit,successFun:successFun,uploaderQiNiu:uploaderQiNiu}
}();


//分享弹窗公共方法
var ShareUtils = function(){
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
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);
		};
		var proportion = 1;
		if(!settings.iswebsite){
			closeUpload();
		};
				
		//采集图片操作
		if(settings.share == 'caiji' || settings.share == 'jietu'){
			AlertUtils.centerDiv({
				divId:"shareFirstTipbox",
				w:"99%",
				callback:function(){
					$(".closeBtnHtml").unbind("click").bind("click",function(){
						var closeNum = $("#shareFirstTipbox").attr("data-index");
						AlertUtils.centerDivClosed({indexNum:closeNum,
							indexTipDiv:$("#shareFirstTipbox"),
							type:1,
							closeback:function(){
								window.location.href = '/';	
							}
						});	
					});
					
					switchShow();
					//delImagShow();
					ShareUtils.isNextFun({boradid:'',share:settings.share,shid:settings.shid,ishid:settings.ishid});
					//鼠标经过
					hoverAndDrag({proportion:settings.proportion,
						parent:$(".showPicImg"),
						indexDiv:$(".item-tag"),
						opageXY:settings.opageXY,
						type:'',
						share:true
					});	
				}
			});	
			return true;
		}
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
					AlertUtils.centerDiv({
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
					$("#boxslider").boxslider({
						isshow:isshow,
						autoplay:false,
						callback:function(){
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
					ShareUtils.isNextFun({boradid:settings.boradid,share:settings.share,shid:settings.shid,ishid:settings.ishid});
					//鼠标经过
					
					
				}
			});
		};
		//获取手机图片高度容器
		function getHeightDiv(){
			var imgHeight = 0;
			var tiptopH = $("#tiptop").height();
			var tipbottomH = $("#tipbottom").height();
			if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
				var bodyHeight = window.screen.availHeight;
				imgHeight = bodyHeight - tiptopH -tipbottomH-60;
			}else if (browser.versions.android) {
				var bodyHeight = getHeightBody();
				imgHeight = bodyHeight - tiptopH -tipbottomH-40;
			}else{
				var bodyHeight = getHeightBody();
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
		//上传图片分享操作
		if(settings.share == 'up'){
			upPicAjax();	
		}
		function upPicAjax(){
			AjaxFunUtils.ajaxInit({url: '/share/show_f_page.html?page=shareTipFirst',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);					
					AlertUtils.centerDiv({
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
		//显示继续添加按钮
		function showcontinueBtn(){
			var minNum = 10;
			var maxNum = $("#showPic_samll").find("li").size();
			var conNum = minNum - maxNum;
			if(maxNum <= minNum && conNum > 0){
				$("#continueBtn").removeClass("creatbtn-gray");
				$("#continueBtn").unbind("click").bind("click",function(){
					UploadUtils.uploadInit({uploadUrl:"/upload/index.html",ismult:true,fileNumLimit:conNum,callback:function(conarrData){
						closeUpload();
						showPicList(conarrData);
					}});
				});	
			}else{
				$("#continueBtn").addClass("creatbtn-gray");
				$("#continueBtn").unbind("click");	
			}
		};
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
				var b_resImg = getImgWidth(o.width,o.height,736,1000);
				var s_resImg = getImgWidth(o.width,o.height,236,300);
				var color = '';
				var lihtml = '<li data-bimgurl="'+o.key+'" data-simgurl="'+o.key+'" data-w="'+b_resImg.width+'" data-h="'+b_resImg.height+'" data-sw="'+s_resImg.width+'" data-sh="'+s_resImg.height+'" data-index="'+index+'">'+
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
				var showPicImgBox = '<li data-width="'+b_resImg.width+'"><form id="form_'+index+'" method="post" action="javascript:void(0);" data-w="'+b_resImg.width+'" data-h="'+b_resImg.height+'" data-sw="'+s_resImg.width+'" data-sh="'+s_resImg.height+'" data-bimgUrl="'+o.key+'" data-simgUrl="'+o.key+'" data-color="'+color+'" data-imgrel="'+o.key+'" class="showPicImg" style="width:'+b_resImg.width+'px;height:'+b_resImg.height+'px;">'+
						'<span class="defpic">'+radiohtml+'<label for="isface_'+index+'">设为封面</label></span>'+
						'<img class="picImg" src="'+b_imgUrl+'" style="width:'+b_resImg.width+'px height:'+b_resImg.height+'px">'+
						'<input type="hidden" value="" name="relBoxSize" class="relBoxSize">'+
					'</form></li>';
				//simgHtml +=lihtml;
				bimgHtml +=showPicImgBox; 
			});
			$("#slide_01tip").html(bimgHtml);
			//$("#showPic_samll").find("ul").append(simgHtml);
			var imgHeight = getHeightDiv();
			//继续添加图片
			showcontinueBtn();
			var isshow = $("#slide_01tip").find(".showPicImg").size()>1?1:0;
			//图片左右滚动
			$("#boxslider").boxslider({
				isshow:isshow,
				autoplay:false,
				callback:function(){
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
			ShareUtils.isNextFun({boradid:settings.boradid,share:settings.share,shid:settings.shid,ishid:settings.ishid});
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
					iswebsite:settings.iswebsite
				});
				$showDiv.fadeIn();
				$showDiv.siblings(".showPicImg").hide();
				$("#addTagFromBox").hide();
				//添加描点
				$showDiv.find(".picImg").addTagUtils({
					index:index,
					isOri:settings.isOri,
					proportion:thisproportion,
					boradid:settings.boradid,
					shid:settings.shid,
					ishid:settings.ishid,
					share:settings.share,
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
				iswebsite:settings.iswebsite
			});
			$showDiv.fadeIn();
			$showDiv.siblings(".showPicImg").hide();
			$("#addTagFromBox").hide();
			//添加描点
			$showDiv.find(".picImg").addTagUtils({
				index:index,
				isOri:settings.isOri,
				proportion:thisproportion,
				boradid:settings.boradid,
				shid:settings.shid,
				ishid:settings.ishid,
				share:settings.share,
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
			shid:''	
		};
		if(options){
			$.extend(settings,options);	
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
						AlertUtils.centerDivClosed({indexNum:num,
							indexTipDiv:$("#shareFirstTipbox"),type:1
						});
						ShareUtils.addShareInitTwo({dataFrom:dataList,
							boradid:settings.boradid,
							share:settings.share,
							shid:settings.shid,
							ishid:settings.ishid
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
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);
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
				AlertUtils.centerDiv({"divId":"shareTipbox","type":1,"callback":function(){
					shareBind({odataForm:settings.dataFrom,boradid:settings.boradid,shid:settings.shid,ishid:settings.ishid,share:settings.share});	
				}});
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
				AlertUtils.centerDiv({
					"divId":"shareSuccessTipbox",
					"type":1,
					"callback":function(){
						$("#shareSuccessFrom").checkInput({
							submitBtnFn: function (from) {
								var dataFrom = from.serializeJson();
							}	
						});	
						//百度分享初始化
						var thishost = "http://" + window.location.host;
						baiduShare({
							bdPic:settings.pic,
							bdText:settings.title,
							url:thishost + "/share/sharepage.html?shid=" + settings.shid,
							title:settings.title,
							desc:settings.title,
							summary:settings.title
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
				AlertUtils.centerDiv({divId:"addWebUrl",type:1,w:400});
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
				AlertUtils.centerDiv({divId:"editShareTipbox",type:1,callback:function(){
					$("#editShareFrom").checkInput({
						"button":'.editShareBtn',
						submitBtnFn: function (from,index) {
							Loading.loadInit({status:1});
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
									Loading.loadInit({status:0});
									if(result.status){
										var mynumIndex = $("#editShareTipbox").attr("data-index");
										AlertUtils.centerDivClosed({
											"indexTipDiv":$("#editShareTipbox"),
											"indexNum":mynumIndex,
											"type":1
										});
										AlertUtils.tips({
											htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
											type:0,
											scallback:function(){
												window.location.href = href;
											}
										});
									}else{
										AlertUtils.tips({
											type:0,
											htmlmsg:'<div style="padding:30px">'+result.msg+'</div>'
										});
										Loading.loadInit({status:0});
									}
								}
							})
						}
					})
				}});
				shareBind({boradid:settings.boradid,ishid:settings.ishid,shid:settings.shid});
			}
		});	
	};
	var shareBind = function(options){
		var settings = {
			odataForm:'',
			boradid	:'',
			share:'',
			ishid:'',
			shid:'',
			maxNum:15
		};
		if(options){
			$.extend(settings,options);
		};
		var myodataForm = settings.odataForm;
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
		getSelectData();
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
							getSelectData();
						}else{
							AlertUtils.tips({
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
						AlertUtils.centerDiv({
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
					AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#bigcategorybox"),type:0});
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
					AlertUtils.tips({
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
				Loading.loadInit({status:1});
				var js_debug = BaseInitClass.getQueryString("js_debug");
				var dataFrom = from.serializeJson();
				var categoryData = $("#categoryFrom").serializeJson();
				var resData = $.extend(true,dataFrom,categoryData);
				var addurl = "/share/add_pin.html";
				if(js_debug){
					addurl = "/share/add_pin.html?js_debug=1";
				}
				AjaxFunUtils.ajaxInit({
					url:addurl, 
					params:{imgdata:myodataForm,board:resData,share:settings.share,shid:settings.shid,ishid:settings.ishid}, 
					callback:function (result) {
						if(js_debug){
							alert(addurl);
							alert(result.status);
							alert(result.msg);	
						}
						if(result.status){
							Loading.loadInit({status:0});
							var num = $("#shareTipbox").attr("data-index");
							AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#shareTipbox"),type:1,"w":600});
							var num = $("#bigcategorybox").attr("data-index");
							AlertUtils.centerDivClosed({indexNum:num,indexTipDiv:$("#bigcategorybox"),type:1});
							var newshid = result.data.shid;
							var newtitle = result.data.title;
							var newpic = result.data.pic;
							shareSuccess({shid:newshid,share:settings.share,title:newtitle,pic:newpic});
							
						}else{
							Loading.loadInit({status:0});
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
							});
						}
					}
				});
			}	
		});
	};
	
	return {addShareInit:addShareInit,isNextFun:isNextFun,addShareInitTwo:addShareInitTwo,editShareInit:editShareInit,addShareUrl:addShareUrl};	
}();
//头部AJAX购物车信息列表
var GetCartTop = function(){
	
	var getCartInit	= function(){
		if(islogin==0){
			$("#cartItemnum").hide();
			return false;
		}
		AjaxFunUtils.ajaxInit({
			url:"/myorder/getcart.html",
			"params":{'partdata': "money",
			"ajax":1,
			"partdata":"goods"},
			"callback":function(res){
				var itemnum = res.data.itemnum;
				if(itemnum > 0){
					$("#cartItemnum").html(itemnum).show();	
					$(".cartItemnum").html(itemnum).show();	
				}else{
					$("#cartItemnum").hide();
					$(".cartItemnum").html(itemnum).show();		
				}
				
			}
		});	
	};
	return {getCartInit:getCartInit}	
}();

//点击加载特定内容
var loadSpContent = function(options){
	var settings = {
		loaddesturl:'',//要加载的地址
		selectItem:'',//要加载的元素DIV
		container:'',//装加载内容的DIV
		isempty:0,
		callback:function(){}	
	};
	if(options){
		$.extend(settings,options);	
	};
	var box = $("<div/>");
	var frag = document.createDocumentFragment();
	var callback = function() {};
	var $loadingHtml = $('<div class="loading"><img src="'+ static_url +'/images/loading.gif" /></div>');
	if(settings.isempty == 1){
		$(settings.container).empty().append($loadingHtml);
	}
	box.load(settings.loaddesturl + " " + settings.selectItem, null, loadCallback);
	function loadCallback() {
		$loadingHtml.remove();
		var children = box.children();
		while (box[0].firstChild) {
			frag.appendChild(box[0].firstChild);
		};
		$(settings.container)[0].appendChild(frag);	
		if(options){
			settings.callback();
		};
	};
	
};
//关闭弹窗
var closeTip = function(obj){
	var num = obj.attr("data-index");
	AlertUtils.centerDivClosed({
		indexNum:num,
		indexTipDiv:obj,
		type:1
	});		
};
//私聊TA按钮绑定
var chatBtn = function(options){
	var settings = {
		uid:'',
		username:''	
	};
	if(options){
		$.extend(settings,options);	
	}
	$(".chatBtn").unbind("click").bind("click",function(){
		var uid = settings.uid;
		var username = settings.username;
		if(!uid){
			uid = $(this).attr("data-uid");
		}
		if(!username){
			username = $(this).attr("data-username");
		}
		if(uid == suid ){
			AlertUtils.tips({
				type:0,
				htmlmsg:'<div style="padding:30px">' + lang.js_base_yourself+'</div>'
			});
			return false;
		}
		closeTip($("#sns_more"));

		AjaxFunUtils.ajaxInit({url:'/common/gettpl.html?name=sns_chat&ch=sns',
			type: "GET",
			yzlogin:true,
			isloading:true,
			dataType: 'html',
			params: '',
			callback: function(data){
				$("body").append(data);
				$("#title_username").html('<a href="/share/myshares.html?fsuid='+uid+'&ukey='+ukey+'">'+username+'</a>');
				var contHeight = getHeightBody() - 230;
				$("#msgListBox").css({"height":contHeight});
				AlertUtils.centerDiv({divId:"chatbox",
					type:1,
					position:'fixed',
					w:'95%',
					callback:function(){
						MsgMod.msgInit({
							uid:uid	
						});	
					}
				});
			}
		});
	});	
};
//删除聊天记录
var messageDel = function(){
	$(".messageDel").unbind("click").bind("click",function(){
		var $this = $(this).parents(".itemmsg");
		var msgid = $this.attr("data-id");	
		AjaxFunUtils.ajaxInit({url: '/message/del.html',
			params: {msgid:msgid},
			callback:function(res){
				if(res.status){
					$this.remove();
					//alert(res.msg);	
				}else{
					//alert(res.msg);	
				}
			}
		});
	});
};
//删除评论
var commentDel = function(){
	$(".delCommentBtn").unbind("click").bind("click",function(){
		var $thisCom = $(this).parents(".shareDescriptionComment");
		var cmmid = $(this).attr("data-cmmid");
		var shid = $(this).attr("data-shid");
		var $pl_list = $(this).parents(".pl-list");
		var $plnum = $(this).parents(".pl-listbox").find(".plnum");
		var pl_num = Number($plnum.attr("data-plnum"));
		AlertUtils.tips({
			w:"90%",
			htmlmsg:'<div style="padding:30px">' + lang.js_base_del_text+'</div>',
			scallback:function(){
				AjaxFunUtils.ajaxInit({
					"url":"/comment/del_comment.html", 
					"params":{cmmid:cmmid,shid:shid}, "callback":function (result) {
						if(result.status){
							$thisCom.remove();
							pl_num = pl_num - 1;
							getcommentlist({shareid:shid,pl_list:$pl_list,plnum:$plnum,pl_num:pl_num});
						}else{
							AlertUtils.tips({
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
//投诉
var snsReport = function(){
	$(".reportBtn").unbind("click").bind("click",function(){
		var type = $(this).attr("data-type");
		var cmmid = $(this).attr("data-cmmid");
		var shid = $(this).attr("data-shid");
		var fsuid = $(this).attr("data-fsuid");
		var msgid = $(this).attr("data-msgid");
		if(type=='comment'){
			var url ='/common/gettpl.html?name=sns_reportComment&ch=sns'; 	
		};
		if(type == 'shares'){
			var url ='/common/gettpl.html?name=sns_report&ch=sns'; 
		};
		if(type == 'msg'){
			var url ='/common/gettpl.html?name=sns_report&ch=sns'; 
		};
		
		
		AjaxFunUtils.ajaxInit({url: url,
			type: "GET",
			dataType: 'html',
			params: '',
			callback:function(data){
				$("body").append(data);	
				AlertUtils.centerDiv({
					"divId":"reportTip","type":1,
					"callback":function(){
						var num = $("#sns_more").attr("data-index");
						AlertUtils.centerDivClosed({
							indexNum:num,
							indexTipDiv:$("#sns_more"),
							type:1
						});	
						$("#reportFrom").checkInput({
							submitBtnFn: function (from) {
								Loading.loadInit({status:1});
								var dataFrom = from.serializeJson();
								dataFrom.shid = shid;
								dataFrom.suid  = suid;
								dataFrom.fsuid  = fsuid;
								dataFrom.cmmid  = cmmid;
								dataFrom.msgid  = msgid;
								dataFrom.type  = type;
								AjaxFunUtils.ajaxInit({url: '/report/index.html',
									params:dataFrom,
									callback:function(res){
										var num = $("#reportTip").attr("data-index");
										AlertUtils.centerDivClosed({
											indexNum:num,
											indexTipDiv:$("#reportTip"),
											type:1
										});	
										AlertUtils.tips({
											type:0,
											htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
										});
										Loading.loadInit({status:0});
									},
									errCallback:function(){
										Loading.loadInit({status:0});	
									}
								})
							}	
						});
					}
				});
			}
		});
	});
	
};
//检查颜色 尺寸是否被选中
$.fn.checkboxFn = function(options){
	var settings = {
		checkbox:"checkbox",
		scallback:function(){},
		errorcallback:function(){}
	};
	if(options){
		$.extend(settings,options);	
	}
	var $this = $(this);
	var falg = 0; 
	$this.find("input[type="+settings.checkbox+"]").each(function () { 
		if ($(this).attr("checked")) { 
			falg += 1; 
		}
		if($(this).val() !== '' && settings.checkbox=='hidden'){
			falg += 1;	
		}
	});
	if (falg > 0){ 
		$this.removeClass("error_validate");
		if(options.scallback){
			settings.scallback($this);
		}
		return true; 
	}else{ 
		$this.addClass("error_validate");
		if(options.errorcallback){
			settings.errorcallback($this);
		}
		return false;
	}
};
//朋友圈分享
var wxshare = function(options){
	var settings = {
		title: '百享，做你自己！',
        link: 'http://www.byshare.com',
        imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
		callback:function(){}
	};
	if(options){
		$.extend(settings,options);	
	}
	$(".byshare_weixin").unbind("click").bind("click", function () {
		if(options.callback){
			settings.callback();	
		}
	});
};
//站内分享
var znshare = function(options){
	var settings = {
		ishid:'',
		shid:'',
		callback:function(){}
	};
	if(options){
		$.extend(settings,options);	
	}
	$(".btn-share").unbind("click").bind("click", function () {
		if(options.callback){
			settings.callback();	
		}
		var website = $(this).attr("data-iswebsite");
		var shid = $(this).parents(".byshid").attr("data-shid");
		var ishid = $(this).parents(".byshid").attr("data-ishid");
		if(!shid){
			shid = settings.shid;	
		}
		if(!ishid){
			ishid = settings.ishid;	
		}
		var imgW = "";
		var imgH = "";
		var websiteData = "";
		if(website){
			var screenImage = $(this).attr("data-bigimgurl");
			var maxW= 600;
			var maxH = 500;
			var theImage = new Image();
			theImage.src = screenImage;
			imgW = theImage.width;
			imgH = theImage.height;
			if(imgW > maxW){ 
				//高度等比缩放
				imgH = (maxW*imgH)/imgW; 
				imgW = maxW;
			} 
			if(imgH > maxH){ 
				//高度等比缩放
				imgW = (maxH*imgW)/imgH; 
				imgH = maxH;
			} 
			websiteData = {imgUrl:screenImage,w:imgW,h:imgH};
		}
		var dataiswebsite = website==1?website:0;
		ShareUtils.addShareInit(websiteData,{iswebsite:dataiswebsite,shid:shid,ishid:ishid,share:'share'});
	});
};

//百度分享
var baiduShare = function(options){
	var settings = {
		bdPic:'',
		bdText:'',
		url:'',
		title:'',
		desc:'',
		summary:'',
		site:'www.byshare.com',
		baidu:0
	};
	if(options){
		$.extend(settings,options);	
	}
	if(settings.baidu == 1){	
		window._bd_share_config={"common":{"bdSnsKey":{"tsina":3171756207},"bdText":"","bdMini":"2","bdPic":settings.bdPic,"bdStyle":"0","bdSize":"16"},"share":{}};
		with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
	}else{
		var share_Sina = function(){
			return '<a href="http://v.t.sina.com.cn/share/share.php?url='+encodeURIComponent(settings.url)+'&amp;title='+settings.title+'&amp;appkey=3171756207&amp;pic='+settings.bdPic+'" target="_blank" class="byshare_sns byshare_tsina" title="分享到新浪微博"></a>';
		};
		var share_qqQzone = function(){
			return '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(settings.url)+'&title='+encodeURI(settings.title)+'&pics='+settings.bdPic+'&summary='+encodeURI(settings.summary)+'" target="_blank" class="byshare_sns byshare_qzone" data-cmd="qzone" title="分享到QQ空间"></a>';	
		};
		var share_qq = function(){
			return '<a href="http://connect.qq.com/widget/shareqq/index.html?url='+settings.url+'&showcount=0&desc='+encodeURI(settings.desc)+'&summary='+encodeURI(settings.summary)+encodeURI(settings.url)+'&title='+encodeURI(settings.title)+'&site='+settings.site+'&pics='+settings.bdPic+'" class="byshare_sns byshare_qzone" data-cmd="qzone" title="分享到QQ空间"></a>';
		};	
		var share_weiXin = function(){
			wx.onMenuShareTimeline({
				title: '', // 分享标题
				link: '', // 分享链接
				imgUrl: '', // 分享图标
				success: function () { 
					alert(11);// 用户确认分享后执行的回调函数
				},
				cancel: function () { 
					alert(222);// 用户取消分享后执行的回调函数
				}
			});
		};
		var html = ''; 
		html += share_qqQzone();
		html += share_Sina();
		$('#share_sns').html(html);
		//share_weiXin();
	}
};
//调用浏览器分享功能
var browserShare = function(){
	wx.onMenuShareTimeline({
		title: 'aaaaaaaaa', // 分享标题
		link: 'www.byshare.com', // 分享链接
		imgUrl: '', // 分享图标
		success: function () { 
			alert("调用成功！");// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			alert("调用失败！");// 用户取消分享后执行的回调函数
		}
	});
};

//MSG发送表单绑定
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
							AlertUtils.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
							});
						}
				}
			});
			
		}
	});	
};

//聊天功能模块JS
var MsgMod = function(){
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
			AlertUtils.tips({
				type:0,
				htmlmsg:'<div style="padding:30px">'+lang.js_base_yourself+'</div>',
				scallback:function(){
					closeTip($("#chatbox"));	
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
				params: '',
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
						AlertUtils.tips({
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
	return {msgInit:msgInit};
}();
//加载中
var Loading = function(){
	var loadInit = function(options){
		var $loadingBox = $('<div class="loadingMask" style="z-index:999999"></div>');
		var settings = {
			status:1	
		};
		if(options){
			$.extend(settings,options);
		};
		if(settings.status==1){
			$("body").append($loadingBox);	
		}else{
			$(".loadingMask").remove();
		};
	};
	return {loadInit:loadInit};
}();
//检查图片是否存在  
$.fn.checkImgExists = function(callback) {  
	$(this).each(function(index, element) {
		var $this = $(this);
        var imgurl = $this.attr("data-original");
		var odimgurl = $this.attr("src");
		var ImgObj = new Image(); //判断图片是否存在  
		ImgObj.src = imgurl; 
		ImgObj.onload = function() {
			$this.attr("src",imgurl);
			if(callback){
				callback($this,imgurl);	
			} 
		};
		// 为Image对象添加图片加载失败的处理方法
		ImgObj.onerror = function() {
			if(callback){
				callback($this,odimgurl);	
			} 
		};
    });
	
};
// 左右滚动
$.fn.boxslider=function(options){
	var $this = $(this);
	var defaults={
		isshow:0,
		autoplay: true,
		mode	: "hover",
		number	: false,
		speed	: 4000,
		callback:null
	};
	var defaults = $.extend(defaults, options);
	var sWidth=$(this).width();
	var len = $(this).children(".boxslider").children("li").length; //获取焦点图个数
	var index=0;
	var picTimer = 500;
	if(options.callback){
		defaults.callback();	
	}
	if(defaults.isshow){
		var $left=$('<a class="boxslider-left boxslider-btn" style="display: inline;" href="javascript:void(0);"></a>');
		var $right= $('<a class="boxslider-right boxslider-btn" style="display: inline;" href="javascript:void(0);"></a>');
		$this.append($left);
		$this.append($right);
	}else{
		return false;	
	}
	for(i=0;i<len;i++){
		if(defaults.number){
			str="<a>"+(i+1)+"</a>";
		}else{
			str="<a></a>";
		}
		$(this).children(".boxslider-num").append(str);
	}
	
	var $slide_num=$(this).children(".boxslider-num").children("a");
	var $slider=$(this).children(".boxslider");
	$slider.css("width",sWidth*len+"px");
	$slide_num.eq(0).addClass("on");
	
	$slide_num.on(defaults.mode,function(){
		$(this).addClass("on").siblings(".on").removeClass("on");	
	});
	
	$left.bind("click",function(){
		index-=1;
		if(index == -1) {index = len - 1;}
		showPics(index);	
	});
	$right.bind("click",function(){
		index+=1;
		if(index == len) {index = 0;}
		showPics(index);	
	});
	$slide_num.bind(defaults.mode,function(){
		showPics($(this).index());	
	});
	
	$(this).hover(function() {
		$left.show();
		$right.show();
		clearInterval(picTimer);
	},function() {
		$left.hide();
		$right.hide();
		if(defaults.autoplay){
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if(index == len) {index = 0;}
			},defaults.speed); //此4000代表自动播放的间隔，单位：毫秒
		}
	}).trigger("mouseleave");
	
	if(defaults.autoplay){

	}
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$slider.stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		$slide_num.removeClass("on").eq(index).addClass("on");
		if(options.callback){
			defaults.callback();	
		}
		 //为当前的按钮切换到选中的效果
	}

};

//图片轮换
$.fn.slidepic = function(options){
	var settings = {
		scrollContId:'slide_01',//内容容器ID
		slide_01_dot:'slide_01_dot',//点列表ID
		selected:'selected',
		sl_left:'sl_left',//左箭头ID
		sl_right:'sl_right',//右箭头ID
		speed:10,
		space:30,
		autoPlay:true,
		scallback:null,
		callback:null
		
	};
	if(options){
		$.extend(settings,options);	
	}
	if($(this).size() <=0){
		return false;
	}
	var w = $("#bodywidth").width();
	$(this).find(".mod_01").css({"width":w}).show();
	var slide_01 = new ScrollPic();	
	slide_01.scrollContId   = settings.scrollContId; //内容容器ID
	slide_01.dotListId      = settings.slide_01_dot;//点列表ID
	slide_01.dotOnClassName = settings.selected;
	slide_01.arrLeftId      = settings.sl_left; //左箭头ID
	slide_01.arrRightId     = settings.sl_right;//右箭头ID
	slide_01.frameWidth     = w;
	slide_01.pageWidth      = w;
	slide_01.upright        = false;
	slide_01.speed          = settings.speed;
	slide_01.space          = settings.space; 
	slide_01.autoPlay       = settings.autoPlay;
	slide_01.callback = function(obj_num){
		if(options.scallback){
			settings.scallback(obj_num);	
		}	
	};
	slide_01.initialize(); //初始化
	if(options.callback){
		settings.callback();	
	}
	
};
//判断输入字符串是否为空或者全部都是空格
var isNull = function( str ){
	if ( str == "" ) return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
};
//头部搜索列表
var searchTagbox = function(){
	var thisT = BaseInitClass.getQueryString('t');
	if(!thisT){
		thisT = '';	
	}
	var w = $("#searchInt").width()+12;
	$("#searchTagbox").css({"width":w});
	$(window).resize(function() {
		var w = $("#searchInt").width()+12;
		$("#searchTagbox").css({"width":w});
	});
	
	$("#searchInt").unbind('input').bind('input', function(){
		var $thisIput = $(this);
		var val = $.trim($thisIput.val());
		//$("#searchInt").val(val);
		var flag = isNull(val);
		if(flag){
			$thisIput.siblings("#searchTagbox").hide();	
		}
		ajaxSearch();
		function ajaxSearch(){
			AjaxFunUtils.ajaxInit({
				url:'/m_search/getwordlists.html?t='+thisT+'&s='+val+'',	
				params:'',
				callback:function(res){
					if(res.status){
						$("#searchTagbox").show();
						var resSearchData = res.data.keyword;
						var searchTaglist = '';
						$.each(resSearchData,function(index,keyword){
							var lihtml='<li><a href="/m_search/search.html?t='+thisT+'&s='+encodeURIComponent(keyword.val)+'" data-val='+keyword.val+'>'+keyword.val+'</a></li>';	
							searchTaglist +=lihtml;
						});
						$("#searchTagbox ul").html(searchTaglist);
					}else{
						$("#searchTagbox").hide();
					}
				}
			});	
		}
	});
	$(document).bind('click',function(e){
		  var target = $(e.target);
		  if(target.closest("#searchTagbox").length == 0){
			$('#searchTagbox').hide();
		  };
		  
	});
};
//获取评论
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
//评论按钮绑定
var commentBtnBind = function(){
	$(".btn-addpl").unbind("click").bind("click", function () {
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
		AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=sns_pl&ch=sns',
			yzlogin:true,
			type: "GET",
			dataType: 'html',
			params: '',
			callback: function(data){
				$("body").append(data);
				editorInit(title);
				AlertUtils.centerDiv({divId:"sns_pltip",
					type:1,
					w:"96%",
					callback:function(){
						var $thisForm = $("#sns_plform");
						addComment({addCommentForm:$thisForm,
							fsuid:fsuid,
							shid:shareid,
							callback:function(){
								var mynumIndex = $("#sns_pltip").attr("data-index");
								AlertUtils.centerDivClosed({indexNum:mynumIndex,
									indexTipDiv:$("#sns_pltip"),type:1
								});
								pl_num = pl_num + 1;
								getcommentlist({shareid:shareid,pl_list:$pl_list,pl_box:$pl_box,plnum:$plnum,pl_num:pl_num});
							}
						});
					}
				});
			}
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
						AlertUtils.tips({
							w:"96%",
							htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
						});
					}
				}
			});
			
		}	
	});	
};

//获取手机屏幕宽度
var getWidthBody = function(){
	var bodyWidth = 0;
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		bodyWidth = window.screen.availWidth;
	}else if (browser.versions.android) {
		bodyWidth = $("body").width();
	}else{
		bodyWidth = $("body").width();
	}
	return bodyWidth;
};
//获取手机屏幕高度
var getHeightBody = function(){
	var bodyHeight = 0;
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		bodyHeight = window.screen.availHeight;
	}else if (browser.versions.android) {
		bodyHeight = $(window).height();
	}else{
		bodyHeight = $(window).height();
	}
	return bodyHeight;
};
//设定标签位置
$.fn.setTagPos = function(){
	var $this = $(this);
	var d_imgW = $this.width();
	var y_imgW = $this.attr("data-width");
	var proportion = d_imgW / y_imgW;
	$this.find(".item-tag").each(function(index, element) {
		var oldLeft = $(this).attr("data-left");
		var oldTop = $(this).attr("data-top");
		var newLeft = oldLeft*proportion;
		var newTop = oldTop*proportion;
		var p_w = d_imgW;
		var tag_form_w = $(this).find(".item-tag-form").width()+10;
		var flag_w = p_w - newLeft - tag_form_w;
		if(flag_w < 0){
			$(this).find(".item-tag-form").css({"right":24,"left":"auto"});
			$(this).find(".item-tag-form").find(".tip").addClass("tagRight");
		}
		$(this).css({"left":newLeft,"top":newTop}).addClass("loaded");
		
	});	
};

//整个网站公共初始化入口
var BaseInitClass = function(){
	var baseInit = function(){
		
		var h_height = $(".headerbox").height();
		$(".mainbox").css({"padding-top":h_height});
		
		//返回键
		$(".back-btn").unbind("click").bind("click",function(){
			window.history.back();
		});
		//我的更多信息
		sideMenu();
		//关注微信号
		if(isweixin == 1){
			if(islogin == 0){
				window.location.href = '/index/reg.html';
			}
			gzweixin();
		}
		var js_debug = BaseInitClass.getQueryString("js_debug");
		if(js_debug){
			gzweixin();	
		}
		function gzweixin(){
			AjaxFunUtils.ajaxInit({
				"url":'/user/weixin_isguanzhu.html', 
				"params":{}, 
				"callback":function (res) {
					$(".fengqiang-btn").removeClass("btn-danger-gray").find("span").html("整点疯抢");
					$(".fengqiang-btn").unbind("click").bind("click",function(){
						AjaxFunUtils.ajaxInit({
							"url":'/cashcoupon/fight.html', 
							"params":{act:i_act}, 
							"isloading":true,
							"callback":function (res) {
								if(res.status == 1){
									$("#qiangText").html(res.msg).show();
								}if(res.status == -3){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
										scallback:function(){
											window.location.href = 'http://mp.weixin.qq.com/s?__biz=MzA3NTM5Mzg2NA==&mid=206134523&idx=1&sn=b052274af6c6633a2e2db14c7a10e577#rd';
										}
									});		
								}if(res.status == -4){
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
										scallback:function(){
											$("#share_bg").show();
											$("#share_tip").show();
											$("#share_tip").unbind("click").bind("click",function(){
												$("#share_bg").hide();
												$("#share_tip").hide();
												//$("#btn-bysshare-wx").addClass("current").removeClass("btn-danger");	
											});	
										}
									});	
								}else{
									//$("#qiangText").html(res.msg).show();
									AlertUtils.tips({
										htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
										type:0
									});
								}
							}
						});	
					});
					isback = 1;
					$("#testStatus").text(res.status);
					if(res.status == 1){
						//$(".btn-bysharedz").addClass("btn-bysharedz").removeClass("btn-danger-gray");
						isgzweixin = 1;	
						//$("#btn-gzbysharewx").addClass("current").removeClass("btn-danger");
						
					}else if(res.status == -1){
						if(islogin == 0){
							window.location.href = '/index/reg.html';
						}
					}else{
						var top = $(".headerbox").height();	
						$("#gzweixin").css({"top":top}).show();
						$("#gzclose").unbind("click").bind("click",function(){
							$("#gzweixin").hide();	
						});		
					}
				}
			});
			
		}
		//头部显示隐藏
		//bodyhideshow();
		function bodyhideshow(){
			$(".bodyclick").unbind("click").bind("click",function(){
				var h_height = $(".headerbox").height();
				var h_flag = $(".headerbox").hasClass("fade");
				if(!h_flag){
					$(".headerbox,.footerbox").removeClass("loaded_diy").addClass("fade");	
					$(".mainbox").css({"padding-top":0});
				}else{
					$(".headerbox,.footerbox").removeClass("fade").addClass("loaded_diy");
					$(".mainbox").css({"padding-top":h_height});		
				}
			});
		}
		//头像图片懒加载
		$("img.avatar_lazy").checkImgExists(function(obj,imgurl){
			var $myopj = obj;
			var myimgurl = imgurl;
			var $thisp = $myopj.parent(".useravatar_bg");
			$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
		});
	

		//获取头部购物车数据
		GetCartTop.getCartInit();	
		//回到顶部
		$("#topButton").goTopExUtils();	
		//上传图片绑定
		if($("#upcontainer").length > 0){
			UploadUtils.uploadInit({
				yzlogin:true,
				isarray:true,
				bucket:'share',
				isarray:true,
				multi_selection:true,
				auto_start:true,
				callback:function(oimgdata){
					var myoimgdata = oimgdata;
					UploadUtils.successFun(myoimgdata,{});	
				},
				bcallback:function(){}
			});
		}
		
	};
	
	//获取url参数值
	var getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
    };
	//检查输入框是否为空
	var checksearchTagbox = function(){
		var val = $("#searchInt").val();
		$("#searchInt").val($.trim(val));
		var flag = isNull(val);
		if(flag){
			return false;	
		}	
	};
	//Follow
	var followBtn = function(){
		$(".followBtn").unbind("click").bind("click",function(){
			var $thisF = $(this);
			var ishome = $(this).attr("data-ishome");
			var followType = $thisF.attr("data-type");
			var follow = $thisF.attr("data-follow");
			$thisF.addClass("btn-loading");
			if(followType == "board"){
				var followUrl = '/share/follow_board.html';
				var ucatid = $thisF.attr("data-ucatid");
				var followparams ={ucatid:ucatid,followvalue:follow};
			}else if(followType == "person"){
				var followUrl = '/share/follow_person.html';
				var fsuid = $thisF.attr("data-fsuid");
				var followparams ={fsuid:fsuid,followvalue:follow};
			}else if(followType == "category"){
				var followUrl = '/share/follow_category.html';
				var categoryid = $thisF.attr("data-categoryid");
				var followparams ={categoryid:categoryid,followvalue:follow};
			}else if(followType == "interests"){
				var followUrl = '/share/follow_category.html';
				var categoryid = $thisF.attr("data-categoryid");
				var followparams ={categoryid:categoryid,followvalue:follow};
			}else if(followType == "want"){
				var followUrl = '/share/want.html';
				var shid = $thisF.parents(".byshid").attr("data-shid");
				var followparams ={shid:shid,wantvalue:follow};
			}
			AjaxFunUtils.ajaxInit({
				"url":followUrl, 
				"yzlogin":true,
				"params":followparams, 
				"callback":function (result) {
					$thisF.removeClass("btn-loading");
					if(result.status){
						if(follow == 1){
							$thisF.removeClass("current");
							if(!ishome){
								if(followType == "want"){
									$thisF.text(lang.js_shareView_want);
								}else{
									$thisF.text(lang.js_shareView_follow);	
								}
							}
							$thisF.attr("data-follow",0);
						}else{
							$thisF.addClass("current");
							if(!ishome){
								if(followType == "want"){
									$thisF.text(lang.js_shareView_unwant);
								}else{
									$thisF.text(lang.js_shareView_unfollow);	
								}
							}
							$thisF.attr("data-follow",1);	
						}
					}else{
						AlertUtils.tips({
							type:0,
							w:"96%",
							htmlmsg:'<div style="padding:20px 30px 20px">' + result.msg+'</div>'
						});
					}
				},
				"errCallback":function(){
					$thisF.removeClass("btn-loading");	
				}
			});		
		});		
	}; 
	//绑定手机
	var bindmobile = function(){
		var h = getHeightBody();
		$("#sns_bindmobile").css({"height":h});
		var actionurl = $("#sns_bindmobileform").attr("data-action");
		AlertUtils.centerDiv({divId:"sns_bindmobile",
			type:1,
			w:"100%",
			position:"fixed",
			istop:true,
			callback:function(){
				
			}
		});	
		$("#sns_bindmobileform").checkInput({
			validatetype:0,
			button:'.btn-bintmobile',
			//验证完了，提交表单要干的事情
			submitBtnFn: function (from) {
				Loading.loadInit({status:1});
				var dataFrom = from.serializeJson();
				AjaxFunUtils.ajaxInit({"url": actionurl, 
					"params":dataFrom,
					"callback":function (result) {
						if(result.status){
							AlertUtils.tips({
								type:0,
								htmlmsg:'<div style="padding:30px">' + result.msg+'</div>',
								scallback:function(){
									window.location.href = '/index/index.html';	
								}
							});
						}else{
							AlertUtils.tips({
								type:0,
								htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
							});
						}
						
						Loading.loadInit({status:0});
					}
				});
			}
		});
	};
	//我的更多信息
	var sideMenu = function(){
		var bodyW = $("#bodywidth").width();
		var side_w = bodyW*0.8;
		$(".mylist").unbind("click").bind("click",function(event){
			var loginflag = loginCheck();
			if(!loginflag){
				return false;	
			}
			event.stopPropagation();//阻止事件往上冒泡
			var is_div = $("#side-menu").length;
			if(is_div <= 0){
				var $sidebox = $('<div id="side-modalMask" class="modalMask"></div><div id="side-menu" class="side-menu sb-slidebar" style="margin-left:'+-side_w+'px;width:'+side_w+'px"><div id="closeside" class="closeHead"><span class="ico02 closeside"></span></div></div>');
				$('body').append($sidebox);	
				AjaxFunUtils.ajaxInit({url:"/user/settinglist.html",//default/upload/index.html
					type: "GET",
					yzlogin:true,
					dataType: 'html',
					params: '',
					callback: function(data){
						$("#side-menu").append($(data).find(".settings").html());
					}
				});	
			}
			var flag_show = $("#side-menu").is(":visible");
			var flag = 1;
			if(flag){
				$("#side-modalMask").show().css({"z-index":9998});
				$("#side-menu").show().css({"transform": "translate("+side_w+"px)","z-index":9999});
				flag = 0;	
			}else{
				$("#side-modalMask").hide();
				$("#side-menu").css({"transform": "translate(0px)"});
				flag = 1;
			}			
			
		});
		$("body").delegate("#closeside","click",function(){
			$("#side-menu").css({"transform": "translate(0px)"});
			$("#side-modalMask").hide();	
		});
		$(document).bind('click',function(e){
			  var target = $(e.target);
			  if(target.closest("#side-menu").length == 0){
				$("#side-menu").css({"transform": "translate(0px)"});
				$("#side-modalMask").hide();
			  };
			  
		});	
	};
	var loginCheck = function(){
		var res = true;
		if(islogin == 0){
			AlertUtils.tips({
				htmlmsg:'<div style="padding:30px">'+lang.js_base_login_tip+'</div>',
				callback:function(){
					$(".btnTipsubmit").find(".buttonText").text(lang.js_base_login_btn);	
				},
				scallback:function(){
					var loginhref = window.location.href;
					window.location.href = '/index/reg.html?loginurl='+loginhref+'';	
				}
			});
			res = false;	
		};	
		return res;
	};
	return {baseInit:baseInit,bindmobile:bindmobile,followBtn:followBtn,getQueryString:getQueryString,checksearchTagbox:checksearchTagbox,loginCheck:loginCheck}
}();

                                                                                                                                                                                                                     