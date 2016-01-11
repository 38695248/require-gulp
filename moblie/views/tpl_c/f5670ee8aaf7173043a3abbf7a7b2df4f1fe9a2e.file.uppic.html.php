<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 10:35:28
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\tem\uppic.html" */ ?>
<?php /*%%SmartyHeaderCode:19015568f82e07dfdb6-53456713%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f5670ee8aaf7173043a3abbf7a7b2df4f1fe9a2e' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\tem\\uppic.html',
      1 => 1452245276,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '19015568f82e07dfdb6-53456713',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82e07ff1b4_12753471',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82e07ff1b4_12753471')) {function content_568f82e07ff1b4_12753471($_smarty_tpl) {?><div id="uploadid" class="tipbox fade" data-index="999" style="width:90%;display:block;">
    <div class="tipbox-in">
        <h1 class="tiptop" id="uppic_title">请从您电脑选择1~10张图片上传</h1>
        <span id="tipclose" class="ico02 tipclose closeBtnHtml"></span>
        <div class="tipcont">
            <div id="container">
                <!--头部，相册选择和格式选择-->
                <div id="uploader">
                    <div class="queueList">
                        <div id="dndArea" class="placeholder rowbox">
                            <div id="allcontainer" class="rel" style="margin:0; overflow:hidden;">
                                <div id="allpickfiles">
                                    <div class="btn-danger webuploader-pick" style="z-index:0">选择图片</div>
                                </div>
                                <input id="all_input" type="file" style="font-size:999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple accept="">
                            </div>
                            <div id="progress" class="progress row-flex1">
                                <span class="text">0%</span>
                                <span class="percentage"></span>
                            </div>
                            <div class="blank0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="blank0"></div>
        </div>
    </div>
</div>
<?php }} ?>
