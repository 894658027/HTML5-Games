/*
 * Swipe 2.0
 * Brad Birdsall
 * Copyright 2013, MIT License
*/
//startSlide Integer (default:0) - 开始滚动的位置
//speed Integer (default:300) - 动画滚动的间隔（秒数）
//auto Integer - 开始自动幻灯片（以毫秒为单位幻灯片之间的时间）
//continuous Boolean (default:true) - 创建一个无限的循环（当滑动到所有动画结束时是否循环滑动）
//disableScroll Boolean (default:false) - 当滚动滚动条时是否停止幻灯片滚动
//stopPropagation Boolean (default:false) - 是否停止事件冒泡
//callback Function - 幻灯片运行中的回调函数
//transitionEnd Function - 动画运行结束的回调函数
	
function Swipe(a,b){"use strict";function m(){g=f.children,j=g.length,g.length<2&&(b.continuous=!1),e.transitions&&b.continuous&&g.length<3&&(f.appendChild(g[0].cloneNode(!0)),f.appendChild(f.children[1].cloneNode(!0)),g=f.children),h=new Array(g.length),i=a.getBoundingClientRect().width||a.offsetWidth,f.style.width=g.length*i+"px";for(var c=g.length;c--;){var d=g[c];d.style.width=i+"px",d.setAttribute("data-index",c),e.transitions&&(d.style.left=c*-i+"px",r(c,k>c?-i:c>k?i:0,0))}b.continuous&&e.transitions&&(r(p(k-1),-i,0),r(p(k+1),i,0)),e.transitions||(f.style.left=k*-i+"px"),a.style.visibility="visible"}function n(){b.continuous?q(k-1):k&&q(k-1)}function o(){b.continuous?q(k+1):k<g.length-1&&q(k+1)}function p(a){return(g.length+a%g.length)%g.length}function q(a,c){if(k!=a){if(e.transitions){var f=Math.abs(k-a)/(k-a);if(b.continuous){var j=f;f=-h[p(a)]/i,f!==j&&(a=-f*g.length+a)}for(var m=Math.abs(k-a)-1;m--;)r(p((a>k?a:k)-m-1),i*f,0);a=p(a),r(k,i*f,c||l),r(a,0,c||l),b.continuous&&r(p(a-f),-(i*f),0)}else a=p(a),t(k*-i,a*-i,c||l);k=a,d(b.callback&&b.callback(k,g[k]))}}function r(a,b,c){s(a,b,c),h[a]=b}function s(a,b,c){var d=g[a],e=d&&d.style;e&&(e.webkitTransitionDuration=e.MozTransitionDuration=e.msTransitionDuration=e.OTransitionDuration=e.transitionDuration=c+"ms",e.webkitTransform="translate("+b+"px,0)"+"translateZ(0)",e.msTransform=e.MozTransform=e.OTransform="translateX("+b+"px)")}function t(a,c,d){if(!d)return f.style.left=c+"px",void 0;var e=+new Date,h=setInterval(function(){var i=+new Date-e;return i>d?(f.style.left=c+"px",u&&w(),b.transitionEnd&&b.transitionEnd.call(event,k,g[k]),clearInterval(h),void 0):(f.style.left=(c-a)*(Math.floor(100*(i/d))/100)+a+"px",void 0)},4)}function w(){v=setTimeout(o,u)}function x(){u=b.auto>0?b.auto:0,clearTimeout(v)}var c=function(){},d=function(a){setTimeout(a||c,0)},e={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(a){var b=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var c in b)if(void 0!==a.style[b[c]])return!0;return!1}(document.createElement("swipe"))};if(a){var g,h,i,j,f=a.children[0];b=b||{};var k=parseInt(b.startSlide,10)||0,l=b.speed||150;b.continuous=void 0!==b.continuous?b.continuous:!0;var v,A,u=b.auto||0,y={},z={},B={handleEvent:function(a){switch(a.type){case"touchstart":this.start(a);break;case"touchmove":this.move(a);break;case"touchend":d(this.end(a));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":d(this.transitionEnd(a));break;case"resize":d(m)}b.stopPropagation&&a.stopPropagation()},start:function(a){var b=a.touches[0];y={x:b.pageX,y:b.pageY,time:+new Date},A=void 0,z={},f.addEventListener("touchmove",this,!1),f.addEventListener("touchend",this,!1)},move:function(a){if(!(a.touches.length>1||a.scale&&1!==a.scale)){b.disableScroll&&a.preventDefault();var c=a.touches[0];z={x:c.pageX-y.x,y:c.pageY-y.y},"undefined"==typeof A&&(A=!!(A||Math.abs(z.x)<Math.abs(z.y))),A||(a.preventDefault(),x(),b.continuous?(s(p(k-1),z.x+h[p(k-1)],0),s(k,z.x+h[k],0),s(p(k+1),z.x+h[p(k+1)],0)):(z.x=z.x/(!k&&z.x>0||k==g.length-1&&z.x<0?Math.abs(z.x)/i+1:1),s(k-1,z.x+h[k-1],0),s(k,z.x+h[k],0),s(k+1,z.x+h[k+1],0)))}},end:function(){var c=+new Date-y.time,d=Number(c)<250&&Math.abs(z.x)>20||Math.abs(z.x)>i/2,e=!k&&z.x>0||k==g.length-1&&z.x<0;b.continuous&&(e=!1);var j=z.x<0;A||(d&&!e?(j?(b.continuous?(r(p(k-1),-i,0),r(p(k+2),i,0)):r(k-1,-i,0),r(k,h[k]-i,l),r(p(k+1),h[p(k+1)]-i,l),k=p(k+1)):(b.continuous?(r(p(k+1),i,0),r(p(k-2),-i,0)):r(k+1,i,0),r(k,h[k]+i,l),r(p(k-1),h[p(k-1)]+i,l),k=p(k-1)),b.callback&&b.callback(k,g[k])):b.continuous?(r(p(k-1),-i,l),r(k,0,l),r(p(k+1),i,l)):(r(k-1,-i,l),r(k,0,l),r(k+1,i,l))),f.removeEventListener("touchmove",B,!1),f.removeEventListener("touchend",B,!1)},transitionEnd:function(a){parseInt(a.target.getAttribute("data-index"),10)==k&&(u&&w(),b.transitionEnd&&b.transitionEnd.call(a,k,g[k]))}};return m(),u&&w(),e.addEventListener?(e.touch&&f.addEventListener("touchstart",B,!1),e.transitions&&(f.addEventListener("webkitTransitionEnd",B,!1),f.addEventListener("msTransitionEnd",B,!1),f.addEventListener("oTransitionEnd",B,!1),f.addEventListener("otransitionend",B,!1),f.addEventListener("transitionend",B,!1)),window.addEventListener("resize",B,!1)):window.onresize=function(){m()},{setup:function(){m()},slide:function(a,b){x(),q(a,b)},prev:function(){x(),n()},next:function(){x(),o()},stop:function(){x()},getPos:function(){return k},getNumSlides:function(){return j},kill:function(){x(),f.style.width="",f.style.left="";for(var a=g.length;a--;){var b=g[a];b.style.width="",b.style.left="",e.transitions&&s(a,0,0)}e.addEventListener?(f.removeEventListener("touchstart",B,!1),f.removeEventListener("webkitTransitionEnd",B,!1),f.removeEventListener("msTransitionEnd",B,!1),f.removeEventListener("oTransitionEnd",B,!1),f.removeEventListener("otransitionend",B,!1),f.removeEventListener("transitionend",B,!1),window.removeEventListener("resize",B,!1)):window.onresize=null}}}}(window.jQuery||window.Zepto)&&function(a){a.fn.Swipe=function(b){return this.each(function(){a(this).data("Swipe",new Swipe(a(this)[0],b))})}}(window.jQuery||window.Zepto);

	
	//调用 （新增分页，左右点击）
	function newSwipe(box_id, page_id, prev_id, next_id, auto){
		if(!box_id){return false;}
		
		var box = document.getElementById(box_id),
			pager = document.getElementById(page_id),
			items = box.querySelectorAll('.screen'),
			prev  = document.getElementById(prev_id),
			next  = document.getElementById(next_id),
			ele;
			
		items[0].setAttribute('current', '1');
		
		//调用插件
		var mySwipe = Swipe(box, {
			auto: auto,
			callback: function(index, element) {
				//slideTab(index);
				var i = items.length;
				while(i--){
					items[i].removeAttribute('current');	
				}
				element.setAttribute('current', '1');
				var imgs = element.querySelectorAll('img');
				var l = imgs.length;
				while(l--){
					if(imgs[l].getAttribute('_src')){
						imgs[l].src = imgs[l].getAttribute('_src');	
					}
				}
			}
		});
		//当前页数处理
		//无或只有一个则隐藏页码和按钮items.length <= 1
		//if(1){
			//prev.style.display = next.style.display = pager.style.display = 'none';
			//prev.style.display = next.style.display = 'none';
		//}
		//生成页码
//		pager.innerHTML = '';
//		for(var i = 0; i < items.length; i++){
//			ele = document.createElement('em');
//			if(i==0){
//				ele.className = 'on';
//			}
//			ele.innerHTML = i+1;
//			pager.appendChild(ele);
//			ele = null;
//		}
		//绑定页码点击
//		var bullets = pager.getElementsByTagName('em');
//		for (var i=0; i < bullets.length; i++) {
//			var elem = bullets[i];
//			elem.setAttribute('data-tab', i);
//			bind(elem, 'ontouchstart' in window ? 'touchstart' : 'click', function(){
//				mySwipe.slide(parseInt(this.getAttribute('data-tab'), 10), 200);
//			});
//		}
		//绑定点击上一个
		bind(prev, 'ontouchstart' in window ? 'touchend' : 'click', function(){
			mySwipe.prev();
			return false;
		});
		//绑定点击下一个
		bind(next, 'ontouchstart' in window ? 'touchend' : 'click', function(){
			mySwipe.next();
			return false;
		});
		//改变页码状态
//		function slideTab(index){
//			var i = bullets.length;
//			while (i--) {
//				bullets[i].className = bullets[i].className.replace('on',' ');
//			}
//			bullets[index].className = 'on';
//		};
		//绑定事件函数
		function bind(obj, type, fn){
			if(!obj){return false;}
			if(obj.attachEvent){
				obj.attachEvent('on'+type, function(){fn(window.event)});
			}else{
				obj.addEventListener(type, fn, false);       
			}
		}
		//防止浏览器触发前进或后退
		//box.parentNode.addEventListener('touchmove', function(e){e.preventDefault();}, false);
		return mySwipe;
	}
	

