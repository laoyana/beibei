$(function(){
				
			// 实现滑块的移动,进行验证
			drap();
			// 获取短信验证码
			var isRight = false; //用来判断滑块是否到达右边界 
			var isNum = 0; //提示顺序
			getCode($(".code"));

			showPassword();
			//点击注册
			var n1 = 0;
			var n2 = 0;
			var n3 = 0;
			$("#a_register").click(function(event){
				
				//阻止注册按钮的默认行为
				event.preventDefault();
						// 验证手机号
						isPhone();
						// 验证码
						isCode();
						// 密码验证
						passWord();
				var sum = n1 + n2 + n3;
				if(sum == 3){
					$.ajax({
						url:'../src/php/register.php',
						method:'get',
						data:{
							username: $("#isPhone").val(),
							password: $("#pas").val()
						},
						success:function(data){
							if(data){
								
								window.location.href = "../index.html";
							}else{
								$('#text_hint').html("手机号已存在");
								$("#text_hint").css("display","block");
							}
						},
						error:function(err){
							alert(err);
						}
					});
				}else{

				}
			})
			// 
			
		// 验证手机号
		function isPhone(){
			if(!$("#isPhone").val() || !/^1[34578]\d{9}$/.test($("#isPhone").val())){
				$('#text_hint').html("!手机号码格式错误");
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
		// 滑块验证
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
		//获取验证码
		function getCode(node){
			$(node).click(function(event){
				//截取手机号后四位
				var str = $("#isPhone").val();
				var num = str.substring(7,11);
				event.preventDefault();
				isPhone();
				if(isNum == 0){
					if(!isRight){
						$("#text_hint2").html("!请按住滑块，拖动到最右边");
						$("#text_hint2").css("display","block");

					}else{
						$("#text_hint3").css("display","block");
						$("#text_hint3").html(`校验码已发送到尾号为 <span>${num}</span> 的手机，请查收`);
					}					
				}
			});
		}
		function isCode(){
			if($(".ipt2").val()){
				$("#text_hint3").css("display","none");
				$("#text_hint3").html(``);
				n2 = 1;
			}else{
				$("#text_hint3").css("display","block");
				$("#text_hint3").html(`!验证码错误，请重新输入`);
				n2 = 0;

			}
		}
		// 密码
		function passWord(){
			var oValue = $('#pas').val();
			if(oValue.length > 18 || oValue.length < 6){
					$('#text_hint4').html("!密码长度应为6~18个字符");
					$("#text_hint4").css("display","block");
					n3 = 0;
				}else if(/\d/.test(oValue[0])){
					$('#text_hint4').html("!密码必需以英文字母开头");
					$("#text_hint4").css("display","block");
					n3 = 0;
				}else if(/\W/.test(oValue)){
					$('#text_hint4').html("!密码需由字母、数字或下划线组成");
					$("#text_hint4").css("display","block");
					n3 = 0;
				}else{
					$('#text_hint4').html("");
					$("#text_hint4").css("display","none");
					n3 = 1;
				}
		}
		// 显示隐藏密码
		function showPassword(){
			var isShow = 0;
			$(".ipt_show").click(function(){
				if(isShow == 0){
					document.getElementById("pas").type = "text";
					$(".ipt_show").addClass("ipt_show2");
					isShow = 1;
				}else{
					$(".ipt_show").removeClass("ipt_show2");
					document.getElementById("pas").type = "password";
					isShow = 0;
				}
				
			})
		}
		
	})