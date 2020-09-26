module.exports.buildContentPage = (mdContent = '', mdNav = '', title = 'Document/说明文档') => `<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    <link rel="stylesheet" href="/stylesheets/github-markdown.css">
    <link rel="stylesheet" href="/stylesheets/index.css">
    <script src="/javascripts/index.js"></script>
</head>
<body>
<div class="markdown-container">
    <div class="markdown-nav" id="markdown-nav">
        ${mdNav}
    </div>
    <div class="markdown-content">
        <span class="toggle-menu" id="toggle-menu"></span>
        <div class="markdown-body" id="markdown-body">
           ${mdContent}
        </div>
    </div>
</div>
<script>
    var toggleBtn = document.getElementById('toggle-menu');
    var pathname = window.location.pathname;
    toggleBtn.onclick = toggleMenu;
    handleHighLight(pathname);
    history.pushState({path: pathname}, null);
</script>
</body>
</html>`;
