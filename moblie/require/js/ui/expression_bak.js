// 表情
define(["jquery"],function(t) {
    var e = t("#expression"),
    n = function() {
        var n = {
            items: [{
                img: "s31.png",
                desc: "微笑"
            },
            {
                img: "s05.png",
                desc: "大笑"
            },
            {
                img: "s20.png",
                desc: "露齿"
            },
            {
                img: "s28.png",
                desc: "偷笑"
            },
            {
                img: "s57.png",
                desc: "可爱"
            },
            {
                img: "s30.png",
                desc: "吐舌"
            },
            {
                img: "n10.png",
                desc: "嘚瑟"
            },
            {
                img: "s78.png",
                desc: "难过"
            },
            {
                img: "s04.png",
                desc: "大哭"
            },
            {
                img: "s61.png",
                desc: "流泪"
            },
            {
                img: "s02.png",
                desc: "安慰"
            },
            {
                img: "s17.png",
                desc: "可怜"
            },
            {
                img: "s32.png",
                desc: "委屈"
            },
            {
                img: "n07.png",
                desc: "失望"
            },
            {
                img: "n09.png",
                desc: "拜托"
            },
            {
                img: "s15.png",
                desc: "奸笑"
            },
            {
                img: "s18.png",
                desc: "酷"
            },
            {
                img: "s11.png",
                desc: "害羞"
            },
            {
                img: "s23.png",
                desc: "色"
            },
            {
                img: "s22.png",
                desc: "亲吻"
            },
            {
                img: "s07.png",
                desc: "飞吻"
            },
            {
                img: "s35.png",
                desc: "阴险"
            },
            {
                img: "s34.png",
                desc: "疑问"
            },
            {
                img: "s65.png",
                desc: "撇嘴"
            },
            {
                img: "s80.png",
                desc: "左哼哼"
            },
            {
                img: "s81.png",
                desc: "右哼哼"
            },
            {
                img: "s41.png",
                desc: "傲慢"
            },
            {
                img: "s89.png",
                desc: "白眼"
            },
            {
                img: "s73.png",
                desc: "抠鼻"
            },
            {
                img: "s27.png",
                desc: "叹气"
            },
            {
                img: "s14.png",
                desc: "哼"
            },
            {
                img: "s03.png",
                desc: "鄙视"
            },
            {
                img: "s25.png",
                desc: "衰"
            },
            {
                img: "s12.png",
                desc: "汗"
            },
            {
                img: "s13.png",
                desc: "黑线"
            },
            {
                img: "n06.png",
                desc: "懒得理你"
            },
            {
                img: "s37.png",
                desc: "晕"
            },
            {
                img: "s90.png",
                desc: "狂汗"
            },
            {
                img: "s88.png",
                desc: "石化"
            },
            {
                img: "s79.png",
                desc: "无奈"

            },
            {
                img: "s16.png",
                desc: "惊讶"
            },
            {
                img: "s72.png",
                desc: "震惊"
            },
            {
                img: "s55.png",
                desc: "惊恐"
            },
            {
                img: "s10.png",
                desc: "鬼脸"
            },
            {
                img: "s52.png",
                desc: "高兴"
            },
            {
                img: "n04.png",
                desc: "太高兴了"
            },
            {
                img: "s46.png",
                desc: "发呆"
            },
            {
                img: "s51.png",
                desc: "尴尬"
            },
            {
                img: "s42.png",
                desc: "闭嘴"
            },
            {
                img: "s92.png",
                desc: "嘘"
            },
            {
                img: "n03.png",
                desc: "思考"
            },
            {
                img: "s49.png",
                desc: "奋斗"
            },
            {
                img: "n08.png",
                desc: "敬礼"
            },
            {
                img: "s48.png",
                desc: "钱"
            },
            {
                img: "s43.png",
                desc: "大兵"
            },
            {
                img: "s09.png",
                desc: "鼓掌"
            },
            {
                img: "s82.png",
                desc: "加油"
            },
            {
                img: "s36.png",
                desc: "拥抱"
            },
            {
                img: "s50.png",
                desc: "疯狂"
            },
            {
                img: "s38.png",
                desc: "再见"
            },
            {
                img: "n05.png",
                desc: "潜水"
            },
            {
                img: "s91.png",
                desc: "对不起"
            },
            {
                img: "s40.png",
                desc: "抓狂"
            },
            {
                img: "s69.png",
                desc: "咒骂"
            },
            {
                img: "s08.png",
                desc: "愤怒"
            },
            {
                img: "s64.png",
                desc: "怒火"
            },
            {
                img: "s53.png",
                desc: "击打"
            },
            {
                img: "s83.png",
                desc: "凄凉"
            },
            {
                img: "n13.png",
                desc: "烦躁"
            },
            {
                img: "s47.png",
                desc: "犯困"
            },
            {
                img: "s26.png",
                desc: "睡觉"
            },
            {
                img: "s54.png",
                desc: "饥饿"
            },
            {
                img: "s59.png",
                desc: "口罩"
            },
            {
                img: "s24.png",
                desc: "生病"
            },
            {
                img: "s29.png",
                desc: "呕吐"
            },
            {
                img: "s60.png",
                desc: "骷髅"
            },
            {
                img: "n11.png",
                desc: "喇叭"
            },
            {
                img: "s01.png",
                desc: "爱心"
            },
            {
                img: "s75.png",
                desc: "心碎"
            },
            {
                img: "s77.png",
                desc: "示爱"
            },
            {
                img: "s21.png",
                desc: "玫瑰"
            },
            {
                img: "s76.png",
                desc: "凋谢"
            },
            {
                img: "s86.png",
                desc: "勾引"
            },
            {
                img: "s66.png",
                desc: "胜利"
            },
            {
                img: "s39.png",
                desc: "赞"
            },
            {
                img: "s87.png",
                desc: "弱"
            },
            {
                img: "n12.png",
                desc: "爱你"
            },
            {
                img: "s74.png",
                desc: "OK"
            },
            {
                img: "s85.png",
                desc: "NO"
            },
            {
                img: "s33.png",
                desc: "握手"
            },
            {
                img: "s84.png",
                desc: "蜡烛"
            },
            {
                img: "s70.png",
                desc: "猪猪"
            },
            {
                img: "s56.png",
                desc: "咖啡"
            },
            {
                img: "s06.png",
                desc: "蛋糕"
            },
            {
                img: "s62.png",
                desc: "米饭"
            },
            {
                img: "s19.png",
                desc: "礼物"
            },
            {
                img: "s58.png",
                desc: "可乐"
            },
            {
                img: "s63.png",
                desc: "柠檬"
            },
            {
                img: "s67.png",
                desc: "时间"
            },
            {
                img: "s71.png",
                desc: "足球"
            },
            {
                img: "n01.png",
                desc: "话筒"
            },
            {
                img: "s44.png",
                desc: "灯泡"
            },
            {
                img: "s45.png",
                desc: "电话"
            },
            {
                img: "s68.png",
                desc: "太阳"
            },
            {
                img: "n02.png",
                desc: "月亮"
            }],
            lineSize: 12,
            path: static_url+'/moblie/images/kefu/imgface/',
            getImgPath: function(e) {
                var i;
                return ! isNaN(1 * e) && e < n.items.length ? i = n.path + n.items[e].img: t.each(n.items,
                function(t, o) {
                    return o.desc == e ? (i = n.path + o.img, !1) : void 0
                }),
                i
            },
			getImgNum: function(e) {
                var i;
                return ! isNaN(1 * e) && e < n.items.length ? i = n.path + n.items[e].img: t.each(n.items,
                function(t, o) {
                    return o.desc == e ? (i = o.img, !1) : void 0
                }),
                i
            }
        },
        i = function() {
            var t = 1,
            i = n.items.length,
            o = i + 21 - i % 20,
            r = 0,
            s = '';
			s = '<div class="expression-wrapper swiper-slide">';
            for (r; o > r; r++) {
                if (r >= i && (r + t) % 7 == 0) {
                    s += '<span class="js-exp-del"><button class="btn btn-exp-del"></button></span></div>';
                    break
                } (r + t) % 21 || (t++, s += '<span class="js-exp-del"><button class="btn btn-exp-del"></button></span></div>', o > r + 2 && (s += '<div class="expression-wrapper swiper-slide">')),
                s += i > r ? '<span class="js-exp" exp="' + r + '" ><i style="background-image:url(' + n.getImgPath(r) + ')"></i></span>': "<span></span>"
            }
            s += "</div>",
			
            e.find("#swiper-wrapper").html(s)
        },
        o = !0,
        r = function() {
            if (e.is(":visible")) {
                //图片左右滚动
				var shareSwiper = new Swiper(e, {
					autoplay: false,//可选选项，自动滑动
					pagination : '.swiper-pagination-kf',
					loop : 0,
					loopAdditionalSlides : 1,
					onInit: function(swiper){
						
					}
				});
            }
        },
        s = function() {
            r();
            var n = null;
            t(window).on("resize",
            function() {
                return e.is(":visible") ? (clearTimeout(n), void(n = setTimeout(function() {
                    r()
                },
                150))) : void(o = !0)
            })
        },
        a = function() {
            e.on("click", ".js-exp",
            function() {
                var e = "[" + n.items[t(this).attr("exp")].desc + "]";
                require(["ui/textIn"],
                function(t) {
                    t.addInput(e, !0);
                })
            }),
            e.on("click", ".js-exp-del",
            function() {
                require(["ui/textIn"],
                function(t) {
                    t.delInput(!0)
                })
            })
        };
        t.extend(t, {
            expression: {
                getImg: n.getImgPath
            }
        }),
        i(),
        s(),
        a();
		
        var c = function() {
            o && r()
        },
        l = function(t) {
            return t.replace(/\[([^\[\]]+)]/g,
            function(t, e) {
                var i = n.getImgPath(e);
                return i ? '<img class="expression-img" onload="this.style.backgroundImage=\'none\';" src="' + i + '">': t
            })
        },
		num = function(t) {
            return t.replace(/\[([^\[\]]+)]/g,
            function(t, e) {
                var i = n.getImgNum(e);
                return i ? '[em]' + i + '[/em]': t
            })
        };
        return {
			getImgNum:num,
            getImgPath: n.getImgPath,
            rebuild: c,
            replace: l
        }
    };
    return n()
});