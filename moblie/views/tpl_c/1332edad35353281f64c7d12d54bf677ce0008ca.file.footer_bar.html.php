<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:33:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\footer_bar.html" */ ?>
<?php /*%%SmartyHeaderCode:12733568f825639e040-65619593%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1332edad35353281f64c7d12d54bf677ce0008ca' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\footer_bar.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '12733568f825639e040-65619593',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'bar' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82563b95c1_64524191',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82563b95c1_64524191')) {function content_568f82563b95c1_64524191($_smarty_tpl) {?><div id="footerbox" class="footerbox">
  <div class="rowbox footerbox-in f12">
      <div class="row-flex1  <?php if ($_smarty_tpl->tpl_vars['bar']->value['footer']=='index') {?> current<?php }?>">
          <a href="/index/index_ad.html">
          <span class="ico ico-home"></span>
          <p>首页</p>
          </a>
      </div>
      <div class="row-flex1 <?php if ($_smarty_tpl->tpl_vars['bar']->value['footer']=='entry') {?> current<?php }?>">
          <a href="/index/entry.html">
          <span class="ico ico-fx"></span>
          <p>探索</p>
          </a>
      </div>
      <div id="shareUpload" class="row-flex1 shareUpload">
      	  <span class="ico ico-up" style="margin:0"></span>
      </div>
      <div class="row-flex1 <?php if ($_smarty_tpl->tpl_vars['bar']->value['footer']=='goods') {?> current<?php }?>">
          <a href="/m_buy/index.html">
          <span class="ico ico-dz"></span>
          <p>定制</p>
          </a>
      </div>
      <div class="row-flex1 <?php if ($_smarty_tpl->tpl_vars['bar']->value['footer']=='my') {?> current<?php }?>">
          <a href="/user/settinglist.html">
          <span class="ico ico-my"></span>
          <p>我的</p>
          </a>
      </div>
  </div>
</div>
<div id="addbox" class="addbox" style="display:none">
	<div id="addbox_bg" class="modalMask addbox_bg" style="display:block; z-index:9999"></div>
    <div id="addbox_btn" class="addbox_btn">
    	<div class="add-btn">
        	<a href="/ask/toask.html">
        	<span class="ico_list icon_hot_qiu"></span>
            <p>定制</p>
            </a>
        </div>
        <div id="add-share" class="add-btn add-share">
        	<span class="ico_list icon_hot_share"></span>
            <p>分享</p>
        </div>
        <div id="add-mjx" class="add-btn add-share" data-ismjx="1">
        	<span class="ico_list icon_hot_mjx"></span>
            <p>买家秀</p>
        </div>
    </div>
</div>
<?php }} ?>
