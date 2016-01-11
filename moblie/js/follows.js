// JavaScript Document
var Follows = function(){
	var followsInit = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
		MasonryUtils.masonryInit({masonry:"masonry",issearch:false,islazy:1});//瀑布流初始化
	};
	return {followsInit:followsInit}
}();

