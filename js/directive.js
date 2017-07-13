app.directive("leftrender", function() {
    return {
        restrict : "C",
        link: function(scope, element, attrs) {
        	var url = location.hash;
        	var el;
        	layui.use(['layer','element'], function(){
				el = layui.element();
			});
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
app.directive("uploadinit",function(){
	return{
		restrict : "A",
		link:function(scope, element, attrs){
			upload({
				swf:"/layui/js/Uploader.swf",
				server:"/layui/server/fileupload.php",
				auto:false
			})
		}
	};
})
app.directive("pageinit",function(){
	return{
		restrict : "A",
		link:function(scope, element, attrs){
			layui.use("laypage",function(){
				layui.laypage({
				    cont: 'pageDemo' //分页容器的id
				    ,pages: 100 //总页数
				    ,skin: '#5FB878' //自定义选中色值
				    //,skip: true //开启跳页
				    ,jump: function(obj, first){
				      if(!first){
				        layer.msg('第'+ obj.curr +'页');
				      }
				    }
				})
			})
		}
	};
})
app.directive("tabinit",function(){
	return{
		restrict : "A",
		link:function(scope, element, attrs){
			layui.use(['form', 'element'],function(){
				el = layui.element();
				el.on('tab(demo)',function(data){
					layer.msg('切换了：'+ this.innerHTML);
    				console.log(data);
				})
			})
		}
	};
})