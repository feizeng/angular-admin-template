app.directive("leftrender", function() {
    return {
        restrict : "C",
        controller:'AppCtrl',
        link: function(scope, element, attrs) {
        	var url = location.hash;
         	$("a[href='"+url+"']").parent("dd").addClass('layui-this');
			//手机设备的简单适配
		    var treeMobile = $('.site-tree-mobile'),shadeMobile = $('.site-mobile-shade');
			treeMobile.on('click', function(){
			    $('body').addClass('site-mobile');
			});
		    shadeMobile.on('click', function(){
		      	$('body').removeClass('site-mobile');
	        });
        }  
    };
});
