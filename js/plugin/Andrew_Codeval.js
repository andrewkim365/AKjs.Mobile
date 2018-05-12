/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Codeval-----------------------------------------*/
(function($){
    var settings = {
        codeView: '',
        codeLength: '4',
        inputEle: ''
    };
    var _set = {
        storeLable:'codeval',
        codeval:'.ak-codeval'
    };
    $.Andrew_Codeval = {
        ak_getCode:function(option){
            _commSetting(option);
            return _storeData(_set.storeLable, null);
        },
        ak_setCode:function(option){
            _commSetting(option);
            _setCodeStyle(settings.codeView, settings.codeLength);

        },
        ak_validateCode:function(option){
            _commSetting(option);
            var inputV;
            inputV=$(settings.inputEle).val();
            if(inputV.toUpperCase() == _storeData(_set.storeLable, null).toUpperCase()){//修改的不区分大小写
                return true;
            }else{
                _setCodeStyle(settings.codeView, settings.codeLength);
                return false;
            }
        }
    };
    function _commSetting(option){
        $.extend(settings, option);
    }
    function _storeData(dataLabel, data){
        var store = $(_set.codeval).get(0);
        if(data){
            $.data(store, dataLabel, data);
        }else{
            return $.data(store, dataLabel);
        }
    }
    function _setCodeStyle(eid, codeLength){
        var codeObj = _createCode(settings.codeLength);
        var htmlCode='';
        htmlCode+='<ol class="'+_set.codeval.substring(1)+'" id="'+_set.codeval.substring(1)+'" onclick="$.Andrew_Codeval.ak_setCode()">' + _setStyle(codeObj) + '</ol>';
        $(eid).html(htmlCode);
        setTimeout(function() {
            $(eid).css({
                "margin-top": ($(settings.inputEle).outerHeight() - $(eid).outerHeight())/2
            });
        },100);
        $(window).resize(function(){
            $(eid).css({
                "margin-top": ($(settings.inputEle).outerHeight() - $(eid).outerHeight())/2
            });
        });
        $(settings.inputEle).attr("maxlength",settings.codeLength);
        _storeData(_set.storeLable, codeObj);
    }
    function _setStyle(codeObj){
        var fnCodeObj = new Array();
        var col = new Array('#BF0C43', '#E69A2A','#707F02','#18975F','#BC3087','#73C841','#780320','#90719B','#1F72D8','#D6A03C','#6B486E','#243F5F','#16BDB5');
        var charIndex;
        for(var i=0;i<codeObj.length;i++){
            charIndex = Math.floor(Math.random()*col.length);
            fnCodeObj.push('<li style="color:' + col[charIndex] + ';">' + codeObj.charAt(i) + '</li>');
        }
        return fnCodeObj.join('');
    }
    function _createCode(codeLength){
        var codeObj;
        codeObj = _createCodeFollow(codeLength);
        return codeObj;
    }
    function _createCodeFollow(codeLength){
        var code = "";
        var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(var i=0;i<codeLength;i++){
            var charIndex = Math.floor(Math.random()*selectChar.length);
            if(charIndex % 2 == 0){
                code+=selectChar[charIndex].toLowerCase();
            }else{
                code +=selectChar[charIndex];
            }
        }
        return code;
    }

}(jQuery));