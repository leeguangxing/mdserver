// give the active className
function setActive(alink){
    alink.setAttribute('class', alink.getAttribute('class') + ' active');
}

if (document.querySelectorAll) {
    var alinks = document.querySelectorAll('.markdown-articles>li>a.markdown-article');
    var hasMatch = false;
    for (var i = 0; i < alinks.length; i++) {
        if(alinks[i].href === window.location.href){
            setActive(alinks[i]);
            hasMatch = true;
            break;
        }
    }

    if(!hasMatch && alinks.length){
        setActive(alinks[0]);
    }
}

// handle scrollTop
var leftMenuDom = document.getElementById('markdown-nav');
leftMenuDom.scrollTop = parseFloat(window.sessionStorage.getItem('scroll') || 0);
leftMenuDom.onscroll = function(e){
    setTimeout(function(){
        window.sessionStorage.setItem('scroll', leftMenuDom.scrollTop.toString());
    }, 0);
};