$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    adaptiveHeight: false,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="prev"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="next"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: true
        }
      }
    ]

  });

  //для роботи табів(вкладок)
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  //для перемикання Детальніше -> назад в активному item
  // $('.catalog-item__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })

  //для перемикання Назад -> детальніше
  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })

  //щоб код не повторювався
  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //робота з модальними вікнами
  $('[data-modal="consultation"]').on('click', function () {
    $('.overlay, #consultation').fadeIn('.65s');
  });

  //по кліку на хрестик вікно закривається
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('.6s');
  });

  //підставляю назву продукту в модальне вікно
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('.6s');
    })
  });


  //валідація форм
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name:
        {
          required: "Будь-ласка, введіть Ваше ім'я",
          minlength: jQuery.validator.format("Введіть {0} символа!")
        },
        phone: "Будь-ласка, введіть Ваше номер телефону",
        email: {
          required: "Будь-ласка, введіть Вашу пошту",
          email: "Невірно введена адреса пошти"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#order form');
  validateForms('#consultation form');


  //маска вводу номера телефону для форм (обов'язково в input НЕ має бути type="number")
  $('input[name=phone]').mask("+38 (999) 999-99-99");


  //AJAX для взаємодії з сервером без перезапуску сторінки
  $('form').submit(function(e) {
    e.preventDefault();//відміняємо перезагрузку сторінки - стандартна поведінка браузера

    if(!$(this).valid()) {//щоб не відправлялися пусті форми
      return;//якщо форма не пройшла валідацію, то ми нічого не будемо робити
    }

    $.ajax({
      //вказуємо метод роботи з даними. POST - для відправки даних
      type: "POST",
      //вказуємо, куди саме будемо відправляти дані
      url: "mailer/smart.php",
      //вказуємо, які саме дані будемо відправляти, підготовляємо їх
      data: $(this).serialize()
    }).done(function() { //обробляємо відповідь сервера
      $(this).find("input").val(""); //очищаємо поля вводу після відправки даних

      //виводимо вікно вдячності після відправки форми
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('.6s');
      $('form').trigger('reset');//всі наявні форми очищаються
    });
    return false;
  });

  //Smooth scroll and pageup
  $(window).scroll(function() {
    if($(this).scrollTop() > 800) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  // $('a[href^="#"]').click(function() {
  //   const href = $(this).attr("href");
  //   $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
  //   return false;
  // });

  $('a[href=#up]').on("click", function (e) {
    // 1
    e.preventDefault();
    // 2
    const href = $(this).attr("href");
    // 3
    $("html, body").animate({ scrollTop: $(href).offset().top }, 800);
  });

  //для роботи WOW JS, для початку роботи анімацій, коли вони в області бачення користувача, потрібне підключення файла js
  new WOW().init();
});


// за допомогою tiny-slider:
// const slider = tns({
//   container: '.carousel__inner',
//   items: 1,
//   slideBy: 'page',
//   autoplay: false,
//   nav: false,
//   controls: false
// });

// document.querySelector('.slick-prev').addEventListener('click', function () {
//   slider.goTo('prev');
// });
// document.querySelector('.slick-next').addEventListener('click', function () {
//   slider.goTo('next');
// });
