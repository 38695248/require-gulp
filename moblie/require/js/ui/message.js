define(["jquery","ui/expression","config","ajax"],function(t,e,config,ajax) {
    var i = t("#content"),
    o = i.find(".msg-wrapper"),
    r = '',
	s = function(n,isimg,src){
		var ajaxfn = function(oisimg){
			var suid = $("#send").attr("data-suid");
			var tosuid = $("#send").attr("data-tosuid"); 
			var admin = $("#send").attr("data-admin"); 
			var gdid = $("#send").attr("data-gdid"); 
			var msg = n,submsg = n;
			var useravatar = $("#useravatar").attr("src");
			var type = 0;
			if(!isimg){
				submsg = e.getImgNum(submsg);
				msg = e.replace(msg);
			}else{
				submsg = n;
				msg = '<a href="'+src+'"><img class="up-img" src="'+src+'" /></a>';	
				type = 3;
			}
			var par = {};
			par.content = submsg;
			par.type = type;
			par.admin = admin;
			par.suid = suid;
			par.tosuid = tosuid;
			par.gdid = gdid;
			ajax.ajaxInit({
				url: '/message/sendmsg.html',
				params:par,
				callback:function(res){
					if(res.status == 1){
						var html = '<li class="self animated fadeInUp">'+
							'<i class="avatar self">'+
								'<img src="'+useravatar+'" class="lazy-mas userThumb">'+
							'</i>'+
							'<div class="msg-content">'+msg+'</div>'+
						  '</li>';	
						  o.append(html);
						  if(isimg){
						  	baguetteBox.run('.baguetteBoxOne');
						  }
						  require(["ui/scroll"],function(t) {
							 t.scrollToEnd();
						  })
					}else{
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							type:0
						});		
					}
				}
			});
		};
		var htmltest = '<li class="self animated fadeInUp">'+
			'<i class="avatar self">'+
				'<img src="http://7xkdoy.com2.z0.glb.qiniucdn.com/000/07/74/58.jpg?imageMogr2/gravity/Center/crop/500x500&amp;_=1443005537" class="lazy-mas userThumb">'+
			'</i>'+
			'<div class="msg-content">'+e.replace(n)+'</div>'+
		  '</li>';
		//console.log(n);e.replace(n)
		return ajaxfn(isimg);	
	},
	a = function(n){

		var o = "";
        if ("string" == typeof n) {
            if (o = t.trim(n).replace(/<[^>]*>/g, ""), !o) return;
        } else {
			o = n.data("msg").replace(/<[^>]*>/g, "");
		}
		return s(o);	
	};
    return {
        appendMsg: s,
        ask: a
    }
})