<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:21:52
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\message_msglist.html" */ ?>
<?php /*%%SmartyHeaderCode:2237356907cd068eba4-28843306%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '949dd5bcf2f26288d7093e0a4ed0904362c714cf' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\message_msglist.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2237356907cd068eba4-28843306',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'datalist' => 0,
    'v' => 0,
    'request_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907cd073a9d5_53692351',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907cd073a9d5_53692351')) {function content_56907cd073a9d5_53692351($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body class="bodybox bodyclick">
<div class="mainbox" id="msgpage_user" data-role="page">
<div id="headerbox" class="headerbox"> 
<?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</div>

<div class="contentbox" data-role="content">
  <ul id="masonry" class="masonry jsbox jsbox_mt0">
   <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['datalist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
   	<li class="f16 line30">
    	<a class="rowbox" href="/message/msgbox.html?tosuid=<?php echo $_smarty_tpl->tpl_vars['v']->value['suidf'];?>
&setnum=1">
    	<div class="avatar_50 mr-10 mt-5">
            <img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['v']->value['avatar'][1];?>
" class="lazy userThumb" alt="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['name'], ENT_QUOTES, 'UTF-8', true);?>
" title="More from <?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['name'], ENT_QUOTES, 'UTF-8', true);?>
">
       </div>
       <div class="row-flex1 line30">
       	<div><span class="fr f12 color-777"><?php echo $_smarty_tpl->tpl_vars['v']->value['edttime'];?>
</span><?php echo $_smarty_tpl->tpl_vars['v']->value['name'];?>
</div>
        <div class="rowbox">
        	<div class="row-flex1 color-999 message_img"><?php echo $_smarty_tpl->tpl_vars['v']->value['msg'];?>
</div>
            <div><span class="num_msg"><?php echo $_smarty_tpl->tpl_vars['v']->value['num'];?>
</span></div>
        </div>
       </div>
       </a>
    </li>
    <?php } ?>
  </ul>
  <div class="pager">
	<span class="pager-next"><a href="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
"></a></span>
  </div>
  
<?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 </div>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 
<?php echo $_smarty_tpl->getSubTemplate ("footer_myshare.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script type="text/javascript">
$(function(){
	MyShare.myShareInit({flag:0,msg:1,blocks:0});
})
</script>
</body>
</html><?php }} ?>
