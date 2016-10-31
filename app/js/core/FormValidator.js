/**
 * Created by Administrator on 16-5-8.
 * 表单校验
 */
class FormValidator {
     constructor(){
         this.messages = {
             required:'{0}不能为空',
             phone:'请输入正确的{0}',
             email:'请输入正确的{0}',
             debitno:'请输入正确的{0}',
             certno:'请输入正确的{0}',
         };
         this.patten = {
             required:function(value){//非空校验
                 return value.length > 0 && value != 0;
             },
             debitno:function(value){//借记卡规则校验
                 return /^\d{19}$/.test(value);
             },
             certno:function(value){//身份证规则校验
                 return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
             },
             phone:function(value){//手机号校验
                 return /^1[3-9]\d{9}$/.test(value);
             },
             email:function(value){//邮箱校验
                 return  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
             }
         };

     }
    /*
    * rule规则
    * model模型
    * field字段
    * */
    validate(rules,model){
        let message = [];//用于输出校验信息，每条校验信息换行
        for(let field in rules){//遍历字段
            let value = model[field];//该字段的值
            let name ;//字段中文名
            for(let rule in rules[field]){//遍历字段的规则
                if(rule == 'name'){//如果为字段名，则过滤
                    name = rules[field][rule];
                    continue;
                }
                if(!this.patten[rule].call(window,value)){
                    let temp = format(this.messages[rule],name,this.patten[rule]);
                   message.push(temp);
                }
            }
        }
        return message;
    }
}

var format = function( source, name,params ) {
    source = source.replace( new RegExp( "\\{" + 0 + "\\}", "g" ), function() {
        return name;
    } );
    if ( arguments.length === 2 ) {
        return function() {
            var args = $.makeArray( arguments );
            args.unshift( source );
            return $.validator.format.apply( this, args );
        };
    }
    if ( params === undefined ) {
        return source;
    }
    if ( arguments.length > 2 && params.constructor !== Array  ) {
        params = $.makeArray( arguments ).slice(2);
    }
    if ( params.constructor !== Array ) {
        params = [ params ];
    }
    $.each( params, function( i, n ) {
        i=i+1;

        source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
            return n;
        } );
    } );
    return source;
};


module.exports = FormValidator;