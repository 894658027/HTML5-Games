$(function(){
	$("#biaoti").html();
	})
	

	$(document).ready(function(){
		<!--文档就绪动画-->
		$("#Img").hide();
		$("#Img").fadeIn(3000);
		$("#Text").hide();
		$("#Text").fadeIn(3000);
		 })
	$(function(){	
	<!--切换动画-->
		$("#hj_phone_1").hide();
			$("#phone").click(function(){
							$("#hj_zh1").hide("slow");
				//$("#phone_1").show();
		    $("#hj_phone_1").show("slow")=function leftname(){
				$("#phone_1").animate("left",1000);}
			//	$("#phone_2").css("display","none","transition:","all 3s ease-in");
			 })
})
			//层级切换
			$("#hj_zh").click(
			  function(){
				  $("#hj_phone_1").hide();
				  $("#hj_zh1").show("slow");	})
//按钮样式效果
	   $("#button1").bind({ 
	   click:function(){
		$(this).css("background","#D43900")},
		 mouseleave:function(){
			 $(this).css("background","#DE4943")}  
	    })
<!--表单验证-->
$(function(){
$("#form1 :input").focus(
function(){
$(this).addClass("focus")}).blur(function(){
$(this).removeClass("focus")	
})
//以上为表单的焦点事
})
function textname(){
	var ob=$("[name=username]");
	var v=ob.val();
	if(/^[a-zA-Z]\w{3,19}$/.test(v)){
	$("#a1").html("用户名正确");	
		$(".la_1").removeClass("la_5");		  
	return true;	
		}else{
		$("#a1").html("用户名错误");
				$(".la_1").addClass("la_5");
		return false;	
			}
	}
	
	
	function textname_1(){
	var ob=$("[name=username_1]");
	var v=ob.val();

	if(/^[a-zA-Z]\w{3,19}$/.test(v)){
	$("#b1").html("用户名正确");	
		$(".lb_1").removeClass("lb_5");		  
	return true;	
		}else{
		$("#b1").html("用户名错误");
				$(".lb_1").addClass("lb_5");
		return false;	
			}
	}
//验证密码	
function passname(){
	
	 v=$("[name=pass]").val();
	if(/^[0-9A-Za-z]{6,20}$/.test(v)){
		$("#a2").html("密码格式正确");	
		$(".la_2").removeClass("la_5");	
	return true;
		
		}else{
		$("#a2").html("密码格式错误");	
		$(".la_2").addClass("la_5");
	return false;	
			}
	}
	
	function passname_1(){
	
	 v=$("[name=pass_1]").val();
	if(/^[0-9A-Za-z]{6,20}$/.test(v)){
		$("#b2").html("密码格式正确");	
		$(".lb_2").removeClass("lb_5");	
	return true;
		
		}else{
		$("#b2").html("密码格式错误");	
		$(".lb_2").addClass("lb_5");
	return false;	
			}
	}
	
	
		//手机号
	function teln(){
	 v=$("[name=tel]").val();
	 if(/^1[3|4|5|7|8]\d{9}$/.test(v)){
		 $("#a4").html("手机号码格式正确");
		 $(".la_3").removeClass("la_5");
		 return true;
		 }else{
			 $("#a4").html("格式不正确，请从新填写！");
			 $(".la_3").addClass("la_5");
			 return false; 
			 }
	}
	
//验证邮箱
function emailname(){
	 v=$("[name=email]").val();
	if(/^\w+@\w+(\.\w+)+$/.test(v)){
		$("#a3").html("邮箱格式正确");
		$(".la_4").removeClass("la_5");	
	return true;
		}else{
		$("#a3").html("邮箱格式错误");
		$(".la_4").addClass("la_5");
	return false;	
			}
	}	
	

//提交表单时的验证
function checkform(){
if( textname()&&passname()&&teln()){
	alert("注册成功");
	}else{
		alert("注册失败");
		 }
	}
	function CheckBtn(){
	if( textname()&&passname()&&teln())
	{
	$('#areaSelect').attr("disabled","");
	}else{
		$('#areaSelect').attr("disabled","disabled");
		 }
		 }
		 
		 if(textname_1()&&passname_1&&emailname()){
			 $("#btn_m").click(function(){
				 alert("123");
				   })
		 }
   