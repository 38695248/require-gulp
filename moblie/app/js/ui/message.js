define(["jquery","ui/expression","config","ajax"],function(e,t,n,r){var i=e("#content"),s=i.find(".msg-wrapper"),o="",u=function(e,i,o){var u=function(u){var a=$("#send").attr("data-suid"),f=$("#send").attr("data-tosuid"),l=$("#send").attr("data-admin"),c=$("#send").attr("data-gdid"),h=e,p=e,d=$("#useravatar").attr("src"),v=0;i?(p=e,h='<a href="'+o+'"><img class="up-img" src="'+o+'" /></a>',v=3):(p=t.getImgNum(p),h=t.replace(h));var m={};m.content=p,m.type=v,m.admin=l,m.suid=a,m.tosuid=f,m.gdid=c,r.ajaxInit({url:"/message/sendmsg.html",params:m,callback:function(e){if(e.status==1){var t='<li class="self animated fadeInUp"><i class="avatar self"><img src="'+d+'" class="lazy-mas userThumb">'+"</i>"+'<div class="msg-content">'+h+"</div>"+"</li>";s.append(t),i&&baguetteBox.run(".baguetteBoxOne"),require(["ui/scroll"],function(e){e.scrollToEnd()})}else n.tip.tips({htmlmsg:'<div style="padding:30px">'+e.msg+"</div>",type:0})}})},a='<li class="self animated fadeInUp"><i class="avatar self"><img src="http://7xkdoy.com2.z0.glb.qiniucdn.com/000/07/74/58.jpg?imageMogr2/gravity/Center/crop/500x500&amp;_=1443005537" class="lazy-mas userThumb"></i><div class="msg-content">'+t.replace(e)+"</div>"+"</li>";return u(i)},a=function(t){var n="";if("string"==typeof t){if(n=e.trim(t).replace(/<[^>]*>/g,""),!n)return}else n=t.data("msg").replace(/<[^>]*>/g,"");return u(n)};return{appendMsg:u,ask:a}});