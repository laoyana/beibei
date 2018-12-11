$(function(){

	var isRight = false; 
	drap();
	// 点击登录
	var n1 = 0;
	var n2 = 0;
	var n3 = 0;
	$("#a_login").click(function(){
		
		// 验证手机号
		isPhone();
		passWord();
		if(isRight){	
			$("#text_hint2").html("");
			$("#text_hint2").css("display",'none');
			n2 = 1;
		}else{
			$("#text_hint2").html("!请按住滑块，拖动到最右边");
			$("#text_hint2").css("display",'block');
			n2 = 0;
		}
		if(n1 + n2 + n3 == 3){
			$.ajax({
				url:'../src/php/login.php',
				method:'get',
				data:{
					username: $("#isPhone").val(),
					password: $("#pas").val()
				},
				success:function(data){
					if(data){
						window.location.href = "../index.html";
					}else{
						$('#text_hint0').html("！用户名或密码错误");
						$("#text_hint0").css("display","block");
					}
				},
				error:function(err){
					alert(err);
				}
			});
		}else{
			}
	})
	// 验证手机号
		function isPhone(){
			if(!$("#isPhone").val() || !/^1[34578]\d{9}$/.test($("#isPhone").val())){
				$('#text_hint').html("!请输入正确的邮箱或手机号");
				$("#text_hint").css("display","block");
				n1 = 0;
				isNum = 1;
			}else{
				$('#text_hint').html("");
				$("#text_hint").css("display","none");
				n1 = 1;
				isNum = 0;
			}
		}
	function drap(){
			var offsetX = 0;
			var offsetY = 0;
			$(".md_drap").mousedown(function(ev){
				offsetX = ev.clientX - $(this).offset().left;
				$(document).mousemove(function(ev){
					$(".md_drap").css({
						left:ev.clientX - offsetX - $(".md").offset().left
					});
					$(".color").css({
						width:$(".md_drap").css("left")
					});
					// 滑块左边界
					if(ev.clientX - offsetX - $(".md").offset().left < 0){
						$(".md_drap").css({
							left:0
						})
					}
					//滑块右边界
					if(ev.clientX - offsetX - $(".md").offset().left >= parseInt($('.md').css("width")) - parseInt($(".md_drap").css("width"))){
						$(".md_drap").css({
							left:parseInt($('.md').css("width")) - parseInt($(".md_drap").css("width"))
						})
						$(".color").css({
						width:parseInt($('.md').css("width")) - parseInt($(".md_drap").css("width"))
					});
						//滑块到达右边界，显示图片验证 
						$(".md_text").html('请点击图片中的<span>“苦”</span>字');
						$(".md_text").css({
							color:"#fff",
							left:0
						});
						$(".md_btn span").html("!");
						$('.md_btn span').css("color","red");

						$('.img_code').css("display","block");

						$(".img_code .img_title img").click(function(){
							$("#text_hint2").html("");
							$("#text_hint2").css("display","none");

							$('.img_code').css("display","none");

							$(".md_btn span").html("√");
							$('.md_btn span').css("color","green");

						$(".md_text").html('验证通过');
						$(".md_text").css({
							color:"#fff",
							left:124,
						});

						})
						isRight = true;
					}
				})
				$(document).mouseup(function(){
					$(document).off();
					//判断滑块是否到达右边界
					if(!isRight){
						$('.color').animate({width:0},500);
						$(".md_drap").animate({left:0},500);
					}
				})
			})
		}

		function passWord(){
			var oValue = $('#pas').val();
			if(oValue.length > 18 || oValue.length < 6){
					$('#text_hint4').html("!请输入6~16位贝贝密码");
					$("#text_hint4").css("display","block");
					n3 = 0;
				}else{
					$('#text_hint4').html("");
					$("#text_hint4").css("display","none");
					n3 = 1;
				}
		}
})