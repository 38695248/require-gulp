define(["jquery","config","base","ajax","mas"],function(e,t,n,r,i){var s=function(){o(),a()},o=function(){var t=e("#commentslist").attr("data-shareid");r.ajaxInit({url:"/comment/read.html",params:{page:1,pagenum:5,ajax:1,shid:t},callback:function(n){if(n.status==1){var r=u({datalist:n.data.rows}),s='<div class="pager" style="display: none;"><span class="pager-next"><a href="/comment/read.html?page=2&shid='+t+'&ajax=1&pagenum=10"></a></span> '+"</div>";e("#commentslist").append(r),e("#commentslist").after(s),i.init({div:"commentslist",dataType:"json",appendjsonback:function(t){var n=u({datalist:t.data.rows});e("#commentslist").append(n),e("#commentslist").find("img.lazy-mas").lazyload({})},callback:function(){c(),f()}})}}})},u=function(t){var n="";return e.each(t.datalist,function(e,t){var r='<span class="fr shareBtn reportComment reportBtn" data-type="comment" data-cmmid="'+t.cmmid+'" data-shid="'+t.shid+'"><em class="ico ico-reportComment"></em></span>',i="recommtbtn";t.isme&&(r='<span class="fr shareBtn reportComment delCommentBtn" data-cmmid="'+t.cmmid+'" data-shid="'+t.shid+'"><em class="ico ico-delComment"></em></span>',i=""),n+='<li class="line20 item '+i+'" data-fsuid="'+t.fsuid+'" data-fuid_uname="'+t.fuid_uname+'">'+'<div class="pl_t mb-5 rowbox">'+'<div class="avatar w30 mr-5">'+'<img src="'+t.avatar[2]+'" data-original="'+t.avatar[1]+'" class="lazy-mas userThumb" style="display: block;">'+"</div>"+'<div class="row-flex1 line30">'+r+t.fname+'<span class="color-999"> • '+t.edttime+"</span></div>"+"</div>"+'<div class="pl_cont mb-10">'+'<div class="pl_cont_text mb-10">'+t.comment+"</div>"+"</div>"+"</li>"}),n},a=function(){var t='<div id="footer_comment" class="footer footerbox commfooter"><div class="send-wrapper" style="border:none"> <span><button id="expression-toggle" class="btn-kf btn-exp"></button></span> <span class="cell-full"><input type="text" id="text-in" class="input input-send" maxlength="150" placeholder="亲，请输入您的评论内容" autocomplete="off"></span><span><button id="send" class="btn btn-send" data-type="share">评论</button></span></div><div id="control" class="question-control" style="display:none"><div id="expression" class="ui-slider swiper-container"><div id="swiper-wrapper" class="ui-slider-group swiper-wrapper"><div class="imgloading" style="height:100px; width:100%"></div></div><div class="swiper-pagination-kf text-center"></div></div></div></div>';e("body").append(t),require(["ui/textIn"],function(e){}),e("#expression-toggle").unbind("click").bind("click",function(){var t=e("#control").is(":visible");t?e("#control").hide():e("#control").show(),require(["ui/expression"],function(t){e(document).unbind("click").bind("click",function(t){var n=e(t.target);n.closest(e("#footer_comment")).length==0&&e("#control").hide()})})})},f=function(){e("#commentslist").find(".recommtbtn").unbind("click").bind("click",function(){event.stopPropagation();var t=e(this).attr("data-fuid_uname");t&&(t="回复 "+e(this).attr("data-fuid_uname")+" "),e("#text-in").val(t).focus()}),e(".btn-addpl").unbind("click").bind("click",function(){e("#text-in").focus()})},l=function(n,i,s){if(!n)return;var o=n;require(["ui/expression"],function(u){i?(n='<a href="'+s+'"><img class="up-img" src="'+s+'" /></a>',type=3):(o=u.getImgNum(o),n=u.replace(n));var a={};a.shareid=e("#commentslist").attr("data-shareid"),a.comment=o,a.fsuid="",r.ajaxInit({url:"/comment/add_comment.html",yzlogin:!0,params:a,callback:function(r){if(r.status==1){var i=e("#useravatar").attr("src"),s=e("#useravatar").attr("data-username"),o='<li class="line20 item"><div class="pl_t mb-5 rowbox"><div class="avatar w30 mr-5"><img src="'+i+'" class="userThumb" style="display: block;">'+"</div>"+'<div class="row-flex1 line30">'+s+'<span class="color-999"> • 刚刚</span></div>'+"</div>"+'<div class="pl_cont mb-10">'+'<div class="pl_cont_text mb-10">'+n+"</div>"+"</div>"+"</li>";e("#firstitem").after(o),e("#control").hide()}else t.tip.tips({w:"96%",htmlmsg:'<div style="padding:30px">'+r.msg+"</div>"})}})})},c=function(){e(".delCommentBtn").unbind("click").bind("click",function(n){event.stopPropagation();var i=e(this).attr("data-cmmid"),s=e(this).attr("data-shid"),o=e(this).parents(".item");t.tip.tips({w:"90%",htmlmsg:'<div style="padding:30px">'+t.base.lang.js_base_del_text+"</div>",scallback:function(){r.ajaxInit({url:"/comment/del_comment.html",params:{cmmid:i,shid:s},callback:function(e){e.status?o.remove():t.tip.tips({w:"90%",htmlmsg:'<div style="padding:30px">'+e.msg+"</div>"})}})}})})};return{init:s,addComment:l}});