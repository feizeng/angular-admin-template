app.directive("leftrender", function() {
    return {
        restrict : "C",
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
app.directive("tableinit",function(){
	return{
		restrict : "A",
		link:function(scope, element, attrs){
			if(scope.$last){
				var callback = function(data){
					var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
				    child.each(function(index, item){
				      item.checked = data.elem.checked;
				    });
				    layui.form().render('checkbox');
				}
				layui.use('form',function(){
					layui.form().on('checkbox(allChoose)', function(data){
						callback(data);
					});
					layui.form().render();
				})
			}
		}
	};
})