define(["jquery","config","comm/shareUtils"],function(e,t,n){var r=function(n){var r={uid:"",shid:"",boradid:"",message:""};n&&e.extend(r,n);if(r.uid==suid&&suid!=="")return t.tip.tips({type:0,htmlmsg:'<div style="padding:30px">'+lang.js_base_yourself+"</div>",scallback:function(){t.closeTip(e("#chatbox"))}}),!1;var s=e("#msgUserList").find(".msgUser").size();s>5&&e("#msgUserList").find(".msgUser").eq(0).remove(),e("#btn-sendmsg").attr("data-uid",r.uid);var o=function(){e("#msgBox").find(".msgclose").unbind("click").bind("click",function(){e("#msgListBox").hide(),e("#msgUserList").find(".msgimgbox").attr("data-isclick",0)}),e("#massegeBox").find(".masseg-heard").hover(function(){e(this).find(".ico-reportMsgBtn").show()},function(){e(this).find(".ico-reportMsgBtn").hide()}),i(),snsReport(),e("#msgBox").find(".msgimgbox").unbind("click").bind("click",function(t){var n=e(this),r=e("#msgListBox"),i=n.attr("data-isclick"),s=r.attr("data-isopen"),o=n.attr("data-uid"),f=n.attr("data-msgid");return e("#btn-sendmsg").attr("data-uid",o),e("#msgListBox").show(),a(n),i==0?(e("#msgUserList").find(".msgimgbox").attr("data-isclick",0),n.attr("data-isclick",1),r.show(function(){u(o)}),!1):(e("#msgUserList").find(".msgimgbox").attr("data-isclick",0),n.attr("data-isclick",1),s==1?(r.attr("data-isopen",0),r.hide(),!1):(r.attr("data-isopen",1),r.show(),!1))})},u=function(t){var n=e("<div class='lazy loadin_bg'></div>");e("#massegeBox").append(n);var i=t,s="/share/show_f_page.html?page=snsmsg&uid="+r.uid+"&shid="+r.shid+"&ucatid="+r.boradid+"&message="+r.message;i&&(s="/share/show_f_page.html?page=snsmsg&uid="+i+""),AjaxFunUtils.ajaxInit({url:s,type:"GET",dataType:"html",params:{},callback:function(t){e("#massegeBox").html(t);var n=e("#massegeBox").find(".messagesContent");n.scrollTop(n[0].scrollHeight),o(),e("#massegeBox").find(".avatar_loading").each(function(t,n){e(this).checkImgExists()})}})},a=function(t){var n;if(t)var n=t;else e("#msgUserList").find(".msgimgbox").each(function(t,r){var i=e(this).attr("data-isclick");i==1&&(n=e(this))});var r=e("#msgListBox"),i=e("#msgBox").offset().top,s=r.height(),o=e("#msgBox").height(),u=n.offset().top-i,a=s-o+u-5;r.find(".ico-lightGray").css({top:a}),r.show()},f=function(){AjaxFunUtils.ajaxInit({url:"/user/getuserbaseinfo.html",yzlogin:!0,params:{suid:r.uid},callback:function(n){if(n.status!=1)return t.tip.tips({htmlmsg:'<div style="padding:30px">'+n.msg+"</div>"}),!1;var i='<div class="msgUser" data-uid="'+n.data.suid+'">'+'<div class="msgUserImg">'+'<div class="msgimgbox" data-uid="'+n.data.suid+'"  data-isclick="1"> '+'<img class="head avatar_loading" src="'+n.data.avatar[2]+'" data-original="'+n.data.avatar[1]+'"> '+"</div>"+'<em class="ico ico-userclose" data-uid="'+n.data.suid+'"></em> '+"</div>"+"</div>";e("#msgUserList").find(".msgimgbox").attr("data-isclick",0),e("#msgUserList").find(".msgUser").each(function(t,n){var i=e(this).attr("data-uid");i==r.uid&&e(this).remove()}),e("#msgUserList").append(i);var s=e("#msgUserList").find(".msgUser").size();s>5&&e("#msgUserList").find(".msgUser").first().detach(),e("#msgBox").fadeIn(),e("#msgUserList").find(".avatar_loading").each(function(t,n){e(this).checkImgExists()}),a(),e("#msgBox").find(".msgUserImg").hover(function(){e(this).find(".ico-userclose").show()},function(){e(this).find(".ico-userclose").hide()}),e("#msgBox").find(".ico-userclose").unbind("click").bind("click",function(){var t=e(this).parents(".msgUser"),n=e(this).siblings(".msgimgbox").attr("data-isclick");n==1&&e("#msgListBox").hide(),t.remove()})}})};u()},i=function(){e("#msgsendForm").checkInput({button:"#btn-sendmsg",submitBtnFn:function(n,r){var i=e("#msgsendForm"),s=i.find(".msg-input"),o=e("#massegeBox").find(".msg-list"),u=i.find(".content-input").val(),a=e("#btn-sendmsg").attr("data-uid");AjaxFunUtils.ajaxInit({url:"/message/sendmsg.html",params:{content:u,tosuid:a},callback:function(n){if(n.status==1){var r='<li class="messageWrapper"><div class="cmmMessage isOwnMessage"> <em class="ico ico-caret"></em><p>'+u+"</p></div></li>";o.append(r),i.find(".content-input").val("");var s=e("#massegeBox").find(".messagesContent");s.scrollTop(s[0].scrollHeight)}else t.tip.tips({htmlmsg:'<div style="padding:30px">'+n.msg+"</div>"})}})}})};return{msgInit:r}});