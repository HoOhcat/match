//const path = require('path');
const express = require('express');
const app = express();
const port=3008;
const mysql =require('mysql');
const session = require('express-session');

app.use(session({resave : false,secret : 'keyboard cat',saveUninitialized : true}))

app.use(express.static('./static/'));
app.use('/',express.static('./static/html/'));

app.get('*',(req,res,next)=>{
    //console.log(req.session);
    
    if (req.session.userinfo && req.session.userinfo.status=='success'){        
            
    }else{
        //登录 修正中
        //res.redirect('./login');
    }

    next();
 })

/*
//登录 修正中
 app.get('/login',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "text/html");

    req.session.userinfo={name : 'gdwer',status :'success'};
    //res.sendFile(__dirname+'/static/login.html');
    console.log(req.session);
    res.sendFile(__dirname+'/static/html/login.html');
    next();
})
*/

function database(sql,callback){

    const connect=mysql.createConnection({
        host:'localhost',
        user:'root',
        password : '123456',
        database:'matchtest',
        port: '3306'
    });

    connect.connect();
    member=[];
    
    connect.query(sql,(err,data)=>{
        if (err){
            console.log('error'+err.message);
        }
        else
        {
            for (i=0;i<data.length;i++){
                member[i]=data[i].name;
            }
            callback && callback(member);
        }
    });
    
    connect.end();
}


app.get('/member',(req , res ,next ) =>{
    //处理跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    
    const sql='select name from member;';
    
   database(sql,function (data){
    if (data){
        res.json({member:data});
        next();
    }
   })
});

app.get('/addmember',(req,res,next)=>{
    //处理跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    //console.log(req);

    const sql='insert into member values(\''+req.query.name+'\');';
    
    database(sql,()=>{
        res.send('ok');
        next();
    })

})

app.get('/delmember',(req,res,next)=>{
    //处理跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');

    const sql='delete from member where name =\''+req.query.name+'\';';
    database(sql,()=>{
        res.send('ok');
        next();
    })
})

app.listen(port, ()=>{
    console.log(`running at ${port}`)
});