define(["jquery"],function($){var base={lang:{js_base_login_tip:"您还没有登录，请先登录！",js_base_login_btn:"登录",js_base_del_text:"你确定删除吗？",js_base_delbord_text:"你确定删除这个分类吗？",js_base_error:"系统异常，请稍后再试！",js_base_email:"Not a valid email.",js_base_password:"valid",js_base_mb:"请填写正确的手机号码",js_base_code:"",js_base_deltag:"您要删除当前标签吗？",js_base_money:"valid",js_base_prev:"上一页",js_base_next:"下一页",js_base_tip:"系统提示",js_base_cancel:"取消",js_base_del:"删除",js_base_confirm:"确认",js_base_des:"描述",js_base_qty:"数量",js_base_price:"价格",js_base_total:"总价",js_base_checkout:"去结算",js_base_cart:"购物车内暂时没有商品。",js_base_scoretomoney:"请正确输入享金。",js_base_myscore:"请正确输入金额。",js_base_emailyz:"马上去验证",js_reg_maxMsg:"最多只能选择10个",js_shareView_like:"赞TA",js_shareView_unlike:"已赞TA",js_shareView_follow:"关注",js_shareView_unfollow:"已关注",js_shareView_want:"想要",js_shareView_unwant:"不想要",js_upload_chooseimage:"选择图片",js_cart_canceluse:"取消使用",js_cart_theuse:"本次使用",js_cart_coupons:"优惠卷",js_cart_Integral:"享金",js_cart_pay:"支付",js_cart_folding:"折合",js_cart_currency:"人民币",js_cart_payType:"百享",js_Q_EXCEED_NUM_LIMIT:"超过最大上传数",js_myshare_inviteSuccess:"邀请成功！",js_myshare_mailSuccess:"邮件发送成功！",js_myshare_orderNo:"订单编号",js_myshare_Onlinepayment:"在线支付",js_myshare_view:"查看",js_myshare_reup:"重新上传",js_myshare_perform:"您确定执行该操作吗?",js_myshare_Myself:"我自己",js_index_copytext:"邀请链接地址已经复制到粘贴板，你可以使用Ctrl+V贴到需要的地方去了哦！",js_base_categorytext:"选择分类！",js_base_yourself:"自己不能给自己发信息。",Q_EXCEED_SIZE_LIMIT:"图片文件总大小超过系统限制大小。",F_EXCEED_SIZE:"图片大小超过系统限制大小5M，请重新选择。",Q_TYPE_DENIED:"图片格式不对，只能上传jgif,jpg,jpeg,png图片",error:"系统提示",uptimeout:"亲，您的网络太慢，上传超时！请重新上传！",maxCategoryNum:"最多只能选15个分类。",certification:"你还没有通过实名认证，请先认证。",js_upavatartitle:"请从您手机选择头像上传",js_upshareimg:"请从手机相册选择图片",js_upproimg:"请从手机相册选择图片",js_shippingtotal:"包邮",js_order_sizes:"尺码",js_order_color:"颜色",js_order_for:"私定人",js_order_type_t:"团",js_order_type_p:"私"},getHeightBody:function(){var e=0;return this.browser.versions.ios||this.browser.versions.iPhone||this.browser.versions.iPad?e=window.screen.availHeight:this.browser.versions.android?e=$(window).height():e=$(window).height(),e},getWidthBody:function(){var e=0;return this.browser.versions.ios||this.browser.versions.iPhone||this.browser.versions.iPad?e=window.screen.availWidth:this.browser.versions.android?e=$("body").width():e=$("body").width(),e},browser:{versions:function(){var e=navigator.userAgent,t=navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&e.indexOf("KHTML")==-1,ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:e.indexOf("Safari")==-1}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},isNull:function(e){if(e=="")return!0;var t="^[ ]+$",n=new RegExp(t);return n.test(e)},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return n!=null?unescape(n[2]):null},loadInit:function(e){var t=$('<div id="loadingMask" class="loadingMask" style="z-index:999999"></div>'),n={status:1};e&&$.extend(n,e),n.status==1?$("body").append(t):$("#loadingMask").remove()}},tip={tips:function(e){var t={htmlmsg:"",title:base.lang.js_base_tip,type:1,istop:!1,position:"fixed",isShade:!0,touchmove:0,callback:function(){},scallback:function(){},dcallback:function(){},closeback:function(){},w:"96%"};e&&$.extend(t,e);var n='<div class="tipbox-in" data-index="0"><h1 class="tiptop">'+t.title+"</h1>"+'<span class="ico02 tipclose closeBtn"></span>'+'<form class="tipForm">'+'<div class="tipcont">'+t.htmlmsg+"</div>"+'<div id="tipbottom" class="tipbottom">'+'<div class="fr formFooterButtons">'+'<button class="btn-border btn rounded mr-5 btnCancel closeBtn" type="button">'+'<span class="buttonText">'+base.lang.js_base_cancel+"</span>"+"</button>"+'<button type="button" class="btn btn-danger btnTipsubmit">'+'<span class="buttonText">'+base.lang.js_base_confirm+"</span>"+"</button>"+"</div>"+'<div class="blank0"></div>'+"</div></form>"+"</div>",r=$(".modalMask").size(),i=$('<div id="tipbox_'+r+'" data-index="'+r+'" class="tipbox fade" style="width:'+t.w+'">'+n+"</div>");t.type==0&&i.find(".btnCancel").remove(),$("body").append(i),e.callback&&t.callback();var s="tipbox_"+r;this.currentPosition({divId:s,num:r,shade:t.isShade,position:t.position,istop:t.istop,touchmove:t.touchmove}),i.find(".closeBtn").unbind("click").bind("click",function(){var n=$(this).parents(".tipbox").attr("data-index"),r=$(this).parents(".tipbox");tip.tipsClosed({myIndeTipDiv:r,numIndex:n}),e.closeback&&t.closeback()}),i.find(".btnTipsubmit").unbind("click").bind("click",function(){var n=$(this).parents(".tipbox").attr("data-index"),r=$(this).parents(".tipbox");e.scallback&&t.scallback(),tip.tipsClosed({myIndeTipDiv:r,numIndex:n}),e.dcallback&&t.dcallback()})},centerDiv:function(e){var t={divId:"",isShade:!0,w:"96%",type:0,istop:!1,isbottom:!1,position:"absolute",p_new:0,touchmove:0,callback:function(){},zcallback:function(){},closeback:function(){}};e&&$.extend(t,e);var n=$(".modalMask").size();$("#"+t.divId).attr("data-index",n),$("#"+t.divId).css({width:t.w}),e.callback&&t.callback({num:n}),this.currentPosition({divId:t.divId,num:n,shade:t.isShade,position:t.position,callback:t.zcallback,istop:t.istop,touchmove:t.touchmove,isbottom:t.isbottom}),$(".closeBtnHtml").unbind("click").bind("click",function(){var n=$(this).parents(".tipbox").attr("data-index"),r=$(this).parents(".tipbox");tip.centerDivClosed({indexTipDiv:r,indexNum:n,type:t.type});var i=$("#bigcategorybox").attr("data-index");tip.centerDivClosed({indexNum:i,indexTipDiv:$("#bigcategorybox"),type:1}),e.closeback&&t.closeback()})},currentPosition:function(e){var t=e.position;if(t=="absolute")var n=this.getPageOffset().x+($("body").width()-$("#"+e.divId).width())/2,r=this.getPageOffset().y+(base.getHeightBody()-$("#"+e.divId).height())/2;else var n=($("body").width()-$("#"+e.divId).width())/2,r=(base.getHeightBody()-$("#"+e.divId).height())/2;var i=$(".modalMask").size()*90+9999,s=e.num;e.shade&&this.addShade({num:s,touchmove:e.touchmove}),r<=0&&!e.istop?r=20:e.istop&&(r=0),n<=0&&!e.istop?n=20:e.istop&&(n=0),e.isbottom==1?$("#"+e.divId).css({"z-index":i+1}).show():$("#"+e.divId).css({left:n,top:r,position:t,"z-index":i+1}).addClass("show loaded").show(),e.callback&&e.callback()},tipsClosed:function(e){var t=e.numIndex,n=e.myIndeTipDiv;n.remove(),$("#modalMask_"+t).remove(),e.callback&&e.callback()},centerDivClosed:function(e){var t={indexNum:"",indexTipDiv:"",type:0,callback:function(){}};e&&$.extend(t,e),t.type==1?(t.indexTipDiv.remove(),$("#modalMask_"+t.indexNum).remove()):t.type==2?(t.indexTipDiv.hide(),$("#modalMask_"+t.indexNum).remove()):(t.indexTipDiv.hide(),$("#modalMask_"+t.indexNum).hide()),e.callback&&t.callback()},addShade:function(e){var t=e.num,n=e.num*90+9998,r=document.createElement("div");r.id="modalMask_"+t,r.className="modalMask",$("body").append(r),$("#modalMask_"+t).show().css({"z-index":n}),e.touchmove==1&&$("#modalMask_"+t).bind("touchmove",function(e){e.preventDefault()})},getPageOffset:function(){var e={};return window.innerWidth?(e.x=window.pageXOffset,e.y=window.pageYOffset):document.documentElement&&document.documentElement.clientWidth?(e.x=document.documentElement.scrollLeft,e.y=document.documentElement.scrollTop):document.body.clientWidth&&(e.x=document.body.scrollLeft,e.y=document.body.scrollTop),e}},loginCheck=function(e){var t=!0;return islogin==0&&(e!=1&&tip.tips({htmlmsg:'<div style="padding:30px">'+base.lang.js_base_login_tip+"</div>",callback:function(){$(".btnTipsubmit").find(".buttonText").text(base.lang.js_base_login_btn)},scallback:function(){var e=encodeURIComponent(window.location.href);window.location.href="/index/reg.html?loginurl="+e+""}}),t=!1),t},shareweinxtip=function(e){var t=$(".share_tip").size(),n=$('<div id="share_bg_'+t+'" class="share_bg" data-index="'+t+'"></div>'),r=$('<div id="share_tip_'+t+'" class="share_tip '+e.class+'" data-index="'+t+'"></div>');$("body").append(n),$("body").append(r),$("#share_bg_"+t).show().css({"z-index":t+99990}),$("#share_tip_"+t).show().css({"z-index":t+99991}),e.callback&&e.callback($("#share_tip_"+t),$("#share_bg_"+t)),e.isclose!=0&&($("#share_tip_"+t).unbind("click").bind("click",function(){$("#share_tip_"+t).remove(),$("#share_bg_"+t).remove()}),$("#share_bg_"+t).unbind("click").bind("click",function(){$("#share_tip_"+t).remove(),$("#share_bg_"+t).remove()}))},closeTip=function(e,t){var n=e.attr("data-index"),r=1;t&&(r=t),tip.centerDivClosed({indexNum:n,indexTipDiv:e,type:r})},baiduShare=function(options){var settings={bdPic:"",bdText:"",url:"",title:"",desc:"",summary:"",site:"www.byshare.com",baidu:0};options&&$.extend(settings,options);if(settings.baidu==1){window._bd_share_config={common:{bdSnsKey:{tsina:3171756207},bdText:"",bdMini:"2",bdPic:settings.bdPic,bdStyle:"0",bdSize:"16"},share:{}};with(document)(0)[(getElementsByTagName("head")[0]||body).appendChild(createElement("script")).src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion="+~(-(new Date)/36e5)]}else{var share_Sina=function(){return'<a href="http://v.t.sina.com.cn/share/share.php?url='+encodeURIComponent(settings.url)+"&amp;title="+settings.title+"&amp;appkey=3171756207&amp;pic="+settings.bdPic+'" target="_blank" class="byshare_sns byshare_tsina" title="分享到新浪微博"></a>'},share_qqQzone=function(){return'<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(settings.url)+"&title="+encodeURI(settings.title)+"&pics="+settings.bdPic+"&summary="+encodeURI(settings.summary)+'" target="_blank" class="byshare_sns byshare_qzone" data-cmd="qzone" title="分享到QQ空间"></a>'},share_qq=function(){return'<a href="http://connect.qq.com/widget/shareqq/index.html?url='+settings.url+"&showcount=0&desc="+encodeURI(settings.desc)+"&summary="+encodeURI(settings.summary)+encodeURI(settings.url)+"&title="+encodeURI(settings.title)+"&site="+settings.site+"&pics="+settings.bdPic+'" class="byshare_sns byshare_qzone" data-cmd="qzone" title="分享到QQ空间"></a>'},share_weiXin=function(){wx.onMenuShareTimeline({title:"",link:"",imgUrl:"",success:function(){alert(11)},cancel:function(){alert(222)}})},html="";html+=share_qqQzone(),html+=share_Sina(),$("#share_sns").html(html)}},gzweixin=function(e){var t={callback:null,errcallback:null};$.extend(!0,t,e),ajax.ajaxInit({url:"/user/weixin_isguanzhu.html",params:{},callback:function(n){isback=1,$("#testStatus").text(n.status);if(n.status==1)isgzweixin=1,e.callback&&t.callback();else if(n.status==-1)islogin==0&&(window.location.href="/index/reg.html"),config.tip.tips({htmlmsg:'<div style="padding:30px">'+n.msg+"</div>",type:0,scallback:function(){window.location.href="http://mp.weixin.qq.com/s?__biz=MzA3NTM5Mzg2NA==&mid=206134523&idx=1&sn=b052274af6c6633a2e2db14c7a10e577#rd"}});else{var r=0;$(".headerbox").length>0&&(r=$(".headerbox").height()),$("#gzweixin").css({top:r}).show(),$("#gzclose").unbind("click").bind("click",function(){$("#gzweixin").hide()}),e.errcallback&&t.errcallback(n.msg)}}})},goTopExUtils=function(e){var t=e.divid;t.bind("click",function(){$("html,body").animate({scrollTop:0},100),t.hide()});var n=function(){return document.body.scrollTop+document.documentElement.scrollTop},r=function(e){navigator.appName=="Netscape"&&navigator.userAgent.toUpperCase().indexOf("CHROME")>0?document.body.scrollTop=e:document.documentElement.scrollTop=e};window.onscroll=function(){n()>0?t.fadeIn():t.fadeOut()}};return{base:base,tip:tip,loginCheck:loginCheck,shareweinxtip:shareweinxtip,closeTip:closeTip,baiduShare:baiduShare,gzweixin:gzweixin,goTopExUtils:goTopExUtils}});