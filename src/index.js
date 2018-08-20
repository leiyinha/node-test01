var http = require('http');

let db = [];

var server = http.createServer((req,res) => {

    res.setHeader('content-type', 'text/plain;charset=utf-8')

    const { path, params } = parseUrl(req);

    if(path === '/add') {
        // const newItem = params.content;  //{a:2,b:3,content:11}
        var num=0;        
        for(key in params){

            if(!params[key]) {
                res.end("计算失败, 参数不能为空");
                return;
            }
            //var arr = Object.keys(obj); var len = arr.length;
            let arr = Object.keys(params);
            let len01 = arr.length;
            if(len01<2){
                res.end("计算失败, 参数至少需要两个");
                return;
            }
            if(!isNaN(params[key])){
               num = num+parseInt(params[key]);
            }
            else{
                res.end("计算失败, 参数类型错误");
                return;
            }
        }
        db.push(parseInt(num));
        console.log(num);
        var len = db.length;
        res.end( JSON.stringify({
            msg: '计算成功，结果是：'+db[len-1],
        }) );
        return;
    }


    res.setHeader('content-type', 'text/html;charset=utf-8')

    res.end(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>todoList</title>
</head>
<body>
    <div>
        <h3>运算</h3>
        <ul>
        ${
            db.map((item,index)=> `<li>第${index+1}计算结果：${item}</li>`).join('\n')
        }
        </ul>
    </div>
    
</body>
</html>
    `);

});

function parseUrl (req) {
    const url = req.url; // /add?a=3&b=4
    const [path = '', paramsStr = ''] = url.split('?'); 

    // paramsStr = a=3&b=4  ;

    const pairs = paramsStr.split('&');
    const params = {};

    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = value;
    });

    console.log(params);
    return {
        path,  //   /add
        params,//a:3,b:4
    };
}


server.listen(3000);