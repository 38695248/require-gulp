define(["jquery","config","ajax","swiper","jquery_ui"],function(e,t,n){var r=function(r,s){function f(){n.ajaxInit({url:"/share/show_f_page.html?page=shareTipFirst",isloading:!0,yzlogin:!0,type:"GET",dataType:"html",params:{shid:u.shid,share:u.share},callback:function(n){e("body").append(n),e("#continueBtn").remove();var r=p(),o=e("#slide_01tip").find(".showPicImg").size()>1?1:0;t.tip.centerDiv({divId:"shareFirstTipbox",type:1,w:"100%",position:"fixed",istop:!0,callback:function(){s.callback&&u.callback()}});var a=new Swiper("#boxslider",{autoplay:!1,pagination:".swiper-pagination-ad",loop:!0,loopAdditionalSlides:1,onInit:function(t){g(r),u.share=="shere"&&e("#showPic").find(".showPicImg").each(function(t,n){e(this).setTagPos()})}});i(u)}})}function h(){n.ajaxInit({url:"/common/gettpl.html?name=shareTipFirst_new&ch=sns",isloading:!0,yzlogin:!0,type:"GET",dataType:"html",params:"",callback:function(n){e("body").append(n),t.tip.centerDiv({divId:"shareFirstTipbox",type:1,w:"100%",position:"fixed",istop:!0,callback:function(){s.callback&&u.callback()}}),m(o)}})}function p(){var n=0,r=e("#tiptop").height(),i=e("#tipbottom").height();if(t.base.browser.versions.ios||t.base.browser.versions.iPhone||t.base.browser.versions.iPad){var s=window.screen.availHeight;n=s-r-i-60}else if(t.base.browser.versions.android){var s=t.base.getHeightBody();n=s-r-i-40}else{var s=t.base.getHeightBody();n=s-r-i-40}return n}function d(t){t.find(".olddata").each(function(t,n){var r=e(this).attr("data-left"),i=e(this).attr("data-top"),s=r*u.proportion,o=i*u.proportion,a=e(this).parent(".showPicImg").width(),f=e(this).parent(".showPicImg").height(),l=e(this).find(".item-tag-box").width(),c=e(this).find(".item-tag-box").height(),h=(a-l)/2-s,p=(f-c)/2-o;e(this).find(".item-tag-box").css({left:h,top:p});var d=e(this).find(".item-tag-show").width()+10,v=a-s-d;v<0&&(e(this).find(".item-tag-show").css({right:24,left:"auto"}),e(this).find(".item-tag-show").find(".tip").addClass("tagRight")),u.opageXY={cpageX:r,cpageY:i},e(this).css({left:s,top:o})})}function v(e,t,n,r){var i=n,s=r,o=e,u=t;return u>s&&(o=s*o/u,u=s),o>i&&(u=i*u/o,o=i),{width:o,height:u}}function m(t){var n="",r="";e.each(t,function(e,t){var n=t.src,i=t.src,s="",o='<li data-bimgurl="'+t.key+'" data-simgurl="'+t.key+'" data-w="'+t.width+'" data-h="'+t.height+'" data-sw="'+t.swidth+'" data-sh="'+t.sheight+'" data-index="'+e+'">'+'<em class="ico ico-userclose" data-index="'+e+'"></em>'+'<a class="imghoverMask" href="javascript:void(0);">'+'<span class="hoverMask"></span>'+'<img src="'+n+'" />'+"</a>"+"</li>",u='<input class="defrdio" type="radio" name="isface" id="isface_'+e+'" value="1" />';e==0&&(u='<input class="defrdio" type="radio" name="isface" id="isface_'+e+'" value="1" checked="checked"/>');var a='<li class="swiper-slide" data-width="'+t.width+'"><form id="form_'+e+'" method="post" action="javascript:void(0);" data-w="'+t.width+'" data-h="'+t.height+'" data-sw="'+t.swidth+'" data-sh="'+t.sheight+'" data-bimgUrl="'+t.key+'" data-simgUrl="'+t.key+'" data-color="'+s+'" data-imgrel="'+t.key+'" class="showPicImg" style="width:'+t.width+"px;height:"+t.height+'px;">'+'<span class="defpic">'+u+'<label for="isface_'+e+'">设为封面</label></span>'+'<img class="picImg" src="'+n+'" style="width:'+t.width+"px height:"+t.height+'px">'+'<input type="hidden" value="" name="relBoxSize" class="relBoxSize">'+"</form></li>";r+=a}),e("#slide_01tip").html(r);var s=p(),o=e("#slide_01tip").find(".showPicImg").size()>1?1:0,a=new Swiper("#boxslider",{autoplay:!1,pagination:".swiper-pagination-ad",loop:!0,loopAdditionalSlides:1,onInit:function(t){g(s),u.share=="shere"&&e("#showPic").find(".showPicImg").each(function(t,n){e(this).setTagPos()})}});i(u)}function g(t){e("#showPic").find(".showPicImg").each(function(n,r){var i=e(this),s=Number(i.attr("data-w")),o=Number(i.attr("data-h")),a=o,f=s,h=e("body").width(),p=t;a>p&&(f=p*f/a,a=p),f>h&&(a=h*a/f,f=h);if(a<p){var v=(p-a)/2,m=p-v;i.css({"margin-top":v})}e("#showPic").css({height:p}),i.parent("li").css({width:h}),i.css({width:f,height:a}),i.find(".picImg").css({width:f,height:a}),i.find(".defrdio").unbind("click").bind("click",function(){e("#showPic").find(".defrdio").attr("checked",!1),e(this).attr("checked",!0)});var g=f/Number(s);u.proportion=g;var y=i.find(".item-tag");u.share=="share"&&d(i),l({proportion:g,parent:i,indexDiv:y,opageXY:u.opageXY,type:"",shid:u.shid,ishid:u.ishid,share:!0,iswebsite:u.iswebsite,ismjx:u.ismjx}),i.fadeIn(),i.siblings(".showPicImg").hide(),e("#addTagFromBox").hide(),c({tagdiv:i.find(".picImg"),index:n,isOri:u.isOri,proportion:g,boradid:u.boradid,shid:u.shid,ishid:u.ishid,share:u.share,ismjx:u.ismjx,callback:function(){}})})}function y(t,n,r){n.siblings("li").find(".imghoverMask").removeClass("current"),n.find(".imghoverMask").addClass("current");var i=e("#showPic").find(".showPicImg").eq(t),s=Number(i.attr("data-w")),o=Number(i.attr("data-h")),a=o,f=s,h=e("body").width(),p=r;a>p&&(f=p*f/a,a=p),f>h&&(a=h*a/f,f=h);var v=f/Number(s);u.proportion=v;if(a<p){var m=(p-a)/2,g=p-m;e("#showPic").css({"margin-top":m,height:g})}else e("#showPic").css({height:p});i.css({width:f,height:a}),i.find(".picImg").css({width:f,height:a});var y=i.find(".item-tag");u.share=="share"&&d(i),l({proportion:v,parent:i,indexDiv:y,opageXY:u.opageXY,type:"",shid:u.shid,ishid:u.ishid,share:!0,iswebsite:u.iswebsite,ismjx:u.ismjx}),i.fadeIn(),i.siblings(".showPicImg").hide(),e("#addTagFromBox").hide(),c({tagdiv:i.find(".picImg"),index:t,isOri:u.isOri,proportion:v,boradid:u.boradid,shid:u.shid,ishid:u.ishid,share:u.share,ismjx:u.ismjx,callback:function(){}})}function b(t){var n=e("#showPic_samll").find("li").eq(0);e("#showPic_samll").find("li").unbind("click").bind("click",function(){var n=e(this),r=e(this).index();y(r,n,t)}),y(0,n,t)}var o=r,u={color:"",share:"share",iswebsite:"",isOri:!1,shid:"",ishid:"",boradid:"",opageXY:"",proportion:1,ismjx:0,callback:function(){}};s&&e.extend(!0,u,s);var a=1;u.share=="share"&&f(),u.share=="up"&&h()},i=function(n){function o(){e(".btn-next").unbind("click").bind("click",function(){var n=[],i=e("#showPic").find(".showPicImg").size();e("#showPic").find(".showPicImg").each(function(o,u){var a=e(u),f=a.serializeJson();f.width=a.attr("data-w"),f.height=a.attr("data-h"),f.swidth=a.attr("data-sw"),f.sheight=a.attr("data-sh"),f.src=a.attr("data-bimgurl"),f.imgrel=a.attr("data-imgrel"),f.thumbpic=a.attr("data-simgurl"),f.color=a.attr("data-color"),f.shid=a.attr("data-shid"),n.push(f);if(o===i-1){var l=e("#shareFirstTipbox").attr("data-index");t.tip.centerDivClosed({indexNum:l,indexTipDiv:e("#shareFirstTipbox"),type:1}),s({dataFrom:n,boradid:r.boradid,share:r.share,shid:r.shid,ishid:r.ishid,ismjx:r.ismjx})}})})}var r={boradid:"",share:"",ishid:"",shid:"",ismjx:0};n&&e.extend(!0,r,n);var i=e("#showPic").find(".item-tag").attr("data-val");e("#shareFirstTipbox").find(".btn-one").removeClass("btn-danger-gray").addClass("btn-next"),o(r.boradid)},s=function(r){var i={dataFrom:{},thumbpic:"",boradid:"",share:"",shid:"",ishid:"",ismjx:0,callback:function(){}};r&&e.extend(!0,i,r),n.ajaxInit({url:"/share/show_f_page.html?page=shareTip",isloading:!0,type:"GET",dataType:"html",params:{share:i.share},callback:function(n){e("body").append(n),r.callback&&i.callback();var s=t.base.getHeightBody()-40;e("#shareTipbox").find(".tipcont").css({height:s}),e("#shareTipbox").find(".group_categoryList").css({height:s-213}),t.tip.centerDiv({divId:"shareTipbox",type:1,w:"100%",position:"fixed",istop:!0,callback:function(){f(i)}}),e(".cover-img img").attr("src",i.thumbpic),e("#picurlid").val(i.thumbpic)}})},o=function(r){var i={shid:"",pic:"",title:"",dataFrom:{},share:"",callback:function(){}};r&&e.extend(i,r);var s=window.location.href;if(i.share=="caiji"||i.share=="jietu")s="/";n.ajaxInit({url:"/share/show_f_page.html?page=shareSuccessTip",type:"GET",isloading:!0,dataType:"html",params:"",callback:function(n){e("body").append(n),r.callback&&i.callback(),t.tip.centerDiv({divId:"shareSuccessTipbox",type:1,callback:function(){var n="http://"+window.location.host;t.baiduShare({bdPic:i.pic,bdText:i.title,url:n+"/share/sharepage.html?shid="+i.shid,title:i.title,desc:i.title,summary:i.title}),e("#byshare_weixin").unbind("click").bind("click",function(){t.config.shareweinxtip({})}),e("#shareSuccessTipbox").find("#seeItNow").attr("href","/share/sharepage.html?shid="+i.shid)},closeback:function(){window.location="/share/sharepage.html?shid="+i.shid}})}})},u=function(r){var i={callback:function(){return!1}};r&&e.extend(i,r),n.ajaxInit({url:"/common/gettpl.html?name=addWebUrl&ch=sns",type:"GET",yzlogin:!0,isloading:!0,dataType:"html",params:"",callback:function(n){e("body").append(n),t.tip.centerDiv({divId:"addWebUrl",type:1,w:400}),e(".btnTipsubmit").unbind("click").bind("click",function(){var t=e("#webUrlInput").val();if(t=="")return e("#webUrlInput").siblings(".input_tip").show(),!1;e("#webUrlInput").siblings(".input_tip").hide(),window.location.href="/share/get_website_pics.html?websiteurl="+t})}}),r.callback&&i.callback()},a=function(r){var i={thisParent:"",shid:"",boradid:"",callback:function(){}};r&&e.extend(i,r);var s=window.location.href;n.ajaxInit({url:"/share/show_f_page.html?page=editShareTip&shid="+i.shid,type:"GET",isloading:!0,dataType:"html",params:"",callback:function(o){e("body").append(o),r.callback&&i.callback(),t.tip.centerDiv({divId:"editShareTipbox",type:1,callback:function(){e("#editShareFrom").checkInput({button:".editShareBtn",submitBtnFn:function(r,o){t.base.loadInit({status:1});var u=e(o).attr("data-type"),a=r.serializeJson();a.shid=i.shid;if(u=="del")var f="/share/del_pin.html";if(u=="edit")var f="/share/edit_pin.html";n.ajaxInit({url:f,params:a,callback:function(n){t.base.loadInit({status:0});if(n.status){var r=e("#editShareTipbox").attr("data-index");t.tip.centerDivClosed({indexTipDiv:e("#editShareTipbox"),indexNum:r,type:1}),t.tip.tips({htmlmsg:'<div style="padding:30px">'+n.msg+"</div>",type:0,scallback:function(){window.location.href=s}})}else t.tip.tips({type:0,htmlmsg:'<div style="padding:30px">'+n.msg+"</div>"}),t.base.loadInit({status:0})}})}})}}),f({boradid:i.boradid,ishid:i.ishid,shid:i.shid,ismjx:i.ismjx})}})},f=function(r){var i={boradid:"",share:"",ishid:"",shid:"",ismjx:0,maxNum:15};r&&e.extend(!0,i,r);var s=i.dataFrom,u=i.boradid,a=function(){n.ajaxInit({url:"/share/get_share_typename.html",callback:function(n){var r=n.data.rows,i="",s=0;e.each(r,function(e,t){var n='<li data-value="'+t.ucatid+'" class="boardprintitem">'+t.bname+"</li>";u==t.ucatid&&(s=e),i+=n}),e("#shareboard").find(".board_items").empty().append(i),e("#shareboard").selectUtils({deNum:s,isDef:!0,callback:function(){var n=e(".select_box").find(".select_analog");t.checkInputFun.initContext(n,t.checkInputFun.myIt),n.siblings("p").show(),t.checkInputFun.mycheckIn(n)}})}})};e("#description").unbind("input").bind("input",function(){var t=e(this).val().length,n=300-t;e("#descNum").text(n)}),e("#boardname").bind("input",function(){var r=e(this).val();r==""?(e(".creatbtn").unbind("click"),e(this).parents(".boardnamebox").siblings("button").removeClass("creatbtn")):(e(this).parents(".boardnamebox").siblings("button").addClass("creatbtn"),e(".creatbtn").unbind("click").bind("click",function(){$this=e(this);var r=e(this).siblings(".boardnamebox").find("#boardname").val();n.ajaxInit({url:"/share/add_share.html",params:{name:r},callback:function(n){n.status?e("#shareboard").find(".select_option").hide():t.tip.tips({htmlmsg:'<div style="padding:30px">'+n.msg+"</div>"})}})}))}),e("#bigcategoryBtn").unbind("click").bind("click",function(){function u(){e("#categorySub").unbind("click").bind("click",function(){var n=e("#categoryFrom").find("li.current").size();if(n<=0)e("#categoryText").html(lang.js_base_categorytext);else{var r="";e("#categoryFrom").find("li.current").each(function(t,n){var i=","+e(this).text();t==0&&(i=e(this).text()),r+=i}),e("#categoryText").html(r)}var i=e("#bigcategorybox").attr("data-index");t.tip.centerDivClosed({indexNum:i,indexTipDiv:e("#bigcategorybox"),type:0})}),e("#categoryFrom").undelegate("li.current","hover").delegate("li.current","hover",function(){e(this).toggleClass("hover")}),e("#categoryFrom").undelegate(".icoCurrent","click").delegate(".icoCurrent","click",function(){var t=e(this).attr("data-type");e(this).parent("li").removeClass("current"),e(this).parent("li").attr("data-isload",0);if(t==0){var n=e(this).parent("li").index();e("#smallDiv_"+n).remove()}}),e("#bigcategory").find("li").unbind("click").bind("click",function(){var t=e(this),r=t.attr("data-tagid"),i=t.attr("data-catid"),s=t.attr("data-attid"),o=t.attr("data-name"),u=t.attr("data-isload"),f=t.text(),l=t.index(),c=e(this).hasClass("current");c||a(t);if(u==0){var h=e("<div class='s_loadin_bg' style='position: relative;'></div>"),p=e("<div id='smallDiv_"+l+"' class='small_category' style='display:none'></div>");p.html(h),e("#sns_small_category").append(p),n.ajaxInit({url:"/share/show_f_page.html?page=sns_category_son&ch=sns",type:"GET",dataType:"html",params:{tagid:r,catid:i,attid:s,catname:f},callback:function(n){p.html(n).show(),t.attr("data-isload",1),e("#smallDiv_"+l).siblings(".small_category").hide(),e(".scategory").find("li").unbind("click").bind("click",function(){var t=e(this),n=e(this).hasClass("current");n||a(t)})},errCallback:function(){p.html("").hide(),t.attr("data-isload",1),e("#smallDiv_"+l).siblings(".small_category").hide()}})}else e("#smallDiv_"+l).siblings(".small_category").hide(),e("#smallDiv_"+l).show()})}function a(n){var r=n,s=e("#categoryFrom").find("li.current").size();s>=i.maxNum?t.tip.tips({htmlmsg:'<div style="padding:30px">'+lang.maxCategoryNum+"</div>",type:0}):f(r)}function f(t){var n=t,r=n.parent("ul");n.addClass("current hover"),n.find(".currentico").addClass("icoCurrent");var i="";r.find("li").each(function(t,n){var r=e(this).hasClass("current");if(r){var s=e(this).attr("data-tagid"),o=e(this).attr("data-catid"),u=e(this).attr("data-attid"),a=e(this).attr("data-name");if(o){var f=s+"|"+o+"|"+a+"_";i+=f}else if(u){var f=s+"|"+u+"|"+a+"_";i+=f}}}),n.siblings("input").val(i)}var r=e(this).parent(".select_box"),s=e("#bigcategorybox").size();if(s<=0)n.ajaxInit({url:"/share/show_f_page.html?page=sns_category&ch=sns",type:"GET",isloading:!0,dataType:"html",params:"",callback:function(n){e("body").append(n),t.tip.centerDiv({divId:"bigcategorybox",type:1,w:"95%"}),u()}});else{e("#bigcategorybox").show();var o=e("#bigcategorybox").attr("data-index");e("#modalMask_"+o).show(),u()}}),e("#shareFrom").checkInput({inputs:{Category:{isempty:[0],focusMsg:"",rightMsg:"",errorMsg:"valid"}},submitBtnFn:function(r){t.base.loadInit({status:1});var u=t.base.getQueryString("js_debug"),a=r.serializeJson(),f=e("#categoryFrom").serializeJson(),l=e.extend(!0,a,f),c=e("#upcontainer").attr("data-specialid"),h=e("#upcontainer").attr("data-gpid"),p="/share/add_pin.html";u&&(p="/share/add_pin.html?js_debug=1"),n.ajaxInit({url:p,params:{imgdata:s,board:l,share:i.share,shid:i.shid,ishid:i.ishid,special_id:c,gpid:h,is_mjx:i.ismjx},callback:function(n){u&&(alert(p),alert(n.status),alert(n.msg));if(n.status){t.base.loadInit({status:0});var r=e("#shareTipbox").attr("data-index");t.tip.centerDivClosed({indexNum:r,indexTipDiv:e("#shareTipbox"),type:1,w:600});var r=e("#bigcategorybox").attr("data-index");t.tip.centerDivClosed({indexNum:r,indexTipDiv:e("#bigcategorybox"),type:1});var s=n.data.shid,a=n.data.title,f=n.data.pic;o({shid:s,share:i.share,title:a,pic:f})}else t.base.loadInit({status:0}),t.tip.tips({htmlmsg:'<div style="padding:30px">'+n.msg+"</div>"})}})}})},l=function(r){function u(e,n,r){function o(t){t&&(e=t),e.attr("data-val",1),n=="cus"&&e.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-sCustomized"),n=="tag"&&e.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-stag"),n=="people"&&e.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-sPeople"),n=="place"&&e.find(".item-tag-label-ico").removeClass("item-tag-label-ico").addClass("ico ico-sPlace");var o=e.find(".byshareInputName").val();e.attr("data-type",n),e.find(".cilckItem").attr("data-type",n),e.find(".tip").html("<span>"+o+"</span>"),e.addClass("loaded"),e.find(".item-tag-show").removeClass("hide"),e.find(".item-tag-box").addClass("hide").hide(),e.find(".tag_itembox").removeClass("show"),e.removeClass("redy-tag").addClass("item-hover"),r&&r(),i(s),f(e),l()}e.find(".addTagTipBtn").unbind("click").bind("click",function(){var n=t.base.isNull(e.find("input").val());if(n)return!1;o(e)})}function a(){s.type=="tag"?e(".searchTag").inputSearch({url:"/search/search_liketag.html",callback:function(e,t){var n='<li class="userFlag" data-uid="1">'+t.tagtxt+"</li>";return n},bcallback:function(t,n,r,i){r.find(".userFlag").on("click",function(){var n=e(this).text(),r=e(this).attr("data-value")?e(this).attr("data-value"):e(this).val(),s=e(this).attr("data-uid");t.attr("value",n),i.attr("value",s),e(this).parents(".userCircleSelect").hide()})}}):s.type=="people"?e(".people").inputSearch({url:"/search/search_user_byname.html",callback:function(e,t){var n=t.avatar,r='<li class="userFlag" data-uid="'+t.suid+'">'+'<a class="userCircleAvatar">'+'<div class="fl mr-10">'+'<img class="avatar avatar_loading" src="'+n[2]+'" data-original="'+n[1]+'">'+"</div>"+'<div class="fl">'+'<h4 class="title">'+t.allname+"</h4>"+"</div>"+"</a>"+"</li>";return r},bcallback:function(t,n,r,i){r.find(".userFlag").on("click",function(){var n=e(this).find("h4").text(),r=e(this).attr("data-value")?e(this).attr("data-value"):e(this).val(),s=e(this).attr("data-uid");t.attr("value",n),i.attr("value",s),e(this).parents(".userCircleSelect").hide()})}}):s.type=="place"?e(".place_bak").inputSearch({url:"/search/search_likepalce.html",callback:function(e,t){var n='<li class="userFlag" data-uid="1">'+t.CityName+"</li>";return n},bcallback:function(t,n,r,i){r.find(".userFlag").on("click",function(){var n=e(this).text(),r=e(this).attr("data-value")?e(this).attr("data-value"):e(this).val(),s=e(this).attr("data-uid");t.attr("value",n),i.attr("value",s),e(this).parents(".userCircleSelect").hide()})}}):s.type=="cus"&&n.ajaxInit({url:"/goods/goodscats.html",callback:function(n){var r=n.data;e.each(r,function(t,n){var r='<li value="'+n.catid+'">'+n.catname+"</li>";e(".CategoryList").append(r)}),e(".select_box").selectUtils({callback:function(){var n=e(".select_box").find("input");t.checkInputFun.initContext(n,t.checkInputFun.myIt),n.siblings("p").show(),t.checkInputFun.mycheckIn(n)}})}})}var s={proportion:"",parent:"",indexDiv:"",iswebsite:"",opageXY:"",type:"",shid:"",ishid:"",share:"",boradid:"",ismjx:0};r&&e.extend(!0,s,r);var o=function(){var e=s.parent,t=s.indexDiv,n=s.opageXY.cpageX+"|"+s.opageXY.cpageY,r=s.type;u(t,r)},f=function(t){var n=t.find(".cilckItem"),r=n.parents(".showPicImg");n.draggable({containment:r,start:function(){},stop:function(t,n){var r=e(this),i=r.parent(".item-tag"),o=r.parents(".showPicImg"),u=i.position().left,a=i.position().top,f=u+r.position().left,l=a+r.position().top,c=f/s.proportion,h=l/s.proportion;i.find(".Coordinate").val(c+"|"+h),i.attr("data-left",c),i.attr("data-top",h);var p=o.width(),d=i.find(".item-tag-form").width()+12,v=f+d-p>0?1:0,m=d-f>0?1:0,g=i.find(".item-tag-form").width()+10;v&&(i.find(".item-tag-form").css({right:24,left:"auto"}),i.find(".item-tag-form").find(".tip").addClass("tagRight")),m&&(i.find(".item-tag-form").css({left:24,right:"auto"}),i.find(".item-tag-form").find(".tip").removeClass("tagRight"))}})};e(".delTipBtn").unbind("click").bind("click",function(){e(this).parents(".item-tag").remove(),s.indexDiv.find(".item-tag").each(function(t,n){var r=t;e(this).attr("id","addTagDiv_"+r)}),i(s)});var l=function(){e(".cilckItem").unbind("click").bind("click",function(){var n=e(this).attr("data-type"),r=e(this).siblings(".item-tag-box"),o=e(this).parents(".item-hover");t.tip.tips({w:"80%",htmlmsg:'<div style="padding:30px">'+t.base.lang.js_base_deltag+"</div>",scallback:function(){o.remove(),i(s)}})})};o(),s.share&&(l(),f(s.indexDiv))},c=function(t){var r={tagdiv:"",index:0,isOri:!1,maxNum:3,proportion:1,boradid:"",shid:"",ishid:"",share:"",callback:function(){}};t&&e.extend(r,t);var i=r.tagdiv,s=e("#addTagFromBox");i.unbind("click").bind("click",function(t){var n=t;o(n,e(this))}),r.isOri||e("#isOri").remove();var o=function(t,n){var r=n,i=r.parents(".showPicImg");s.fadeIn(),i.find(".redy-tag").remove();var o=t,a=i.find(".item-tag"),f=a.size(),l=i.height(),c=s.find(".addTagList"),h=(l-c.height())/2;a.find(".item-tag-box").addClass("hide"),a.find(".item-tag-box").parents(".item-tag").css({"z-index":0}),c.css({top:h}),c.find(".addTagBtn").unbind("click").bind("click",function(){var t=e(this).attr("data-type");s.fadeOut(function(){u(o,f,t,i)})}),e("#addTagFromBox").unbind("click").bind("click",function(){s.fadeOut()})},u=function(i,s,o,u){function E(e){e.find(".Coordinate").val(m+"|"+g),e.attr("data-left",m),e.attr("data-top",g);var t=b.parent(".showPicImg").width(),n=b.parent(".showPicImg").height(),r=b.find(".item-tag-box").width(),i=b.find(".item-tag-box").height(),s=(t-r)/2-d,o=(n-i)/2-v;b.find(".item-tag-box").css({left:s,top:o});var u=b.find(".item-tag-show").width()+10,a=t-d-u;a<0&&(b.find(".item-tag-show").css({right:24,left:"auto"}),b.find(".item-tag-show").find(".tip").addClass("tagRight"))}var a=u,f=document.createElement("div"),c=o,h=i.pageX,p=i.pageY,d=h-a.offset().left,v=p-a.offset().top,m=parseInt(d/r.proportion),g=parseInt(v/r.proportion),y={cpageX:m,cpageY:g};f.id="addTagDiv_"+r.index+"_"+s,f.className="item-tag redy-tag darg-tag",a.append(f);var b=e("#addTagDiv_"+r.index+"_"+s);b.attr("data-val",0);var w="/common/gettpl.html?name=tagTip&ch=sns";c=="cus"?w="/common/gettpl.html?name=customizedTip&ch=buy":c=="place"?w="/common/gettpl.html?name=placeTip&ch=sns":c=="people"&&(w="/common/gettpl.html?name=peopleTip&ch=sns"),n.ajaxInit({url:w,type:"GET",dataType:"html",params:"",callback:function(e){b.append(e).css({left:d,top:v}).fadeIn(),E(b),l({proportion:r.proportion,parent:a,indexDiv:b,opageXY:y,type:c,shid:r.shid,ishid:r.ishid,boradid:r.boradid,share:r.share,ismjx:r.ismjx})}}),t.callback&&r.callback()}};return{addShareInit:r}});