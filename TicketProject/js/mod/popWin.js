// JavaScript Document
function PopWin(options){
	var opts = {
		title: '项目',
		keyText: '姓名', //选填
		content: '不能为空！',  //必填
		btnCount: 2, //几个按钮，必填
		btn1: '取消', //取消按钮 选填
		btn2: '继续', //确定按钮 必填（只有一个按的时候填这个）
		btn1Callback: function(){}, //取消按钮的回调函数，选填
		btn2Callback: function(){} //确定按的回调函数，选填
	};
	for(var i in options) {
		opts[i] = options[i];
	}
	var btnstr = "",htmlstr = "";
		
	
	if(opts.btnCount == 1){
		btnstr = "<input type='button' class='blue_s firmBtn' value=" + opts.btn2 + ">";
	} else if(opts.btnCount == 2) {
		btnstr = "<input type='button' class='blue_s cancelBtn' value=" + opts.btn1 + "><input type='button' class='blue_s firmBtn ml20' value=" + opts.btn2 + ">";
	}
	
	htmlstr = "<div class='PopWin'><div class='msk'></div><div class='popCon smallWin'><span class='del'></span><div class='popTitle'>" + opts.title + "</div><div class='p20'><p class='orange tc'>" + opts.keyText + "</p><p class='tc'>" + opts.content + "</p><div class='mt20 tc'>" + btnstr + "</div></div></div></div>";
	
	$('body').append(htmlstr);
	
	$('.cancelBtn').on('click', function(){
		$(this).closest('.PopWin').remove();
		opts.btn1Callback();
	});
	$('.firmBtn').on('click', function(){
		$(this).closest('.PopWin').remove();
		opts.btn2Callback();
	});
	$('.del').on('click',function(){
		$(this).closest('.PopWin').remove();
	});
}


	