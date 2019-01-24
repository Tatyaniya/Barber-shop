const parallaxContainer = document.getElementById('parallax');
const layers = parallaxContainer.children;

const moveLayers = function (e) {

    if (e.pageY < 1700) {
        const initialX = (window.innerWidth / 2) - e.pageX;
        const initialY = (window.innerHeight / 2) - e.pageY;

    let i = 0;
    for (let layer of layers) {
        const divider = i/40;
        const positionX = initialX * divider;
        const positionY = initialY * divider;
        const bottomPosition = (window.innerHeight / 2) * divider;
        const image = layer.firstElementChild;

        layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
        image.style.bottom = `-${bottomPosition}px`;
        i++;
    }
    }
    
};

window.addEventListener('mousemove', moveLayers);


$(function() {

    // Отправка формы
    //Передача инфо о кнопке в модальное окно
    $('button.call').click(function() {
        var parent = $(this).attr('data-parent');
        var modal = $(this).attr('data-target');
        $(modal).find('input[name=target]').val(parent);
    })
});

//Валидация и отправка формы

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {

        el.validate({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                }
            },
            messages: {
                tel: {
                    required: 'Required field',
                    regex: 'Phone may contain + - () characters'
                },
                name: {
                    required: 'Required field',
                }
            },

            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                $('.popup-closed').fadeOut();
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Если у формы id="goToNewPage" - делаем:
                    case 'goToNewPage':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    // Если у формы id="popupResult" - делаем:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                }
                return false;
            }
        })
    }

    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
   
});

$( function() {
    $(window).on('load', function () {
        var $tel = $('.header__phone');
        $tel.addClass('fadeInDown').css('opacity', '1');

        var $text = $('.offer__text');
        $text.addClass('fadeInLeft').css('opacity', '1');

        var $offerBtn = $('.offer__button');
        $offerBtn.addClass('rubberBand').css('opacity', '1');

        var $youCall = $('.offer__you-call');
        $youCall.addClass('fadeInUp').css('opacity', '1');

        $(window).scroll(function() {
            $('.services__title').each(function(){
                var imagePos = $(this).offset().top;
    
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 700) {
                    $(this).addClass("fadeInRight").css('opacity', '1');
                }
            });
            $('.garage__title').each(function(){
                var imagePos = $(this).offset().top;
    
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 700) {
                    $(this).addClass("fadeInLeft").css('opacity', '1');
                }
            });
            $('.works__title').each(function(){
                var imagePos = $(this).offset().top;
    
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 700) {
                    $(this).addClass("fadeInRight").css('opacity', '1');
                }
            });
            $('.garage__text').each(function(){
                var imagePos = $(this).offset().top;
    
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 700) {
                    $(this).addClass("flipInX").css('opacity', '1');
                }
            });
        });
    });

    $('.loop').owlCarousel({
        items: 2,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 1000,
        loop: true,
        margin: 30,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            992:{
                items:3
            },
            1170:{
                items:4
            }
        }
    });

    $(".mouse").click( e => {
        e.preventDefault();
		elementClick = $(e.currentTarget).attr("href");
		destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 800);
    });

    $(".footer__up").click( e => {
        e.preventDefault();
		elementClick = $(e.currentTarget).attr("href");
		destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 1000);
    });

    $(".footer__logo").click( e => {
        e.preventDefault();
		elementClick = $(e.currentTarget).attr("href");
		destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 1000);
    });

    // Progress Scroll
const ProgressScroll = (() => {
    let s;
  
    return {
      settings() {
        return {
          top: $('.progress-top'),
          right: $('.progress-right'),
          bottom: $('.progress-bottom'),
          left: $('.progress-left'),
          windowHeight: $(window).height(),
          windowWidth: $(window).width(),
          scrollHeight: $(document).height() - $(window).height(),
          progressTotal: $(window).height() * 2 + $(window).width() * 2,
          scrollPosition: $(document).scrollTop()
        };
      },
  
      init() {
        s = this.settings();
        this.bindEvents();
      },
  
      bindEvents() {
        $(window).on('scroll', this.onScroll);
        $(window).on('resize', this.onResize);
  
        this.progress();
      },
  
      onScroll() {
        s.scrollPosition = $(document).scrollTop();
  
        ProgressScroll.requestTick();
      },
  
      onResize() {
        s.windowHeight = $(window).height();
        s.windowWidth = $(window).width();
        s.scrollHeight = $(document).height() - s.windowHeight;
        s.progressTotal = s.windowHeight * 2 + s.windowWidth * 2;
  
        ProgressScroll.requestTick();
      },
  
      requestTick() {
        requestAnimationFrame(this.progress);
      },
  
      progress() {
        const percentage = s.scrollPosition / s.scrollHeight;
        const width = s.windowWidth / s.progressTotal;
        const height = s.windowHeight / s.progressTotal;
  
        s.top.css('width', `${(percentage / width) * 100}%`);
        s.right.css('height', `${((percentage - width) / height) * 100}%`);
        s.bottom.css('width', `${((percentage - width - height) / width) * 100}%`);
        s.left.css('height', `${((percentage - width - height - width) / height) * 100}%`);
      }
    };
  })();
  
  // Init
  $(() => {
    ProgressScroll.init();
  });

    setInterval(function(){
      $('#string>span').addClass('blink_on');
      setTimeout(function(){$('#string>span').removeClass('blink_on')},1500);
    },6000);

});
