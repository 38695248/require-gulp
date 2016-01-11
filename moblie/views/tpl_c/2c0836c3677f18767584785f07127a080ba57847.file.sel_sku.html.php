<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 10:55:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\goods\sel_sku.html" */ ?>
<?php /*%%SmartyHeaderCode:14075568f877e1441b9-11411480%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2c0836c3677f18767584785f07127a080ba57847' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\goods\\sel_sku.html',
      1 => 1452245277,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '14075568f877e1441b9-11411480',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'goods_infor' => 0,
    'v' => 0,
    'currency' => 0,
    'img_print' => 0,
    'img_pview' => 0,
    'activity' => 0,
    'k0' => 0,
    'attributesType' => 0,
    'v0' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f877e2ab812_15740091',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f877e2ab812_15740091')) {function content_568f877e2ab812_15740091($_smarty_tpl) {?><!--定制选项-->
<div id="custom-list-modalMask" class="modalMask" style="display:none; z-index: 9998;"></div>
<div id="custom-list" class="custom-list" style="display:none;"> 
    <span class="ico custom-close"></span>
    <input id="price_stock" type="hidden" value="<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['goods_infor']->value['price_stock']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?><?php echo $_smarty_tpl->tpl_vars['v']->value['color'];?>
_<?php echo $_smarty_tpl->tpl_vars['v']->value['size'];?>
_<?php echo $_smarty_tpl->tpl_vars['v']->value['price'];?>
_<?php echo $_smarty_tpl->tpl_vars['v']->value['numleft'];?>
|<?php } ?>" />
    <form id="privateForm" method="post" data-action="/myorder/addtocart.html" data-gdid="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['gdid'];?>
">
      <div id="custom-cont" class="custom-cont">
        <div class="custom-cont-in">
          <div class="rowbox pri-buy">
            <div class="w90 buyimg mr-10"> <img src="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['imgs'][0]['m'];?>
" > </div>
            <div class="row-flex1" style="padding-right:30px">
              <p class="color-333"><?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['gdname'];?>
</p>
              <p class="blank5"></p>
              <p class="f21 color-red"><span id="thisprice" data-defprice="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['priv_price'];?>
" data-price="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['priv_price'];?>
"><?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['priv_price'];?>
</span></p>
              <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['activity_bsh']==4) {?>
              <p><span class="f12 ml-5 bg-fc9b00 market-zhe">返 <?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['money_act'];?>
</span></p>
              <?php }?> 
              <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1&&$_smarty_tpl->tpl_vars['goods_infor']->value['activity_bsh']==5) {?>
              <p> <span class="f12 ml-5 bg-00a0e8 market-zhe">试穿押金:¥ <?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['money_act'];?>
</span> </p>
              <?php }?> </div>
          </div>
          <input data-role="none" class="color" name="gdid" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['gdid'];?>
">
          <input data-role="none" type="hidden" name="img_print" value="<?php echo $_smarty_tpl->tpl_vars['img_print']->value;?>
" />
          <input data-role="none" type="hidden" name="img_pview" value="<?php echo $_smarty_tpl->tpl_vars['img_pview']->value;?>
" />
          <input data-role="none" type="hidden" name="activity" value="<?php echo $_smarty_tpl->tpl_vars['activity']->value;?>
" />
          <div class="color-list rowbox">
            <h2 class="w40 f16 line40">颜色</h2>
            <ul class="row-flex1 viewSub" id="viewColor-list">
              <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['goods_infor']->value['colors']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
              <li class="" data-type="color" data-tagid="<?php echo $_smarty_tpl->tpl_vars['v']->value[0];?>
" data-sub="<?php echo $_smarty_tpl->tpl_vars['v']->value[0];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[1];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[2];?>
"><?php echo $_smarty_tpl->tpl_vars['v']->value[1];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['v']->value[2];?>
<em class="ico currentico"></em></li>
              <?php } ?>
              <input class="thisval" name="buycolor" type="hidden" value="">
            </ul>
          </div>
          <div class="color-list rowbox">
            <h2 class="w40 f16 line40">尺码</h2>
            <ul class="row-flex1 viewSub" id="viewSize-list">
              <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['goods_infor']->value['sizes']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
              <li class="" data-type="size" data-tagid="<?php echo $_smarty_tpl->tpl_vars['v']->value[0];?>
" data-sub="<?php echo $_smarty_tpl->tpl_vars['v']->value[0];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[1];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[2];?>
"><?php echo $_smarty_tpl->tpl_vars['v']->value[1];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['v']->value[2];?>
<em class="ico currentico"></em></li>
              <?php } ?>
              <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['bddata']) {?>
              <li data-type="size" data-sub="bodydata" data-tagid="bodydata">量身定制</li>
              <?php }?>
              <input class="thisval" name="buysize" type="hidden">
            </ul>
          </div>
          
          <!--定制元素-->
          <div id="other_attributes"> 
            <?php  $_smarty_tpl->tpl_vars['v0'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v0']->_loop = false;
 $_smarty_tpl->tpl_vars['k0'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['goods_infor']->value['attributes']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v0']->key => $_smarty_tpl->tpl_vars['v0']->value) {
$_smarty_tpl->tpl_vars['v0']->_loop = true;
 $_smarty_tpl->tpl_vars['k0']->value = $_smarty_tpl->tpl_vars['v0']->key;
?>
            <div class="color-list rowbox">
              <h2 class="w40 f16 line40"><?php echo $_smarty_tpl->tpl_vars['attributesType']->value[$_smarty_tpl->tpl_vars['k0']->value];?>
</h2>
              <ul class="row-flex1 viewSub">
                <?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['v0']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
                <li class="" data-addprice="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['attr_addprice'][$_smarty_tpl->tpl_vars['v']->value[0]][$_smarty_tpl->tpl_vars['v']->value[2]][3];?>
" data-type="<?php echo $_smarty_tpl->tpl_vars['v']->value[0];?>
" data-tagidf="<?php echo $_smarty_tpl->tpl_vars['v']->value[1];?>
" data-tagid="<?php echo $_smarty_tpl->tpl_vars['v']->value[2];?>
"  data-sub="<?php echo $_smarty_tpl->tpl_vars['v']->value[0];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[1];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[2];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[3];?>
|<?php echo $_smarty_tpl->tpl_vars['v']->value[4];?>
"><?php echo $_smarty_tpl->tpl_vars['v']->value[3];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['v']->value[4];?>
<?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['attr_addprice'][$_smarty_tpl->tpl_vars['v']->value[0]][$_smarty_tpl->tpl_vars['v']->value[2]][3]>0) {?>&nbsp;
                  <spad class="color-red">
                  +<?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['attr_addprice'][$_smarty_tpl->tpl_vars['v']->value[0]][$_smarty_tpl->tpl_vars['v']->value[2]][3];?>
</span><?php }?><em class="ico currentico"></em></li>
                <?php } ?>
                <input class="thisval" name="buyattr" type="hidden" isarray="true">
    
              </ul>
            </div>
            <?php } ?> 
          </div>
          <div id="buy-box">
            <div class="num-list rowbox">
              <h2 class="w40 f16">数量</h2>
              <ul class="row-flex1 buynum" style="padding-left:6px">
                <li class="l-rad minus">-</li>
                <li class="num-input number">
                  <input data-role="none" type="text" name="buynum" value="1" class="w50" readonly>
                  <input type="hidden" id="maxNum" data-max="<?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['num'];?>
">
                </li>
                <li class="r-rad plus">+</li>
                <li style="border:none; padding:0 0 0 5px"><span id="goods_infor_text" style="display:none">（专属定制）</span><span id="goods_infor_numbox">(库存<span id="goods_infor_num"><?php echo $_smarty_tpl->tpl_vars['goods_infor']->value['num'];?>
</span>件)</span></li>
              </ul>
            </div>
          </div>
          <div id="crowd-box" class="hide" style="margin-top:10px">
            <div class="crowd-box color-list rowbox">
              <h2 class="w40 f16">赏金</h2>
              <div class="row-flex1">
                <p class="line20 color-red">*众筹成功后,为支持百享您将打赏给百享的赏金</p>
                <ul class="viewSub" id="crowd-list">
                </ul>
              </div>
            </div>
            <div class="blank10"></div>
            <div id="crowd-textarea" class="crowd-box rowbox">
              <h2 class="w40 f16 ml-10">心愿</h2>
              <div data-type="crowd" style="padding:0px 10px 0 8px" id="crowd-textarea" class="row-flex1">
                <textarea id="crow-des" maxlength="50" class="line20" style="height:50px" placeholder="请和您的朋友说说您的众筹心愿,最多50个字" readonly ></textarea>
              </div>
            </div>
          </div>
          <div id="bargain-box" class="hide" style="margin-top:10px">
            <div class="crowd-box rowbox">
              <h2 class="w40 f16 ml-10">心愿</h2>
              <div style="padding:0px 10px 0 8px" id="bargain-textarea" class="row-flex1">
                <textarea id="bargain-des" maxlength="50" class="line20" style="height:50px" placeholder="请和您的朋友说说您的砍价心愿,最多50个字" readonly ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-pri-op w100e">
        <input id="sub-des" type="hidden" name="shortdesc" >
        <input id="sub-mobile" type="hidden" value="" name="cellphone" />
        <input id="isbuy" type="hidden" value="1" />
        <div id="bargain-box-btn" class="hide">
          <button type="button" id="add-kj-btn" class="btn-pri-buy text-center add-submit-btn">马上砍价</button>
        </div>
        <div id="crowd-box-btn" class="hide">
          <button type="button" id="add-zc-btn" class="btn-pri-buy text-center add-submit-btn">立即众筹</button>
        </div>
        <div id="tryon-box-btn" class="hide">
          <button type="button" id="add-zc-btn" class="btn-pri-buy text-center add-submit-btn">马上试穿</button>
        </div>
        <div id="buy-box-btn">
          <?php if ($_smarty_tpl->tpl_vars['goods_infor']->value['status']==1) {?>
          <button type="button" id="add-dz-btn" class="btn-pri-buy text-center add-submit-btn">确 定</button>
          <?php } else { ?>
          <button type="button"class="btn-pri-buy btn-pri-gray text-center">已经下架</button>
          <?php }?> </div>
      </div>
    </form>
</div>
<div id="des_crowdtip" class="tipbox tipbox_fixed fade" data-index="1">
    <form id="des_crowdform" class="addCommentForm" method="post" action="">
      <div class="tipbox-in" data-index="0">
        <h1 class="tiptop">说说您心愿</h1>
        <span class="ico02 tipclose closeBtnHtml"></span>
        <div class="tipcont tipcontbox">
          <div class="rowbox">
            <div class="line30 mr-10 f16">手 机：</div>
            <div class="row-flex1">
              <input id="crow-des-mobile" type="text" value="" placeholder="众筹成功，方便客服联系您" data-validate="Mobile" />
            </div>
          </div>
          <div class="blank10"></div>
          <div class="rowbox">
            <div class="line30 mr-10 f16">说 说：</div>
            <div class="row-flex1">
              <textarea id="crow-des-tip" name="shortdesc" maxlength="50" class="line24" style="height:50px" placeholder="说出您的众筹心愿" data-validate="isempty"></textarea>
            </div>
          </div>
          <div class="pay_f_m_btn">
            <button type="button" id="des-tip-btn" class="btn btn-red w100e">确定</button>
          </div>
          <div class="pay_f_m_text pay_f_m_text_borer line30">
            <h2 class="line30">心愿说明：</h2>
            <p class="f16">1. 您的手机我们不会泄露给其他人；</p>
            <p class="f16">2. 众筹成功百享客服将可能和您联系确认；</p>
          </div>
        </div>
      </div>
    </form>
    </div>
<div id="des_bargaintip" class="tipbox tipbox_fixed fade" data-index="1">
    <form id="des_bargainform" class="addCommentForm" method="post" action="">
      <div class="tipbox-in" data-index="0">
        <h1 class="tiptop">说说您心愿</h1>
        <span class="ico02 tipclose closeBtnHtml"></span>
        <div class="tipcont tipcontbox">
          <div class="rowbox">
            <div class="line30 mr-10 f16">手 机：</div>
            <div class="row-flex1">
              <input id="bargain-des-mobile" type="text" value="" placeholder="方便客服联系您" data-validate="Mobile" />
            </div>
          </div>
          <div class="blank10"></div>
          <div class="rowbox">
            <div class="line30 mr-10 f16">说 说：</div>
            <div class="row-flex1">
              <textarea id="bargain-des-tip" name="shortdesc" maxlength="50" class="line24" style="height:50px" placeholder="说出您的砍价心愿" data-validate="isempty"></textarea>
            </div>
          </div>
          <div class="pay_f_m_btn">
            <button type="button" id="des-bargain-btn" class="btn btn-red w100e">确定</button>
          </div>
          <div class="pay_f_m_text pay_f_m_text_borer line30">
            <h2 class="line30">心愿说明：</h2>
            <p class="f16">1. 您的手机我们不会泄露给其他人；</p>
            <p class="f16">2. 以便百享客服将可能和您联系确认；</p>
          </div>
        </div>
      </div>
    </form>
    </div><?php }} ?>
