// 详细页PJAX
define(['jquery','config','jquerypjax'],function($,config){
	var pjaxInt = function(){
		if($("#appendbox").length>0){
			return false;	
		}
		/**/
		$('body').append('<div id="appendbox"></div>');
		$('body').append('<div id="viewloadingMask" class="loadingMask" style="z-index:9989;display:none"></div>');
		
		$(document).pjax('a.pjax', '#appendbox');
		$(document).on('pjax:send', function() {
			$('#loadingMask').show();
		});
		$(document).on('pjax:complete', function() {
			$("#viewpage").find(".contentbox").addClass('viewpage canClose');
			$("#viewpage").find(".headerbox_view").css({"z-index":1003});
			$("#appendbox").append('<div class="viewpage_bg" style="z-index:1001;"></div>');
			$('#loadingMask').hide();
			$("body").css({"overflow":"hidden"});
			//$("#page_cont").hide();
			var type = 'goods';
			require(['share'],function(share){
				shareView = 1;	
				share.shareViewcomm();
			});
		});
		
	};
	return {pjaxInt:pjaxInt};
});