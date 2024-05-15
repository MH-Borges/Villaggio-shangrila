document.addEventListener( 'DOMContentLoaded', function() {
    moveProgressBar();

    document.getElementById("data_footer").textContent = new Date().getFullYear();

    //galeria
    new Splide( '.splide', {
        perPage: 2,
        focus  : 0
    }).mount();

    //relogio
    var dateString = "2026/12/15";
    var deadline = new Date(dateString);

    function updateClock(){
        var today = new Date();
        var diff = deadline - today;
        if(diff <= 0){ 
            clearInterval(interval);
            var seconds = '00';
            var minutes = '00';
            var hours = '00';
            var days = '00';
            var months = '00';
        }
        else{
            var seconds = Math.floor((diff/1000)%60);
            var minutes = Math.floor((diff/1000/60)%60);
            var hours = Math.floor((diff/1000/60/60)%24);
            var days = Math.floor(diff/(1000*60*60*24)%30.5);
            var months = Math.floor(diff/(1000*60*60*24*30.5));
        }

        document.getElementById("months").textContent = ('0' + months).slice(-2);
        document.getElementById("days").textContent = ('0' + days).slice(-2);
        document.getElementById("hours").textContent = ('0' + hours).slice(-2);
        document.getElementById("minutes").textContent = ('0' + minutes).slice(-2);
        document.getElementById("seconds").textContent = ('0' + seconds).slice(-2);
    }
    
    var interval = setInterval(updateClock, 1000);
});

window.addEventListener('scroll', function() {
    //whats icon
    if(window.pageYOffset > 300){ document.querySelector(".whats_link").classList.remove('hide'); }
    else{ document.querySelector(".whats_link").classList.add('hide'); }

    //menu fixo
    if(window.pageYOffset > 950){ document.querySelector(".menu").classList.add('fixed'); }
    else{ document.querySelector(".menu").classList.remove('fixed'); }
});

//Scroll Menu
document.querySelectorAll('.links').forEach(item => { item.addEventListener('click', scrollToIdOnClick); });
function scrollToIdOnClick(event) {
    const targetElement = document.querySelector(event.currentTarget.getAttribute('href'));
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

function OpenImg(url) {
    document.getElementById('img_Adapt').src= 'assets/'+url;
    document.getElementById('Btn_adapt_Modal').click();
}

function moveProgressBar() {
    var animationLength = 2500;

    $('.progress-wrap').each(function(index) {
        var $this = $(this);
        var percent = $this.data('progress-percent') / 100;
        var progressWrapWidth = $this.width();
        var progressTotal = percent * progressWrapWidth;
        $this.find('.progress-bar').stop().animate({ left: progressTotal }, animationLength);
    });
}

function OptionSelection(selectedValueId, optionsButtonId, optionInputsClass) {
    let selectedValue = document.getElementById(selectedValueId),
        optionsViewButton = document.getElementById(optionsButtonId),
        inputsOptions = document.querySelectorAll('.' + optionInputsClass + ' input');

    inputsOptions.forEach(input => { 
        input.addEventListener('click', event => {
            selectedValue.textContent = input.dataset.label;
            optionsViewButton.click();
        });
    });
}

$(document).ready(function () {
    $('#telefone').mask('(00) 00000 - 0000');

    $('#btn_form').click(function (e) {
        $('#nome').prop('required',false);
        $('#email').prop('required',false);
        $('#telefone').prop('required',false);
    });

    $('#formulario').submit(function (e) {
        e.preventDefault();
        $('#msg_form').text('');
        $('#msg_form').removeClass('text-danger');
        $('#msg_form').removeClass('text-success');
        $.ajax({
            url: "email.php",
            method: "post",
            data: $('form').serialize(),
            dataType: "text",
            success: function (msg) {
                if (msg.trim() === 'Formulario enviado com sucesso! Entraremos em contato em breve, obrigado por nos escolher!') {
                    $('#msg_form').addClass('text-success');
                    $('#msg_form').text(msg);
                    setTimeout(() => { window.location.reload(); }, 5000)
                }
                else if (msg.trim() == "Preencha o campo de 'Nome completo'" || msg.trim() == 'Preencha o campo de E-mail' || msg.trim() == 'Por favor selecione uma planta') {
                    $('#msg_form').addClass('text-danger');
                    $('#msg_form').text(msg);
                }
                else{
                    $('#msg_form').removeClass('text-success');
                    $('#msg_form').addClass('text-danger');
                    $('#msg_form').text('Erro ao enviar o formulario, provaveis problemas com o servidor, você pode tentar nos mandar mensagem via Instagram ou Whatsapp');
                }
            }
        })
    });
});