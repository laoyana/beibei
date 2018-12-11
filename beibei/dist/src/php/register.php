<?php 
	header('content-type:text;charset="utf-8"');
	error_reporting(0);
	$username = $_GET["username"];
	$password = $_GET["password"];

	$isYes = null;
	$link = mysql_connect("localhost", "root", "123456");

	if(!$link){
		echo '数据库链接失败';
		exit; //退出整个php程序
	}
	mysql_set_charset('utf8');
	mysql_select_db("beibei");
	$sql = "select * from user where username='{$username}'";

	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if($row){
			$isYes = false;
			echo $isYes;
		}else{
			//注册成功
			$sql = "insert into user(username,password) values('{$username}','{$password}');";
			$res = mysql_query($sql);
			if($res){
				$isYes = true;
				echo $isYes;
			}else{
				$isYes = false;
				echo $isYes;
			}
		}
 ?>