define(["jquery"],function(t) {
    var e = t("#control"),
    n = t("#content"),
    a = function() {
         n.scrollTop(n[0].scrollHeight+50);
    };
    return {
        scrollToEnd: a
    }
})