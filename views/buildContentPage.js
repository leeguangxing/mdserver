module.exports.buildContentPage = (mdContent='', mdNav='') => `<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>项目说明文档/Project Desc Doc</title>
    <link rel="stylesheet" href="/stylesheets/index.css">
    <link rel="stylesheet" href="/stylesheets/github-markdown.css">
</head>
<body>
<div class="markdown-container">
    <div class="markdown-nav">
        ${mdNav}
    </div>
    <div class="markdown-content">
        <div class="markdown-body">
           ${mdContent}
        </div>
    </div>
</div>
<script src="/javascripts/index.js"></script>
</body>
</html>`;
