//返回顶部函数
function myScroll()
{
	var x=document.body.scrollTop||document.documentElement.scrollTop;
	var timer=setInterval(function(){
		x=x-100;
	if(x<100)
	{
		x=0;
		window.scrollTo(x,x);
		clearInterval(timer);
	}
		window.scrollTo(x,x);
	},5);
}


var downNavTab = $('.botton'),
	navTab = $('.navSmall');
downNavTab.click(function(){
	if(navTab.attr('flag') == 'hide'){
		navTab.attr('flag','show')
		navTab.css({display:'block'})
		return false
	}else if(navTab.attr('flag') == 'show'){
		navTab.attr('flag','hide')
		navTab.css({display:'none'})
	}
})



//公用方法
var wapInit = function(){return this;}
wapInit.prototype = {
	tabDisplay : function(tab,cont,onClass){
		var onClass = onClass || 'on';
		tab.bind('click',function(){
			var i = tab.index($(this))
			tab.not(tab.eq(i).addClass(onClass)).removeClass(onClass)	
			cont.not(cont.eq(i).addClass(onClass)).removeClass(onClass)	
		})
	}
} 
var wapPublic = new wapInit();

