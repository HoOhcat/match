var getplayer =(callback)=>{
    $.ajax({
        url : "../../member",
        dataType:"json",
        type : "GET"
    }).done((data)=>{
        callback && callback(data.member);
    });
}

var addplayer =(str,callback)=>{
    $.ajax({
        url : "../../addmember",
        type : "GET",
        contentType :'json',
        data : {'name': str}
    }).done((data)=>{
        callback && callback();
    })
}

var delplayer =(str,callback)=>{
    $.ajax({
        url : "../../delmember",
        type : "GET",
        contentType :'json',
        data : {'name': str}
    }).done((data)=>{
        callback && callback();
    })
}

var getChosenPlayer = ()=>{
    $_player = $('.player');
    str='';
    for (i=0;i<$_player.length;i++){
        if ($_player[i].chosen==1){
            str+=$_player.eq(i).children().eq(0).html()+'   ';
        }
    }
    if (!str){
        return null;
    }
    (m=str.split('   ')).pop();
    return m;
}


var playerinit= (member)=>{
    
    op=$('.option_wrapper').eq(0);
    op[0].m=null;

    $_content_wrapper = $('.content_wrapper');
    $_player_wrapper = $_content_wrapper.eq(0);

    //添加元素
    str = '';
    for (i = 0; i < member.length; i++) {
        str += ['<div class=\"player\">',
            '<span>',
            '</span>',
            '</div>'
        ].join('');
    }
    str+=['<div class=\"addplayer\">',
    '<span></span>',
    '</div>'
    ]
    $_player_wrapper.html(str);

    

    //获取元素
    $_player = $('.player');
    $_player.addClass('player_wait');


    //选手元素
    for (i = 0; i < $_player.length; i++) {
        //序号
        $_player[i].number = i;
        //选中标记(等待状态)
        $_player[i].chosen = 0;
        //选手名字
        $_player.eq(i).children().eq(0).html(member[i]);
        //点击事件
        $_player.eq(i).on('click', function(ev) {
            ev && ev.stopPropagation();
            //console.log(this.number);
            if (this.chosen == 0) {
                this.chosen = 1;
                $_player.eq(this.number).removeClass('player_wait').addClass('player_chosen')
            } else {
                this.chosen = 0;
                $_player.eq(this.number).removeClass('player_chosen').addClass('player_wait')
            }
            op[0].m=getChosenPlayer();
        })
        //长按时间
        $_player.eq(i).on('mousedown',function (ev){
            ev && ev.stopPropagation();
            this.curTime=0;
            this.time=setInterval(()=>{
                this.curTime+=1;
            },1000)
        })
        $_player.eq(i).on('mouseup',function (ev){
            ev && ev.stopPropagation();
            clearInterval(this.time);
            if (this.curTime>=4){
                delplayer($(this).children().html(),()=>{
                    getplayer((member)=>{
                        $('.option_warpper').eq(0).member=member;
                        console.log('删除成功');
                        playerinit(member);
                    });
                });
            }
        })
        
    }

    //bingevent addplayer
    $('.addplayer').eq(0).html('新增').on('click',function (ev){
        ev && ev.stopPropagation();
        
        $('#cover').show();
        $('.member_message').show();
    });

}



var svginit =()=>{

    op=$('.option_wrapper').eq(0);

    $_match_wrapper=$('.content_wrapper').eq(2);

    //svg图初始
    $_match_wrapper.html(['<svg class=\"svg\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">',
    '</svg>'
    ].join(''));
    $svg_warpper = $_match_wrapper.children().eq(0);

    m=false;
    (op[0].m) && (m = op[0].m);
    (!m) && (m=getChosenPlayer());

    //temp = nodemember(m);
    //head =matchgragh(temp,temp.length);
    head=matchgraghplayer(m);

    //set x y
    head.x=500;
    head.y=50;
    head.offsetx=220;
    Traversal(head,function (p){
    if (p.left!=null){
        p.left.x=p.x-p.offsetx;
        p.left.y=p.y+60;
        p.left.offsetx=p.offsetx/2;
    }
    if (p.right!=null){
        p.right.x=p.x+p.offsetx;
        p.right.y=p.y+60;
        p.right.offsetx=p.offsetx/2;
    }
    })

    //Traversal
    str = '';   
    rx=38;   //长轴
    ry=20;    //短轴
    /*head = { 'left': null, 'right': null, 'x': 300, 'y': 60 ,value : 'N聚'};
    head.left = { 'left': null, 'right': null, 'x': head.x - 60, 'y': head.y + 100 ,value:'rami3e'};
    head.right = { 'left': null, 'right': null, 'x': head.x + 60, 'y': head.y + 100 ,value:'lunan'};*/
    Traversal(head,function (p){
    if (p!=null){
        str += ['<g>',
        '<ellipse cx=\"' + p.x + '\" cy=\"' + p.y + '\" rx=\"' + rx +'\"ry=\"'+ry + '\" stroke=\"black\"',
        'stroke-width=\"2\" fill=\"#c0cdc8\">',
        '</ellipse>',
        '<text x=\"'+p.x +'\" y=\"'+ p.y +'\" class=\"svgtext\">'+(p.value || '')+'</text>',
        '</g>'].join('');
        if (p.left){
            str+=['<path d=\"M '+(p.x-20)+' '+ (p.y+18) +' ' +'l -'+(p.offsetx-20)+' 38 \"  class=\"svgnormalline\">','</path>'].join('');
        }
        if (p.right){
            str+=['<path d=\"M '+(p.x+20)+' '+ (p.y+18) +' ' +'l '+(p.offsetx-20)+' 38 \"  class=\"svgnormalline\">','</path>'].join('');
        }
    }
    })
    $svg_warpper.html(str);

}

var changeOrderWrapper = ($_order_wrapper,m)=>{

    str='';
    if (m){
        for(i=0;i<m.length;i++){
            str+=['<li>',
            '<span class=\"order_message name\">'+m[i]+'</span>',
            '<span class=\"order_message\">位置</span>',
            '<input class=\"order_message\" type=\"number\" value=\"'+(i+1)+'\" />',
            '<span class=\"order_message\">位置权值</span>',
            '<input class=\"order_message\" type=\"number\" value=\"'+0+'\" />',
            '</li>'
            ].join('');
        }
    }
    $_order_wrapper.children().eq(1).children().html(str);
    
}

var playerOrder= (m)=>{

    op=$('.option_wrapper').eq(0);

    $_order_wrapper=$('.content_wrapper').eq(1).addClass('order_wrapper');

    str='';
    str+=['<div><button>修改</button><button>乱序</button></div>',
        '<div>',
        '<ul></ul>',
    '</div>'
    ].join('');
    $_order_wrapper.html(str);

    changeOrderWrapper($_order_wrapper,m);
    
    //修改
    $_order_wrapper.children().eq(0).children().eq(0).on('click',(ev)=>{
        ev && ev.stopPropagation();
        $_playerList = $_order_wrapper.children().eq(1).children().children('li');
        value=[];

        for(i=0;i<$_playerList.length;i++){
            value[i] = $_playerList.eq(i).children('input')[0].value-1;
        }

        flag=0;
        for(i=0;i<value.length;i++){
            if (value[i]>=value.length || value[i]<0){
                flag=1;
                break;
            }

            for(j=i+1;j<value.length;j++){
                if (value[i]==value[j]){
                    flag=1;
                    break;
                } 
            }
            if(flag){break;}
        }

        if(flag){
            alert('非法修改');
            return;
        }

        console.log(value);
        console.log(op[0].m);
        result=changeOrder(op[0].m,value);
        changeOrderWrapper($_order_wrapper,result);
        op[0].m=result;
    })
    
    //乱序
    $_order_wrapper.children().eq(0).children().eq(1).on('click',(ev)=>{
        ev && ev.stopPropagation();
        $_playerList = $_order_wrapper.children().eq(1).children().children('li');
        value=[];
        sum=0;
        for(i=0;i<$_playerList.length;i++){
            value[i] = parseInt($_playerList.eq(i).children('input')[1].value);
            if (value[i]!=0){
                value[i]=1;
            }
            sum+=value[i];
        }
        if (sum>$_playerList.length/2){
            alert('非法修改');
            return;
        }
        result= randomOrder(op[0].m,value);
        changeOrderWrapper($_order_wrapper,result);
        op[0].m=result;
    })

}

var switchoption = (op)=>{
    switch(op.curIndex){
        case 0:{
            //参赛选手(实际member请求获得)
            if (!op.member){
                op.member=[]
            }

            getplayer((member)=>{
                if (arrayMatch(op.member,member)){
                    op.memberChange=2;
                }else{
                    op.member=member;
                    op.memberChange=1;
                }
                //memberChange(根据请求改变)
                if (!op.memberChange){
                    op.memberChange=1;
                }

                //改变选手列表
                if (op.memberChange==1){
                    playerinit(op.member);
                    op.memberChange=2;
                }
            }) 
            
        }break;
        case 1:{
                playerOrder(op[0].m);
        }break;
        case 2:{svginit();}break;
    }
}


var init = (member) => {
    //容器
    $_option_warpper = $('.option_wrapper').eq(0);
    $_option = $('.option_wrapper .option');
    str = '';
    for (i = 0; i < $_option.length; i++) {
        str += ['<div class=\"content_wrapper\">', '</div>'].join('');
    }
    $_option.parent().next().html(str);

    $_content_wrapper = $('.content_wrapper');
    $_player_wrapper = $_content_wrapper.eq(0);
    $_match_wrapper = $_content_wrapper.eq(2);

    
    //选项卡元素
    $_option_warpper.curIndex = 0;
    for (i = 0; i < $_option.length; i++) {
        $_option[i].index = i;
        $_option.eq(i).on("click", function(ev) {
            ev && ev.stopPropagation();
            if ($_option_warpper.curIndex != this.index) {
                $_option_warpper.curIndex = this.index;
                $_option.eq(this.index).addClass('player_chosen').siblings().removeClass('player_chosen');
                $_content_wrapper.eq(this.index).show().siblings().hide();
                switchoption($_option_warpper);
            }
        })
    }

    $_option.eq($_option_warpper.curIndex).addClass('player_chosen')
    $_content_wrapper.hide().eq($_option_warpper.curIndex).show();
    switchoption($_option_warpper);

    //添加成员事件
    $('.member_message .member_message_warrper .submit').on('click',(ev)=>{
        ev && ev.stopPropagation();
        str='';
        str=$('.member_message .member_message_warrper input')[0].value;
        $('.member_message .member_message_warrper input')[0].value='';
        addplayer(str,()=>{
            
            getplayer((member)=>{
                $('.option_warpper').eq(0).member=member;
                playerinit(member);
            });
        });
        $('#cover').hide();
        $('.member_message').hide();
    })

    $('.member_message .member_message_warrper .member_message_close').on('click',(ev)=>{
        ev && ev.stopPropagation();
        $('#cover').hide();
        $('.member_message').hide();
    })
}

