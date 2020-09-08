// 设置菜单高亮类名
function setActive(alink){
    var attr = alink.getAttribute('class');
    if(!/ active/.test(attr)) {
        alink.setAttribute('class', attr + ' active');
    }
}

// 设置菜单高亮
function handleHighLight(path) {
    if (document.querySelectorAll) {
        var alinks = document.querySelectorAll('.markdown-articles>li>a.markdown-article');
        var hasMatch = false;
        for (var i = 0; i < alinks.length; i++) {
            if(alinks[i].getAttribute('data-path') === path){
                setActive(alinks[i]);
                hasMatch = true;
            } else {
                // 取消其它菜单高亮状态
                var attr = alinks[i].getAttribute('class');
                if(/ active/.test(attr)) {
                    alinks[i].setAttribute('class', attr.replace(/ active/,  ''));
                }
            }
        }
    } else {
        alert('Your browser doesn\'t support document.querySelectorAll !');
    }
}

// 异步请求右侧菜单内容，并渲染
function renderMenuContent(path, renderOnly) {

    if(!XMLHttpRequest) {
        alert('Your browser doesn\'t support XMLHttpRequest !');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', path, true);

    xhr.onload = function (data) {
        if(xhr.readyState === 4 && xhr.status === 200) {
            if(!renderOnly) {
                // 修改浏览器历史记录
                history.pushState({
                    path: path
                }, null, path);
            }
            // 渲染 html
            document.getElementById('markdown-body').innerHTML = xhr.responseText;
            // 设置左侧菜单高亮
            handleHighLight(path);

            setTimeout(function(){
                // 滚动回顶部
                document.getElementById('markdown-body').scrollTop = 0;
                // 小屏设备自动收起菜单
                if(window.innerWidth <= 768) {
                    hideMenu();
                }
            }, 0);
        }
    };
    xhr.send(null);
}

// 监听浏览器的前进后退
window.onpopstate = function(event) {
    if(event.type === 'popstate') {
        var path = '';
        if(event.state) {
            path = event.state.path;
        }
        renderMenuContent(path, true);
    }
};

function addClass(id, className) {
    var element = document.getElementById(id);
    var attr = element.getAttribute('class');
    var reg = new RegExp(' ' + className, 'g');
    if(!reg.test(attr)) {
        element.setAttribute('class', attr + ' ' + className);
    }
}

function removeClass(id, className) {
    var element = document.getElementById(id);
    var attr = element.getAttribute('class');
    var reg = new RegExp(' ' + className, 'g');
    if(reg.test(attr)) {
        element.setAttribute('class', attr.replace(' ' + className, ''));
    }
}

function hasClass(id, className) {
    var element = document.getElementById(id);
    var attr = element.getAttribute('class');
    var reg = new RegExp(' ' + className, 'g');
    return reg.test(attr);
}

function hideMenu() {
    addClass('markdown-body', 'spread');
    addClass('markdown-nav', 'shrink');
    addClass('toggle-menu', 'move');
}

function showMenu() {
    removeClass('markdown-body', 'spread');
    removeClass('markdown-nav', 'shrink');
    removeClass('toggle-menu', 'move');
}

function toggleMenu() {
    if(hasClass('markdown-body', 'spread')) {
        showMenu();
    } else {
        hideMenu();
    }
}
