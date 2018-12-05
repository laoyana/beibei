
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"index":"index",
		"load":"load",
		"topNav":"topNav",
	},
	shim:{
		"jquery-cookie":["jquery"]
	}
})
require(['index',"load"],function(index,load){
	index.index();
	load.load();
})