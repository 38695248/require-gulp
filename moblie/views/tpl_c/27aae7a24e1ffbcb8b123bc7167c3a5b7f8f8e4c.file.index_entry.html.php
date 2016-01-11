<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:55:26
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\index_entry.html" */ ?>
<?php /*%%SmartyHeaderCode:4888568f878ec4c934-95802313%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '27aae7a24e1ffbcb8b123bc7167c3a5b7f8f8e4c' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\index_entry.html',
      1 => 1452245273,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '4888568f878ec4c934-95802313',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'pjax' => 0,
    'weixin_first_img' => 0,
    'header_m' => 0,
    'type' => 0,
    'new_users' => 0,
    'val' => 0,
    'new_specials' => 0,
    'hot_groups' => 0,
    'recommend_designers' => 0,
    'hot_shares' => 0,
    'new_shares' => 0,
    'request_url' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f878ece8d50_34495834',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f878ece8d50_34495834')) {function content_568f878ece8d50_34495834($_smarty_tpl) {?><?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
<?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body class="bodybox bodyclick">
<div style="height:0px; overflow:hidden"><img id="weixin_first_img" src="<?php echo $_smarty_tpl->tpl_vars['weixin_first_img']->value;?>
" />
</div>
<div class="mainbox" id="index" data-role="page" data-dom-cache="true">
  <div id="headerbox" class="headerbox">
    <div class="top_l">
    	<a href="javascript:void(0);" class="back-btn rel">
          <span class="b_ico ico-back-h"></span>
          <span class="span_bg"></span>
      	</a>
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
            <li class="searchtop">
            	 <span class="b_ico ico-searchtop" style="margin-bottom:-10px; margin-left:-5px"></span>
                 <span style="margin-left:-5px">搜索</span>
            </li>
            <li>
                <a href="/" class="block"><span class="b_ico ico-infomore-h"></span>首页</a>
            </li>
         </ul>
      </div>
    <ul id="top_nav" class="top_nav">
      <li class="one <?php if ($_smarty_tpl->tpl_vars['type']->value=='hot') {?>current<?php }?>"><a data-role="none" rel="external" class="headpjax" href="/index/entry.html?type=hot">热门</a><div class="top_nav_bg"></div></li>
      <li style="display:none" class="two <?php if ($_smarty_tpl->tpl_vars['type']->value=='hotest') {?>current<?php }?>"><a data-role="none" rel="external" class="headpjax" href="/index/entry.html?type=hotest">最热</a><div class="top_nav_bg"></div></li>
      <li class="three <?php if ($_smarty_tpl->tpl_vars['type']->value=='like') {?>current<?php }?>"><a data-role="none" rel="external" class="headpjax" href="/index/entry.html?type=like">关注</a><div class="top_nav_bg"></div></li>
    </ul>
  </div>
  <div id="contentbox" class="contentbox">
    <?php echo $_smarty_tpl->getSubTemplate ("inc_ad_topslip.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<?php }?>
	<?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
    <ul class="rowbox dzcxbox bg-fff" style="padding-top:10px; border-top:#ddd solid 1px">
            <li>
                <a href="/user_group/index.html">
                <span class="ico-xinqun"></span>
                <p>明星群</p>
                </a>
            </li>
            <li style="display:none">
                <a href="/activity/index.html?act=baoyou1">
                <span class="ico-tx"></span>
                <p>T恤定制</p>
                </a>
            </li>
            <li>
                <a href="/m_sns/morenew_designers.html">
                <span class="ico-shejishi"></span>
                <p>设计师</p>
                </a>
            </li>
            <li>
                <a href="/theme/view.html?id=10&ukey=1397">
                <span class="ico-le"></span>
                <p>大伯乐</p>
                </a>
            </li>
        </ul>
    <div id="pjaxbox">
    <?php }?>
    	<div class="blank10"></div>
    	<?php if ($_smarty_tpl->tpl_vars['type']->value=='hot') {?>
        <div class="part mb-10 bg-fff">
            <div class="text-center rowbox">
                <div class="part-title">
                    <a href="/m_sns/moreusers.html" class="bg-00a0e8">
                    <span class="ico-xr"></span>
                    <p>新人报道>></p>
                    </a>
                </div>
                <div class="row-flex1 ml-5">
                	<div class="rowbox-r">
                        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['new_users']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
?>
                        <div class="part-li">
                             <?php if (($_smarty_tpl->tpl_vars['val']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['val']->value['good']['status']==1)) {?>
                               <a href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['val']->value['gdid'];?>
">
                              <?php } else { ?>
                               <a href="/share/sharepage.html?shid=<?php echo $_smarty_tpl->tpl_vars['val']->value['shid'];?>
">
                              <?php }?>
                              <img class="lazy" data-original="<?php echo $_smarty_tpl->tpl_vars['val']->value['imgs'][0]['m'];?>
" />
                            </a>
                        </div>
                        <?php } ?>
                    </div>
               </div>
            </div>
            <div class="parttext line30">
                小鲜肉来袭，鲜到汤手哇
            </div>
        </div>
        <div class="part mb-10">
            <div class="text-center rowbox">
                <div class="part-title">
                    <a href="/m_sns/morespecials.html" class="bg-ffd600">
                    <span class="ico-hot-zt"></span>
                    <p>最新专题>></p>
                    </a>
                </div>
                <div class="row-flex1 ml-5">
                	<div class="rowbox-r">
                        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['new_specials']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
?>
                        <div class="part-li">
                            <a href="/m_sns/special.html?id=<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
">
                              <img class="lazy" data-original="<?php echo $_smarty_tpl->tpl_vars['val']->value['img'];?>
" />
                            </a>
                        </div>
                        <?php } ?>
                     </div>
                </div>
            </div>
            <div class="parttext line30">
                精选热门话题，等你来喷~！
            </div>
        </div>
        <div class="part mb-10">
            <div class="text-center rowbox">
                <div class="part-title">
                    <a href="/user_group/index.html" class="bg-fd5d5f">
                    <span class="ico-hot-group"></span>
                    <p>明星群>></p>
                    </a>
                </div>
                <div class="row-flex1 ml-5">
                	<div class="rowbox-r">
                        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['hot_groups']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
?>
                        <div class="part-li">
                            <a href="/user_group/home.html?gpid=<?php echo $_smarty_tpl->tpl_vars['val']->value['gpid'];?>
"><img class="lazy" data-original="<?php echo $_smarty_tpl->tpl_vars['val']->value['avatar'][1];?>
"></a>
                        </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <div class="parttext line30">
                你的兴趣，你做主~！
            </div>
        </div>
        <div class="part mb-10">
            <div class="text-center rowbox">
                <div class="part-title">
                    <a href="/m_sns/morerecommend_designers.html" class="bg-fc9b00">
                    <span class="ico-hot-des"></span>
                    <p>推荐设计师>></p>
                    </a>
                </div>
                <div class="row-flex1 ml-5">
                	<div class="rowbox-r">
                        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['recommend_designers']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
?>
                        <div class="part-li">            	
                              <a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['val']->value['suid'];?>
">
                               <img class="lazy" src="<?php echo $_smarty_tpl->tpl_vars['val']->value['avatar_b'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['val']->value['avatar_b'][1];?>
" />
                              </a>
                        </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <div class="parttext line30">
                潮爆设计师集中营，给你最时尚的设计体验！
            </div>
        </div>
        <div class="part mb-10 bg-fff">
            <div class="text-center rowbox">
                <div class="part-title">
                    <a href="/m_sns/morehots.html" class="bg-ff4e00">
                    <span class="ico-hot-share"></span>
                    <p>热门分享>></p>
                    </a>
                </div>
                <div class="row-flex1 ml-5">
                	<div class="rowbox-r">
                        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['hot_shares']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
?>
                        <div class="part-li">            	
                             <?php if (($_smarty_tpl->tpl_vars['val']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['val']->value['good']['status']==1)) {?>
                               <a href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['val']->value['gdid'];?>
">
                              <?php } else { ?>
                               <a href="/share/sharepage.html?shid=<?php echo $_smarty_tpl->tpl_vars['val']->value['shid'];?>
">
                              <?php }?>
                             <img class="lazy" data-original="<?php echo $_smarty_tpl->tpl_vars['val']->value['imgs'][0]['m'];?>
" />
                            </a>
                        </div>
                        <?php } ?>
                    </div>
               </div>	
            </div>
            <div class="parttext line30">
                一大波高能照片，热爆全场啦！
            </div>
        </div>
        <div class="part mb-10">
            <div class="text-center rowbox">
                <div class="part-title">
                    <a href="/m_sns/newshares.html" class="bg-fc9b00">
                    <span class="ico-new-share"></span>
                    <p>最新分享>></p>
                    </a>
                </div>
                <div class="row-flex1 ml-5">
                	<div class="rowbox-r">
                        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['new_shares']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
?>
                        <div class="part-li">            	
                             <?php if (($_smarty_tpl->tpl_vars['val']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['val']->value['good']['status']==1)) {?>
                               <a href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['val']->value['gdid'];?>
">
                              <?php } else { ?>
                               <a href="/share/sharepage.html?shid=<?php echo $_smarty_tpl->tpl_vars['val']->value['shid'];?>
">
                              <?php }?>
                             <img class="lazy" data-original="<?php echo $_smarty_tpl->tpl_vars['val']->value['imgs'][0]['m'];?>
" />
                            </a>
                        </div>
                        <?php } ?>
                    </div>
               </div>
            </div>
            <div class="parttext line30">
                新鲜出炉的照片就在这里，进去尝尝鲜！
            </div>
            
        </div>
   		<?php }?>
       <?php if ($_smarty_tpl->tpl_vars['type']->value=='like') {?>
       	 <div id="masonry_2" class="row masonry larger-view">
         <?php echo $_smarty_tpl->getSubTemplate ("inc_share_item.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

         </div>
       <?php }?>
   <?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
   </div>
   <?php }?>
   <?php if ($_smarty_tpl->tpl_vars['type']->value=='like') {?>
   <div class="pager" style="display: none;"> 
    	<span class="pager-next"><a href="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
"></a></span>
   </div>
   <?php }?>
<?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
  </div>
</div>
<?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 </div>
<div id="container"></div>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/entry.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>

</body>
</html>
<?php }?><?php }} ?>
