var uploader;//webuploader上传实例对象
var filesList=[],//单张图片上传的数组
    muchFiles = [];//多张图片上传的数组
function upload(options){
	var $list,//放置单张图片的DOM节点
        $lists,//放置多张图片的DOM节点
        state = 'pending',
        fileBtns,//上传之后隐藏域的DOM节点
        x,//多图上传图片对象队列里每张图片所对应的索引
        $upbtn;//上传按钮对象
    uploader = WebUploader.create({
        // 不压缩image
        resize: false,
        // swf文件路径
        swf: options.swf,
        // 文件接收服务端。
        server: options.server,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        auto : options.auto,
        duplicate :true,
        fileVal:options.fileVal
    });
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        if($upbtn.attr("type") != "more"){
            var $li,$img;
            var string = $upbtn.attr("id");
            var idx = parseInt(string.substring(8));
            filesList[idx] = file;
            if($upbtn.attr("isdele") == "dele"){
                $li = $(
                    '<div id="' + file.id + '" class="file-item">' +
                        '<img>' +'<span fileId="filesList" class="deleUploader1" onclick="delePic(this,'+options.auto+ ','+"'"+file.id+"'"+')">删除</span>'+
                    '</div>'
                ),
                $img = $li.find('img'); 
            }else{
                $li = $(
                    '<div id="' + file.id + '" class="file-item">' +
                        '<img>' +
                    '</div>'
                ),
                $img = $li.find('img');
            }  
            // $list为容器jQuery实例
            $list.empty();
            $list.append( $li );
            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>'+file.name+'</span>');
                    return;
                }
                $img.attr( 'src', src );
            }, 325, 243 );
        }else{
            var flag = true;
            $.each(muchFiles[x],function(i,n){
                if(file.name == n.name){
                    alert("图片重复")
                    flag = false
                    return false;
                }
            });
            if(flag){
                muchFiles[x].push(file);
                var $li = $(
                    '<div style="position:relative;" id="' + file.id + '" class="file-item resize">' +
                        '<img>' + '<span class="deleUploader" onclick="delePic(this,'+options.auto+ ','+"'"+file.id+"'"+')">删除</span>'+
                    '</div>'
                    ),
                $img = $li.find('img');
                // $list为容器jQuery实例
                $lists.append( $li );
                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                // thumbnailWidth x thumbnailHeight 为 100 x 100
                uploader.makeThumb( file, function( error, src ) {
                    if ( error ) {
                        $img.replaceWith('<span>'+file.name+'</span>');
                        return;
                    }   
                    $img.attr( 'src', src );
                }, 200, 200 );
            } 
        }
       
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.layui-progress .layui-progress-bar');
        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="layui-progress"><div class="layui-progress-bar" lay-percent="0%"></div></div>')
                    .appendTo( $li )
                    .find('span');
        };
        $percent.css( 'width', percentage * 100 + '%' );
    });   
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file ,response) {
        $( '#'+file.id ).addClass('upload-state-done').children(".deleUploader").remove();
        $( '#'+file.id ).append('<span class="red" style="margin-left:15px;">上传成功</span>')
        console.log(response);
        //成功后的处理
        if(response.status==true){
            //单图上传
            var f = $("#"+file.id).parents(".uploadone").find("input.fileurl")
            if(f.length != 0){
                f.val(response.url);
            }else{
             	//多图上传
             	if(fileBtns!=undefined){
	                var yuan=fileBtns.val();
	                if(yuan!=''){
	                    fileBtns.val(yuan+','+response.url);
	                }else{
	                    fileBtns.val(response.url);
	                }
	            }
            }
        }else{
            console.log(response.msg);
        	alert(response.msg);
        }
        
    }); 
    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.layui-progress .layui-progress-bar'),
            $error = $li.find('div.error');
        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<span class="error" style="color:red;margin-left:15px;"></span>').appendTo( $li );
        }
        $error.text('上传失败');
        $percent.remove();
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        setTimeout(function(){
            $( '#'+file.id ).find('.layui-progress').remove();
        },1000)
    });
    //绑定uploader事件
    for(var i = 0;i<$('.uploadone').length;i++){
    	(function(i){$("#oneUp"+ i).on('click',function(){
			if ( state === 'uploading' ) {
	            uploader.stop();
	        }else {
	            if(filesList[i] != undefined){
	                uploader.upload(filesList[i]);
	                filesList[i] = undefined;
	            }
	        }
		})})(i);
    	uploader.addButton({
            id: '#oneChose'+i,
            innerHTML: '选择文件'
        });
        //单图文件选择按钮事件绑定
    	$("#oneChose"+i).on('mouseup',function(){
    		$list = $(this).parents(".lis").siblings(".lis").find(".uploader-list");
            $upbtn = $(this);
            if(filesList[i] != undefined){
                uploader.removeFile(filesList[i])
            }
    	})
    }
    $('.uploadmore').each(function(i){
        //多图上传按钮事件绑定
    	$("#moreUp"+ i).on('click',function(){
    		//console.log($(this));
    		if ( state === 'uploading' ) {
                uploader.stop();
            }else {
                if(muchFiles[i].length != 0){
                    $.each(muchFiles[i],function(i,n){
                        uploader.upload(n);
                    });
                    fileBtns = $(this).parents(".uploadmore").find("input.moreurl");
                    muchFiles[i] = [];
                }
            }
		});
    	uploader.addButton({
            id: '#moreChose'+i,
            innerHTML: '选择文件'
        });
        //多图文件选择按钮事件绑定
    	$("#moreChose"+i).on('mouseup',function(){
    		$lists = $(this).parents(".lis").siblings(".lis").find(".uploader-list");
            $upbtn = $(this);
            x = i;

            if(muchFiles[x] == undefined){
                muchFiles[x] = [];
            }
    	});
    })
}
function delePic(obj,auto,idObj){
    var $this = $(obj);
    var ind = $this.parents('.uploadmore').index();
    if(auto){
        var val = $(".moreurl").val();
        var valArray = val.split(",");
        valArray.splice(ind,1);
        $(".moreurl").val(valArray.join());
    }else{
        $.each(muchFiles[ind],function(i,n){
            if(idObj === n.id){
                muchFiles[ind].splice(i,1);
                return false
            }
        })
        $this.parent().remove();
    }
}