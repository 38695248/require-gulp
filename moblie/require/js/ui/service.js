define(["jquery"],function(t, e) {
    var n = "source=",
    i = {
        getHistory: {
            method: "GET",
            url: "/getChatRecord?" + n
        },
        feedback: {
            method: "POST",
            url: "/satisfiedType?entrance_source=8&" + n
        },
        invite: {
            method: "POST",
            url: "/satisfiedType?entrance_source=10&" + n
        },
        ask: {
            method: "POST",
            url: "/ask?" + n
        },
        welcome: {
            method: "POST",
            url: "/welcome?" + n
        },
        getAvatar: {
            method: "GET",
            url: "/getUserImage?" + n
        },
        statistic: {
            method: "POST",
            url: "/test/statistic?" + n
        }
    };
    return t.each(i,
    function(e, n) {
        i[e] = function(e) {
            return e = e || {},
            t.ajax({
                method: n.method,
                url: n.url,
                cache: !1,
                params: "GET" == n.method && e ? t.extend({
                    _: (new Date).getTime()
                },
                e) : null,
                data: "POST" == n.method && e ? t.param(e) : null,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function() {}
            })
        }
    }),
    i.changeToManual = function() {
        window.location.href = "/changeToManual?changeType=1"
    },
    i
})