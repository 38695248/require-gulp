<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:21:54
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\message_msgbox.html" */ ?>
<?php /*%%SmartyHeaderCode:1132256907cd2a53338-71385553%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a9206043b90e5984e9b2e3723dc5a16ce597c655' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\message_msgbox.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1132256907cd2a53338-71385553',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'pjax' => 0,
    'avatar' => 0,
    'datalist' => 0,
    'v' => 0,
    'gdid' => 0,
    'suid' => 0,
    'tosuid' => 0,
    'admin' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907cd2ad41d6_95005540',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907cd2ad41d6_95005540')) {function content_56907cd2ad41d6_95005540($_smarty_tpl) {?><?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
<?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body class="bodymoney">
<?php }?>
<div style="display:none">
<img class="avatar_lazy" src="<?php echo $_smarty_tpl->tpl_vars['avatar']->value[2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['avatar']->value[1];?>
" id="useravatar" />
</div>
<div class="mainbox">
	<div class="headerbox showhide">
      <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    </div>
    <div class="container_kf">
        <div class="content_kf" id="content">
            <ul id="masonry" class="masonry msg-wrapper baguetteBoxOne">
              <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['datalist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
              <li class="<?php echo $_smarty_tpl->tpl_vars['v']->value['rorl'];?>
 animated fadeInUp item">
                <i class="avatar <?php echo $_smarty_tpl->tpl_vars['v']->value['rorl'];?>
">
                    <img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['v']->value['avatar'][1];?>
" class="avatar_lazy userThumb" alt="<?php echo $_smarty_tpl->tpl_vars['v']->value['uname'];?>
" title="More from <?php echo $_smarty_tpl->tpl_vars['v']->value['uname'];?>
">
                </i>
                <div class="msg-content"><?php echo $_smarty_tpl->tpl_vars['v']->value['msg'];?>
</div>
              </li>
              <?php } ?>
            </ul>
        </div>
        <div id="footer_kf" class="footer">
        	<div class="send-wrapper"> 
              <span>
                <button id="expression-toggle" class="btn-kf btn-exp"></button>
              </span> 
              <span>
                <button id="tool-toggle" class="btn-kf btn-tool"></button>
              </span> 
              <span class="cell-full">
                <input type="text" id="text-in" class="input input-send" maxlength="150" autocomplete="off">
              </span>
              <span>
                <button id="send" class="btn btn-send" data-gdid="<?php echo $_smarty_tpl->tpl_vars['gdid']->value;?>
" data-suid="<?php echo $_smarty_tpl->tpl_vars['suid']->value;?>
" data-tosuid="<?php echo $_smarty_tpl->tpl_vars['tosuid']->value;?>
" data-admin="<?php echo $_smarty_tpl->tpl_vars['admin']->value;?>
">发送</button>
              </span>
            </div>
        	<div id="control" class="question-control" style="display:none">
          		<div id="expression" class="ui-slider swiper-container">
            		<div id="swiper-wrapper" class="ui-slider-group swiper-wrapper">
                    	<div class="imgloading" style="height:100px; width:100%"></div>
                    </div>
                    <div class="swiper-pagination-kf text-center"></div>
            	</div>
        	</div>
        </div>
    </div>
</div>
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/kefu.js?v=7" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
</body>
</html>
<?php }?><?php }} ?>
