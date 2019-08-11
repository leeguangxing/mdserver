module.exports.buildIndexPage = () => `<!doctype html>
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
        .modified-time {
            float: right;
            font-size: 14px;
            font-weight: normal;
            color: #999;
            line-height: 60px;
        }
    </style>
    <link rel="stylesheet" href="/stylesheets/github-markdown.css">
</head>
<body>
<div class="markdown-body">
    <h1>项目说明文档/Project Desc Doc<span class="modified-time">最后更新日期/last modified：2019-8-9</span></h1>
    <h2>部分_1/part_1</h2>
    <ul>
        <li><a href="/part1/block1">模块_1/block_1</a></li>
    </ul>
    <h2>部分_2/part_2</h2>
    <ul>
        <li>
            <a href="/part2/block1">模块_1/block_1</a>
            <ul>
                <li><a href="/part2/block2/menu1">子菜单_1/menu_1</a></li>
            </ul>
        </li>
    </ul>
</div>
</body>
</html>`;
