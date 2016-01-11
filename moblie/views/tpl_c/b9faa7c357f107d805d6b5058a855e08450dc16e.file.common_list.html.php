<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:55:33
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\common_list.html" */ ?>
<?php /*%%SmartyHeaderCode:8561568f8795ebb449-32252713%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b9faa7c357f107d805d6b5058a855e08450dc16e' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\common_list.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '8561568f8795ebb449-32252713',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'act' => 0,
    'show_top' => 0,
    'top_type' => 0,
    'request_url' => 0,
    'pagehtml' => 0,
    'pagecol' => 0,
    'isseacrch' => 0,
    'isfollow' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f8795f24be3_72440701',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f8795f24be3_72440701')) {function content_568f8795f24be3_72440701($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body class="bodybox bodyclick <?php if ($_smarty_tpl->tpl_vars['act']->value=='img') {?>bg-fff<?php }?>" >
<div class="mainbox" id="page_cont">
  <div id="headerbox" class="headerbox">
    <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  
  <div class="contentbox settings" data-role="content">      
      <?php if ($_smarty_tpl->tpl_vars['show_top']->value) {?>
         <?php if ($_smarty_tpl->tpl_vars['top_type']->value=='img') {?>
              <?php echo $_smarty_tpl->getSubTemplate ("inc_img.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

         <?php }?>
      <?php }?>
  	  <?php if ($_smarty_tpl->tpl_vars['act']->value=='person'||$_smarty_tpl->tpl_vars['act']->value=='img') {?>
      	<div id="masonry" class="masonry">
      <?php } else { ?>
      	<div id="masonry_2" class="masonry larger-view">
      <?php }?>
      <?php if ($_smarty_tpl->tpl_vars['act']->value=='person') {?> 
          <?php echo $_smarty_tpl->getSubTemplate ("inc_person.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

      <?php } elseif ($_smarty_tpl->tpl_vars['act']->value=='share') {?>
      	  <?php echo $_smarty_tpl->getSubTemplate ("inc_share_item.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

      <?php } elseif ($_smarty_tpl->tpl_vars['act']->value=='specials') {?>
      
      <?php } elseif ($_smarty_tpl->tpl_vars['act']->value=='tags') {?>
          <?php echo $_smarty_tpl->getSubTemplate ("inc_following_interest.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

      <?php } elseif ($_smarty_tpl->tpl_vars['act']->value=='img') {?>
          <?php echo $_smarty_tpl->getSubTemplate ("inc_img_list.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

      <?php }?>
    </div>
    <div class="blank0"></div>
   <div class="pager">
    	<span class="pager-next"><a href="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
"></a></span>
   </div>
   
   <div style="display:none;"><?php echo $_smarty_tpl->tpl_vars['pagehtml']->value;?>
</div>
  </div>
  <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</div>
<!--判断分页参数-->
<input type="hidden" id="pagecol" value="<?php echo $_smarty_tpl->tpl_vars['pagecol']->value;?>
" /><!-- 1单列，0默认双列 -->
<input type="hidden" id="isseacrch" value="<?php echo $_smarty_tpl->tpl_vars['isseacrch']->value;?>
" /><!-- 1搜索，0正常 -->
<input type="hidden" id="isfollow" value="<?php echo $_smarty_tpl->tpl_vars['isfollow']->value;?>
" /><!-- 1关注，0正常 -->
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/search.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>

</body>
</html><?php }} ?>
