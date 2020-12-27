var changeOrder =(playername,playorder)=>{
    //指定排对阵
    n=playername.length;
    playerOrdername=[];

    for (i = 0;i < n; i++){
        playerOrdername[playorder[i]]=playername[i];
    }

    return playerOrdername;
}

var randomOrder =(playername,value)=>{
    //乱序排对阵
    n = playername.length;
    flag = [];
    playorder = [];
    playerOrdername=[];

    for (i = 0; i < n; i++) {
        flag[i] = 0
    }

    for (i = 0; i < n; i++) {
        number = Math.floor(Math.random() * n)
        while (flag[number] == 1) {
            number = Math.floor(Math.random() * n)
        }
        flag[number] = 1
        playorder[i] = number
    }

    for (i=n-1;i>=0;i--){
        if (value[playorder[i]]==1){
            for (j=i;j<n-1;j++){
                temp=playorder[j];
                playorder[j]=playorder[j+1];
                playorder[j+1]=temp;
            }
        }
    }

    for(i=0;i<n;i++){
        playerOrdername[i]=playername[playorder[i]];
    }

    return playerOrdername;
}

//example
var nodemember = function(a){
    m =[];
    for (i in a){
        a[i] && (m[i]={'left':null,'right':null,'x':0,'y':0,'offsetx' : 0,'value': a[i]});
    }
    return m; 
}

var matchgragh = function(member,n) {
    //console.log(n);
    if (n==1){
        return member[0];
    }
    
    a=[];
    if (n%2==0){
        for (i=0;i<(n/2);i++){
            a[i]={'left' : member[i*2],'right':member[i*2+1],'x':0,'y':0,value:null}
        }
        //console.log(a);
        return matchgragh(a,a.length);
    }
    else{
        for (i=0;i<(n-1)/2;i++){
            a[i]={'left' : member[i*2],'right':member[i*2+1],'x':0,'y':0,value:null}
        }
        a[a.length]=member[n-1];
        console.log(a);
        return matchgragh(a,a.length);
    }
}

var matchgraghplayer = (member)=>{
    if (member.length<=2){
        h={'left':null,'right':null,'x':0,'y':0,value:null}
        for(i=0;i<member.length;i++){
            if(!h.value){
                h.value=member[i];
            }else{
                h.left={'left':null,'right':null,'x':0,'y':0,value:h.value};
                h.right={'left':null,'right':null,'x':0,'y':0,value:member[i]};
                h.value=null;
            }
        }
        return h;
    }
    b=[];
    k=1;
    while (k<member.length){k=k*2}
    for(i=0;i<k/2;i++){
        b[i]={'left':null,'right':null,'x':0,'y':0,value:null}
    }
    h=matchgragh(b,b.length);
    for(i=0;i<b.length;i++){
        b[i].value=member[i];
    }
    j=0;k=b.length/2;
    for(i=b.length;i<member.length;i++){
        if (i%2==0){
            if(!b[j].value){
                b[j].value=member[i];
            }else{
                b[j].left={'left':null,'right':null,'x':0,'y':0,value:b[j].value};
                b[j].right={'left':null,'right':null,'x':0,'y':0,value:member[i]};
                b[j].value=null;
            }
            j++;
            if(j<b.length/2){

            }else{
                j=0;
            }
        }else{
            if(!b[k].value){
                b[k].value=member[i];
            }else{
                b[k].left={'left':null,'right':null,'x':0,'y':0,value:b[k].value};
                b[k].right={'left':null,'right':null,'x':0,'y':0,value:member[i]};
                b[k].value=null;
            }
            k++;
            if(k<b.length){

            }
            else{
                k=b.length/2;
            }
        }
    }
    return h;
}

var Traversal=function (p,callback){
    if (p!=null){
        callback && callback(p);
        Traversal(p.left,callback);
        Traversal(p.right,callback);
    }
}

var arrayMatch= (a,b)=>{
    if (a.length != b.length){
        return false;
    }
    for (i=0;i<a.length;i++){
        if (!((b.includes(a[i])))){
           return false; 
        }
    }
    return true;
}