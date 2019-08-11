module.exports.buildContentPage = (mdContent) => `<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>项目说明文档/Project Desc Doc</title>
    <style>
        body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
        .operation {
            text-align: right;
        }
    </style>
    <link rel="stylesheet" href="/stylesheets/github-markdown.css">
</head>
<body>
<div class="markdown-body">
    <div class="operation">
        <button id="go_back">返回/Go Back</button>
    </div>
    ${mdContent}
</div>
<script >
    document.getElementById('go_back').onclick = function(){
        window.history.back();
    }
</script>
</body>
</html>`;
