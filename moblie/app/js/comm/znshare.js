define(["jquery","config","comm/shareUtils"],function(e,t,n){var r=function(t){var r={ishid:"",shid:"",callback:function(){}};t&&e.extend(r,t),e(".btn-share").unbind("click").bind("click",function(){t.callback&&r.callback();var i=e(this).attr("data-iswebsite"),s=e(this).parents(".byshid").attr("data-shid"),o=e(this).parents(".byshid").attr("data-ishid");s||(s=r.shid),o||(o=r.ishid);var u="",a="",f="";if(i){var l=e(this).attr("data-bigimgurl"),c=600,h=500,p=new Image;p.src=l,u=p.width,a=p.height,u>c&&(a=c*a/u,u=c),a>h&&(u=h*u/a,a=h),f={imgUrl:l,w:u,h:a}}var d=i==1?i:0;n.addShareInit(f,{iswebsite:d,shid:s,ishid:o,share:"share"})})};return{znshare:r}});