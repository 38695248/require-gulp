define(["jquery","config","base","ajax","checkInput","checkboxFn","serializeJson"],function(e,t,n,r){var i=function(n){if(e("#custom-list").length>0)return o({page:n.page}),!1;r.ajaxInit({url:"/goods/sel_sku.html",type:"GET",params:{ajax:1,gdid:n.gdid},callback:function(r){r.status==1?(e("body").append(r.data.html),o({page:n.page})):t.tip.tips({htmlmsg:'<div style="padding:30px">'+r.msg+"</div>",type:0})}})},s=[],o=function(n){n.page=="goodscut"?d({page:n.page}):e(".btn-cuscom").unbind("click").bind("click",function(){var n=e(this).attr("data-type"),r=e(this).attr("data-iszc"),i=e(this).attr("data-isfirst"),s=Number(e(this).attr("data-money"));s+=Math.floor(Math.random()*10+10)/100*s,s=s.toFixed(2),n=="bargain"?t.tip.tips({htmlmsg:'<div style="padding:30px" class="line24">亲，为了让您更容易获得更多<span class="color-red">“0元砍价"</span>商品，若您本次砍价成功，百享将随机收取服务费（<span class="color-red">0 ~ '+s+'元</span>），用于<span class="color-red">“0元砍价"</span>活动长期健康发展。</div>',callback:function(){e(".tipbox").find(".btnTipsubmit").text("同意")},scallback:function(){d({type:n,iszc:r})}}):d({type:n,iszc:r})})},u=function(t){e(".viewSub").find("li").unbind("click").bind("click",function(){var n=e(this).attr("data-sub"),r=e(this).attr("data-type"),i=e(this).attr("data-tagid"),s=e(this).attr("data-isbuy"),o=e(this).hasClass("current");o?r!="color"&&r!="size"&&r!="crowd"&&(e(this).removeClass("current"),e(this).siblings(".thisval").val(""),e(this).siblings(".thisval").attr("data-tagid","")):(e(this).addClass("current"),e(this).siblings("li").removeClass("current"),e(this).siblings(".thisval").val(n),e(this).siblings(".thisval").attr("data-tagid",i));if(r=="color"||r=="size"||r=="crowd"){var u=e(this).parent(".viewSub");u.checkboxFn({checkbox:"hidden"})}f(t),r!="crowd"})},a=function(){var t=Math.ceil(e("#thisprice").attr("data-price")),n=Math.ceil(t*.5),r=Math.ceil(t*.6),i=Math.ceil(t*.7),s='<li data-type="crowd" data-sub="2">'+n+"元</li>"+'<li data-type="crowd" data-sub="3">'+r+"元</li>"+'<li data-type="crowd" data-sub="4">'+i+"元</li>"+'<input class="thisval" name="reward_rate" type="hidden" value="">'+'<p class="blank0"></p>';e("#crowd-list").html(s),u({type:"crowd"})},f=function(t){var n=0,r=e("#other_attributes").find(".current").size();r>0?(e("#goods_infor_text").show(),e("#goods_infor_numbox").hide()):(e("#goods_infor_text").hide(),e("#goods_infor_numbox").show()),e("#other_attributes").find(".current").each(function(t,r){n+=Number(e(this).attr("data-addprice"))});var i=e("#viewColor-list").find(".thisval").attr("data-tagid")+"_"+e("#viewSize-list").find(".thisval").attr("data-tagid");if(s[i]){n+=Number(s[i][0]),e("#thisprice").html(exrtitle+n.toFixed(2)),e("#thisprice").attr("data-price",n.toFixed(2)),e("#goods_infor_num").html(s[i][1]),e("#maxNum").attr("data-max",s[i][1]);var o=0;if(t.type=="bargain"||t.type=="tryon"||t.type=="crowd")o=1;c({unbind:o}),s[i][1]<=0?(e("#add-zc-btn,#add-dz-btn,#add-kj-btn").addClass("btn-pri-gray").text("库存不足"),e("#isbuy").val(0)):(e("#add-zc-btn,#add-dz-btn,#add-kj-btn").removeClass("btn-pri-gray").text("确定"),e("#isbuy").val(1))}else{var u=e("#thisprice").attr("data-defprice");n+=Number(u),e("#thisprice").html(exrtitle+n.toFixed(2)),e("#thisprice").attr("data-price",n.toFixed(2))}},l=function(n){function o(){r.ajaxInit({url:"/common/gettpl.html?name=b_bodydata&ch=buy",type:"GET",yzlogin:!0,dataType:"html",params:{gdid:s},callback:function(o){e("body").append(o),a({gdid:s}),h(),e("#b_privateFrom").checkInput({buttonDiv:"#button_submit",validatetype:0,submitBtnFn:function(s){var o=s.serializeJson(),u=e.extend(!0,n.dataFrom,o);r.ajaxInit({url:i,params:u,callback:function(e){if(e.status){var r="/myorder/mycart.html";n.type=="crowd"&&(r="/myorder/uni2pay.html?type=wxh5&orderid="+e.data.orderid),window.location=r}else t.tip.tips({htmlmsg:'<div style="padding:30px">'+e.msg+"</div>",type:0})}})}})}})}function u(){var n=e("#b_bodydata_info").attr("data-index");t.tip.centerDivClosed({indexNum:n,indexTipDiv:e("#b_bodydata_info"),type:1})}function a(n){var i={bdid:"",dataFrom:"",otype:""};n&&e.extend(i,n),r.ajaxInit({url:"/myorder/body_data.html",params:{act:"list"},callback:function(n){if(n.status==1){var r="",s='<option value="">新增定制人</option>';e.each(n.data,function(e,t){var n='<option value="'+t.bdid+'" selected="selected">'+t.title+"</option>";r+=n}),e("#datanamelist").html(s+r);var o=e("#datanamelist").val();f({bdid:o,dataFrom:i.dataFrom,otype:i.otype}),c()}else t.tip.tips({type:0,htmlmsg:'<div style="padding:30px">'+n.msg+"</div>",scallback:function(){u({closeDiv:"b_private"})}})}})}function f(n){var i={bdid:"",otype:"",dataFrom:""};n&&e.extend(i,n);var s="/myorder/body_data.html",o=e("#privateForm").attr("data-gdid");r.ajaxInit({url:s,yzlogin:!0,isloading:!0,params:{gdid:o,act:"get",bdid:i.bdid},callback:function(n){n.status?(e("#bodydatainfo").html(n.data).show(),e("#button_submit").show()):t.tip.tips({w:350,htmlmsg:'<div style="padding:30px">'+n.msg+"</div>",type:0,scallback:function(){e("#button_submit").hide()}});var s=e("#bodyid").val();s||e("#delbodydataBtn").hide(),l(),e("#delbodydataBtn").unbind("click").bind("click",function(){var n="/myorder/body_data.html",i=e(this).attr("data-type"),s=e(this).attr("data-bdid");r.ajaxInit({url:n,params:{bdid:s,act:i},callback:function(e){e.status==1?a({bdid:e.data.bdid,otype:1}):t.tip.tips({w:350,htmlmsg:'<div style="padding:30px">'+e.msg+"</div>"})}})}),e("#txlist").find("dd").unbind("click").bind("click",function(){e(this).addClass("current"),e(this).siblings("dd").removeClass("current");var t=e(this).attr("data-val");e(this).siblings("input").val(t)}),i.otype||t.tip.centerDiv({divId:"b_private",type:1,callback:function(){}})}})}function l(){e("#txlist").find("dd").each(function(t,n){var r=e(this).attr("data-val"),i=e(this).siblings("input").val();r==i&&(e(this).addClass("current"),e(this).siblings("dd").removeClass("current"))})}function c(){e("#datanamelist").change(function(){var t=e(this).val();f({bdid:t,otype:1})})}function h(){e(".bodydataBtn").unbind("click").bind("click",function(){var t=e(this).attr("data-type"),n="",r=e(this).attr("data-gdid");t=="edt"&&(n=e("#datanamelist").val()),e("#datanamelist").val(""),f({otype:1})})}var i=e("#privateForm").attr("data-action");n.type=="crowd"&&(i="/m_raise/goodsraise_adddo.html");var s=e("#privateForm").attr("data-gdid");o()},c=function(t){require(["plus"],function(){var n=e("#maxNum").attr("data-max");n||(n=99999),e(".buynum").plus({maxNum:n,unbind:t.unbind})})},h=function(){var t=e("#datanamelist").find("option").size();t<=0?e("#edtbodydataBtn").hide():e("#edtbodydataBtn").show()},p=function(){e("#privateForm").find(".thisval").val(""),e(".color-list").find("li").removeClass("current"),e("#privateForm").find(".viewSub").removeClass("error_validate")},d=function(n){u(n),p();var i=e("#price_stock").val(),o=i.split("|");e.each(o,function(e,t){if(t!=""){var n=t.split("_");s[n[0]+"_"+n[1]]=[n[2],n[3]]}}),e("#crowd-box").hide(),e("#crowd-box-btn").hide(),e("#bargain-box").hide(),e("#bargain-box-btn").hide(),e("#buy-box-btn").hide(),e("#tryon-box-btn").hide(),n.type=="buy"||n.type=="addcart"?(e("#buy-box-btn").show(),e("#buy-box").show(),c({}),v({type:n.type})):n.type=="crowd"?(e("#crowd-box").show(),e("#crowd-box-btn").show(),a(),e("#crow-des").unbind("click").bind("click",function(){e(this).blur(),t.tip.centerDiv({divId:"des_crowdtip",position:"fixed",istop:1,w:"100%",touchmove:1,callback:function(){var n=e("#sub-des").val(),r=e("#sub-mobile").val();e("#crow-des-tip").val(n),e("#crow-des-mobile").val(r),e("#des_crowdform").checkInput({validatetype:0,button:"#des-tip-btn",submitBtnFn:function(n){var r=e("#crow-des-tip").val(),i=e("#crow-des-mobile").val();e("#crow-des").val(r),e("#sub-des").val(r),e("#sub-mobile").val(i),e("#crowd-textarea").checkboxFn({checkbox:"text",chird:1}),t.closeTip(e("#des_crowdtip"),2)}})}})}),c({unbind:1}),v({type:n.type})):n.type=="bargain"?(e("#bargain-box").show(),e("#bargain-box-btn").show(),e("#bargain-des").unbind("click").bind("click",function(){e(this).blur(),t.tip.centerDiv({divId:"des_bargaintip",position:"fixed",istop:1,w:"100%",touchmove:1,callback:function(){var n=e("#sub-des").val(),r=e("#sub-mobile").val();e("#bargain-des-tip").val(n),e("#bargain-des-mobile").val(r),e("#des_bargainform").checkInput({validatetype:0,button:"#des-bargain-btn",submitBtnFn:function(n){var r=e("#bargain-des-tip").val(),i=e("#bargain-des-mobile").val();e("#bargain-des").val(r),e("#sub-des").val(r),e("#sub-mobile").val(i),e("#bargaind-textarea").checkboxFn({checkbox:"text",chird:1}),t.closeTip(e("#des_bargaintip"),2)}})}})}),c({unbind:1}),v({type:n.type})):n.type=="tryon"?t.shareweinxtip({"class":"share_tip_tryon",callback:function(i){var s='<img src="'+static_url+'/moblie/images/activity/sc_01.png?v=1" /><img id="tryon_tip_btn" src="'+static_url+'/moblie/images/activity/sc_02.png" />';i.html(s),e("#tryon_tip_btn").unbind("click").bind("click",function(){var i=e("#privateForm").attr("data-gdid");r.ajaxInit({url:"/m_tryon/iscan.html",params:{gdid:i},callback:function(r){if(!r.status)return t.tip.tips({htmlmsg:'<div style="padding:30px">'+r.msg+"</div>",type:0}),!1;c({unbind:1}),v({type:n.type}),e("#tryon-box-btn").show()}})})}}):(e("#buy-box-btn").show(),c({unbind:1}),v({page:n.page}))},v=function(i){e("#custom-list-modalMask").show(),e("#custom-list").show(),document.body.style.overflow="hidden",e("#custom-list-modalMask").bind("touchmove",function(e){e.preventDefault()}),event.stopPropagation();var s=t.base.getHeightBody()-110;e("#custom-cont").css({height:s}),e("#custom-list-modalMask,.custom-close").unbind("click").bind("click",function(){e("#custom-list").hide(),e("#custom-list-modalMask").hide(),document.body.style.overflow="auto"}),e("#privateForm").checkInput({validatetype:0,button:".add-submit-btn",submitBtnFn:function(s){var o=e("#isbuy").val();if(o<1)return!1;var u=e("#viewColor-list").checkboxFn({checkbox:"hidden"}),a=e("#viewSize-list").checkboxFn({checkbox:"hidden"});if(i.type=="crowd"){var f=e("#crowd-list").checkboxFn({checkbox:"hidden"}),c=e("#crowd-textarea").checkboxFn({checkbox:"text",chird:1});if(!f)return!1;if(!c)return!1}if(i.type=="bargain"){var h=e("#bargain-textarea").checkboxFn({checkbox:"text",chird:1});if(!h)return!1}if(!u)return!1;if(!a)return!1;var p=e("#viewSize-list").find(".thisval").val(),d=s.serializeJson();if(p=="bodydata"){l({dataFrom:d,type:i.type});return}var v=e("#privateForm").attr("data-action"),m=d;if(i.type=="crowd")v="/m_raise/goodsraise_adddo.html";else if(i.type=="bargain")v="/m_cut/goodscut_adddo.html";else if(i.type=="tryon")v="/m_tryon/tryno_do.html";else if(i.page=="goodscut"){var g=e("#cutid").val();v="/m_cut/sku_edt.html",m.cutid=g}t.base.loadInit({status:1}),r.ajaxInit({url:v,params:m,callback:function(r){if(r.status){var s="/myorder/mycart.html";i.type=="crowd"?s="/m_raise/goodsraise.html?id="+r.data.id+"&js_first=1":i.type=="bargain"?s="/m_cut/goodscut.html?id="+r.data.id+"&js_first=1":i.type=="tryon"?s=r.data.url:i.page=="goodscut"&&(s="/m_cut/goodscut_end.html?cutid="+g),i.type=="addcart"?(e(".cartItemnum").size()>0&&n.getCartInit(),e("#custom-list-modalMask,#custom-list").hide(),t.base.loadInit({status:0})):window.location=s}else t.tip.tips({htmlmsg:'<div style="padding:30px">'+r.msg+"</div>",type:0}),t.base.loadInit({status:0})}})}})};return{init:i}});