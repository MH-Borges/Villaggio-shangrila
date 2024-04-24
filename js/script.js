//Scroll Menu
document.querySelectorAll('.links').forEach(item => { item.addEventListener('click', scrollToIdOnClick); });
function scrollToIdOnClick(event) {
    const targetElement = document.querySelector(event.currentTarget.getAttribute('href'));
    console.log();
    if (targetElement) {
        if(event.currentTarget.getAttribute('href') == '#condominio'){
            var targetOffset = targetElement.offsetTop;
        }else{
            var targetOffset = targetElement.offsetTop - 75;
        }
        smoothScrollTo(0, targetOffset);
    }
}
function smoothScrollTo(endX, endY, duration = 600) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = performance.now();
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
    function scroll() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
            window.scroll(endX, endY);
        } else {
            const newX = easeInOutQuart(elapsedTime, startX, distanceX, duration);
            const newY = easeInOutQuart(elapsedTime, startY, distanceY, duration);
            window.scroll(newX, newY);
            requestAnimationFrame(scroll);
        }
    }
    scroll();
}

//Menu fixo
window.addEventListener('scroll', function() {
    if(window.pageYOffset > 300){ document.querySelector(".whats_link").classList.remove('hide'); }
    else{ document.querySelector(".whats_link").classList.add('hide'); }

    if(window.pageYOffset > 950){ document.querySelector(".menu").classList.add('fixed'); }
    else{ document.querySelector(".menu").classList.remove('fixed'); }
});

//Galeria
document.addEventListener( 'DOMContentLoaded', function() {
    var elms = document.getElementsByClassName( 'splide' );
    for ( var i = 0; i < elms.length; i++ ) {
        if(i == 1 || i == 2){
            new Splide( elms[i], {
                type   : 'loop',
                perPage: 2,
                focus  : 0
            }).mount();
        }
        else{
            new Splide( elms[i], {
                type   : 'loop',
                perPage: 3,
                focus  : 0
            }).mount();
        }
    }
});

function OpenImg(url) {
    document.getElementById('img_Adapt').src= 'assets/'+url;
    document.getElementById('Btn_adapt_Modal').click();
}