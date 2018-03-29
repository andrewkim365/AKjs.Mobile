/*-----------------------------------------------Andrew_Ratyli-------------------------------------------*/
(function($){
    $.Andrew_Ratyli = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("Andrew_Ratyli", base);
        base.init = function(){
            // extend with parameters
            base.options = $.extend({},$.Andrew_Ratyli.defaultOptions, options);
            // extend with html5 dataset
            base.options =$.extend({},base.options,base.$el.data());
            // for the loop
            base.set(base.options.rate,true);
            // event listeners for rating signs
            base.$el.on("click","> *",function(e){
                if(!base.options.disable){
                    var target= e.target;
                    if(target.tagName!="span") target=target.parentNode;
                    base.options.onSignClick.call(base,target);
                    var val=$(target).prevAll().length+1;
                    base.set(val);
                }
            });
            base.$el.on("mouseenter","> *",function(e){
                var target= e.target;
                if(target.tagName!="span") target=target.parentNode;
                if(!base.options.disable){
                    $(target).addClass("rate-active");
                    $(target).prevAll().addClass("rate-active");
                }
                base.options.onSignEnter.apply(null,[base.options.rate,target]);
            });

            base.$el.on("mouseleave","> *",function(e){
                var target= e.target;
                if(target.tagName!="span") target=target.parentNode;
                if(!base.options.disable){
                    $(target).removeClass("rate-active");
                    $(target).prevAll().removeClass("rate-active");
                }
                base.options.onSignLeave.apply(null,[base.options.rate,target]);
            });
        };
        base.set=function(val,init){
            if(val<0 || (val % 1 != 0) || val>base.options.ratemax) val=0; // reset to 0.
            if(val==1 && base.options.rate==1 && base.options.unrateable==true && !init){
                val=0;
            }
            base.options.rate=val;
            // reset html
            base.$el.html("");
            // set data-rate
            if (base.options.rate!=0) base.$el.attr("data-rate",base.options.rate);
            // set data-ratemax
            base.$el.attr("data-ratemax",base.options.ratemax);
            // generate signs
            var i=0;
            while (i < base.options.ratemax) {
                var tmp="";
                if(i<base.options.rate){
                    tmp=base.signTemplate("full");
                }else{
                    tmp=base.signTemplate("empty");
                }
                base.$el.append(tmp);
                i++;
            }
            // set rated
            if(!init && !base.options.disable){
                //base.$el.addClass("rated");
                base.$el.attr("data-rate",val);
            }
            //rated callack
            base.options.onRated.call(base,val,init);
            return base.options.rate;
        };
        base.signTemplate=function(type){
            return "<span>"+base.options[type]+"</span>";
        };
        base.init();
    };
    $.Andrew_Ratyli.defaultOptions = {
        disable: false,
        unrateable: false,
        full: "",
        empty: "",
        rate:0,
        ratemax:5,
        onSignEnter:function(){},
        onSignLeave:function(){},
        onSignClick:function(){},
        onRated:function(){}
    };
    $.fn.Andrew_Ratyli = function(options){
        return this.each(function(){
            (new $.Andrew_Ratyli(this, options));
        });
    };

}(jQuery));