var http = require('http');

let db = [];

var server = http.createServer((req,res) => {

    res.setHeader('content-type', 'text/plain;charset=utf-8')

    const { path, params } = parseUrl(req);

    if(path === '/add') {
        // const newItem = params.content;  //{a:2,b:3,content:11}
        const a = params.a;
        const b = params.b;

        if(!a || !b) {
            res.end("添加失败, 参数不能为空");
            return;
        }
        db.push(parseInt(a)+parseInt(b));

        res.end( JSON.stringify({
            msg: '添加成功',
            length: db.length
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
            db.map(item=> `<li>${item}</li>`).join('\n')
        }
        </ul>

        <input />
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