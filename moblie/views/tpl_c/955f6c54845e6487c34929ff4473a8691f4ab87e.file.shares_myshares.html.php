<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:12:18
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\shares_myshares.html" */ ?>
<?php /*%%SmartyHeaderCode:2269056907a92d8ccd8-14098853%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '955f6c54845e6487c34929ff4473a8691f4ab87e' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\shares_myshares.html',
      1 => 1452245273,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2269056907a92d8ccd8-14098853',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'pageurl' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907a92e0db71_91922736',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907a92e0db71_91922736')) {function content_56907a92e0db71_91922736($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">
<div class="mainbox" id="gzpage" data-role="page">
    <div id="headerbox" class="headerbox">
     <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  
  <div class="contentbox" data-role="content">
    <div class="userbox">
       <?php echo $_smarty_tpl->getSubTemplate ("header_my.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

       
       <div id="masonry_2" class="masonry larger-view">
           <?php echo $_smarty_tpl->getSubTemplate ("inc_share_item.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

       </div>
       
       <div class="pager"> 
          <span class="pager-next">
            <a href="<?php echo $_smarty_tpl->tpl_vars['pageurl']->value;?>
"></a>
          </span> 
       </div>
       
    </div>
  </div>
  <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</div>
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/myShare_myshares.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>

</html><?php }} ?>
