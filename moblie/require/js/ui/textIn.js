define(["jquery"],function(t) {
    var e = t("#text-in"),
    n = t("#control"),
    i = t("#send"),
    o = function(t) {
        var n = e.val(),
        i = n.length;
        if (i) {
            var o = i,
            r = n.substring(0, o),
            s = n.substr(o),
            a = r.replace(/(\[[^\[\]]+])$/g, "");
            a == r && (a = r.substring(0, o - 1)); {
                a.length
            }
            e.val(a + s),
            e.trigger("change"),
            t && e.scrollTop(1e4)
        }
    },
    r = function(t, n) {
        if (t) {
            var i = e.val(),
            o = i.length;
            if (! (o >= parseInt(e.attr("maxlength")))) {
                {
                    var r = o,
                    s = i.substring(0, r),
                    a = i.substr(r),
                    c = s + t;
                    c.length
                }
                e.val(c + a),
                e.trigger("change"),
                n && e.scrollTop(1e4)
            }
        }
    },
    s = function() {
		
		if(i.attr("data-type") == 'share'){
			//分享评论
			require(["comm/comments"],function(t) {
				t.addComment(e.val()),
				e.val("")
			})
		}else{
			
			//留言
			require(["ui/message"],function(t) {
				t.ask(e.val()),
				e.val("")
			})
		}
    };
    return i.click(s),
	
    e.on("keydown keyup change",
    function(t) {
		//console.log(t);
        13 == t.keyCode && (t.preventDefault(), s())
    }).on("focus blur",
    function(e) {
       
    }),
    {
        delInput: o,
        addInput: r
    }
})