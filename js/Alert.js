;(function($){
    var Alert=function(config){
    	var _this_=this;
    	this.conf={
    		 width:'auto',   //弹窗宽度
    		height:'auto',   //弹窗高度
    		  type:'wait',   //弹窗类型，默认为等待
    	   buttons:null,    //按钮组件，默认为没有按钮
       delayClose:null,     //弹窗延时自动关闭
       contentText:null,    //弹窗提示文字
       delayCallback:null,  //延时关闭后的回调函数
    	}
    	this.thmp=$.extend(true, this.conf, config||{});
    	config==null?this.opt=false:this.opt=true;
    	this.init();
    }

    Alert.prototype={
    	/*初始化*/
    	init:function(){
    		this.creatDom();
    		this.appendDom();
    	},
    	/*初始化dom结构*/
    	creatDom:function(){
    		this.body=$("body");
    		this.AlertCover=$('<div class="Alert-cover">');
    		this.AlertContent=$('<div class="Alert-content">');
    		this.AlertHeader=$('<div class="Alert-header">');
    		this.Text=$('<div class="Alert-text">');
    		this.btnBox=$('<div class="btn-box">');
    		// this.AlertBtn=$('<button class="Alert-btn"></button>');

    	},
    	/*插入dom元素*/
    	appendDom:function(){
    		var _this_=this;
    		this.body.append(this.AlertCover);
    		this.AlertCover.append(this.AlertContent);
    		//不传参数的时候，弹出一个等待框，不带按钮
    		if(!this.opt){
				this.AlertContent.append(this.AlertHeader.addClass("wait"))
    		}else{
    			if(this.thmp.width!='auto' && $.type(this.thmp.width)=='number')
    				this.AlertContent.width(this.thmp.width)
    			if(this.thmp.height!='auto' && $.type(this.thmp.height)=='number')
    				this.AlertContent.height(this.thmp.height)
    			this.AlertContent.append(this.AlertHeader.addClass(this.thmp.type));
    			if(this.thmp.contentText!=null)
    				this.AlertContent.append(this.Text.html(this.thmp.contentText))
    			if(this.thmp.delayClose!=null&& $.type(this.thmp.delayClose)=='number')
    				this.close();
    			if(this.thmp.buttons!=null && $.type(this.thmp.buttons)==='array'){
    				this.AlertContent.append(this.btnBox);
    				for (var i = 0; i < this.thmp.buttons.length; i++) {
    					this.btnBox.append('<button class="Alert-btn '
    					+this.thmp.buttons[i].type+'">'+this.thmp.buttons[i].text+'</button>');
    				};
    				this.btnBox.find(".Alert-btn").each(function(index, el) {
    					$(el).click(function(){
    						if(_this_.thmp.buttons[index].callback){
    							if(_this_.thmp.buttons[index].callback()!=false)
    								_this_.close();
    						}else{
    							_this_.close();
    						}
    					})
    					
    				});
    			}	
    		}
    	},
        /*关闭弹窗*/
        close:function(){
        	var _this_=this;
        	setTimeout(function(){
        		_this_.AlertCover.remove();
        		if(_this_.thmp.delayCallback!=null){
        			_this_.thmp.delayCallback();
        		}
        	},this.thmp.delayClose||0)
        }

    }


    $.Alert=function(config){
    	return new Alert(config);
    }
    window.Alert=Alert;
})(jQuery)