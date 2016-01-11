({
    appDir: './',//应用程序的目录（即<root>）。在这个文件夹下的所有文件将会被复制到dir参数标注的文件夹下。
    baseUrl: './js',//相对于appDir，代表查找文件的锚点（that represents the anchor path for finding files）。
    dir: '../app',//这是一个输出目录，所有的应用程序文件将会被复制到该文件夹下。
    modules: [//一个包含多个对象的数组。每个对象代表一个将被优化的模块（module）。
        {
            name: 'activity_red'
        },
		{
            name: 'activity_goodscut'
        },
		{
			name:'activity_raise'	
		},
		{
			name:'cart'	
		},
		{
			name:'cart_pay'	
		},
		{
			name:'cart_sub'	
		},
		{
            name: 'edt_avatar'
        },
		{
            name: 'entry'
        },
		,
		{
			name:'group_index'	
		},
		{
			name:'group_home'	
		},
		{
            name: 'index'
        },
		{
            name: 'kefu'
        },
		{
			name:'myShare_comm'	
		},
		{
			name:'myShare_cash'	
		},
		{
			name:'myShare_goodsraise_my'	
		},
		{
			name:'myShare_mysetlist'	
		},
		{
			name:'myShare_myshares'	
		},		
		{
			name:'evaluate',
		},
		{
            name: 'search'
        },
		{
            name: 'shareView'
        }
    ],
    fileExclusionRegExp: /^(r.js|build.js|css|.css)$/,//任何与此规则匹配的文件或文件夹都将不会被复制到输出目录。
    optimizeCss: 'standard',////"standard"：标准的压缩方式；"standard.keepLines"：保留换行；"standard.keepComments"：保留注释；"standard.keepComments.keepLines"：保留换行；"none"：不压缩
    //removeCombined: true,//如果为true，优化器（optimizer）将从输出目录中删除已合并的文件。
    paths: {//模块（modules）的相对目录。
        jquery: 'empty:',
		config: 'comm/config',
        base: 'comm/base',
		ajax: 'comm/ajax',
		up:'comm/uploadUtils',
		pjax:'comm/pjax',
		mas:'comm/masonry',
		share:'comm/shareViewcomm',
		swiper:'libs/swiper.min',
		jquery_ui:'jqui/jquery-ui.min',
		infinitescroll: 'plugin/jquery.infinitescroll.min',
		lazyload: 'plugin/jquery.lazyload.min',
		jquerypjax:'plugin/jquery.pjax',
		baguettebox:'plugin/baguettebox.min',
		checkInput:'plugin/checkInput.min',
		checkImgExists:'plugin/checkImgExists',
		checkboxFn:'plugin/checkboxFn.min',
		serializeJson:'plugin/serializeJson.min',
		setTagPos:'plugin/setTagPos.min',
		stopscroll:'plugin/stopscroll.min',
		plus:'plugin/plus.min',
		countdown:'plugin/countdown.min',
		scrollToEnd:'plugin/scroll.min',
		fixedTop:'plugin/fixedTop.min',
		hoverclick:'plugin/hoverclick.min',
		jcrop:'jcrop/jquery.Jcrop.min'
    },
    shim: {//为那些没有使用define()声名依赖关系及设置模块值的模块，配置依赖关系与“浏览器全局”出口的脚本。
        underscore: {
            exports: '_'
        },
        backbone: {
            //deps: [
                //'underscore',
                //'jquery'
            //],
           // exports: 'Backbone'
        },
        backboneLocalstorage: {
            //deps: ['backbone'],
            //exports: 'Store'
        }
    }
})