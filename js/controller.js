app.controller('AppCtrl',function($scope, $rootScope, $http, $location,$cacheFactory){
	$rootScope.$on('$routeChangeStart', function(){
	    $rootScope.loading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function(){
	    $rootScope.loading = false;
	});
	$scope.ad = '管理首页';
	var layer,form,el;
	$scope.apprun = function(){
		layui.use(['layer','form', 'element'], function(){
			layer = layui.layer,form = layui.form(),el = layui.element();
			layer.msg('Hello World');
		});
	}
	$scope.post = function(){
		if(form){
			form.render();
		}else{
			layui.use("form",function(){
				layui.form().on("submit",function(data){
					console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
					console.log(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
					console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
					return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
				});
			});
		}
	}
	$scope.alerts = function(){
		if(layer){
			layer.msg("fuck");
		}
	}
	$scope.dateinit = function(){
		var laydate;
		layui.use('laydate', function(){
			laydate = layui.laydate;
			var start = {
				min:'1900-01-01',
			    max: '2099-06-16',
			    choose: function(datas){
			      end.min = datas; //开始日选好后，重置结束日的最小日期
			      end.start = datas //将结束日的初始值设定为开始日
			    }
			};
			  
			var end = {
			    min: '1900-01-01',
			    max: '2099-06-16',
			    choose: function(datas){
			      start.max = datas; //结束日选好后，重置开始日的最大日期
			    }
			};
			document.getElementById('LAY_demorange_s').onclick = function(){
				var start_max = $("#LAY_demorange_e").val();
				console.log(start_max);
			    start.elem = this;
			    start.max = start_max;
			    laydate(start);
			}
			document.getElementById('LAY_demorange_e').onclick = function(){
				var end_min = $("#LAY_demorange_s").val();
				console.log(end_min);
			    end.elem = this;
			    end.min = end_min;
			    laydate(end);
			}
		});
	}
	$scope.tableinit = function(){
		var callback = function(data){
			var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
		    child.each(function(index, item){
		      item.checked = data.elem.checked;
		    });
		    form.render('checkbox');
		}
		if(form){
			form.render();
			form.on('checkbox(allChoose)',function(data){
				callback(data);
			})
		}else{
			layui.use('form',function(){
				layui.form().on('checkbox(allChoose)', function(data){
					callback(data);
				})
			})
		}
	}
});