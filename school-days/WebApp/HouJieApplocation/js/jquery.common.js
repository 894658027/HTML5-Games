$(function(){

	$(".smclassli").on('click',function(){	
		$(".menulist li").removeClass("actives");	
		$(".menulist li").children("a").removeClass("actives");	
		$(".smclass").removeClass("actives");
		$(".smlist").css({"visibility":"hidden","display":"none"});
		if ($(this).children(".smlist").is(":hidden")){
			$(this).addClass("actives");	
			$(this).children(".smclass").addClass("actives");
			$(this).children(".smlist").css({"visibility":"visible","display":"block"});
		}else{		
			$(this).removeClass("actives");		
			$(this).children(".smclass").removeClass("actives");
			$(this).children(".smlist").css({"visibility":"hidden","display":"none"});
		}
	});
	$(".navbar-toggle").on('click',function(){				
		$(".menubar").slideToggle("fast");	
	});
});	

