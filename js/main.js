// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function() {

  // Находим элементы
  const burger = document.querySelector('.header__burger'); // кнопка бургера
  const overlay = document.querySelector('.overlay');
  const mobileMenu = document.querySelector('.mobile-menu');

  
  if (!burger || !overlay || !mobileMenu) return;

  // Функция открытия меню
  function openMenu() {
    overlay.classList.add('overlay--active');
    mobileMenu.classList.add('mobile-menu--active');
    burger.setAttribute('aria-expanded', 'true');
    // Блокируем прокрутку body (чтобы фон не скроллился)
    document.body.style.overflow = 'hidden';
  }

  // Функция закрытия меню
  function closeMenu() {
    overlay.classList.remove('overlay--active');
    mobileMenu.classList.remove('mobile-menu--active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // возвращаем прокрутку
  }

  // Закрытие меню при клике на любой пункт навигации
  const menuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__login');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Клик по бургеру — переключение
  burger.addEventListener('click', function() {
    // Если меню открыто — закрыть, иначе открыть
    if (mobileMenu.classList.contains('mobile-menu--active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Клик по оверлею — закрыть меню
  overlay.addEventListener('click', closeMenu);

  // Закрытие по клавише Esc (для доступности)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--active')) {
      closeMenu();
    }
  });

  // Предотвращаем закрытие при клике внутри меню (клик по меню не должен закрывать его)
  mobileMenu.addEventListener('click', function(event) {
    event.stopPropagation(); // останавливаем всплытие события, чтобы оверлей не поймал клик
  });


  // Закрываем мобильное меню при расширении окна больше 600px
  window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
      // Проверяем, открыто ли меню, и закрываем
      if (mobileMenu.classList.contains('mobile-menu--active')) {
        overlay.classList.remove('overlay--active');
        mobileMenu.classList.remove('mobile-menu--active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // разблокируем прокрутку
      }
    }
  });

});