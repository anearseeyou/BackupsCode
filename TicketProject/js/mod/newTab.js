// JavaScript Document
	function PlayTab(){
		this.index = 0;
	}
	PlayTab.prototype.init = function(){
		var that = this;
//		$('.pageTitle > div')
		that.toggleTab();
		that.showLRBtns();
		
		
		$('.lBtn').on('click', function(){
			var absDiv = $('.tabWrap > div'),
				leftVal = parseInt(absDiv.css('left'));
			
			leftVal += 100;
			
			if(leftVal >= 0){
				leftVal = 0;
			}
//			console.log(parseInt(leftVal));
			
			$('.tabWrap > div').css({
				left: leftVal
			});
		});
		$('.rBtn').on('click', function(){
			var absDiv = $('.tabWrap > div'),
				leftVal = parseInt(absDiv.css('left')),
				numArray = that.calculateWidth(),
	//			tabsWidth >= wrapWidth
				tabsWidth = numArray[0],
				wrapWidth = numArray[1];
			
			leftVal -= 100;
			
			if(leftVal <= wrapWidth - tabsWidth){
				leftVal = wrapWidth - tabsWidth;
			}
//			console.log(parseInt(leftVal));
			
			$('.tabWrap > div').css({
				left: leftVal
			});
		});
	};
	PlayTab.prototype.toggleTab = function(){
		var that = this;
		$('.pageTitle').on('click', 'span', function(){
			var _this = $(this);
			_this.addClass('cur').siblings().removeClass('cur');
			var index = _this.index();
			$('.tabContent').eq(index).show().siblings('.tabContent').hide();
		});
	};
	PlayTab.prototype.addTab = function(options){
		var that = this;
		var opt = {
			name: '新建标签',
			id: '',
			callback: function(){
				console.log('这是回调函数');
			}
		};
		
		for(var i in options){
			opt[i] = options[i];
		}
		
		var numArr = this.calculateWidth(),
			tabsWidth = numArr[0],
			wrapWidth = numArr[1];
		
		var theTab = $('.pageTitle [data-id=' + opt.id + ']'),
			theIndex, tabContent;
		
		if(theTab.length > 0){
			theIndex = theTab.index();
			var tabContent = $('.tabContent').eq(theIndex);
			if(theTab.length > 0){
				theTab.addClass('cur').siblings().removeClass('cur');
				tabContent.show().siblings('.tabContent').hide();
			}
			
			//计算距离左端的宽度，并与父级position-left比较让打开的tab签显示在可见区域
			var leftSpans = $('.tabWrap span'), 
				theSpanWidth = theTab[0].clientWidth,
				offsetsLeft = 0,
				spanWrap = $('.tabWrap > div'),
				leftVal = parseFloat(spanWrap.css('left')); //当前要打开的tab签距离父元素
//				wrapWidth = that.calculateWidth()[1];
			
			for(var j = 0; j < theIndex; j++){
				offsetsLeft += leftSpans[j].clientWidth + 1;
			}
			
			offsetsLeft = 0 - offsetsLeft;
			
			if(offsetsLeft > leftVal){
				spanWrap.css({
					left: offsetsLeft + 'px'
				});
			} else if(offsetsLeft < leftVal - wrapWidth){
				var val = offsetsLeft + wrapWidth - theSpanWidth;
				spanWrap.css({
					left: val + 'px'
				});
			}
		} else {
			$('.tabWrap > div').append('<span data-id="' + opt.id + '" class="tab"><i>' + opt.name + '</i><em></em></span>');

			var thisSpan = $('[data-id=' + opt.id + ']');
			thisSpan.addClass('cur').siblings().removeClass('cur');
			opt.callback();
			thisSpan.on('click', 'em', function(e){
				that.delTab(e, this);
			});
			that.showLRBtns();
			
			var numArr1 = that.calculateWidth();
			tabsWidth = numArr1[0];
			wrapWidth = numArr1[1];

			if(tabsWidth >= wrapWidth) {
				$('.tabWrap > div').css({
					left: wrapWidth - tabsWidth
				});
			}
		}
	};

	PlayTab.prototype.delTab = function(e, the){
		var that = this;
		if(e.target == the){
			var span = $(the).closest('span'),
				pageTitle = span.closest('.pageTitle'),
				lastSpan,
				curFlag = span.hasClass('cur');
			that.index = span.index();
			span.remove();
			$('.tabContent').eq(that.index).remove();
			if(curFlag){
				that.index--;
				lastSpan = pageTitle.find('span').eq(that.index);
				lastSpan.addClass('cur');
				$('.tabContent').eq(that.index).show().siblings('.tabContent').hide();
			} 
			
			var numArr = this.calculateWidth(),
				tabsWidth = numArr[0],
				wrapWidth = numArr[1],
				leftVal = parseInt($('.tabWrap > div').css('left'));
			console.log(wrapWidth - tabsWidth);
			console.log(leftVal);

			if(leftVal < 0 && leftVal <= wrapWidth - tabsWidth){
				leftVal = wrapWidth - tabsWidth;
				$('.tabWrap > div').css({
					left: leftVal
				});
			} 
			that.showLRBtns();
		}
	};
	PlayTab.prototype.calculateWidth = function(){
		var /*pageTitle = $('.pageTitle'),*/
//			tabWrap = pageTitle.find('.tabWrap'),
			tabWrap = $('.tabWrap'),
			wrapWidth = tabWrap.width(),
			tabs = tabWrap.find('div'),
			spans = $('.tabWrap span'),
			tabsWidth = 0, len = spans.length;
		
		for(var i = 0; i < len; i++){
			var w = 0;
			w = spans[i].clientWidth;
			tabsWidth += spans[i].clientWidth;
			console.log("第" + i + "个span的宽度：" + w);
		}
		tabsWidth = tabsWidth + len + 1;
//		if(tabsWidth > wrapWidth){
//			tabs.width(tabsWidth);
//		}
//		tabsWidth = tabs.width();
		
		return [tabsWidth, wrapWidth];
	};
	PlayTab.prototype.showLRBtns = function(){
		var arr = this.calculateWidth(),
			pageTitle = $('.pageTitle'),
//			tabWrap = pageTitle.find('.tabWrap'),
			tabsWidth = arr[0],
			wrapWidth = arr[1];
		
//		console.log(tabsWidth);
//		console.log(wrapWidth);
		
		if(tabsWidth >= wrapWidth){
			pageTitle.find('.lBtn').show();
			pageTitle.find('.rBtn').show();
			$('.tabWrap').css({
				left: 31 + 'px',
				right: 31 + 'px'
			});
		} else {
			pageTitle.find('.lBtn').hide();
			pageTitle.find('.rBtn').hide();
			$('.tabWrap').css({
				left: 0,
				right: 0
			});
			$('.tabWrap > div').css({
				left: 0
			});
		}
	};

	function getStyle(el, name) {
		if(window.getComputedStyle) {
			return window.getComputedStyle(el, null)[name];
		}else{
			return el.currentStyle[name];
		}
	}

