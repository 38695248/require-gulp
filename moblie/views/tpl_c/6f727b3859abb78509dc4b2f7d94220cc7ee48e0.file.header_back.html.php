<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:33:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\header_back.html" */ ?>
<?php /*%%SmartyHeaderCode:11905568f825608cd07-80425544%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '6f727b3859abb78509dc4b2f7d94220cc7ee48e0' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\header_back.html',
      1 => 1452245277,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '11905568f825608cd07-80425544',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'header_m' => 0,
    't' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82560cb516_97559380',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82560cb516_97559380')) {function content_568f82560cb516_97559380($_smarty_tpl) {?><?php if ($_smarty_tpl->tpl_vars['header_m']->value['back']==='t1') {?>
<div class="rowbox searchbox searchbox_home">
	<div class="top_l">
      <?php if ($_smarty_tpl->tpl_vars['header_m']->value['page']==='index') {?>
          <div id="mylist" class="mylist"><span class="b_ico ico-list"></span></div>
      <?php } else { ?>
          <a href="javascript:void(0);" class="back-btn rel">
              <span class="b_ico ico-back-h"></span>
          </a>
      <?php }?>
   </div>
   <div class="row-flex1 home_search rel searchtop">
        羽绒服
        <span class="ico ico-searchtop"></span>
   </div>
   <div class="top_r">
          <input data-role="none" type="hidden" autocomplete="off" name="t" id="sui-Input-val" class="sui-Input" value="<?php echo $_smarty_tpl->tpl_vars['t']->value;?>
">
          <?php if ($_smarty_tpl->tpl_vars['header_m']->value['cart']!==false) {?>
          <a href="/myorder/mycart.html" class="rel mr-5">
            <span class="b_ico ico-cart"></span>
            <span class="cartItemnum" id="cartItemnum"></span>
          </a>
          <?php }?>
          <a href="javascript:void(0);" class="rel infomore_btn">
            <span class="b_ico ico-moreinfo mr-5"></span>
            <span class="infomnum" id="infomnum"></span>
            <span class="span_bg cart_span_bg"></span>
          </a>
          <ul class="infomore">
            <li>
            	<a href="/message/msglist" class="block">
                <span class="fr mt-15"><em id="infomore_num" class="infomore_num fr">0</em></span>
                <span class="b_ico ico-xiaoxi"></span>
                <span>消息</span>
                </a>
            </li>
            <li>
                <a href="/user/settinglist.html" class="block"><span class="ico ico-my" style="margin:-5px 6px 0 0"></span>我的</a>
            </li>
            <li>
                <a href="/" class="block"><span class="b_ico ico-infomore-h"></span>首页</a>
            </li>
         </ul>
      </div>
<?php } else { ?>
  <div class="rowbox searchbox">
      <div class="top_l">
      	  <?php if ($_smarty_tpl->tpl_vars['header_m']->value['back']===true) {?>
              <a href="javascript:void(0);" class="back-btn rel">
                  <span class="b_ico ico-back-h"></span>
              </a>
          <?php } elseif ($_smarty_tpl->tpl_vars['header_m']->value['back']) {?>
              <a href="<?php echo $_smarty_tpl->tpl_vars['header_m']->value['back'];?>
" class="back-btn rel">
                  <span class="b_ico ico-back-h"></span>
              </a>
          <?php } else { ?>
              <a href="javascript:void(0);" class="back-btn rel">
                  <span class="b_ico ico-back-h"></span>
              </a>
          <?php }?>
       </div>
       <div class="row-flex1 text-center h2_title"><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['header_m']->value['title'], ENT_QUOTES, 'UTF-8', true);?>
</div>
       <div class="top_r">
          
          <?php if ($_smarty_tpl->tpl_vars['header_m']->value['cart']!==false) {?>
              <a href="/myorder/mycart.html" class="rel mr-5">
                <span class="b_ico ico-cart"></span>
                <span class="cartItemnum" id="cartItemnum"></span>
              </a>
          <?php }?>
          <span class="top_line"></span>
          <a href="javascript:void(0);" class="rel infomore_btn">
            <span class="b_ico ico-moreinfo mr-5"></span>
            <span class="infomnum" id="infomnum"></span>
          </a>
          <ul id="infomore" class="infomore">
            <li>
            	<a href="/message/msglist" class="block">
                <span class="fr mt-15"><em id="infomore_num" class="infomore_num fr">0</em></span>
                <span class="b_ico ico-xiaoxi"></span>
                <span>消息</span>
                </a>
            </li>
            <li>
                <a href="/user/settinglist.html" class="block"><span class="ico ico-my" style="margin:-5px 6px 0 0"></span>我的</a>
            </li>
            <li class="searchtop">
            	 <span class="b_ico ico-searchtop" style="margin-bottom:-10px; margin-left:-5px"></span>
                 <span style="margin-left:-5px">搜索</span>
            </li>
            <li>
                <a href="/" class="block"><span class="b_ico ico-infomore-h"></span>首页</a>
            </li>
         </ul>
      </div>
<?php }?>
</div><?php }} ?>
