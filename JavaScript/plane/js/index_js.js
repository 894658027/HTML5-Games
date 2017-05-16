//用户验证
function yanzhengyhm(){
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest("Microsoft.XMLHTTP"); 
	}
	xmlhttp.onreadystatechange=function(){
		
		if(xmlhttp.readyState==4)
		{
			if(xmlhttp.status==200)
			{
				//alert(xmlhttp.responseText);
				$("#yhts").html(xmlhttp.responseText);
				if(!(/^\w{8,20}$/.test(yhm)))
				{
					$("#yhts").html("用户名输入错误");
				}
			}
		}
	}
	var yhm=document.getElementById("yhm").value;
	var yhmcd=yhm.length;
	if((/^\w{8,20}$/.test(yhm)))
	{
		return true;
	}
	xmlhttp.open("GET","checkyhm.php?yhm="+yhm,true);
	xmlhttp.send();
}
//密码验证
function yanzhengpwd(){
	var pwd=document.getElementById("pwd").value;
	var pwdd=document.getElementById("pwdd").value;
	if(pwd.length<6||pwd.length>16)
	{
		$("#yipwd").html("密码长度不正确");
		return false;
	}
	else
	{
		$("#yipwd").html("密码符合要求");
		
		if(pwd!==pwdd)
		{
			$("#pwdts").html("两次密码输入不相同!");
			return false;
		}
		if(pwd==pwdd)
		{
			$("#pwdts").html("输入正确");
			return true;
		}
	}
	
}
//手机验证
function checktele(){
	var tele=document.getElementById("tele").value;
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tele))){
        $("#sjts").html("不是完整的11位手机号!");
        return false;
    }
    else
    {
    	$("#sjts").html("输入正确!");
    	return true; 
    }
}
//邮箱验证
function checkemail(){
	var email=document.getElementById("email").value;
    if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))){
        $("#emailts").html("邮箱格式不正确!");
        return false;
    }
    else
    {
    	$("#emailts").html("输入正确!");
    	return true;
    }
}
//显示验证码
function yanzhengma(){
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		
		xmlhttp=new XMLHttpRequest("Microsoft.XMLHTTP"); 
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4)
		{
			if(xmlhttp.status==200)
			{
				//alert(num);
				$("#yzm").html("<img src='yanzhengma.php' width='60px' />")
            	return num;
			}
		}
	}
	xmlhttp.open("GET","yanzhengma.php",true);
	xmlhttp.send();
}
//验证验证码
//注册
function zhuce(){
	alert(yanzhengyhm());
	if(yanzhengpwd()==true&&yanzhengyhm()==true&&checktele()==true&&checkemail()==true)
	{
		var xmlhttp;
		if(window.XMLHttpRequest)
		{
			
			xmlhttp=new XMLHttpRequest("Microsoft.XMLHTTP"); 
		}
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4)
			{
				if(xmlhttp.status==200)
				{
					alert(xmlhttp.responseText);
					//$("#yhts").html(xmlhttp.responseText);
					//$("#zhuce").modal("hide");
					$("#modal").html("恭喜您,注册成功!"+"<br />"+"无操作五秒钟后自动关闭<p id='jishi'>5</p>"+"<a href='#denglu' data-toggle='modal' data-target='#denglu'>点击登录</a>");
					//setTimeout(function(){$("#zhuce").modal("hide")},5000);
					var i=5;
					setInterval(function(){
	                $("#jishi").html(i--);
					if(i == 0) 
					{i=6;$("#zhuce").modal("hide")}
					},1000);
	            
				}
			}
		}
		var yhm=document.getElementById("yhm").value;
		var pwd=document.getElementById("pwd").value;
		var pwdd=document.getElementById("pwdd").value;
		var sex=$('input[name="sex"]:checked').val(); 
		var tele=document.getElementById("tele").value;
		var email=document.getElementById("email").value;
		var ques=document.getElementById("ques").value;
		var answ=document.getElementById("answ").value;
		var yanzheng=document.getElementById("yanzheng").value;
		
		xmlhttp.open("GET","zhuce.php?yhm="+yhm+"&pwd="+pwd+"&pwdd="+pwdd+"&sex="+sex+"&tele="+tele+"&email="+email+"&ques="+ques+"&answ="+answ+"yanzheng="+yanzheng,true);	
		xmlhttp.send();
	}
	
}
//登陆
function denglu(){
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		
		xmlhttp=new XMLHttpRequest("Microsoft.XMLHTTP"); 
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4)
		{
			if(xmlhttp.status==200)
			{
				//alert(xmlhttp.responseText);
				if(xmlhttp.responseText=="1")
				{
					//$("#modald").html("<br /><br /><br />"+xmlhttp.responseText);
					setTimeout(function(){
	                $("#denglu").modal("hide");
					$("#dhzc").html(yhm);
					$("#dhdl").html("<a href='index.html'>退出</a>");
					},1000);
				}
				//if(xmlhttp.responseText=="success")
				//{
				//	alert("登录成功");
				//}
				if(xmlhttp.responseText=="2")
				{
					alert("用户名不存在");
					return false;
				}
				if(xmlhttp.responseText=="3")
				{
					alert("密码错误");
					return false;
				}
			}
		}	
				//$("#yhts").html(xmlhttp.responseText);
		}
	var yhm=document.getElementById("dyhm").value;
	var pwd=document.getElementById("dpwd").value;
	
	xmlhttp.open("GET","yanzheng.php?yhm="+yhm+"&pwd="+pwd,true);
	xmlhttp.send();
}