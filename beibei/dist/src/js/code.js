define(['fixedNav','jquery',"jquery-cookie"],function(fixedNav,$){
	function code(){
		$(function(){
			fixedNav.fixedNav();

		var sum = 0;
		var same = 0;
		var numbe = 0; 
		// 加载购物车的商品数据
		$.ajax({
			url:'../src/json/shop.json',
			success:function(data){
				if($.cookie("goods")){
					var sc_arr = eval($.cookie("goods"));
					
					$(".empty_shop").html("");
					for(var i in sc_arr){		
						same = data[sc_arr[i].id].pic * sc_arr[i].shopNum;
						sum = sum + same;
						numbe += sc_arr[i].shopNum ;
						$(`<tr class="tb_code">
								<td class="td_code1"><input type="checkbox" checked="checked"></td>
								<td class="td_code2">
									<a href="">
										<img src="${data[sc_arr[i].id].view[sc_arr[i].shopColor]}" alt="">
									</a>
									<a class="code2_a" href="">${data[sc_arr[i].id].h3}</a>
								</td>
								<td class="td_code3">
									${data[sc_arr[i].id].color[sc_arr[i].shopColor].cor},尺码:${data[sc_arr[i].id].size[sc_arr[i].shopSize]}
								</td>
								<td class="td_code4">
									<p class="code_pic">¥${data[sc_arr[i].id].pic}</p>
								</td>
								<td class="td_code5">
									<div class="deta_numb">
										<a class="num_op del_num shou" href="javascript:;">-</a>
										<input type="text" class="view_BuyNum" value="${sc_arr[i].shopNum}">
										<a class="num_op sum_num shou" href="javascript:;">+</a>
									</div>
								</td>
								<td class="td_code6">
									<p class="sname">${same}</p>
								</td>
								<td class="td_code7"><a href="javascript:;">删除</a></td>
							</tr>`).appendTo($(".ac_tb"));
					}
					$(".code_sp1").html(numbe);
					$(".code_sp2").html(sum);
				}
			}
		})
		// 全选删除
		$('#clear').click(function(){
			$.cookie("goods",null,{
				path:'/'
			});
			$('.ac_tb').html('');
			$(".code_sp1").html(0);
			$(".code_sp2").html(0);
		})

		// 单个删除
		$(".ac_tb").on("click",".td_code7 a",function(){
			var num = $(this).parents(".tb_code").index();
			var sc_arr = eval($.cookie("goods"));
			sc_arr.splice(num,1);
			var cookieStr = JSON.stringify(sc_arr);
			$.cookie("goods",cookieStr,{
				path:'/',
				expires:7
			})

			numbe = numbe - $(this).parents(".tb_code").find(".view_BuyNum").val();
			sum = sum - $(this).parents(".tb_code").find(".td_code6 p").html();
			
			$(this).parents(".tb_code").remove();


			$(".code_sp1").html(numbe);
			$(".code_sp2").html(sum);
		})

			// 我的购物车
			$("#xx_shop,.side_a").mouseenter(function(){
				sc_msg();
			});
			// 加载cookie数据
			function sc_msg(){
				$.ajax({
					url:"../src/json/shop.json",
					success:function(res){
						if($.cookie("goods")){
				
							var sc_arr = eval($.cookie("goods"));
							var sum = 0;
							$(".empty_shop").html("");
							for(var i in sc_arr){
								$(`<li>
							<a class="empty_a1" href="javascript:;">
								<img src="${res[0].view[sc_arr[i].shopColor]}" alt="">
							</a>
							<a class="empty_a2" href="javascript:;">${res[0].h3}</a>
							<p class="empty_p1">颜色:${res[0].color[sc_arr[i].shopColor].cor} 尺码:${res[0].size[sc_arr[i].shopSize]}</p>
							<p class="empty_p2">¥${res[0].pic}</p>
							<br>
							<span> x${sc_arr[i].shopNum}</span>
						</li>`).appendTo($(".empty_shop"));
							sum = sum + res[0].pic * sc_arr[i].shopNum;
							}
							$(".pic_c").html("￥" + parseInt(sum));
						}
					}
				})
			}	
		})
		
	}
	return {
		code:code
	}
})