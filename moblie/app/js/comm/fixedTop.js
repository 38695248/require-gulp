define(["jquery","fixedTop"],function(e){var t=function(t){var n={masdiv:e("#masonry_2"),choose_dh:e("#choose_dh"),"class":"masonry_dh_fixed",defclass:"masonry_dh_fixed",topHeight:80};e.extend(!0,n,t);var r=n.masdiv,i=n.choose_dh,s=n.class,o=n.defclass;r.fixedTop({isdiv:!0,topHeight:n.topHeight,scallback:function(){e(".headerbox").length>0?(i.addClass(s),r.css({"padding-top":0})):i.addClass(o)},ecallback:function(){e(".headerbox").length>0?(i.removeClass(s),r.css({"padding-top":0})):i.removeClass(o)}})};return{init:t}});