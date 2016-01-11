<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:55:09
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\shares_view.html" */ ?>
<?php /*%%SmartyHeaderCode:5760568f877da03e05-76293568%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ab78d2f9da0d092bc0e04569fc67d326adef6e9e' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\shares_view.html',
      1 => 1452245276,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '5760568f877da03e05-76293568',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'pjax' => 0,
    'weixin_first_img' => 0,
    'data' => 0,
    'gdid' => 0,
    'goods_infor' => 0,
    'v' => 0,
    'currency' => 0,
    'lang' => 0,
    'shid' => 0,
    'goods_comment' => 0,
    'total_comment' => 0,
    'val2' => 0,
    'adv' => 0,
    'relation_url' => 0,
    'img' => 0,
    'tags' => 0,
    'tags_val' => 0,
    'group_rec' => 0,
    'v_group' => 0,
    'avatar' => 0,
    'uname' => 0,
    'datalist' => 0,
    'request_url' => 0,
    'money_act' => 0,
    'num_raise_ing' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f877dbc9022_72711761',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f877dbc9022_72711761')) {function content_568f877dbc9022_72711761($_smarty_tpl) {?><?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
<?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body class="bodybox">
<img style="height:0; width:0; max-width:none" id="weixin_first_img" src="<?php echo $_smarty_tpl->tpl_vars['weixin_first_img']->value;?>
" /> <?php }?>
<div class="mainbox" id="viewpage" style="padding-top:0">
  <div class="headerbox showhide headerbox_view"> <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 </div>
  <div class="contentbox">
    <div class="byshid" data-shid="<?php echo $_smarty_tpl->tpl_vars['data']->value['shid'];?>
" data-ishid="<?php echo $_smarty_tpl->tpl_vars['data']->value['ishid'];?>
">
      <?php if ($_smarty_tpl->tpl_vars['gdid']->value>0) {?>
      <div id="viewPicImgBox" class="rowitem-c rel" data-width="<?php echo $_smarty_tpl->tpl_vars['data']->value['imgs'][0]['width'];?>
"> <?php } else { ?>
        <div id="sharePicImgBox" class="rowitem-c rel" data-width="<?php echo $_smarty_tpl->tpl_vars['data']->value['imgs'][0]['width'];?>
"> <?php }?>
          <?php if ($_smarty_tpl->tpl_vars['gdid']->value>0) {?> 
          <!--商品-->
          <div class="swiper-container" id="sliderbox_view">
            <div class="swiper-wrapper baguetteBoxOne" id="slide_01_view"> <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['goods_infor']->value['imgs']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
              <div class="swiper-slide"><a href="<?php echo $_smarty_tpl->tpl_vars['v']->value['b'];?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['b'];?>
" /></a></div>
              <?php } ?> </div>
            <div class="swiper-pagination slide_01_dot_view"></div>
          </div>
          <?php }?>
        </div>
        <?php if ($_smarty_tpl->tpl_vars['gdid']->value>0) {?>
        <div class="sharetext protile">
          <p class="f16 color-333 line20"><?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['gdname'];?>
</p>
          <p class="color-red f21 font-a"><?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['priv_price'];?>
&nbsp;<?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['priv_price_ini']>0) {?><span class="f14 color-999 market"><?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['priv_price_ini'];?>
</span><span class="f12 ml-5 bg-f13e3a market-zhe"><?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['priv_price_rate'];?>
折</span><?php }?><?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1&&$_smarty_tpl->tpl_vars['goods_infor']->value['activity_bsh']==4) {?><span class="f12 ml-5 bg-fc9b00 market-zhe">返 <?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['money_act'];?>
</span><?php }?><span class="f12 ml-5 bg-00a0e8 market-zhe">包邮</span><?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['iscod']) {?><span class="f12 ml-5 bg-8206eb market-zhe">货到付款</span><?php }?><?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1&&$_smarty_tpl->tpl_vars['goods_infor']->value['activity_bsh']==5) {?><span class="f12 ml-5 bg-f13e3a market-zhe">0元试穿</span><?php }?></p>
        </div>
        <div class="proinfo" style="margin:0; border-top:none">
          <ul>
            <li class="btn-cuscom"  data-type="buy" style="height:50px; line-height:50px"> <span class="fr ico ico-jt" style="margin-top:17px"></span> <span class="ico-coms ico-color"></span> 个性定制选择：颜色，尺码，领型，腰型... </li>
          </ul>
        </div>
        <?php }?>
        
        <?php if ($_smarty_tpl->tpl_vars['gdid']->value>0) {?>
        	<div class="rowitem-b">
              <ul class="rowbox">
                <?php if ($_smarty_tpl->tpl_vars['data']->value['islike']==0) {?>
                <li class="row-flex1 btn-praise" data-like="0"><span class="ico ico-zhan"></span><span class="btn-praise-text">赞TA</span></li>
                <?php } else { ?>
                <li class="row-flex1 btn-praise current" data-like="1"><span class="ico ico-zhan"></span><span class="btn-praise-text">已赞TA</span></li>
                <?php }?>
                <li class="row-flex1 li-line-l btn-repeat" data-bigimgUrl="<?php echo $_smarty_tpl->tpl_vars['data']->value['imgs'][0]['b'];?>
" data-title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['data']->value['description'], ENT_QUOTES, 'UTF-8', true);?>
"><span class="ico ico-share"></span><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_inc_share_item_share'];?>
</li>
                <?php if ($_smarty_tpl->tpl_vars['data']->value['isme']==1) {?>
                <li class="row-flex1 li-line-l btn-edit" data-shid="<?php echo $_smarty_tpl->tpl_vars['data']->value['shid'];?>
"  data-boradid="<?php echo $_smarty_tpl->tpl_vars['data']->value['ucatid'];?>
"> <span class="ico ico-sent"></span>编辑 </li>
                <?php } else { ?>
                <?php if ($_smarty_tpl->tpl_vars['shid']->value>0) {?>
                <li class="row-flex1 li-line-l btn-addpl" data-type="view" data-num="5"> <span class="ico ico-sent"></span>评论 </li>
                <?php }?>
                <?php }?>
                <?php if ($_smarty_tpl->tpl_vars['data']->value['gpid']>0) {?>
                <li class="row-flex1 li-line-l"> <a href="/user_group/home.html?gpid=<?php echo $_smarty_tpl->tpl_vars['data']->value['gpid'];?>
"> <span class="ico ico-more"></span><span>进群>></span> </a> </li>
                <?php }?>
              </ul>
            </div>
            <?php if ($_smarty_tpl->tpl_vars['goods_comment']->value) {?>
            <ul class="jsbox" style="display:">
              <li class="h2_tile"><a href="/goods/comment_list.html?gdid=<?php echo $_smarty_tpl->tpl_vars['gdid']->value;?>
" class="block">宝贝评论(<?php echo $_smarty_tpl->tpl_vars['total_comment']->value;?>
)</a></li>
              <li class="line20 item">
                <div class="pl_t mb-5 rowbox">
                  <div class="avatar w30 mr-5"> <img src="<?php echo $_smarty_tpl->tpl_vars['goods_comment']->value['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['goods_comment']->value['avatar'][1];?>
" class="avatar_lazy userThumb" /> </div>
                  <div class="row-flex1 line30"><?php echo $_smarty_tpl->tpl_vars['goods_comment']->value['uname'];?>
</div>
                </div>
                <div class="pl_cont mb-10">
                  <div class="pl_cont_text mb-10"><?php echo $_smarty_tpl->tpl_vars['goods_comment']->value['comment'];?>
</div>
                  <?php if ($_smarty_tpl->tpl_vars['goods_comment']->value['pics']) {?>
                  <div class="pl_cont_img rowbox"> <?php  $_smarty_tpl->tpl_vars['val2'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val2']->_loop = false;
 $_smarty_tpl->tpl_vars['key2'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['goods_comment']->value['pics']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val2']->key => $_smarty_tpl->tpl_vars['val2']->value) {
$_smarty_tpl->tpl_vars['val2']->_loop = true;
 $_smarty_tpl->tpl_vars['key2']->value = $_smarty_tpl->tpl_vars['val2']->key;
?> <a href="http:<?php echo $_smarty_tpl->tpl_vars['val2']->value;?>
"><img class="up-img" src="http:<?php echo $_smarty_tpl->tpl_vars['val2']->value;?>
_40x40.jpg" /></a> <?php } ?> </div>
                  <?php }?> </div>
                <div class="pl_b"> <?php echo $_smarty_tpl->tpl_vars['goods_comment']->value['edttime_txt'];?>
 <?php echo $_smarty_tpl->tpl_vars['goods_comment']->value['color_size'];?>
 </div>
              </li>
              <li class="text-center f16"><a href="/goods/comment_list.html?gdid=<?php echo $_smarty_tpl->tpl_vars['gdid']->value;?>
" class="block">查看更多评论</a></li>
            </ul>
            <?php }?>
            <div class="text-center jsbox">
              <h2 class="line36 b color-777 mb-10" style="border-bottom:#e5e5e5 solid 1px">百享保证</h2>
              <div class="rowbox line20 mb-10">
                <div class="row-flex1"> <span class="b_ico b_ico_zhi"></span>
                  <p>质量保证</p>
                </div>
                <div class="row-flex1"> <span class="b_ico b_ico_tui"></span>
                  <p>7天退货</p>
                </div>
                <div class="row-flex1"> <span class="b_ico b_ico_bu"></span>
                  <p>退货补贴运费</p>
                </div>
              </div>
            </div>
            <?php if ($_smarty_tpl->tpl_vars['adv']->value['pic_1']) {?>
            <div class="text-center jsbox">
                <a href="<?php echo $_smarty_tpl->tpl_vars['adv']->value['pic_1'][0]['link'];?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['adv']->value['pic_1'][0]['src'];?>
" /></a>
            </div>
            <?php }?>
            <ul class="jsbox">
              <li class="rowbox" style="border:none; padding-bottom:0"> <a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['suid'];?>
">
                <div class="rowbox avatar useravatar_bg w50 mr-5 mt-15"> <img src="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['avatar'][1];?>
" class="avatar_lazy userThumb" alt="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['uname'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['uname'];?>
"> </div>
                </a>
                <div class="row-flex1 avatar-text line20 mt-10">
                  <div class="commenterWrapper rowbox"> <a class="color-blue row-flex1 mr-5" href="javascript:void(0);" data-fsuid="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['suid'];?>
" data-fuid_uname="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['uname'];?>
"><?php echo $_smarty_tpl->tpl_vars['data']->value['user']['uname'];?>
</a> <?php if ($_smarty_tpl->tpl_vars['data']->value['user']['identify_info']) {?>
                    <div class="color-555"> <span class="ico ico-vip" title="设计师"></span> <span class="f12 color-gray" title="设计师">设计师</span> </div>
                    <?php }?> </div>
                  <div class="f12">分享：<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['sharenum'];?>
&nbsp;&nbsp;粉丝：<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['followernum'];?>
</div>
                </div>
                <div class="f12 text-left line30"> <a href="/b_goods/mygdshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['suid'];?>
">
                  <button class="btn btn-border btn-s w100" style="letter-spacing:0px;">查看TA设计</button>
                  </a>
                  <p class="blank0"></p>
                  <?php if ($_smarty_tpl->tpl_vars['data']->value['user']['isfollow']==1) {?>
                  <button class="row-flex1 btn btn-border btn-s w100 followBtn current" data-text="1" data-fsuid="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['suid'];?>
" data-type="person" data-follow="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['isfollow'];?>
" style="letter-spacing:0px;"><span class="text"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_inc_share_item_have_follow'];?>
</span></button>
                  <?php } else { ?>
                  <button class="row-flex1 btn btn-border btn-s w100 followBtn"  data-text="1" data-fsuid="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['suid'];?>
" data-type="person" data-follow="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['isfollow'];?>
" style="letter-spacing:0px;"><span class="text"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_inc_share_item_follow'];?>
</span></button>
                  <?php }?> </div>
              </li>
              <p class="blank5"></p>
            </ul>
            <?php if ($_smarty_tpl->tpl_vars['adv']->value['pic_2']) {?>
            <div class="text-center jsbox">
                <a href="<?php echo $_smarty_tpl->tpl_vars['adv']->value['pic_2'][0]['link'];?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['adv']->value['pic_2'][0]['src'];?>
" /></a> 
            </div>
            <?php }?>
            <ul class="jsbox" id="tjcp_list_box">
              <li class="h3_title">猜你喜欢的</li>
              <li style="padding-top:10px">
                <dl id="tjcp_list" class="tjcp_list" data-url="<?php echo $_smarty_tpl->tpl_vars['relation_url']->value;?>
&page_size=9&tpl=inc_share_item_tj&gdid=<?php echo $_smarty_tpl->tpl_vars['gdid']->value;?>
">
                </dl>
              </li>
            </ul>
        <?php } else { ?>
        	<?php  $_smarty_tpl->tpl_vars['img'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['img']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['data']->value['imgs']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['img']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['img']->key => $_smarty_tpl->tpl_vars['img']->value) {
$_smarty_tpl->tpl_vars['img']->_loop = true;
 $_smarty_tpl->tpl_vars['img']->index++;
?>
            <div class="imgtag rel <?php if ($_smarty_tpl->tpl_vars['img']->index>0) {?>mt-10<?php }?>" data-width="<?php echo $_smarty_tpl->tpl_vars['img']->value['width'];?>
"> 
              <img class="shareimg" src="<?php echo $_smarty_tpl->tpl_vars['img']->value['b'];?>
" /> 
              <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['img']->value['tagsay']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
              <div class="fade item-tag" data-val="1" data-left="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgx'];?>
" data-top="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgy'];?>
" style="left: <?php echo $_smarty_tpl->tpl_vars['v']->value['imgx'];?>
px; top: <?php echo $_smarty_tpl->tpl_vars['v']->value['imgy'];?>
px;"> <span class="item-tag-label"></span> <span class="ico ico-stag"></span>
                <div class="item-tag-form" style="width:auto;"> <a href="/m_search/search.html?t=tagsay&s=<?php echo rawurlencode($_smarty_tpl->tpl_vars['v']->value['tagtxt']);?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['tagtxt'], ENT_QUOTES, 'UTF-8', true);?>
">
                  <div class="tip"><span><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['tagtxt'], ENT_QUOTES, 'UTF-8', true);?>
</span></div>
                  </a> </div>
              </div>
              <?php } ?>
              <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['img']->value['tagplace']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
              <div class="fade item-tag" data-val="1" data-left="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgx'];?>
" data-top="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgy'];?>
"  style="left: <?php echo $_smarty_tpl->tpl_vars['v']->value['imgx'];?>
px; top: <?php echo $_smarty_tpl->tpl_vars['v']->value['imgy'];?>
px;"> <span class="item-tag-label"></span> <span class="ico ico-sPlace"></span>
                <div class="item-tag-form" style="width:auto;"> <a href="/m_search/search.html?t=tagplace&s=<?php echo rawurlencode($_smarty_tpl->tpl_vars['v']->value['tagtxt']);?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['tagtxt'], ENT_QUOTES, 'UTF-8', true);?>
">
                  <div class="tip"><span><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['tagtxt'], ENT_QUOTES, 'UTF-8', true);?>
</span></div>
                  </a> </div>
              </div>
              <?php } ?>
              <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['img']->value['tagperson']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
              <div class="fade item-tag" data-val="1" data-left="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgx'];?>
" data-top="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgy'];?>
"  style="left: <?php echo $_smarty_tpl->tpl_vars['v']->value['imgx'];?>
px; top: <?php echo $_smarty_tpl->tpl_vars['v']->value['imgy'];?>
px; "> <span class="item-tag-label"></span> <span class="ico ico-sPeople"></span>
                <div class="item-tag-form" style="width:auto;"> <?php if ($_smarty_tpl->tpl_vars['v']->value['link_suid']!=0) {?> <a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['v']->value['link_suid'];?>
"> <?php } else { ?> <a href="/m_search/search.html?t=tagperson&s=<?php echo rawurlencode($_smarty_tpl->tpl_vars['v']->value['tagtxt']);?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['tagtxt'], ENT_QUOTES, 'UTF-8', true);?>
"> <?php }?>
                  <div class="tip"><span><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['tagtxt'], ENT_QUOTES, 'UTF-8', true);?>
</span></div>
                  </a> </div>
              </div>
              <?php } ?> 
            </div>
            <?php } ?>
            <div class="rowitem-b">
              <ul class="rowbox">
                <?php if ($_smarty_tpl->tpl_vars['data']->value['islike']==0) {?>
                <li class="row-flex1 btn-praise" data-like="0"><span class="ico ico-zhan"></span><span class="btn-praise-text">赞TA</span></li>
                <?php } else { ?>
                <li class="row-flex1 btn-praise current" data-like="1"><span class="ico ico-zhan"></span><span class="btn-praise-text">已赞TA</span></li>
                <?php }?>
                <li class="row-flex1 li-line-l btn-repeat" data-bigimgUrl="<?php echo $_smarty_tpl->tpl_vars['data']->value['imgs'][0]['b'];?>
" data-title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['data']->value['description'], ENT_QUOTES, 'UTF-8', true);?>
"><span class="ico ico-share"></span><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_inc_share_item_share'];?>
</li>
                <?php if ($_smarty_tpl->tpl_vars['data']->value['isme']==1) {?>
                <li class="row-flex1 li-line-l btn-edit" data-shid="<?php echo $_smarty_tpl->tpl_vars['data']->value['shid'];?>
"  data-boradid="<?php echo $_smarty_tpl->tpl_vars['data']->value['ucatid'];?>
"> <span class="ico ico-sent"></span>编辑 </li>
                <?php } else { ?>
                <?php if ($_smarty_tpl->tpl_vars['shid']->value>0) {?>
                <li class="row-flex1 li-line-l btn-addpl" data-type="view" data-num="5"> <span class="ico ico-sent"></span>评论 </li>
                <?php }?>
                <?php }?>
                <?php if ($_smarty_tpl->tpl_vars['data']->value['gpid']>0) {?>
                <li class="row-flex1 li-line-l"> <a href="/user_group/home.html?gpid=<?php echo $_smarty_tpl->tpl_vars['data']->value['gpid'];?>
"> <span class="ico ico-more"></span><span>进群>></span> </a> </li>
                <?php }?>
              </ul>
            </div>
            <?php if ($_smarty_tpl->tpl_vars['tags']->value) {?>
            <div class="description mt-10"> 
                <span><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_shares_view_tags'];?>
：</span> 
                <?php  $_smarty_tpl->tpl_vars['tags_val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['tags_val']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['tags']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['tags_val']->total= $_smarty_tpl->_count($_from);
 $_smarty_tpl->tpl_vars['tags_val']->iteration=0;
foreach ($_from as $_smarty_tpl->tpl_vars['tags_val']->key => $_smarty_tpl->tpl_vars['tags_val']->value) {
$_smarty_tpl->tpl_vars['tags_val']->_loop = true;
 $_smarty_tpl->tpl_vars['tags_val']->iteration++;
 $_smarty_tpl->tpl_vars['tags_val']->last = $_smarty_tpl->tpl_vars['tags_val']->iteration === $_smarty_tpl->tpl_vars['tags_val']->total;
?> 
                <span>
                <a href="/m_search/search.html?t=goods&s=<?php echo rawurlencode($_smarty_tpl->tpl_vars['tags_val']->value);?>
"><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['tags_val']->value, ENT_QUOTES, 'UTF-8', true);?>
</a> <?php if ((!$_smarty_tpl->tpl_vars['tags_val']->last)) {?>&nbsp;&nbsp;<?php }?> 
                </span> 
                <?php } ?> 
            </div>
            <?php }?>
            <?php if ($_smarty_tpl->tpl_vars['group_rec']->value) {?>
            <p class="blank10"></p>
            <div class="rowbox start-tjbox">
              <div class="ml-5 mr-10" style="line-height:60px">明星推荐群：</div>
              <div class="row-flex1"> <?php  $_smarty_tpl->tpl_vars['v_group'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v_group']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['group_rec']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v_group']->key => $_smarty_tpl->tpl_vars['v_group']->value) {
$_smarty_tpl->tpl_vars['v_group']->_loop = true;
?> <a href="/user_group/home.html?gpid=<?php echo $_smarty_tpl->tpl_vars['v_group']->value['gpid'];?>
&ch=samestyle">
                <dd class="text-center">
                  <div class="avatar-start"> <img src="<?php echo $_smarty_tpl->tpl_vars['v_group']->value['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['v_group']->value['avatar'][1];?>
" class="avatar_lazy userThumb"> </div>
                  <p><?php echo $_smarty_tpl->tpl_vars['v_group']->value['gpname'];?>
</p>
                </dd>
                </a> <?php } ?> </div>
            </div>
            <?php }?>
            <ul class="jsbox" style="display:" id="commentslist" data-shareid="<?php echo $_smarty_tpl->tpl_vars['data']->value['shid'];?>
">
              <div style="display:none">
                <img class="avatar_lazy" src="<?php echo $_smarty_tpl->tpl_vars['avatar']->value[2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['avatar']->value[1];?>
" data-username="<?php echo $_smarty_tpl->tpl_vars['uname']->value;?>
" id="useravatar" />
              </div>
              <li class="h2_tile">
              	<a href="#" class="block">评论(<?php echo $_smarty_tpl->tpl_vars['data']->value['count']['commentnum'];?>
)</a>
              </li>
              <li id="firstitem" class="line20 recommtbtn" data-fuid_uname="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['data']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>
">
                <div class="pl_t mb-5 rowbox">
                  <div class="avatar w30 mr-5">
                  	<img src="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['data']->value['user']['avatar'][1];?>
" class="avatar_lazy userThumb" alt="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['data']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['data']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>
"/>
                  </div>
                  <div class="row-flex1 line30"><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['data']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>
<span class="color-999"> • <?php echo $_smarty_tpl->tpl_vars['data']->value['edttime_txt'];?>
</span></div>
                </div>
                <div class="pl_cont mb-10">
                  <div class="pl_cont_text mb-10"><?php echo $_smarty_tpl->tpl_vars['data']->value['description'];?>
</div>
                </div>
              </li>
            </ul>
        <?php }?> 
    </div>
    
    <?php if (($_smarty_tpl->tpl_vars['shid']->value>0)&&$_smarty_tpl->tpl_vars['datalist']->value) {?>
    <h2 class="text-center line40">明星同款推荐</h2>
    <div id="masonry-tj" class="masonry larger-view"> <?php echo $_smarty_tpl->getSubTemplate ("inc_share_item.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 </div>
    <div class="pager"> <span class="pager-next"><a href="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
"></a></span> </div>
    <?php }?>
    
    <?php if ($_smarty_tpl->tpl_vars['gdid']->value>0) {?>
    <input type="hidden" id="goods" value="1" />
    <!--商品描述-->
    <div id="goodsdescbox" class="proinfo goodsdescbox">
      <h2 class="goodsdesc-title">图文详情</h2>
      <div class="goodsdesc"><?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['goodsdesc'];?>
</div>
    </div>
    <?php }?> 
  </div>
  <?php if ($_smarty_tpl->tpl_vars['gdid']->value>0) {?>
  <input type="hidden" id="gdid" value="<?php echo $_smarty_tpl->tpl_vars['gdid']->value;?>
" />
  <div class="buyfooter">
    <div class="rowbox footerbox f12 btn-buy" style="border-top:#f2f2f2 solid 1px">
      <div class="line20 pt-10 w60" style="border-right:#f2f2f2 solid 1px"> <a href="/message/msgbox.html?tosuid=<?php echo $_smarty_tpl->tpl_vars['data']->value['good']['suid'];?>
&gdid=<?php echo $_smarty_tpl->tpl_vars['gdid']->value;?>
" class="block"> <span class="ico ico-kefu"></span>
        <p class="text-ell">客服</p>
        </a> </div>
      <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['cut_ok']) {?>
      <div class="row-flex1 btn-0359db f16 btn-cuscom" style="width:auto" data-type="bargain" data-money="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['money_act'];?>
" data-isfirst="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['cut_isfirst'];?>
">马上砍价</div>
      <?php }?>
      <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1&&$_smarty_tpl->tpl_vars['goods_infor']->value['activity_bsh']==5) {?>
      <div class="row-flex1 btn-e15a99 f16 btn-cuscom" style="width:auto" data-type="tryon" data-istryon="<?php echo $_smarty_tpl->tpl_vars['money_act']->value;?>
">我要试穿</div>
      <?php }?>
      <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1&&$_smarty_tpl->tpl_vars['goods_infor']->value['activity_bsh']==2) {?>
      <div class="row-flex1 btn-7a1786 f16 btn-cuscom" style="width:auto" data-type="crowd" data-iszc="<?php echo $_smarty_tpl->tpl_vars['num_raise_ing']->value;?>
">立即众筹</div>
      <?php }?>
      <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1) {?>
      <div class="row-flex1 btn-ff9402 btn-cuscom f16" style="width:auto" data-type="addcart">加入购物车</div>
      <div class="row-flex1 btn-ff5000 btn-cuscom f16" style="width:auto" data-type="buy">立即定制</div>
      <?php } else { ?>
      <div class="row-flex1 btn-pri-buy btn-pri-gray" style="width:auto">已经下架</div>
      <?php }?> </div>
  </div>
  <?php }?>
</div>
<div id="sns_pltip" class="tipbox tipbox_fixed_bottom" data-index="0" style="z-index:99999; display:none"> <span class="ico02 tipclose closeBtnHtml" style="z-index:9999"></span>
  <form id="sns_plform" class="addCommentForm" method="post">
    <div class="tipbox-in" data-index="0">
      <div class="tipcont tipcontbox">
        <div>
          <div class="mbar fl" id="mbar">
            <button type="button" class="b_ico ico-bq"></button>
          </div>
          <div class="fl ml-5"> <span class="b_ico ico-pic add-share"></span> </div>
          <div class="blank0"></div>
        </div>
        <div id="meditor" class="mcont rowbox">
          <div id="bqbox" class="bqbox"> <span class="ico02 ico-bqjt"></span> </div>
          <div class="row-flex1 pl_text">
            <input id="meditortxt" class="myeditable" name="comment" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_shares_view_addcomment'];?>
" style="display:none" data-validate="isempty" />
          </div>
          <button class="btn commentBtn w80" type="button" style="padding:10px 5px"> 发送 </button>
        </div>
      </div>
    </div>
  </form>
</div>
<?php if (!$_smarty_tpl->tpl_vars['pjax']->value) {?>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/shareView.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
</body>
</html><?php }?><?php }} ?>
