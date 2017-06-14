(function(){
	
	var app = {};
	
	var $warp = $('#warpper'),
		$inner = $('#warpInner'),
		$modules = $('#warpInner > .module'),
		$nextBtn = $('#nextPage'),
		mod_len = $modules.length;
	
	app = {
		hasTouch: 'ontouchstart' in window,
		currPage: location.hash ? parseInt(location.hash.replace('#m', ''),10) : 0,
		action: false,
		getBrowser: (function(){
			var u = navigator.userAgent;
			return {
				Mobile: !!u.match(/AppleWebKit.*Mobile/) || !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/) || !!u.match(/UC.*Mobile/),
				xiaomi: /XiaoMi/.test(u),
				mi3: /MI 3/.test(u),
				uc: /UCBrowser/.test(u)
			};
		})(),
		setWarpSize: function(){
			$inner.height($warp.height() * mod_len);
			$modules.height($warp.height());
		},
		bindIndxSWipe: function(){
			//首屏滚动-调用插件
			var mod_index = document.getElementById('indexScroll');
			newSwipe('indexScroll', 'indexScroll_pager', 'indexScroll_prev', 'indexScroll_next');
			//第4屏滚动
			var mod_pro = document.getElementById('proScroll');
			newSwipe('proScroll', 'proScroll_pager', 'proScroll_prev', 'proScroll_next');
		},
		pageSwipe: function(animate, direction){
			setTimeout(function(){
				if(animate){
					app.translate($inner[0], 200, $warp.height(), app.currPage);
					$inner.css({'top': 0});
				}else{
					$inner.css({'top': - $warp.height() * app.currPage});
				}
				app.toggleNextPageBtn();
			}, (direction == 'top' && app.getBrowser.xiaomi) ? 400 : 4);
		},
		setHash: function(){
			location.hash = '#m' + app.currPage;
		},
		toggleNextPageBtn: function(){
			if(app.currPage === mod_len-1){
				$nextBtn.hide();
			}else{
				$nextBtn.show();
			}
		},
		//css3垂直滚动
		translate: function(ele, s, d, i){
			var style = ele.style;
			d = - d*i;
			style.webkitTransitionDuration =
			style.MozTransitionDuration =
			style.msTransitionDuration =
			style.OTransitionDuration =
			style.transitionDuration = s + 'ms';
			style.webkitTransform = 'translate(0,' + d + 'px)' + 'translateZ(0)';
			style.msTransform =
			style.MozTransform =
			style.OTransform = 'translateY(' + d + 'px)';
		}

	};
	
	document.body.addEventListener('touchmove', function(e){
		e.preventDefault();
	}, false);
	
	//初始化根据hash跳转
	app.pageSwipe(false);
	//绑定changehash跳转
	$(window).on('hashchange', function(){
		app.currPage = location.hash ? parseInt(location.hash.replace('#m', ''),10) : 0;
		app.pageSwipe(true);
	});
	//绑定滚屏
	$warp.swipeUp(function(e){
		app.currPage++;
		if(app.currPage > mod_len-1){
			app.currPage = mod_len-1;
			return;
		}
		if(app.getBrowser.xiaomi){
			//兼容小米自带浏览器滑动BUG (原因为浏览器地址栏和工具栏触发了swipe事件)
			app.pageSwipe(true);
		}else{
			app.setHash();
		}
	});
	$warp.swipeDown(function(){
		app.currPage--;
		if(app.currPage < 0){
			app.currPage = 0;
			return;
		}
		if(app.getBrowser.xiaomi){
			//兼容小米自带浏览器滑动BUG (原因为浏览器地址栏和工具栏触发了swipe事件)
			app.pageSwipe(true, 'top');
		}else{
			app.setHash();
		}
	});
	//绑定下一屏
	$nextBtn.on(app.hasTouch ? 'touchend' : 'click', function(){
		app.currPage++;
		if(app.currPage > mod_len-1){
			app.currPage = mod_len-1;
			return;
		}
		app.setHash();
	});
	
	//设置盒子尺寸
	app.setWarpSize();
	$(window).on('resize', function(){
		app.setWarpSize();
		if(!app.getBrowser.xiaomi){ //不米自带浏览器会触发resize事件，滑动的时候
			app.currPage = 0;
			app.setHash();
		}
	});
	//绑定右侧按钮事件
	$('#moreBtn').on(app.hasTouch ? 'touchend' : 'click', function(){
		$('#moreBtns').toggleClass('btns_show');	
	});	
	//首屏滚动
	app.bindIndxSWipe();
	
	//内容居中 
	//$warp.find('.index_con').each(function(){
		//$(this).css({'margin-top': -$(this).height()/2});	
	//});
	
	//显示播放器
	var $videos = $('#videos');
	$videos.on('tap', 'img', function(){
		$('body').append('<div class="video_box" id="videoBox"><div class="inner" id="videoBoxInner"></div><div id="videoClose" class="close"><span>&#215;</span></div><video id="myVideo" controls="1" autoplay="1" name="media" width="100%"><source id="myVideoSource" src="'+ $(this).data('videosrc') +'" type="video/mp4"></video></div>');
		//全屏？
//		var ele = document.getElementById('myVideo');
//		ele.webkitRequestFullScreen();
//		ele.mozRequestFullScreen();
//		ele.requestFullscreen();
	});
	
	//播放器盒子点击关闭视频
	$('body').on(app.hasTouch ? 'touchend' : 'click', '#videoClose', function(){
		//$('#myVideo').width(0).height(0)[0].pause();
		$('#videoBox').empty('').remove();	
	});
		
})();

//loading处理
(function(){
		//加载百分比
	var sum = 0,
		//获取页面中所有img
		imgs = document.getElementsByTagName('img'),
		//遮罩层
		box = document.getElementById('loadMash'),
		//显示百分比的节点
		numbox = document.getElementById('loadMashNum'),
		//计算每加载完一项所增加的百分比数值
		singleNum = 100 / (imgs.length);
	
	//imgs绑定onload
	for(var i=0; i<imgs.length; i++){
		(function(_i){
			if(imgs[_i].complete){
				callback('img', _i);
			}else{
				bind(imgs[_i], 'load', function(){
					callback('img', _i);
				});
			}
		})(i);
	}
	
	//N秒之后 隐藏遮罩层
	setTimeout(function(){
		box.style.display = 'none';
	}, 15*1000);
	
	//单项加载完执行的回调
	function callback(type, idx){
		sum += singleNum;
		numbox.innerHTML = parseInt(sum, 10);
		if(parseInt(sum, 10) >= 99){
			numbox.innerHTML = 100;
			setTimeout(function(){
				box.style.display = 'none';
			}, 50);
		}
	}
	
	//所有资源加载完隐藏遮罩层
//	bind(window, 'load', function(){
//		numbox.innerHTML = 100;
//		setTimeout(function(){
//			box.style.display = 'none';
//		}, 50);
//	});
	
	//绑定事件函数
	function bind(obj, type, fn){
		obj.addEventListener(type, fn, false);
	}
})();